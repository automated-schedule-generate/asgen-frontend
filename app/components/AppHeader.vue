<template>
	<VAppBar
		class="header elevation-0"
		v-if="$userStore?.user.id"
		style="height: 5rem"
		color="primary"
	>
		<!-- Container da logo -->
		<v-container
			d-flex
			justify-start
		>
			<img
				src="~/assets/logo-asgen.svg"
				alt="Logo da Asgen"
				style="cursor: pointer"
				width="278px"
				height="48px"
				@click="navigateTo('/dashboard')"
			/>
		</v-container>
		<!-- Container do usuário -->
		<v-container class="text-center mr-8 d-flex justify-end">
			<v-menu
				:location="location"
				v-model="isOpen"
				class="ml-auto mr-0"
			>
				<template v-slot:activator="{ props }">
					<v-btn
						color="surface"
						variant="outlined"
						prepend-icon="mdi-account"
						:append-icon="!isOpen ? 'mdi-chevron-down' : 'mdi-chevron-up'"
						v-bind="props"
					>
						{{ $userStore.user.name }}
					</v-btn>
				</template>

				<v-list>
					<v-list-item
						v-for="(item, index) in items"
						:key="index"
						:value="index"
						:append-icon="item.icon"
						@click="item.action"
					>
						<v-list-item-title class="ma-0 pa-0">{{ item.title }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-container>
	</VAppBar>
</template>
<script setup lang="ts">
import authService from '~/services/authService';
const { $userStore } = useNuxtApp();
const isOpen = ref(false);

async function logout() {
	authService.logout();
	$userStore!.resetDatas();
	navigateTo('/');
}
const location = ref('bottom center');

const items = [{ title: 'Sair da conta', icon: 'mdi-logout', action: logout }];
</script>
<style scoped>
header {
	display: flex;
	flex-direction: row;
	padding: 0.6em;
}
</style>
