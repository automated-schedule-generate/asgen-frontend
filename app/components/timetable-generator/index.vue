<template>
	<ul>
		<li
			v-for="(course, index) in coursesModel"
			:key="'nav-' + index"
		>
			<a :href="'#' + course.name">
				<span>{{ course.name }}</span>
			</a>
		</li>
	</ul>
	<template
		v-for="(course, index) in coursesModel"
		:key="'course-' + index"
	>
		<h2
			class="mt-10"
			:id="course.name"
		>
			{{ course.name }}
		</h2>
		<TimetableGeneratorOfCourse v-model:course="coursesModel[index]" />
	</template>
</template>

<script setup lang="ts">
//loading courses
import type { CourseType } from '~/types/course';
// import type { TimetableType } from '~/types/timetable';

const props = defineProps({
	courses: {
		required: true,
		type: Array as PropType<CourseType[]>,
	},
});
const emit = defineEmits(['update:courses']);

const coursesModel = computed({
	get: () => props.courses,
	set: (value: CourseType[]) => emit('update:courses', value),
});
// const emptyTimetable: TimetableType = [
// 	['1', undefined, '3', '4', '5'],
// 	['1', undefined, '3', '4', '5'],
// 	['1', undefined, '3', '4', '5'],
// 	['1', '2', '3', '4', undefined],
// 	['1', '2', '3', '4', undefined],
// 	['1', '2', '3', '4', undefined],
// ];

// const courses = ref<CourseType[]>([
// 	{
// 		name: 'ADM',
// 		timetables: [emptyTimetable],
// 	},
// 	{
// 		name: 'TSI',
// 		timetables: [emptyTimetable],
// 	},
// 	{
// 		name: 'IPI',
// 		timetables: [emptyTimetable],
// 	},
// 	{
// 		name: 'LOG',
// 		timetables: [emptyTimetable],
// 	},
// 	{
// 		name: 'TGQ',
// 		timetables: [emptyTimetable],
// 	},
// ]);
</script>

<style scoped lang="scss">
Vtable {
	border-radius: 50%;
}
</style>
