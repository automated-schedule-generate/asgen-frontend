<template>
	<v-form @submit.prevent="submit">
		<v-btn type="submit">Gerar grade de horários</v-btn>
	</v-form>
	<p v-show="isStarted">
		<strong>Carregando: </strong>
		<span>{{ progress.toFixed(2) }}%</span>
	</p>
	<section>
		<div>
			<h6>Carregar grade de horários temporaria:</h6>
			<v-btn @click="loadTemporaryTimetable">Carregar</v-btn>
		</div>
	</section>
	<TimetableGenerator
		v-if="courses.length > 0"
		v-model:courses="courses"
	/>
	<div v-else>
		<p>Nenhuma grade de horários carregada</p>
	</div>
</template>

<script setup lang="ts">
import timetableGeneratorService from '~/services/timetableGeneratorService';
import type { CourseType } from '~/types/course';

const { $socket } = useNuxtApp();
const progress = ref<number>(0);
const isStarted = ref<boolean>(false);
const courses = ref<CourseType[]>([]);
await loadTemporaryTimetable();

onMounted(() => {
	$socket.on('progress', (data) => {
		if (data.progress && typeof data.progress === 'number') {
			progress.value = data.progress;
			if (data.progress >= 100) {
				loadTemporaryTimetable();
			}
		}
	});
	$socket.emit('progress');
});

async function submit() {
	isStarted.value = true;
	try {
		const { data } = await timetableGeneratorService.start();
		console.log(data);
	} catch (e) {
		console.log(e);
	}
}

async function loadTemporaryTimetable() {
	try {
		const data = await timetableGeneratorService.getTemporaryTimetable();
		console.log(data);
		courses.value = data;
	} catch (e) {
		console.log(e);
	}
}
</script>

<style scoped></style>
