import { defineStore } from 'pinia';

const useArtistsApi = defineStore('artists-api', {
    state: () => ({
        artists: [
            {
                id: 1,
                photo: '/img/artists/1.jfif',
                code: 'sexofone',
                name: 'Tyufyakin Konstantin',
                media: 'https://ta.ru',
                links: {
                    spotify: 'https://spotify',
                    applemusic: 'https://applemusic',
                    yandexmusic: 'https://yandexmusic',
                    youtube: 'https://youtube',
                    instagram: 'https://instagram',
                    telegram: 'https://telegram',
                    threads: 'https://threads',
                    soundcloud: 'https://soundcloud',
                    vk: 'https://vk'
                }
            },
            {
                id: 2,
                photo: '/img/artists/1.jfif',
                code: 'Lil',
                name: 'Lil Пустота',
                media: '',
                links: {
                    spotify: '',
                    applemusic: '',
                    yandexmusic: '',
                    youtube: '',
                    instagram: '',
                    telegram: '',
                    threads: '',
                    soundcloud: '',
                    vk: ''
                }
            },
            {
                id: 3,
                photo: '/img/artists/1.jfif',
                code: 'roock',
                name: 'Рок-н-роллыч',
                media: '',
                links: {
                    spotify: '',
                    applemusic: '',
                    yandexmusic: '',
                    youtube: '',
                    instagram: '',
                    telegram: '',
                    threads: '',
                    soundcloud: '',
                    vk: ''
                }
            },
            {
                id: 4,
                photo: '/img/artists/1.jfif',
                code: 'sint',
                name: 'Синт-Волна',
                media: '',
                links: {
                    spotify: '',
                    applemusic: '',
                    yandexmusic: '',
                    youtube: '',
                    instagram: '',
                    telegram: '',
                    threads: '',
                    soundcloud: '',
                    vk: ''
                }
            }
        ]
    }),
    actions: {
        // async list(skip = 0, take = 4) {
        list(skip = 0, take = 4, name) {
            let items = this.artists;

            if (name) {
                const filter = name.toLowerCase().trim();
                items = items.filter(item => item.name.toLowerCase().includes(filter) || item.code.toLowerCase().includes(filter.replace('@', '')));
            }

            return {
                items: items.slice(skip, skip + take),
                total: items.length
            }
        },

        get(code) {
            return this.artists.find(item => item.code === code);
        }
    }
});

export default useArtistsApi;
