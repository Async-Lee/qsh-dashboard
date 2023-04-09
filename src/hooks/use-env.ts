export default () => {
  const { VITE_APP_NAME, VITE_BASE_API, VITE_PUBLIC_PATH, MODE } = import.meta.env;

  return {
    MODE,
    VITE_APP_NAME,
    VITE_BASE_API,
    VITE_PUBLIC_PATH,
  };
}
