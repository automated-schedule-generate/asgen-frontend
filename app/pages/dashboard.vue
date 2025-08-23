<template>
	<h1>Olá, {{ upercaseFirstLetter($userStore.user.name) }}!</h1>
	<v-container>
    <!--
    <v-tabs v-model="tab" bg-color="surface" grow>
			<v-tab> Turmas </v-tab>
			<v-tab> Materias </v-tab>
			<v-tab> Cursos </v-tab>
		</v-tabs>

		<v-tabs-window v-model="tab">
      <v-tabs-window-item value="home">
        <p>oi</p>
      </v-tabs-window-item>
      <v-tabs-window-item value="about">
        <p>ola</p>
      </v-tabs-window-item>
      <v-tabs-window-item value="contact">
        <p>hello</p>
      </v-tabs-window-item>
    </v-tabs-window>
    -->
	</v-container>
</template>
<script setup lang="ts">
const tab = ref('home')
const { $userStore } = useNuxtApp();

function upercaseFirstLetter(text: string) {
	return text.charAt(0).toUpperCase() + text.slice(1);
}
</script>
<style scoped lang="scss"></style>
