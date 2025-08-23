export default new (class {
	async me() {
		const { $axios, $userStore } = useNuxtApp();
		const { data } = await $axios.get('api/users');
		$userStore.user.name = data.name;
		$userStore.user.email = data.email;
		$userStore.user.id = data.id;
	}
})();
