<template>
	<v-expansion-panels class="ma-auto mb-8">
		<v-expansion-panel>
			<v-expansion-panel-title> Adicionar Disciplina </v-expansion-panel-title>
			<v-expansion-panel-text>
				<v-form
					class="form"
					@submit.prevent="createSubject()"
				>
					<v-label for="subject_name"> Nome da disciplina: </v-label>
					<v-text-field
						v-model="subject.name"
						variant="outlined"
						type="text"
						placeholder="digite o nome da disciplina"
						required
					/>

					<v-label for="workload"> Carga horária: </v-label>
					<v-number-input
						id="workload"
						v-model="subject.workload"
						class="number-input"
						variant="outlined"
						control-variant="split"
					/>

					<v-label for="optional_subject"> A disciplina é obrigatória? </v-label>
					<v-radio-group v-model="subject.is_optional">
						<v-radio
							label="Sim"
							:value="true"
						/>
						<v-radio
							label="Não"
							:value="false"
						/>
					</v-radio-group>

					<v-btn
						prepend-icon="mdi-plus"
						type="submit"
						>Adicionar Disciplina</v-btn
					>
				</v-form>
			</v-expansion-panel-text>
		</v-expansion-panel>
	</v-expansion-panels>
</template>
<script setup lang="ts">
import subjectsService from '~/services/subjectsService';

const { $swal } = useNuxtApp();
const subject = ref({
	name: '',
	workload: 0,
	is_optional: false,
	course_semester: 1,
});
const emit = defineEmits(['updateSubjects']);

async function createSubject() {
	$swal.fire({
		title: 'Adicionando matéria',
	});
	$swal.showLoading();
	try {
		await subjectsService.createSubject(
			subject.value.name,
			subject.value.workload,
			subject.value.is_optional,
			subject.value.course_semester,
		);
		$swal.close();

		((subject.value.name = ''),
			(subject.value.workload = 0),
			(subject.value.is_optional = false),
			(subject.value.course_semester = 1));

		emit('updateSubjects');
	} catch (e) {
		console.log(e);
	}
}
</script>
<style scoped></style>
