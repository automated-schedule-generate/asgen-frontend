<template>
	<v-app>
		<v-app-bar class="elevation-0">
			<img
				src="/assets/logo-asgen.svg"
				alt="Logo da Asgen"
				style="cursor: pointer"
				width="278px"
				height="48px"
				@click="navigateTo('/')"
			/>
			<AuthComponent />
		</v-app-bar>
		<v-main>
			<slot />
		</v-main>
	</v-app>
</template>
<style scoped lang="scss">
main {
	width: 100vw;
	background: linear-gradient(
		153deg,
		#01122c 3%,
		#072a62 50%,
		rgba(13, 71, 161, 1) 100%
	) !important;
	background-repeat: no-repeat;
	background-size: cover;
	min-height: 100%;
	@media (max-width: 576px) {
		margin: 8rem auto 0 auto;
		width: 90vw;
	}
}
</style>
