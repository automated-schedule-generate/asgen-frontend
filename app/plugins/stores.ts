import useUserStore from '~/stores/use-user-store';

export default defineNuxtPlugin(() => {
	return {
		provide: {
			userStore: useUserStore(),
		},
	};
});
