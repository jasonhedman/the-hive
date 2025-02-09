if (typeof window !== 'undefined') {
    const originalError = console.error;
    console.error = (...args) => {
      if (
        args[0]?.includes?.('WalletConnectionError: Connection rejected') ||
        args[0]?.message?.includes?.('Connection rejected') ||
        (typeof args[0] === 'object' && args[0]?.toString?.()?.includes?.('Connection rejected'))
      ) {
        return;
      }
      originalError.apply(console, args);
    };
  }
  
  export {};