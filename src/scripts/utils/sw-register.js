const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service worker registered successfully');
      return registration;
    } catch (error) {
      console.log('Service worker registration failed', error);
    }
  }
};

export default swRegister;
