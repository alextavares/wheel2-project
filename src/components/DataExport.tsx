'use client';

import React, { useState } from 'react';
import { WheelItem } from '@/types/wheel';

interface SpinResult {
  id: string;
  result: string;
  timestamp: string;
  wheelTitle: string;
  totalItems: number;
}

interface DataExportProps {
  items: WheelItem[];
  spinHistory: SpinResult[];
  wheelTitle?: string;
}

export const DataExport: React.FC<DataExportProps> = ({ 
  items, 
  spinHistory, 
  wheelTitle = "Minha Roda" 
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'txt'>('csv');

  // Função para exportar configuração da roda
  const exportWheelConfig = () => {
    const config = {
      title: wheelTitle,
      items: items.map(item => ({
        label: item.label,
        color: item.color,
        weight: item.weight || 1
      })),
      totalItems: items.length,
      exportedAt: new Date().toISOString(),
      exportFormat: 'wheel-config'
    };

    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${wheelTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_config.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  // Função para exportar histórico de giros
  const exportSpinHistory = () => {
    setIsExporting(true);
    
    try {
      let content = '';
      let filename = '';
      let mimeType = '';

      switch (exportFormat) {
        case 'csv':
          content = generateCSV();
          filename = `${wheelTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_historico.csv`;
          mimeType = 'text/csv';
          break;
        case 'json':
          content = generateJSON();
          filename = `${wheelTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_historico.json`;
          mimeType = 'application/json';
          break;
        case 'txt':
          content = generateTXT();
          filename = `${wheelTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_historico.txt`;
          mimeType = 'text/plain';
          break;
      }

      const dataBlob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
    } finally {
      setIsExporting(false);
    }
  };

  // Gerar CSV
  const generateCSV = (): string => {
    const headers = ['Data/Hora', 'Resultado', 'Título da Roda', 'Total de Itens'];
    const rows = spinHistory.map(spin => [
      new Date(spin.timestamp).toLocaleString('pt-BR'),
      `"${spin.result}"`,
      `"${spin.wheelTitle}"`,
      spin.totalItems.toString()
    ]);

    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  };

  // Gerar JSON
  const generateJSON = (): string => {
    const exportData = {
      wheelTitle,
      exportedAt: new Date().toISOString(),
      totalSpins: spinHistory.length,
      spinHistory: spinHistory.map(spin => ({
        ...spin,
        timestamp: new Date(spin.timestamp).toISOString()
      })),
      statistics: generateStatistics()
    };

    return JSON.stringify(exportData, null, 2);
  };

  // Gerar TXT
  const generateTXT = (): string => {
    const lines = [
      `HISTÓRICO DE GIROS - ${wheelTitle}`,
      `Exportado em: ${new Date().toLocaleString('pt-BR')}`,
      `Total de giros: ${spinHistory.length}`,
      '',
      '--- RESULTADOS ---'
    ];

    spinHistory.forEach((spin, index) => {
      lines.push(
        `${index + 1}. ${spin.result}`,
        `   Data: ${new Date(spin.timestamp).toLocaleString('pt-BR')}`,
        `   Roda: ${spin.wheelTitle}`,
        ''
      );
    });

    const stats = generateStatistics();
    lines.push('--- ESTATÍSTICAS ---');
    Object.entries(stats.resultFrequency).forEach(([result, count]) => {
      const percentage = ((count / spinHistory.length) * 100).toFixed(1);
      lines.push(`${result}: ${count} vezes (${percentage}%)`);
    });

    return lines.join('\n');
  };

  // Gerar estatísticas
  const generateStatistics = () => {
    const resultFrequency: Record<string, number> = {};
    
    spinHistory.forEach(spin => {
      resultFrequency[spin.result] = (resultFrequency[spin.result] || 0) + 1;
    });

    const mostFrequent = Object.entries(resultFrequency)
      .sort(([,a], [,b]) => b - a)[0];

    return {
      totalSpins: spinHistory.length,
      resultFrequency,
      mostFrequentResult: mostFrequent ? {
        result: mostFrequent[0],
        count: mostFrequent[1],
        percentage: ((mostFrequent[1] / spinHistory.length) * 100).toFixed(1)
      } : null,
      uniqueResults: Object.keys(resultFrequency).length
    };
  };

  // Função para importar configuração
  const importWheelConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const config = JSON.parse(content);
        
        if (config.items && Array.isArray(config.items)) {
          // Aqui você pode implementar a lógica para carregar a configuração
          console.log('Configuração importada:', config);
          // onImportConfig?.(config);
        }
      } catch (error) {
        console.error('Erro ao importar configuração:', error);
        alert('Erro ao importar arquivo. Verifique se é um arquivo JSON válido.');
      }
    };
    reader.readAsText(file);
  };

  const stats = generateStatistics();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Exportar & Importar Dados</h3>
          <p className="text-gray-600">Salve ou carregue configurações e histórico</p>
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{stats.totalSpins}</div>
          <div className="text-sm text-blue-800">Total de Giros</div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{stats.uniqueResults}</div>
          <div className="text-sm text-green-800">Resultados Únicos</div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{items.length}</div>
          <div className="text-sm text-purple-800">Itens na Roda</div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {stats.mostFrequentResult?.percentage || '0'}%
          </div>
          <div className="text-sm text-orange-800">Mais Frequente</div>
        </div>
      </div>

      {/* Seção de Exportação */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
          Exportar Dados
        </h4>

        {/* Formato de Exportação */}
        <div className="flex gap-2 mb-4">
          {(['csv', 'json', 'txt'] as const).map((format) => (
            <button
              key={format}
              onClick={() => setExportFormat(format)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                exportFormat === format
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {format.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Botões de Exportação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={exportSpinHistory}
            disabled={isExporting || spinHistory.length === 0}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isExporting ? (
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            )}
            Exportar Histórico ({spinHistory.length} giros)
          </button>

          <button
            onClick={exportWheelConfig}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Exportar Configuração
          </button>
        </div>
      </div>

      {/* Seção de Importação */}
      <div className="space-y-4 border-t pt-6">
        <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Importar Configuração
        </h4>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept=".json"
            onChange={importWheelConfig}
            className="hidden"
            id="import-config"
          />
          <label
            htmlFor="import-config"
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <div className="text-lg font-medium text-gray-700">
              Clique para importar configuração
            </div>
            <div className="text-sm text-gray-500">
              Arquivo JSON com configuração da roda
            </div>
          </label>
        </div>
      </div>

      {/* Resultado Mais Frequente */}
      {stats.mostFrequentResult && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
          <h5 className="font-semibold text-yellow-800 mb-2">🏆 Resultado Mais Frequente</h5>
          <div className="text-lg font-bold text-yellow-900">
            "{stats.mostFrequentResult.result}"
          </div>
          <div className="text-sm text-yellow-700">
            {stats.mostFrequentResult.count} vezes ({stats.mostFrequentResult.percentage}% dos giros)
          </div>
        </div>
      )}
    </div>
  );
};