const configured = (
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000/api'
).replace(/\/+$/, '');

export const getApiUrl = () => configured;
export const getServerBase = () => configured.replace(/\/api$/, '');
