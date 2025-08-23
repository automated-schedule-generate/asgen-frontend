<template>
	<tr
		v-for="(col, rowIndex) in timetable"
		:key="'row-' + rowIndex"
		:ref="(el) => setLinhaRef(el, rowIndex)"
	>
		<!-- coluna fixa: não pode arrastar -->
		<td class="fixed-cell">
			{{ scheduleMorning[rowIndex] }}
		</td>

		<td
			v-for="(subject, colIndex) in col"
			:key="subject?.id ?? `subject-${rowIndex}-${colIndex}`"
		>
			{{ typeof subject === 'string' ? subject : (subject?.name ?? 'vazio') }}
		</td>
	</tr>
</template>

<script setup lang="ts">
import type { TimetableType } from '~/types/timetable';
import Sortable from 'sortablejs';

const scheduleMorning = ref([
	'07:00 ~ 07:44',
	'07:45 ~ 08:29',
	'08:30 ~ 09:14',
	'09:15 ~ 10:00',
	'10:20 ~ 11:04',
	'11:05 ~ 11:50',
]);

const props = defineProps({
	timetable: {
		required: true,
		type: Array as PropType<TimetableType>,
	},
});
const emit = defineEmits(['update:timetable']);

const timetable = computed({
	get: (): TimetableType => props.timetable,
	set: (value: TimetableType) => emit('update:timetable', value),
});

const rowRefs = ref<(HTMLElement | null)[]>([]);
const sortables: Sortable[] = [];

function setLinhaRef(el: HTMLElement | null, index: number) {
	rowRefs.value[index] = el;
}

onMounted(() => {
	for (let i = 0; i < rowRefs.value.length; i++) {
		const rowEl = rowRefs.value[i];
		if (!rowEl) continue;

		const s = Sortable.create(rowEl, {
			group: 'matriz',
			animation: 150,
			filter: '.fixed-cell',
			preventOnFilter: false,
			onEnd: (evt) => {
				const { from, to, oldIndex, newIndex } = evt;
				if (oldIndex == null || newIndex == null) return;

				const fromRowIndex = rowRefs.value.indexOf(from as HTMLElement);
				const toRowIndex = rowRefs.value.indexOf(to as HTMLElement);
				if (fromRowIndex < 0 || toRowIndex < 0) return;

				const realOldIndex = oldIndex - 1;
				const realNewIndex = newIndex - 1;

				if (realOldIndex < 0 || realNewIndex < 0) return;

				if (fromRowIndex === toRowIndex) {
					const row = timetable.value[fromRowIndex];
					const [moved] = row.splice(realOldIndex, 1);
					row.splice(realNewIndex, 0, moved);
				} else {
					const fromRow = timetable.value[fromRowIndex];
					const toRow = timetable.value[toRowIndex];

					const [moved] = fromRow.splice(realOldIndex, 1);
					const targetIndex = Math.min(realNewIndex, toRow.length - 1);
					const [replaced] = toRow.splice(targetIndex, 1, moved);
					fromRow.splice(realOldIndex, 0, replaced);
				}
				console.log(
					'Matriz atualizada:',
					timetable.value.map((r) => r.map((c) => c?.name)),
				);
			},
		});
		sortables.push(s);
	}
});

onBeforeUnmount(() => {
	sortables.forEach((s) => s.destroy());
});
</script>

<style scoped>
td {
	border: 1px #0d47a1 solid;
	cursor: pointer;
	text-align: center;
}
.fixed-cell {
	background: #eee;
	cursor: default;
	width: 100px;
	height: 100px;
	padding: 2rem;
}
</style>
