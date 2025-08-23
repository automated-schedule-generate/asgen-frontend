export default new (class ClassesService {
    async createSchoolClass(turn:string, course_semester:number, course_id:number, semester_id:number){
        const { $axios } = useNuxtApp();
        await $axios.post('/api/classes',{
            turn,
            course_semester,
            course_id,
            semester_id
        })
    }
    async getClasses() {
		const { $axios } = useNuxtApp();
		const { data } = await $axios.get('api/classes');

		return {
			classes: data.data,
			last_page: data.last_page,
		};
	}
})