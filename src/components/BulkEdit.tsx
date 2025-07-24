'use client';

import React, { useState } from 'react';
import { X, Edit3, Plus, Trash2, Copy, Upload, Download, Shuffle } from 'lucide-react';

interface BulkEditProps {
  isOpen: boolean;
  onClose: () => void;
  items: string[];
  onItemsChange: (items: string[]) => void;
}

export default function BulkEdit({ isOpen, onClose, items, onItemsChange }: BulkEditProps) {
  const [textInput, setTextInput] = useState(items.join('\n'));
  const [mode, setMode] = useState<'text' | 'table'>('text');

  if (!isOpen) return null;

  const handleSave = () => {
    const newItems = textInput
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    onItemsChange(newItems);
    onClose();
  };

  const handleImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (file.name.endsWith('.csv')) {
        // Parse CSV
        const lines = content.split('\n');
        const items = lines
          .map(line => line.split(',')[0].trim().replace(/"/g, ''))
          .filter(item => item.length > 0);
        setTextInput(items.join('\n'));
      } else {
        // Texto simples
        setTextInput(content);
      }
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    const content = textInput;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `itens-roda-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const shuffleItems = () => {
    const items = textInput.split('\n').filter(item => item.trim());
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setTextInput(shuffled.join('\n'));
  };

  const addTemplate = (template: string[]) => {
    const currentItems = textInput.split('\n').filter(item => item.trim());
    const newItems = [...currentItems, ...template];
    setTextInput(newItems.join('\n'));
  };

  const templates = {
    numbers: Array.from({ length: 10 }, (_, i) => (i + 1).toString()),
    letters: Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
    colors: ['Vermelho', 'Azul', 'Verde', 'Amarelo', 'Roxo', 'Laranja', 'Rosa', 'Marrom'],
    yesNo: ['Sim', 'Não', 'Talvez', 'Definitivamente', 'Nunca', 'Sempre'],
    weekdays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
    months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/50 shadow-2xl">
        <div className="p-8 border-b border-gray-200 flex justify-between items-center bg-white/95 backdrop-blur-sm rounded-t-2xl">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3 leading-tight">
            <Edit3 size={28} className="text-blue-600" />
            Editor em Massa
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold transition-all duration-200 hover:scale-110 p-2 rounded-full hover:bg-gray-100"
          >
            <X size={28} />
          </button>
        </div>

        <div className="p-8">
          {/* Modo de Edição */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setMode('text')}
              className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-md ${
                mode === 'text' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                  : 'bg-gray-100/80 backdrop-blur-sm text-gray-700 hover:bg-gray-200/80 border border-gray-200'
              }`}
            >
              📝 Modo Texto
            </button>
            <button
              onClick={() => setMode('table')}
              className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-md ${
                mode === 'table' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                  : 'bg-gray-100/80 backdrop-blur-sm text-gray-700 hover:bg-gray-200/80 border border-gray-200'
              }`}
            >
              📊 Modo Tabela
            </button>
          </div>

          {/* Ferramentas */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={shuffleItems}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-purple-600 hover:to-purple-700 font-bold text-sm flex items-center gap-2 transition-all duration-200 hover:scale-105 shadow-md"
            >
              <Shuffle size={16} />
              Embaralhar
            </button>
            
            <label className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl hover:from-green-600 hover:to-green-700 font-bold text-sm flex items-center gap-2 cursor-pointer transition-all duration-200 hover:scale-105 shadow-md">
              <Upload size={16} />
              Importar
              <input
                type="file"
                accept=".txt,.csv"
                onChange={handleImportFile}
                className="hidden"
              />
            </label>
            
            <button
              onClick={handleExport}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-blue-700 font-bold text-sm flex items-center gap-2 transition-all duration-200 hover:scale-105 shadow-md"
            >
              <Download size={16} />
              Exportar
            </button>
            
            <button
              onClick={() => navigator.clipboard.writeText(textInput)}
              className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-xl hover:from-gray-600 hover:to-gray-700 font-bold text-sm flex items-center gap-2 transition-all duration-200 hover:scale-105 shadow-md"
            >
              <Copy size={16} />
              Copiar
            </button>
            
            <button
              onClick={() => setTextInput('')}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-red-700 font-bold text-sm flex items-center gap-2 transition-all duration-200 hover:scale-105 shadow-md"
            >
              <Trash2 size={16} />
              Limpar
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Editor Principal */}
            <div className="lg:col-span-2">
              {mode === 'text' ? (
                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-4 leading-tight">
                    📝 Itens (um por linha):
                  </label>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Digite um item por linha...&#10;Exemplo:&#10;Pizza&#10;Hambúrguer&#10;Sushi&#10;Salada"
                    rows={20}
                    className="w-full p-6 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none font-mono text-base bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-200"
                  />
                  <div className="mt-3 text-base font-bold text-blue-600 bg-blue-50/80 backdrop-blur-sm rounded-xl p-3 border border-blue-200">
                    📊 Total: {textInput.split('\n').filter(item => item.trim()).length} itens
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-4 leading-tight">
                    📊 Edição em Tabela:
                  </label>
                  <div className="border border-gray-300 rounded-2xl max-h-96 overflow-y-auto bg-white/80 backdrop-blur-sm shadow-lg">
                    <table className="w-full">
                      <thead className="bg-gray-100/80 backdrop-blur-sm">
                        <tr>
                          <th className="px-6 py-4 text-left text-base font-bold text-gray-700">#</th>
                          <th className="px-6 py-4 text-left text-base font-bold text-gray-700">Item</th>
                          <th className="px-6 py-4 text-left text-base font-bold text-gray-700">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {textInput.split('\n').map((item, index) => (
                          <tr key={index} className="border-t border-gray-200">
                            <td className="px-4 py-2 text-sm text-gray-500">{index + 1}</td>
                            <td className="px-4 py-2">
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => {
                                  const items = textInput.split('\n');
                                  items[index] = e.target.value;
                                  setTextInput(items.join('\n'));
                                }}
                                className="w-full p-1 border border-gray-300 rounded text-sm"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <button
                                onClick={() => {
                                  const items = textInput.split('\n');
                                  items.splice(index, 1);
                                  setTextInput(items.join('\n'));
                                }}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Templates */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Templates Rápidos</h3>
              <div className="space-y-3">
                <div>
                  <button
                    onClick={() => addTemplate(templates.numbers)}
                    className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="font-medium">🔢 Números (1-10)</div>
                    <div className="text-sm text-gray-600">1, 2, 3, 4, 5...</div>
                  </button>
                </div>
                
                <div>
                  <button
                    onClick={() => addTemplate(templates.letters)}
                    className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="font-medium">🔤 Letras (A-Z)</div>
                    <div className="text-sm text-gray-600">A, B, C, D, E...</div>
                  </button>
                </div>
                
                <div>
                  <button
                    onClick={() => addTemplate(templates.colors)}
                    className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="font-medium">🎨 Cores</div>
                    <div className="text-sm text-gray-600">Vermelho, Azul, Verde...</div>
                  </button>
                </div>
                
                <div>
                  <button
                    onClick={() => addTemplate(templates.yesNo)}
                    className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="font-medium">✅ Sim/Não</div>
                    <div className="text-sm text-gray-600">Sim, Não, Talvez...</div>
                  </button>
                </div>
                
                <div>
                  <button
                    onClick={() => addTemplate(templates.weekdays)}
                    className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="font-medium">📅 Dias da Semana</div>
                    <div className="text-sm text-gray-600">Segunda, Terça, Quarta...</div>
                  </button>
                </div>
                
                <div>
                  <button
                    onClick={() => addTemplate(templates.months)}
                    className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="font-medium">📆 Meses</div>
                    <div className="text-sm text-gray-600">Janeiro, Fevereiro, Março...</div>
                  </button>
                </div>
              </div>

              {/* Dicas */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Dicas:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Use Ctrl+V para colar listas</li>
                  <li>• Importe arquivos .txt ou .csv</li>
                  <li>• Linhas vazias são ignoradas</li>
                  <li>• Use o modo tabela para edição precisa</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}