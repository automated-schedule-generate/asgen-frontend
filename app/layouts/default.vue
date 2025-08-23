<template>
	<v-app>
		<AppHeader />
		<v-card
			v-if="useCookie('token').value"
			color="primary"
			width="200"
		>
			<v-navigation-drawer
				color="primary"
				expand-on-hover
				permanent
				dark
				rail
				v-model="drawer"
			>
				<v-list class="menu-height bg-primary">
					<v-list-item
						prepend-icon="mdi-home"
						title="Home"
						@click="navigateTo('/dashboard')"
						class="bg-primary"
					>
					</v-list-item>
					<v-list-item
						prepend-icon="mdi-table"
						title="Horários"
						@click="navigateTo('timetable-generator')"
						class="bg-primary"
					>
					</v-list-item>
					<v-list-item
						v-if="$userStore?.permiss.isDen"
						prepend-icon="mdi-shield-crown"
						title="Gerenciamento"
						class="bg-primary"
						@click="navigateTo('/adm/gestao-de-funcoes')"
					>
					</v-list-item>
					<v-list-item
						v-if="$userStore?.permiss.isTeacher || $userStore?.permiss.isCoordinator"
						prepend-icon="mdi-account-cog"
						title="Preferências"
						class="bg-primary"
						@click="navigateTo('/teachers/preferences-form')"
					>
					</v-list-item>
				</v-list>
			</v-navigation-drawer>
		</v-card>
		<v-main app>
			<slot />
		</v-main>
		<div
			class="tools-container"
			v-if="$userStore?.permiss.isDen"
		>
			<Tools />
		</div>
	</v-app>
</template>

<script setup lang="ts">
const { $userStore } = useNuxtApp();
const drawer = ref(true);

console.log($userStore);
</script>
<style scoped lang="scss">
main {
	margin: 5rem auto;
	width: 70vw;
	overflow-y: auto;
}
.menu-height {
	z-index: 20000 !important;
	top: 7vh;
}
.tools-container {
	position: fixed;
	right: 4vw;
	bottom: 5vh;
}
</style>
