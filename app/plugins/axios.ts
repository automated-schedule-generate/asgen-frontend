import axios, { type AxiosInstance } from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
	const api: AxiosInstance = axios.create({
		baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000',
		withCredentials: false,
		withXSRFToken: true,
	});

	return {
		provide: {
			axios: api,
		},
	};
});
