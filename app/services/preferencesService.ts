import type { PreferenceType } from "~/types/preference";

export default new(class PreferencesService{
    async createPreference( preferences:PreferenceType){
       const { $axios } = useNuxtApp();
         await $axios.post('/api/preferences',{
            preferences,
        })
    }
    async getPreferences(){
        const { $axios } = useNuxtApp();
        const { data } = await $axios.get('api/preferences');

		return {
			preferences: data.data,
			last_page: data.last_page,
		};
    }
    async updatePreference(preferences:PreferenceType){
        const { $axios } = useNuxtApp();
         await $axios.put('/api/preferences/{id}',{
            preferences,
        })
    }
})