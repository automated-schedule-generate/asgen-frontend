<template>
    <v-card>
        <BackButton/>
        <v-form
                    class="form"
                    @submit.prevent="createSubject()"
                >
                <h2>Adicionar disciplina</h2>
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
                        :reverse="false"
                        controlVariant="stacked"
                        min="1"
                        label=""
                        :hideInput="false"
                        :inset="false"
                        variant="outlined"
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
                    <v-container class="d-flex ml-auto ga-2 justify-end">
				<v-btn variant="outlined" @click="$router.back()">Cancelar</v-btn>
				<v-btn type="submit">Enviar</v-btn>
			</v-container>
                </v-form>
    </v-card>
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

async function createSubject() {
    $swal.fire({
        title: 'Adicionando disciplina',
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
        $swal.fire({
			icon: 'success',
			title: 'Disciplina criada com sucesso!',
			timer: 1000,
			showConfirmButton: false,
		});
        subject.value.name = '',
        subject.value.workload = 0,
        subject.value.is_optional = false,
        subject.value.course_semester = 1;

    } catch (e) {
        $swal.close();
        $swal.fire({
			icon: 'error',
			title: 'Erro ao criar disciplina',
			showConfirmButton: true,
            confirmButtonText: 'Tentar novamente'
		});
        console.log(e);
    }
}
</script>
<style scoped></style>
