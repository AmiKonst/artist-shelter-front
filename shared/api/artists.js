import { defineStore } from 'pinia';

const useArtistsApi = defineStore('artists-api', {
    state: () => ({
        artists: [
            {
                id: 1,
                photo: '/img/artists/tyufyakin.jpg',
                video: '/img/video-artists/tyufyakin.mp4',
                code: 'tyufyakin',
                name: 'Tyufyakin Konstantin',
                media: 'https://disk.yandex.ru/d/pG2MHWWZNiQrMQ',
                links: {
                    spotify: 'https://open.spotify.com/artist/5l0NPpIKBDNIrlyYj9vqVn',
                    applemusic: 'https://music.apple.com/us/artist/tyufyakin-konstantin/1037558037',
                    yandexmusic: 'https://music.yandex.ru/artist/5903397',
                    youtube: 'https://www.youtube.com/@konstantintyufyakin',
                    instagram: 'https://www.instagram.com/konstantintyufyakin/',
                    telegram: 'https://t.me/konstantintyufyakin',
                    threads: 'https://www.threads.com/@konstantintyufyakin',
                    // soundcloud: '',
                    vk: 'https://vk.com/artist/konstantintyufyakin'
                }
            },
            {
                id: 2,
                photo: '/img/artists/tzelenski.jpg',
                video: '/img/video-artists/tzelenski.mp4',
                code: 'tzelenski',
                name: 'Timofey Zelenski',
                media: '',
                links: {
                    applemusic: 'https://music.apple.com/us/artist/timofey-zelenski/1538858407',
                    yandexmusic: 'https://music.yandex.ru/artist/11251668',
                    // spotify: '',
                    youtube: 'https://music.youtube.com/channel/UC0bTxfE30jeG43b31_QxLAw',
                    // instagram: '',
                    telegram: 'https://t.me/zelenski_music',
                    // threads: '',
                    // soundcloud: '',
                    vk: 'https://vk.com/artist/timofeyzelenski'
                }
            },
            {
                id: 3,
                photo: '/img/artists/tokee.jpg',
                video: '/img/video-artists/tokee.mp4',
                code: 'tokee',
                name: 'Tokee',
                media: 'https://drive.google.com/file/d/1Fp84QQ3l4GEtTNk4-VgY1FMrarwxsXgB/view?usp=sharing',
                links: {
                    applemusic: 'https://music.apple.com/ru/artist/tokee/355304610',
                    yandexmusic: 'https://music.yandex.ru/artist/1135888',
                    spotify: 'https://open.spotify.com/artist/6WVvmY4D7E7WVdiqwUG4E4',
                    youtube: 'https://www.youtube.com/channel/UCjA1CTJWWxURw3UxFsGmGow',
                    // instagram: '',
                    telegram: 'https://t.me/iamtokee',
                    // threads: '',
                    soundcloud: 'https://soundcloud.com/tokee-grinberg',
                    vk: 'https://vk.com/i_am_tokee',
                }
            },
            {
                id: 4,
                photo: '/img/artists/truhanov.jpg',
                video: '/img/video-artists/truhanov.mp4',
                code: 'truhanov',
                name: 'Ilya Truhanov',
                media: 'https://drive.google.com/file/d/1Fp84QQ3l4GEtTNk4-VgY1FMrarwxsXgB/view?usp=sharing',
                links: {
                    applemusic: 'https://music.apple.com/cy/artist/ilya-truhanov/286700468',
                    yandexmusic: 'https://music.yandex.ru/artist/558858',
                    // spotify: '',
                    youtube: 'https://music.youtube.com/channel/UCIU1FrSjI6Iz9zkeWmnHutQ',
                    // instagram: '',
                    // telegram: '',
                    // threads: '',
                    // soundcloud: '',
                    vk: 'https://vk.com/artist/ilyatruhanov',
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
