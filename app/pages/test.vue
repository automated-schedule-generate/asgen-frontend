<template>
	<div class="grid">
		<div
			v-for="(linha, linhaIndex) in matriz"
			:key="'row-' + linhaIndex"
			class="linha"
			:ref="(el) => setLinhaRef(el, linhaIndex)"
		>
			<div
				v-for="(cell, colIndex) in linha"
				:key="cell?.id ?? colIndex"
				class="item"
			>
				{{ cell?.name ?? 'vazio' }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Sortable from 'sortablejs';
import type { SubjectType } from '~/types/subject';

const matriz = ref<(SubjectType | null)[][]>([
	[
		{ id: 1, name: 'A' },
		{ id: 2, name: 'B' },
		{ id: 3, name: 'C' },
	],
	[{ id: 4, name: 'D' }, { id: 5, name: 'E' }, null],
	[
		{ id: 7, name: 'F' },
		{ id: 8, name: 'G' },
		{ id: 9, name: 'H' },
	],
]);

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
			onEnd: async (evt) => {
				const { from, to, oldIndex, newIndex } = evt;
				if (oldIndex == null || newIndex == null) return;

				const fromRowIndex = rowRefs.value.indexOf(from as HTMLElement);
				const toRowIndex = rowRefs.value.indexOf(to as HTMLElement);
				if (fromRowIndex < 0 || toRowIndex < 0) return;

				if (fromRowIndex === toRowIndex) {
					const row = matriz.value[fromRowIndex];
					const [moved] = row.splice(oldIndex, 1);
					row.splice(newIndex, 0, moved);
				} else {
					const fromRow = matriz.value[fromRowIndex];
					const toRow = matriz.value[toRowIndex];

					const [moved] = fromRow.splice(oldIndex, 1);

					const targetIndex = Math.min(newIndex, toRow.length - 1);

					const [replaced] = toRow.splice(targetIndex, 1, moved);

					fromRow.splice(oldIndex, 0, replaced);
				}

				// console.log("Matriz atualizada:", matriz.value.map(r => r.map(c => c?.name)));
			},
		});

		sortables.push(s);
	}
});

onBeforeUnmount(() => {
	sortables.forEach((s) => s.destroy());
});
</script>

<style>
.grid {
	display: flex;
	flex-direction: column;
	gap: 8px;
}
.linha {
	display: flex;
	gap: 8px;
	padding: 8px;
	border: 1px solid #ddd;
	background: #fafafa;
}
.item {
	width: 72px;
	padding: 8px;
	text-align: center;
	background: #eee;
	border-radius: 6px;
	cursor: grab;
	user-select: none;
}
</style>
