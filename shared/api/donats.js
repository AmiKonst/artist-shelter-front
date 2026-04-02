import { defineStore } from 'pinia';

const useDonatsApi = defineStore('donats-api', {
    state: () => ({
        donats: [
            {
                id: 3,
                from: 'Крипто-Барон',
                description: '«Оплатил ему золотые зубы и безлимитный автотюн на месяц. Пусть сияет!»',
                artist: {
                    name: 'МС Автотюн',
                    code: ''
                },
                rank: 3,
            }, {
                id: 2,
                from: 'Добрый Слушатель',
                description: '«Закинул на свежие трости для саксофона. Не болей там в облаке.»',
                artist: {
                    name: 'Саксофончик',
                    code: ''
                },
                rank: 2,
            }, {
                id: 1,
                from: 'Прохожий',
                description: '«На пару лайков в TikTok. Мало, но от души.»',
                artist: null,
                rank: 1
            }
        ]
    }),
    actions: {
        // async list(skip = 0, take = 4) {
        list(skip = 0, take = 4) {
            return {
                items: this.donats.slice(skip, skip + take),
                total: this.donats.length
            }
        }
    }
});

export default useDonatsApi;
