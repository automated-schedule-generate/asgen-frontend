import { io } from 'socket.io-client';
import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
	const uri = import.meta.env.VITE_MICROSERVICE_URL ?? 'http://localhost:9000';
	const socket = io(uri);
	const api = axios.create({
		baseURL: uri,
		withCredentials: false,
		withXSRFToken: true,
	});
	nuxtApp.vueApp.config.globalProperties.$socket = socket;
	nuxtApp.vueApp.config.globalProperties.$microserviceAPI = api;
	return {
		provide: {
			socket,
			microserviceAPI: api,
		},
	};
});
