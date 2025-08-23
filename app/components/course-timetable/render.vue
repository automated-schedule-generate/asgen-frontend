<template>
	<h1>{{ course.name }}</h1>
	<template
		v-for="(classroom, index) in props.course.classes"
		:key="'classroom-' + index"
	>
		<h4>turma - {{ index + 1 }}</h4>
		<p>Turno: {{ classroom.turn }}</p>
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
				<tr
					v-for="(timetable, index) in classroom.timetables"
					:key="'timetable-' + index"
				>
					<td class="schedule">
						{{ schedule[`${classroom.turn}`][index] }}
					</td>
					<td
						v-for="(subject, col) in 5"
						:key="'subject-' + col"
					>
						<span>{{ timetable[col] ? timetable[col].name : 'vazio' }}</span>
					</td>
				</tr>
			</tbody>
		</v-table>
	</template>
</template>

<script setup lang="ts">
import type { CourseType } from '~/types/course';

const props = defineProps({
	course: {
		required: true,
		type: Object as PropType<CourseType>,
	},
});

const schedule = ref({
	matutino: [
		'07:00 ~ 07:44',
		'07:45 ~ 08:29',
		'08:30 ~ 09:14',
		'09:15 ~ 10:00',
		'10:20 ~ 11:04',
		'11:05 ~ 11:50',
	],
	vespertino: [
		'12:50 ~ 13:34',
		'13:35 ~ 14:19',
		'14:20 ~ 15:55',
		'15:25 ~ 16:09',
		'16:10 ~ 16:54',
		'16:55 ~ 17:40',
	],
});
</script>

<style scoped>
tr {
	border: 1px #0d47a1 solid;
	cursor: pointer;
}
thead {
	background-color: #0d47a1;
	color: white;
	border-color: white;
}
td {
	border: 1px #0d47a1 solid;
	cursor: pointer;
	text-align: center;
}
.schedule {
	background: #eee;
	cursor: default;
	width: 100px;
	height: 100px;
	padding: 2rem;
}
</style>
