<template>
	<CourseTimetableRender :course="data" />
</template>

<script setup lang="ts">
import coursesService from '~/services/coursesService';

const { course: id } = useRoute().params;

const { data } = await useAsyncData(
	`course-${id}-timetable`,
	() => coursesService.getTimetables(id),
	{
		default: () => ({
			name: '',
			total_semesters: 0,
			course_subjects: [],
			classes: [],
			timetables: [],
		}),
	},
);
</script>

<style scoped></style>
