'use client';

import { useEffect } from 'react';

export function TranslationPersist() {
  useEffect(() => {
    // Função para restaurar a tradução
    const restoreTranslation = () => {
      const savedLang = localStorage.getItem('selected_language');
      if (!savedLang || savedLang === 'en') return;

      // Aguarda o Google Translate carregar
      const checkForGoogle = setInterval(() => {
        if (window.google && window.google.translate) {
          clearInterval(checkForGoogle);
          
          // Tenta encontrar e acionar o seletor
          const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
          if (select) {
            select.value = savedLang;
            select.dispatchEvent(new Event('change'));
          }
        }
      }, 100);

      // Limpa o intervalo após 5 segundos para evitar loops infinitos
      setTimeout(() => clearInterval(checkForGoogle), 5000);
    };

    // Restaura a tradução quando a página carrega
    restoreTranslation();

    // Observa mudanças na URL para restaurar a tradução após navegação
    const handleRouteChange = () => {
      setTimeout(restoreTranslation, 100);
    };

    window.addEventListener('popstate', handleRouteChange);
    
    // Limpa o event listener
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []); // Remove a dependência do pathname

  return null;
}
