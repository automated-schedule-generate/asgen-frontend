<template>
	<v-carousel
		class="carousel-content ma-auto rounded-lg"
		progress="primary"
		show-arrows="hover"
		cycle
		:interval="5000"
		hide-delimiter-background
	>
		<v-carousel-item
			v-for="(slide, i) in slides"
			:key="i"
			class="rounded-lg col"
		>
			<v-sheet class="carousel-card col">
				<v-row class="col">
					<v-col
						cols="12"
						md="6"
						class="d-flex flex-column justify-center align-center col"
					>
						<div class="texto mb-8 text-left">
							{{ slide.text }}
						</div>
					</v-col>

					<v-col
						cols="12"
						md="6"
						class="d-flex justify-center col"
					>
						<v-container
							class="container-image"
							:style="{
								backgroundImage: `url(${slide.image})`,
							}"
						>
						</v-container>
					</v-col>
				</v-row>
			</v-sheet>
		</v-carousel-item>
	</v-carousel>
</template>

<script setup>
import slide1 from '@/assets/img/horario-slide-1.png';
import slide2 from '@/assets/img/horario-slide-2.png';
import slide3 from '@/assets/img/horario-slide-3.png';

const slides = [
	{
		text: 'Organize seu horário escolar com facilidade e ganhe mais tempo para o que importa.',
		image: slide1,
	},
	{
		text: 'Troque experiências e colabore com colegas para criar o melhor planejamento.',
		image: slide2,
	},
	{
		text: 'Personalize seu cronograma no ritmo que combina com você.',
		image: slide3,
	},
];

function saibaMais() {
	navigateTo('/auth/register');
}
</script>

<style scoped>
.carousel-content {
	top: 5vh;
	max-height: 80vh;
	max-width: 90vw;
	margin: 4vh auto 0 auto;
	border-radius: 0;
	overflow: hidden;
}
::v-deep(.v-window__controls) {
	top: 50% !important;
	transform: translateY(-50%) !important;
}
.texto {
	color: #312f2f;
	font-family: sans-serif;
	font-size: 2rem;
	font-weight: 600;
	line-height: 1.1;
	padding: 2rem;
	max-width: 100%;
	box-sizing: border-box;
}
.container-image {
	height: 80vh;
	width: 100vw;
	justify-self: center;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	clip-path: polygon(15% 0, 100% 0, 100% 100%, 15% 100%, 0 50%);
}
.carousel-card {
	min-height: 100vh;
	max-height: 100vh;
	object-fit: cover;
	width: auto;
}
.col {
	height: 80vh;
}
</style>
