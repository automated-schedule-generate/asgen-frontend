import type { SubjectType } from '~/types/subject';
import type { CourseType } from '~/types/course';

export default new (class CourseService {
	async createCourse(name: string, total_semesters: number, course_subjects: SubjectType[]) {
		const { $axios } = useNuxtApp();
		await $axios.post('/api/courses', {
			name,
			total_semesters,
			subjects: course_subjects,
		});
	}
	async getCourses() {
		const { $axios } = useNuxtApp();
		const { data } = await $axios.get('api/courses');

		return {
			courses: data.data,
			last_page: data.last_page,
		};
	}

	async getTimetables(id: number): Promise<CourseType> {
		const { $axios } = useNuxtApp();

		const { data } = await $axios.get(`/api/courses/${id}/timetables`);

		return <CourseType>data;
	}
})();
