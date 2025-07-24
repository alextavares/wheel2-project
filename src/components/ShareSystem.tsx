'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { WheelItem } from '@/types/wheel';

interface ShareSystemProps {
  items: WheelItem[];
  wheelTitle: string;
  onClose: () => void;
}

export const ShareSystem: React.FC<ShareSystemProps> = ({ 
  items, 
  wheelTitle, 
  onClose 
}) => {
  const [shareUrl, setShareUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareMethod, setShareMethod] = useState<'url' | 'embed' | 'qr' | 'social'>('url');

  // Gerar URL de compartilhamento
  const generateShareUrl = useCallback(async () => {
    setIsGenerating(true);
    
    try {
      // Criar dados da roda para compartilhamento
      const wheelData = {
        title: wheelTitle,
        items: items.map(item => ({
          label: item.label,
          color: item.color,
          weight: item.weight || 1
        })),
        timestamp: Date.now()
      };

      // Comprimir dados usando base64
      const dataString = JSON.stringify(wheelData);
      const encodedData = btoa(encodeURIComponent(dataString));
      
      // Gerar URL
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const url = `${baseUrl}?shared=${encodedData}`;
      
      setShareUrl(url);
      
      // Gerar QR Code usando API pública com fallback
      try {
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
        
        // Testar se a imagem carrega
        const img = new Image();
        img.onload = () => setQrCodeUrl(qrUrl);
        img.onerror = () => {
          // Fallback para outra API de QR Code
          const fallbackUrl = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(url)}`;
          setQrCodeUrl(fallbackUrl);
        };
        img.src = qrUrl;
      } catch (error) {
        console.error('Erro ao gerar QR Code:', error);
        // Usar API alternativa como fallback
        const fallbackUrl = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(url)}`;
        setQrCodeUrl(fallbackUrl);
      }
      
    } catch (error) {
      console.error('Erro ao gerar URL de compartilhamento:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [items, wheelTitle]);

  useEffect(() => {
    generateShareUrl();
  }, [generateShareUrl]);

  // Copiar para clipboard
  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } else {
        // Fallback para navegadores mais antigos ou contextos não seguros
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        } else {
          throw new Error('Falha ao copiar usando fallback');
        }
      }
    } catch (error) {
      console.error('Erro ao copiar para área de transferência:', error);
      // Mostrar erro para o usuário
      alert('Erro ao copiar para área de transferência. Tente selecionar e copiar manualmente.');
    }
  };

  // Gerar código de embed
  const generateEmbedCode = () => {
    const embedCode = `<iframe 
  src="${shareUrl}&embed=true" 
  width="600" 
  height="600" 
  frameborder="0" 
  title="${wheelTitle}">
</iframe>`;
    return embedCode;
  };

  // Compartilhar em redes sociais
  const shareToSocial = (platform: string) => {
    try {
      if (!shareUrl) {
        alert('URL de compartilhamento ainda não foi gerada. Aguarde um momento.');
        return;
      }

      const text = `Confira esta roda de decisões: "${wheelTitle}"`;
      const url = shareUrl;
      
      let shareLink = '';
      
      switch (platform) {
        case 'twitter':
          shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
          break;
        case 'facebook':
          shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
          break;
        case 'linkedin':
          shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
          break;
        case 'whatsapp':
          shareLink = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
          break;
        case 'telegram':
          shareLink = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
          break;
        default:
          alert('Plataforma de compartilhamento não suportada.');
          return;
      }
      
      if (shareLink) {
        // Tentar usar navigator.share primeiro (para dispositivos móveis)
        if (navigator.share && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          navigator.share({
            title: wheelTitle,
            text: text,
            url: url
          }).catch(() => {
            // Fallback para abrir em nova janela
            window.open(shareLink, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
          });
        } else {
          // Abrir em nova janela para desktop
          const popup = window.open(shareLink, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
          if (!popup) {
            alert('Pop-up bloqueado. Por favor, permita pop-ups para este site ou copie o link manualmente.');
          }
        }
      }
    } catch (error) {
      console.error('Erro ao compartilhar em rede social:', error);
      alert('Erro ao abrir compartilhamento. Tente copiar o link manualmente.');
    }
  };

  // Baixar QR Code
  const downloadQRCode = async () => {
    try {
      if (!qrCodeUrl) {
        alert('QR Code ainda não foi gerado. Aguarde um momento.');
        return;
      }

      // Tentar download direto primeiro
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = `qr-code-${wheelTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
      link.target = '_blank';
      
      // Para alguns navegadores, precisamos adicionar o link ao DOM
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Erro ao baixar QR Code:', error);
      // Fallback: abrir em nova aba
      try {
        window.open(qrCodeUrl, '_blank');
      } catch (fallbackError) {
        alert('Não foi possível baixar o QR Code automaticamente. Clique com o botão direito na imagem e selecione "Salvar imagem como..."');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Compartilhar Roda</h2>
                <p className="opacity-90">&quot;{wheelTitle}&quot;</p>
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
          {/* Métodos de Compartilhamento */}
          <div className="mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { value: 'url', label: 'Link', icon: '🔗' },
                { value: 'embed', label: 'Embed', icon: '📋' },
                { value: 'qr', label: 'QR Code', icon: '📱' },
                { value: 'social', label: 'Redes Sociais', icon: '📢' }
              ].map((method) => (
                <button
                  key={method.value}
                  onClick={() => setShareMethod(method.value as typeof shareMethod)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg font-medium transition-all ${
                    shareMethod === method.value
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{method.icon}</span>
                  {method.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conteúdo baseado no método selecionado */}
          {shareMethod === 'url' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link de Compartilhamento
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(shareUrl)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      copySuccess
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {copySuccess ? '✓' : '📋'}
                  </button>
                </div>
                {copySuccess && (
                  <p className="text-sm text-green-600 mt-2">Link copiado!</p>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">ℹ️ Como funciona:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• O link contém todos os dados da sua roda</li>
                  <li>• Qualquer pessoa pode acessar e usar a roda</li>
                  <li>• Os dados ficam salvos na URL (não em servidor)</li>
                  <li>• Funciona offline após o primeiro carregamento</li>
                </ul>
              </div>
            </div>
          )}

          {shareMethod === 'embed' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código de Incorporação
                </label>
                <textarea
                  value={generateEmbedCode()}
                  readOnly
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg bg-gray-50 text-sm font-mono resize-none"
                />
                <button
                  onClick={() => copyToClipboard(generateEmbedCode())}
                  className={`mt-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    copySuccess
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {copySuccess ? 'Copiado!' : 'Copiar Código'}
                </button>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 mb-2">🔧 Personalização:</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Altere width e height para ajustar o tamanho</li>
                  <li>• Adicione &theme=dark na URL para tema escuro</li>
                  <li>• Use &autoplay=true para giro automático</li>
                  <li>• Adicione &hidecontrols=true para ocultar controles</li>
                </ul>
              </div>
            </div>
          )}

          {shareMethod === 'qr' && (
            <div className="space-y-4">
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  QR Code para Compartilhamento
                </label>
                {isGenerating ? (
                  <div className="flex items-center justify-center h-48">
                    <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full" />
                  </div>
                ) : (
                  <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg shadow-lg">
                    <img
                      src={qrCodeUrl}
                      alt="QR Code"
                      className="w-48 h-48 mx-auto"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={downloadQRCode}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-lg font-medium transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Baixar QR Code
                </button>
                <button
                  onClick={() => copyToClipboard(shareUrl)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    copySuccess
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  📋 {copySuccess ? 'Copiado!' : 'Copiar Link'}
                </button>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2">📱 Como usar:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Escaneie com a câmera do celular</li>
                  <li>• Use qualquer app leitor de QR Code</li>
                  <li>• Perfeito para apresentações e eventos</li>
                  <li>• Compartilhe em materiais impressos</li>
                </ul>
              </div>
            </div>
          )}

          {shareMethod === 'social' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Compartilhar em Redes Sociais
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { platform: 'whatsapp', name: 'WhatsApp', color: 'bg-green-500', icon: '💬' },
                    { platform: 'twitter', name: 'Twitter', color: 'bg-blue-400', icon: '🐦' },
                    { platform: 'facebook', name: 'Facebook', color: 'bg-blue-600', icon: '📘' },
                    { platform: 'linkedin', name: 'LinkedIn', color: 'bg-blue-700', icon: '💼' },
                    { platform: 'telegram', name: 'Telegram', color: 'bg-blue-500', icon: '✈️' }
                  ].map((social) => (
                    <button
                      key={social.platform}
                      onClick={() => shareToSocial(social.platform)}
                      className={`flex items-center justify-center gap-2 p-4 ${social.color} hover:opacity-90 text-white rounded-lg font-medium transition-all`}
                    >
                      <span className="text-xl">{social.icon}</span>
                      {social.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 mb-2">📢 Dicas de Compartilhamento:</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Adicione uma descrição explicando o propósito da roda</li>
                  <li>• Mencione quantos itens tem na roda</li>
                  <li>• Use hashtags relevantes (#decisao #sorteio #roda)</li>
                  <li>• Convide pessoas para participar</li>
                </ul>
              </div>

              {/* Preview da mensagem */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2">📝 Preview da Mensagem:</h4>
                <div className="bg-white p-3 rounded border text-sm">
                  <p className="font-medium">Confira esta roda de decisões: &quot;{wheelTitle}&quot;</p>
                  <p className="text-gray-600 mt-1">
                    {items.length} opções • Clique para girar e descobrir o resultado!
                  </p>
                  <p className="text-blue-600 mt-2 break-all">{shareUrl}</p>
                </div>
              </div>
            </div>
          )}

          {/* Estatísticas da Roda */}
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3">📊 Informações da Roda:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{items.length}</div>
                <div className="text-sm text-gray-600">Itens</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {new Set(items.map(item => item.color)).size}
                </div>
                <div className="text-sm text-gray-600">Cores</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(shareUrl.length / 1024 * 10) / 10}KB
                </div>
                <div className="text-sm text-gray-600">Tamanho</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {wheelTitle.length}
                </div>
                <div className="text-sm text-gray-600">Caracteres</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};