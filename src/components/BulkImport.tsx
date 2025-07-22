'use client';

import React, { useState, useRef } from 'react';
import { WheelItem } from '@/types/wheel';

interface BulkImportProps {
  onImport: (items: WheelItem[]) => void;
  onClose: () => void;
}

export const BulkImport: React.FC<BulkImportProps> = ({ onImport, onClose }) => {
  const [importText, setImportText] = useState('');
  const [importMethod, setImportMethod] = useState<'text' | 'file'>('text');
  const [separator, setSeparator] = useState<'newline' | 'comma' | 'semicolon' | 'tab'>('newline');
  const [previewItems, setPreviewItems] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cores padrão para os itens importados
  const defaultColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
  ];

  // Processar texto de entrada
  const processImportText = (text: string) => {
    if (!text.trim()) {
      setPreviewItems([]);
      return;
    }

    let items: string[] = [];
    
    switch (separator) {
      case 'newline':
        items = text.split('\n').map(item => item.trim()).filter(item => item);
        break;
      case 'comma':
        items = text.split(',').map(item => item.trim()).filter(item => item);
        break;
      case 'semicolon':
        items = text.split(';').map(item => item.trim()).filter(item => item);
        break;
      case 'tab':
        items = text.split('\t').map(item => item.trim()).filter(item => item);
        break;
    }

    // Remover duplicatas
    items = [...new Set(items)];
    
    setPreviewItems(items);
  };

  // Atualizar preview quando texto ou separador mudar
  React.useEffect(() => {
    processImportText(importText);
  }, [importText, separator]);

  // Processar arquivo
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        
        if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
          // Processar CSV/TXT
          const lines = content.split('\n').map(line => line.trim()).filter(line => line);
          
          // Detectar separador automaticamente
          const firstLine = lines[0] || '';
          let detectedSeparator: typeof separator = 'newline';
          
          if (firstLine.includes('\t')) {
            detectedSeparator = 'tab';
          } else if (firstLine.includes(';')) {
            detectedSeparator = 'semicolon';
          } else if (firstLine.includes(',')) {
            detectedSeparator = 'comma';
          }
          
          setSeparator(detectedSeparator);
          setImportText(content);
          
        } else if (file.name.endsWith('.json')) {
          // Processar JSON
          const data = JSON.parse(content);
          
          if (Array.isArray(data)) {
            // Array simples de strings
            if (data.every(item => typeof item === 'string')) {
              setImportText(data.join('\n'));
            }
            // Array de objetos com propriedade 'label' ou 'name'
            else if (data.every(item => typeof item === 'object' && (item.label || item.name))) {
              const labels = data.map(item => item.label || item.name);
              setImportText(labels.join('\n'));
            }
          } else if (data.items && Array.isArray(data.items)) {
            // Formato de configuração de roda
            const labels = data.items.map((item: any) => item.label || item.name || item);
            setImportText(labels.join('\n'));
          }
        }
      } catch (error) {
        console.error('Erro ao processar arquivo:', error);
        alert('Erro ao processar arquivo. Verifique se o formato está correto.');
      } finally {
        setIsProcessing(false);
      }
    };

    reader.readAsText(file);
  };

  // Importar itens
  const handleImport = () => {
    if (previewItems.length === 0) return;

    const wheelItems: WheelItem[] = previewItems.map((label, index) => ({
      id: `imported-${Date.now()}-${index}`,
      label: label.substring(0, 50), // Limitar tamanho
      color: defaultColors[index % defaultColors.length],
      weight: 1
    }));

    onImport(wheelItems);
    onClose();
  };

  // Templates de exemplo
  const exampleTemplates = {
    comidas: "Pizza\nHambúrguer\nSushi\nTacos\nPasta\nSalada\nChurrasco\nSanduíche",
    filmes: "Ação,Comédia,Drama,Terror,Ficção Científica,Romance,Aventura,Animação",
    cores: "Vermelho;Azul;Verde;Amarelo;Roxo;Laranja;Rosa;Marrom",
    numeros: "1\t2\t3\t4\t5\t6\t7\t8\t9\t10"
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Importação em Massa</h2>
                <p className="opacity-90">Importe múltiplos itens de uma vez</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Método de Importação */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Método de Importação
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setImportMethod('text')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  importMethod === 'text'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Texto
              </button>
              <button
                onClick={() => setImportMethod('file')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  importMethod === 'file'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Arquivo
              </button>
            </div>
          </div>

          {importMethod === 'text' ? (
            <div className="space-y-6">
              {/* Separador */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Separador
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { value: 'newline', label: 'Nova Linha', example: 'Item 1\\nItem 2' },
                    { value: 'comma', label: 'Vírgula', example: 'Item 1, Item 2' },
                    { value: 'semicolon', label: 'Ponto e Vírgula', example: 'Item 1; Item 2' },
                    { value: 'tab', label: 'Tab', example: 'Item 1\\tItem 2' }
                  ].map((sep) => (
                    <button
                      key={sep.value}
                      onClick={() => setSeparator(sep.value as typeof separator)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${
                        separator === sep.value
                          ? 'bg-blue-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      title={sep.example}
                    >
                      {sep.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Área de Texto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Cole seus itens aqui
                </label>
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder={`Cole seus itens aqui...\n\nExemplo:\nItem 1\nItem 2\nItem 3`}
                  className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Templates de Exemplo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Templates de Exemplo
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Object.entries(exampleTemplates).map(([name, content]) => (
                    <button
                      key={name}
                      onClick={() => setImportText(content)}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-all capitalize"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Upload de Arquivo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Selecione um arquivo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.txt,.json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                    className="flex flex-col items-center gap-3 mx-auto"
                  >
                    {isProcessing ? (
                      <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full" />
                    ) : (
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    )}
                    <div className="text-lg font-medium text-gray-700">
                      {isProcessing ? 'Processando...' : 'Clique para selecionar arquivo'}
                    </div>
                    <div className="text-sm text-gray-500">
                      Suporta: CSV, TXT, JSON
                    </div>
                  </button>
                </div>
              </div>

              {/* Formatos Suportados */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Formatos Suportados:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li><strong>CSV:</strong> Valores separados por vírgula</li>
                  <li><strong>TXT:</strong> Texto simples com separadores</li>
                  <li><strong>JSON:</strong> Array de strings ou objetos com 'label'</li>
                </ul>
              </div>
            </div>
          )}

          {/* Preview */}
          {previewItems.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Preview ({previewItems.length} itens)
                </label>
                <button
                  onClick={() => {
                    setImportText('');
                    setPreviewItems([]);
                  }}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Limpar
                </button>
              </div>
              <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {previewItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-white rounded border text-sm"
                    >
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: defaultColors[index % defaultColors.length] }}
                      />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
          <div className="text-sm text-gray-600">
            {previewItems.length > 0 && (
              <span>{previewItems.length} itens prontos para importar</span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={handleImport}
              disabled={previewItems.length === 0}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all"
            >
              Importar {previewItems.length > 0 && `(${previewItems.length})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};