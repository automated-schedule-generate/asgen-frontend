import { defineStore } from 'pinia';

export default defineStore('user', () => {
	const user = ref({
		name: '',
		email: '',
		id: 0,
	});
	const permiss = ref({
		isDen: false,
		isCradt: false,
		isTeacher: false,
		isCoordinator: false,
	});
	async function getPermiss() {
		const { $axios } = useNuxtApp();
		const { data } = await $axios.get('api/users/user_type');

		permiss.value = {
			isDen: false,
			isCradt: false,
			isTeacher: false,
			isCoordinator: false,
		};
		if (data.authorization && data.authorization.length > 0) {
			for (const authorization of data.authorization) {
				if (authorization === 'user-den') {
					permiss.value.isDen = true;
				} else if (authorization === 'user-cradt') {
					permiss.value.isCradt = true;
				} else if (authorization === 'user-teacher') {
					permiss.value.isTeacher = true;
				}
			}

			console.log(permiss.value);
		}
	}
	function resetDatas() {
		user.value.name = '';
		user.value.email = '';
		user.value.id = 0;
	}

	return { user, resetDatas, permiss, getPermiss };
});
