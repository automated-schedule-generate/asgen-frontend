import { parse } from 'flatted';
import type { CourseType } from '~/types/course';

export default new (class TimetableGeneratorService {
	async start() {
		const { $axios } = useNuxtApp();

		return $axios.get('/api/timetable-generator/start');
	}

	async getTemporaryTimetable(): CourseType[] {
		const { $microserviceAPI } = useNuxtApp();

		const { data } = await $microserviceAPI.get('/temporary-timetables');
		if (data.timetables) {
			return parse(data.timetables) as CourseType[];
		}
		return [
			{
				name: '',
				timetables: [],
			},
		] as CourseType[];
	}
})();
