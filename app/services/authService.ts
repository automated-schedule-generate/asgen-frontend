import userService from './userService';

export default new (class AuthService {
	async register(
		name: string,
		email: string,
		registration: string,
		cpf: string,
		password: string,
	) {
		const { $axios } = useNuxtApp();
		const { data } = await $axios.post('/api/users/register', {
			name,
			email,
			registration,
			cpf,
			password,
		});
		this.#setToken(data.token);
	}
	async login(email: string, password: string) {
		const { $axios } = useNuxtApp();
		const { data } = await $axios.post('/api/users/login', {
			email,
			password,
		});
		this.#setToken(data.token);
	}
	async logout() {
		const { $axios } = useNuxtApp();
		const { data } = await $axios.post('api/users/logout');
		delete $axios.defaults.headers.common['Authorization'];

		const token = useCookie('token');
		token.value = null;
	}
	async #setToken(value: string) {
		// # função privada do javascript
		const { $axios, $userStore } = useNuxtApp();
		const token = useCookie('token');
		token.value = value;

		$axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.value;
		userService.me();
		$userStore.getPermiss();
	}
})();
