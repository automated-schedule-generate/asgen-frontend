import type { SubjectType } from '~/types/subject';

export default new (class SubjectService {
	async createSubject(
		name: string,
		workload: number,
		is_optional: boolean,
		course_semester: number,
	) {
		const { $axios } = useNuxtApp();
		await $axios.post('/api/subjects', {
			name,
			workload,
			is_optional,
			course_semester,
		});
	}

	async getSubjects(page: number): Promise<{ subjects: SubjectType[]; last_page: number }> {
		const { $axios } = useNuxtApp();
		const { data } = await $axios.get('api/subjects', { params: { page } });
		return {
			subjects: (data.data as SubjectType[]) ?? [],
			last_page: Number(data.last_page),
		};
	}

	async updateSubjects() {}
})();
