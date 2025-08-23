<template>
	<v-card>
		<BackButton/>
		<v-form @submit.prevent="submit()">
			<v-container>
				<h2>Preferências</h2>
				<v-label> Selecione seus horários de preferência: </v-label>
				<v-table
					density="comfortable"
					striped="even"
				>
					<thead>
						<tr>
							<th class="text-center">Segunda-feira</th>
							<th class="text-center">Terça-feira</th>
							<th class="text-center">Quarta-feira</th>
							<th class="text-center">Quinta-feira</th>
							<th class="text-center">Sexta-feira</th>
						</tr>
						<tr>
							<th
								class="text-center"
								colspan="5"
							>
								Manhã
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="(schedule, index) in scheduleMorning"
							:key="'morning-' + index"
						>
							<td
								v-for="col in 5"
								:key="'morning-col-' + col"
								:class="{
									'schedule-color': preferenceMorning[index]?.[col] ?? null,
								}"
								@click="setPreferencesMorning(index, col)"
							>
								{{ schedule }}
							</td>
						</tr>
					</tbody>
					<thead>
						<tr>
							<th
								class="text-center"
								colspan="5"
							>
								Tarde
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="(schedule, index) in scheduleAfternoon"
							:key="'afternoon-' + index"
						>
							<td
								v-for="col in 5"
								:key="'afternoon-col-' + col"
								:class="{
									'schedule-color': preferenceAfternoon[index]?.[col] ?? null,
								}"
								@click="setPreferencesAfternoon(index, col)"
							>
								{{ schedule }}
							</td>
						</tr>
					</tbody>
				</v-table>
			</v-container>

			<v-container>
				<h2>Informações Adicionais</h2>
				<v-label for="special_need"> Você tem alguma necessidade especial? </v-label>
				<v-radio-group v-model="teacherRegister.specialNeed">
					<v-radio
						label="Sim"
						:value="true"
					/>
					<v-radio
						label="Não"
						:value="false"
					/>
				</v-radio-group>

				<v-container v-show="teacherRegister.specialNeed">
					<v-label> Descrição: </v-label>
					<v-textarea
						v-model="teacherRegister.description"
						variant="outlined"
						placeholder="Descreva sua necessidade"
					/>

					<v-label for="observation_special_need"> Observação: </v-label>
					<v-textarea
						id="observation_special_need"
						v-model="teacherRegister.observation"
						variant="outlined"
						placeholder="Escreva alguma observação"
					/>
				</v-container>
			</v-container>
			<v-container class="d-flex ml-auto ga-2 justify-end">
				<v-btn variant="outlined" @click="$router.back()">Cancelar</v-btn>
				<v-btn type="submit">Enviar</v-btn>
			</v-container>
		</v-form>
	</v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import preferencesService from '~/services/preferencesService';
import type { PreferenceType } from '~/types/preference';

const { $swal } = useNuxtApp();
const scheduleMorning = ref([
	'07:00 ~ 07:44',
	'07:45 ~ 08:29',
	'08:30 ~ 09:14',
	'09:15 ~ 10:00',
	'10:20 ~ 11:04',
	'11:05 ~ 11:50',
]);
const scheduleAfternoon = ref([
	'12:50 ~ 13:34',
	'13:35 ~ 14:19',
	'14:20 ~ 15:55',
	'15:25 ~ 16:09',
	'16:10 ~ 16:54',
	'16:55 ~ 17:40',
]);
const teacherRegister = ref({
	specialNeed: false,
	description: '',
	observation: '',
});

const preferenceMorning = ref([]);
function setPreferencesMorning(day: number, col: number): void {
	if (!preferenceMorning.value[day]) {
		preferenceMorning.value[day] = [];
	}
	preferenceMorning.value[day][col] = !preferenceMorning.value[day][col];
}
const preferenceAfternoon = ref([]);
function setPreferencesAfternoon(day: number, col: number): void {
	if (!preferenceAfternoon.value[day]) {
		preferenceAfternoon.value[day] = [];
	}
	preferenceAfternoon.value[day][col] = !preferenceAfternoon.value[day][col];
}

async function submit(){
	const data:PreferenceType = [
		{
			turn: 'matutino',
			preference: preferenceMorning.value
		},
		{
			turn: 'vespertino',
			preference: preferenceAfternoon.value
		}
	] 
		$swal.fire({
        title: 'Registrando preferências',
      });
    	$swal.showLoading();
	try{
		await preferencesService.createPreference(
			data
		)
		$swal.close();
		$swal.fire({
			icon: 'success',
			title: 'Suas preferências foram salvas com sucesso!',
			timer: 1000,
			showConfirmButton: false
		});
	}catch(e){
		$swal.close();
        $swal.fire({
			icon: 'error',
			title: 'Ocorreu um erro no envio do formulário',
			showConfirmButton: true,
            confirmButtonText: 'Tentar novamente'
		});
		console.log(e)
	}
}

</script>

<style lang="scss" scoped>
td,
tr {
	border: 1px #0d47a1 solid;
	cursor: pointer;
}
thead {
	background-color: #0d47a1;
	color: white;
	border-color: white;
}

Vtable {
	border-radius: 50%;
}
.schedule-color {
	background-color: #0d47a1;
	color: white;
	border-color: white;
}
td:hover {
	background-color: #1565c0;
	color: white;
}
</style>
