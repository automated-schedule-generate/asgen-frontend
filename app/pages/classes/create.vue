<template>
<v-card>
    <BackButton/>
    <v-form 
    @submit.prevent="submitForm()"
    >
        <h2>Adicionar Turma</h2>
        <v-label for="turn">Turno:</v-label>
        <v-radio-group id="turn" v-model="school_class.turn">
            <v-radio label="Matutino" value="matutino"/>
            <v-radio  label="Vespertino" value="vespertino"/>
            <v-radio  label="Noturno" value="noturno"/>
        </v-radio-group>
        <v-label for="course_semester">Semestre do curso:</v-label>
        <v-number-input
            class="number-input"
            id="course_semester"
            :reverse="false"
            controlVariant="stacked"
            min="1"
            label=""
            :hideInput="false"
            :inset="false"
            variant="outlined"
            v-model="school_class.course_semester"
            ></v-number-input>
        <v-label for="course_id">Curso:</v-label>
         <v-select
            v-model="select_course"
            id="course_id"
            :items="courses"
            item-title="name"
            item-value="id"
            density="comfortable"
            variant="outlined"
            ></v-select>
            
            <v-container class="d-flex ml-auto ga-2 justify-end">
				<v-btn variant="outlined" @click="$router.back()">Cancelar</v-btn>
				<v-btn type="submit">Enviar</v-btn>
			</v-container>
    </v-form>
</v-card>
</template>
<script setup lang="ts">
import classesService from '~/services/classesService';
import coursesService from '~/services/coursesService';
import type { CourseType } from '~/types/course';

const { $swal } = useNuxtApp();
const courses = ref<CourseType[]>([ {name:'Selecione um curso', id: 0} ]);
const data = await coursesService.getCourses();
courses.value.push(...data.courses);
const select_course = ref(0);

const school_class = ref({
    turn: '',
    course_semester: 0,
    course_id: 0,
    semester_id: 2
})

async function submitForm(){
		$swal.fire({
        title: 'Adicionando matéria',
      });
    	$swal.showLoading();
	try {
		await classesService.createSchoolClass(
            school_class.value.turn,
			school_class.value.course_semester,
			select_course.value,
			school_class.value.semester_id
		);
		$swal.close();
		$swal.fire({
			icon: 'success',
			title: 'Turma criada com sucesso!',
			timer: 1000,
			showConfirmButton: false
		});
		school_class.value.turn = '',
		school_class.value.course_semester = 0,
		school_class.value.semester_id = 0,
        select_course.value = 0
	
	} catch (e:any) {
        $swal.close();
        $swal.fire({
			icon: 'error',
			title: 'Erro ao criar turma',
			showConfirmButton: true,
            confirmButtonText: 'Tentar novamente'
		});
        console.log(e);
}
}
</script>