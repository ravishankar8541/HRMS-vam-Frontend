const fallback = 'https://backend.hrms.viraladsmedia.com/api';

const configured = (import.meta.env.VITE_API_URL || fallback).replace(/\/+$/, '');

export const getApiUrl = () => configured;
export const getServerBase = () => configured.replace(/\/api$/, '');
