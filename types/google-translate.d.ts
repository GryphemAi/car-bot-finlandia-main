interface Window {
  google: {
    translate: {
      TranslateElement: {
        new (options: {
          pageLanguage: string;
          includedLanguages: string;
          layout: any;
        }, element: string): void;
        InlineLayout: {
          SIMPLE: any;
        };
      };
    };
  };
  googleTranslateElementInit: () => void;
}
