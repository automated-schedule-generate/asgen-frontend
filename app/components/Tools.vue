<template>
	<v-container class="text-end">
		<v-menu :location="location">
			<template
				v-slot:activator="{ props }"
				class="ma-0"
			>
				<v-btn
					color="primary"
					class="rounded-circle"
					style="height: 80px; width: 80px; min-width: 80px; padding: 0"
					v-bind="props"
				>
					<v-icon
						icon="mdi-plus"
						size="x-large"
					/>
				</v-btn>
			</template>

			<v-list>
				<v-list-item
					v-for="(item, index) in items"
					:key="index"
					:value="index"
				>
					<v-list-item-title @click="navigateTo(item.to)">{{
						item.title
					}}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const location = ref('top center');

const items = [
	{ title: 'Adicionar Curso', to: '/courses/create' },
	{ title: 'Adicionar Matéria', to: '/subjects/create' },
	{ title: 'Adicionar Turma', to: '/classes/create'},
];
const locations = ['top', 'bottom', 'start', 'end', 'center'];
</script>

<style scopped lang="scss"></style>
