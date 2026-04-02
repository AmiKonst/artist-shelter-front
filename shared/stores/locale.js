import { defineStore } from 'pinia';
import { createI18n } from 'vue-i18n';
import { baseUrl } from '🔗/utils/utils';

import { LANGUAGES_LIST } from '🔗/constants';

const getDefaultLocale = () => {
    const storedLocale = localStorage.getItem('locale');
    const defaultEnvLocale = import.meta.env.VITE_DEFAULT_LOCALE;
    const browserLocale = navigator.language || navigator.userLanguage;

    // Список всех доступных кодов
    const availableCodes = LANGUAGES_LIST.map(lang => lang.code);

    // Проверка, что локаль есть в списке доступных
    const findValidLocale = code => availableCodes.includes(code) ? code : null;

    const localeCode =
        findValidLocale(storedLocale) ||
        findValidLocale(browserLocale) ||
        findValidLocale(defaultEnvLocale) ||
        'en-US'; // fallback

    // Возвращаем полный объект языка из LANGUAGES_LIST
    return LANGUAGES_LIST.find(lang => lang.code === localeCode)?.code;
}

const useLocaleStore = defineStore('locale', {
    state: () => ({
        i18n: null,
        locale: getDefaultLocale(),
        languages: LANGUAGES_LIST,
        rtl: false
    }),
    actions: {
        async setLocale(locale) {
            const response = await fetch(`${baseUrl}/i18n/${locale}.json`);
            const messages = await response.json();

            this.i18n.global.setLocaleMessage(locale, messages)
            this.i18n.global.locale = locale;
            this.locale = locale;

            const rtl = LANGUAGES_LIST.find(item => item.code === locale)?.rtl;
            this.rtl = !!rtl;

            // Апдейтим основной класс у body
            if (!this.rtl) {
                document.body.classList.remove('direction-rtl');
            } else if (!document.body.classList.contains('direction-rtl')) {
                document.body.classList.add('direction-rtl');
            }
        },
        async updateLocale(locale) {
            if (!locale) {
                return;
            }
            // Ставим новое значение
            await this.setLocale(locale);

            // Запоминаем, т.к. это выбор пользователя
            localStorage['locale'] = locale;
        },
        create() {
            this.i18n = createI18n({
                legacy: false,
                warnHtmlMessage: false,
                messages: {}
            });

            this.setLocale(this.locale);

            return this.i18n;
        },
        t() {
            const { t } = this.i18n?.global || { t: () => '' };
            return t;
        }
    }
});

export default useLocaleStore;
