<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
import userService from '~/services/userService';

const token = useCookie('token');
if (token.value) {
	const { $axios } = useNuxtApp();
	$axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.value;
}

onBeforeMount(() => {
	const { $axios, $userStore } = useNuxtApp();

	$axios.get('/sanctum/csrf-cookie');
	if (token.value) {
		userService.me();
		$userStore.getPermiss();
	}
});
</script>
<style></style>
