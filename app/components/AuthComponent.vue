<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'AuthCard',
});
</script>

<template>
	<!-- botões -->
	<v-row class="ga-0 ma-auto d-flex justify-end">
		<v-col
			cols="auto"
			class="ma-0"
		>
			<v-btn
				rounded-lg
				class="btn"
				variant="flat"
				color="surface"
				@click="registerOpen = true"
			>
				Cadastrar
			</v-btn>
		</v-col>
		<v-col
			cols="auto"
			pa-auto
			ma-0
		>
			<v-btn
				rounded-lg
				color="surface"
				variant="flat"
				class="btn"
				@click="loginOpen = true"
			>
				Entrar
			</v-btn>
		</v-col>
	</v-row>

	<!-- Modal do login -->
	<v-dialog
		v-model="loginOpen"
		class="ma-auto w-33"
	>
		<v-card>
			<v-btn
				icon="mdi-close"
				class="ml-auto"
				variant="text"
				@click="loginOpen = false"
			>
			</v-btn>
			<v-form
				class="form"
				@submit.prevent="submit"
			>
				<img
					src="~/assets/logo-asgen-vertical-colorfull.svg"
					class="ma-auto"
					width="90vw"
					height="90vh"
				/>
				<h1 class="ma-auto pa-4">Login</h1>
				<v-label for="name"> Digite seu email: </v-label>
				<v-text-field
					id="nome"
					v-model="login.email"
					variant="outlined"
					type="text"
					placeholder="Digite seu nome"
				/>
				<v-label for="senha"> Digite sua senha: </v-label>
				<v-text-field
					id="senha"
					v-model="login.password"
					variant="outlined"
					placeholder="Digite sua senha"
					:append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
					:type="visible ? 'text' : 'password'"
					@click:append-inner="visible = !visible"
				/>
				<v-btn type="submit"> Fazer login </v-btn>
				<v-container>
					<a
						style="cursor: pointer; text-decoration: underline"
						@click="
							() => {
								registerOpen = true;
								loginOpen = false;
							}
						"
						>Ainda não tem conta? Cadastre-se</a
					>
				</v-container>
			</v-form>
		</v-card>
	</v-dialog>

	<!-- modal de cadastro -->
	<v-dialog
		v-model="registerOpen"
		max-width="600px"
	>
		<v-card class="pa-1">
			<v-btn
				icon="mdi-close"
				class="ml-auto"
				variant="text"
				@click="registerOpen = false"
			>
			</v-btn>
			<v-form @submit.prevent="send">
				<img
					src="~/assets/logo-asgen-vertical-colorfull.svg"
					class="ma-auto"
					width="90vw"
					height="90vh"
				/>
				<h1 class="ma-auto pa-4">Cadastro</h1>
				<v-window v-model="step">
					<!-- Etapa 1 -->
					<v-window-item :value="0">
						<v-label for="name">Digite seu nome:</v-label>
						<v-text-field
							id="name"
							variant="outlined"
							v-model="register.name"
							placeholder="Digite seu nome"
						/>

						<v-label for="email">Digite seu e-mail:</v-label>
						<v-text-field
							id="email"
							variant="outlined"
							type="email"
							v-model="register.email"
							placeholder="Digite seu e-mail"
						/>
					</v-window-item>

					<!-- Etapa 2 -->
					<v-window-item :value="1">
						<v-label for="registration">Digite sua matrícula:</v-label>
						<v-text-field
							id="registration"
							variant="outlined"
							v-model="register.registration"
							placeholder="Digite sua matrícula"
						/>

						<v-label for="cpf">Digite seu CPF:</v-label>
						<VMaskInput
							name="user.cpf"
							mask="###.###.###-##"
							variant="outlined"
							placeholder="XXX.XXX.XXX-XX"
							v-model="register.cpf"
						/>
					</v-window-item>

					<!-- Etapa 3 -->
					<v-window-item :value="2">
						<v-label for="password">Digite sua senha:</v-label>
						<v-text-field
							id="password"
							variant="outlined"
							v-model="register.password"
							placeholder="Digite sua senha"
							:append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
							:type="visible ? 'text' : 'password'"
							@click:append-inner="visible = !visible"
						/>

						<v-label for="confirmPassword">Confirme sua senha:</v-label>
						<v-text-field
							id="confirmPassword"
							variant="outlined"
							v-model="register.confirmPassword"
							placeholder="Confirme sua senha"
							:append-inner-icon="visibleConfirm ? 'mdi-eye-off' : 'mdi-eye'"
							:type="visibleConfirm ? 'text' : 'password'"
							@click:append-inner="visibleConfirm = !visibleConfirm"
						/>
					</v-window-item>
				</v-window>

				<!-- Botões de navegação -->
				<div class="d-flex justify-space-between mt-2">
					<v-btn
						text
						v-show="step > 0"
						@click="step--"
						prepend-icon="mdi-arrow-left"
					>
						Voltar
					</v-btn>

					<v-spacer />

					<v-btn
						v-if="step < 2"
						color="primary"
						@click="step++"
						append-icon="mdi-arrow-right"
					>
						Próximo
					</v-btn>

					<v-btn
						v-else
						color="primary"
						type="submit"
					>
						Cadastrar
					</v-btn>
				</div>
				<v-container>
					<a
						style="cursor: pointer; text-decoration: underline"
						@click="
							() => {
								registerOpen = false;
								loginOpen = true;
							}
						"
						>Já tem uma conta? Faça o login</a
					>
				</v-container>
			</v-form>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import authService from '~/services/authService';

const { $swal } = useNuxtApp();
const step = ref(0);
const loginOpen = ref(false);
const registerOpen = ref(false);
const visible = ref(false);
const visibleConfirm = ref(false);
const login = ref({
	email: '',
	password: '',
});
async function submit() {
	$swal.fire({
		title: 'Realizando login...',
	});
	$swal.showLoading();
	try {
		await authService.login(login.value.email, login.value.password);
		$swal.close();
		navigateTo('/dashboard');
	} catch (e) {
		$swal.close();
		console.error(e);
	}
}
const register = ref({
	name: '',
	email: '',
	registration: '',
	cpf: '',
	password: '',
	confirmPassword: '',
});

async function send() {
	$swal.fire({
		title: 'Realizando cadastro...',
	});
	$swal.showLoading();
	try {
		await authService.register(
			register.value.name,
			register.value.email,
			register.value.registration,
			register.value.cpf,
			register.value.password,
		);
		$swal.close();
		navigateTo('/dashboard');
	} catch (e) {
		console.log(e);
	}
}
</script>

<style scoped>
.main-container {
	display: grid;
	grid-template-columns: 30vw 1fr;
	border-radius: 2em;
	max-height: 80vh;
}
.banner {
	background-color: blue;
	color: white;
	align-items: center;
	align-content: center;
}
</style>
