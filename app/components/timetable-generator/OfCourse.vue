<template>
	<template
		v-for="(semester, index) in timetables"
		:key="'semester-' + index"
	>
		<h4>Semestre - {{ index + 1 }}</h4>
		<v-table
			density="comfortable"
			striped="even"
		>
			<thead>
				<tr>
					<th class="text-center">horarios</th>
					<th class="text-center">Segunda-feira</th>
					<th class="text-center">Terça-feira</th>
					<th class="text-center">Quarta-feira</th>
					<th class="text-center">Quinta-feira</th>
					<th class="text-center">Sexta-feira</th>
				</tr>
			</thead>
			<tbody>
				<TimetableGeneratorOfSemester v-model:timetable="timetables[index]" />
			</tbody>
		</v-table>
		<div class="mb-16" />
	</template>
</template>

<script setup lang="ts">
//loading timetable
import type { CourseType } from '~/types/course';
import type { TimetableType } from '~/types/timetable';

const props = defineProps({
	course: {
		required: true,
		type: Object as PropType<CourseType>,
	},
});
const emit = defineEmits(['update:course']);

const timetables = computed({
	get: (): TimetableType[] => props.course.timetables ?? [],
	set: (value: TimetableType[]) => emit('update:course', value),
});
</script>

<style scoped lang="scss">
tr {
	border: 1px #0d47a1 solid;
	cursor: pointer;
}
thead {
	background-color: #0d47a1;
	color: white;
	border-color: white;
}
</style>
