import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import api from '🔗/api';

export const useArtistsStore = defineStore('artists-store', () => {
    const { tm, rt } = useI18n();

    // State
    const skip = ref(0);
    const total = ref(5);
    const adopt = ref(null);
    const share = ref(null);
    const rules = ref({});
    
    // Статичные данные оставляем в ref
    const artists = ref([]);

    // Utils
        const rollArtist = (payload) => {
            if (!payload?.id) {
                return;
            }

            const id = payload.id - 1;

            return {
                ...payload,

                herobadge: herobadges.value[id % herobadges.value.length],
                badge: badges.value[id % badges.value.length],
                description: descriptions.value[id % descriptions.value.length],
                home: home.value[id % home.value.length],
                vaccination: vaccinations.value[id % vaccinations.value.length],
                age: age.value[id % age.value.length],
                diet: diets.value[id % diets.value.length],
                status: statuses.value[id % statuses.value.length],
            }
        }

    // Getters
        const herobadges = computed(() => {
            const data = tm('ui.hero.badges');
            return Array.isArray(data) ? data.map(item => rt(item)) : [];
        });

        const badges = computed(() => {
            const data = tm('entity.artist.badges');
            return Array.isArray(data) ? data.map(item => rt(item)) : [];
        });

        const descriptions = computed(() => {
            const data = tm('entity.artist.descriptions');
            return Array.isArray(data) ? data.map(item => rt(item)) : [];
        });

        const home = computed(() => {
            const data = tm('entity.artist.home');
            return Array.isArray(data) ? data.map(item => rt(item)) : [];
        });

        const vaccinations = computed(() => {
            const data = tm('entity.artist.vaccinations');
            return Array.isArray(data) ? data.map(item => rt(item)) : [];
        });

        const age = computed(() => {
            const data = tm('entity.artist.age');
            return Array.isArray(data) ? data.map(item => rt(item)) : [];
        });

        const statuses = computed(() => {
            const data = tm('entity.artist.statuses');
            return Array.isArray(data) ? data.map(item => rt(item)) : [];
        });

        const diets = computed(() => {
            const data = tm('entity.artist.diets');
            return Array.isArray(data) ? data.map(item => rt(item)) : [];
        });

        const randomArtist = computed(() => {
            if (!artists.value.length) {
                return null;
            }

            return rollArtist(artists.value[Math.floor(Math.random() * artists.value.length)]);
        });

    // Actions
        function adoptProcess(payload) {
            const getItem = (key) => {
                let items = tm(key);
                items =  Array.isArray(items) ? items.map(item => rt(item)) : [];

                return items.length ? items[(payload.id - 1) % items.length] : null
            }

            const instruction = {
                care: getItem('adopt.instruction.care'),
                dontMix: getItem('adopt.instruction.dont-mix'),
                love: getItem('adopt.instruction.love'),
                promo: getItem('adopt.instruction.promo')
            }

            adopt.value = {
                ...payload,
                instruction
            };
        }

        function shareProcess(payload) {
            share.value = {
                ...payload
            };
        }

        function getArtists() {
            const payload = api.artists().list(skip.value, 10);
            total.value = payload.total;
            artists.value.splice(artists.value.length, 0, ...payload.items.map(item => rollArtist(item)));
        }

        getArtists();

        function getArtist(code) {
            const item = api.artists().get(code);
            return rollArtist(item)
        }

    return {
        // state
            skip,
            total,
            artists,
            adopt,
            share,

        // getters
            herobadges,
            badges,
            descriptions,
            home,
            vaccinations,
            age,
            statuses,
            diets,
            randomArtist,

        // actions
            getArtist,
            getArtists,
            adoptProcess,
            shareProcess
    };
});

export default useArtistsStore;
