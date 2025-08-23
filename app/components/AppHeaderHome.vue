<template>
	<v-app-bar
		color="primary"
		class="elevation-0"
	>
		<img
			src="~/assets/logo-asgen.svg"
			alt="Logo da Asgen"
			style="cursor: pointer"
			width="278px"
			height="48px"
			@click="navigateTo('/')"
		/>
		<AuthCard />
	</v-app-bar>
</template>
