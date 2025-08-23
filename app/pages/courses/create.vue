<template>
	<v-card>
		<BackButton/>
		<v-form
			@submit.prevent="submitForm()"
		>
			<h2>Adicionar Curso</h2>
			<v-label for="course_name"> Nome do curso: </v-label>
			<v-text-field
				id="course_name"
				variant="outlined"
				type="text"
				placeholder="Digite o nome do curso"
				v-model="course.name"
				required
			/>

			<v-label for="course_semesters"> Quantidade de semestres: </v-label>
			<v-number-input
				id="course_semesters"
				class="number-input roundec-pill"
				:reverse="false"
				controlVariant="stacked"
				min="1"
				max="10"
				:hideInput="false"
				:inset="false"
				variant="outlined"
				v-model="course.total_semesters"
			/>

			<v-label for="course_subjects">Matérias:</v-label>
			<v-container class="ga-0 pa-0 mb-16">
			 <v-infinite-scroll
   	 			height="300"
				:items="subjects"
    			@load="load"
  				>
				<template
					v-for="subject in subjects"
  					:key="subject.name"
				>
					<v-checkbox
  						:label="subject.name"
  						:value="subject.name"
  						hide-details
					/>
				</template>
			</v-infinite-scroll>
		</v-container>
			<v-container class="d-flex ml-auto ga-2 justify-end">
				<v-btn variant="outlined" @click="$router.back()">Cancelar</v-btn>
				<v-btn type="submit">Enviar</v-btn>
			</v-container>
	</v-form>
	</v-card>
</template>

<script setup lang="ts">
import subjectsService from '~/services/subjectsService';
import coursesService from '~/services/coursesService';
import type { SubjectType } from '~/types/subject';

	const { $swal } = useNuxtApp();
	const course = ref({
		name: '',
		total_semesters: 0,
		course_subjects: [] as SubjectType[],
	})
	const subjects = ref<SubjectType[]>([]);
	const last_page = ref(1);
	const page = ref(1);	

	async function load({ done }) {
	if(page.value < last_page.value) {
	page.value++;
	}
	const data = await subjectsService.getSubjects(page.value)
	subjects.value.push(...data.subjects);
	last_page.value = data.last_page;
	done('ok')
	}

	async function getSubject(){
		try {
        const data = await subjectsService.getSubjects(page.value);
		subjects.value = data.subjects;
		
     	} catch(e) {
            $swal.fire('error');
     	}
	}

	async function submitForm(){
		$swal.fire({
        title: 'Adicionando matéria',
      });
    	$swal.showLoading();
	try {
		await coursesService.createCourse(
			course.value.name,
			course.value.total_semesters,
			course.value.course_subjects
		);
		$swal.close();
		$swal.fire({
			icon: 'success',
			title: 'Curso criado com sucesso!',
			timer: 1000,
			showConfirmButton: false
		});
		
		course.value.name = '',
		course.value.total_semesters = 0,
		course.value.course_subjects =  [] as SubjectType[]
	
	} catch (e) {
		$swal.close();
		$swal.fire({
			icon: 'error',
			title: 'Erro',
			text: 'Erro ao criar turma',
			showConfirmButton: true,
			confirmButtonText: 'Tentar novamente'
		});
		}
	}
</script>

<style scoped></style>
