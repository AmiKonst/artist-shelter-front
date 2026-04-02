<template>
    <header>
        <div class="container header-content">
            <div class="header-left">
                <router-link to="/" class="logo">ARTIST <span>SHELTER</span></router-link>
                <nav>
                    <router-link to="/">{{ t('header.catalog') }}</router-link>
                    <router-link to="/about">{{ t('header.about') }}</router-link>
                    <router-link to="/contacts">{{ t('header.contacts') }}</router-link>
                    <router-link to="/visits">{{ t('header.visits') }}</router-link>
                </nav>
            </div>
            
            <div class="header-right">
                <!-- Кастомный переключатель с иконками -->
                <div class="lang-container" v-click-outside="closeLang">
                    <button class="lang-trigger" @click="isLangOpen = !isLangOpen">
                        <span class="lang-emoji">{{ currentLang?.icon }}</span>
                        <span class="lang-code-text">{{ currentLang?.code.split('-')[0].toUpperCase() }}</span>
                    </button>

                    <transition name="fade-slide">
                        <div v-if="isLangOpen" class="lang-dropdown">
                            <button 
                                v-for="lang in LANGUAGES_LIST" 
                                :key="lang.code"
                                class="lang-item"
                                :class="{ active: locale === lang.code }"
                                @click="changeLang(lang.code)"
                            >
                                <span class="lang-emoji">{{ lang.icon }}</span>
                                <span class="lang-name">{{ lang.name }}</span>
                            </button>
                        </div>
                    </transition>
                </div>

                <div class="total">
                    🐶 {{ t('header.total') }}: {{ artists.total }}
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { useI18n } from 'vue-i18n';
    import stores from '@/stores';
    import { LANGUAGES_LIST } from '🔗/constants'; // Путь к твоему списку

    const { t } = useI18n();
    const artists = stores.artists();
    const locale = stores.locale();

    const isLangOpen = ref(false);

    const currentLang = computed(() => 
        LANGUAGES_LIST.find(item => item.code === locale.locale)
    );

    const changeLang = (code) => {
        locale.setLocale(code);
        isLangOpen.value = false;
    };

    const closeLang = () => isLangOpen.value = false;

    // Директива для клика вне элемента (опционально, можно заменить на глобальный листнер)
    const vClickOutside = {
        mounted(el, binding) {
            el.clickOutsideEvent = (event) => {
                if (!(el === event.target || el.contains(event.target))) {
                    binding.value();
                }
            };
            document.body.addEventListener('click', el.clickOutsideEvent);
        },
        unmounted(el) {
            document.body.removeEventListener('click', el.clickOutsideEvent);
        }
    };
</script>

<style lang="scss" scoped>
    header {
        background: var(--card-bg);
        padding: 15px 0;
        border-bottom: 4px solid var(--primary);
        position: sticky;
        top: 0;
        z-index: 100;
        box-shadow: var(--shadow);
    }

    .header-content, .header-left, .header-right {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .header-content {
        justify-content: space-between;
    }

    .logo {
        font-weight: 900;
        font-size: 22px;
        text-transform: uppercase;
        letter-spacing: -1px;
        text-decoration: none;
        color: inherit;
        span { color: var(--primary); }
    }
    
    nav {
        display: flex;
        gap: 20px;
        font-weight: bold;
        font-size: 14px;
        text-transform: uppercase;

        a { 
            text-decoration: none; 
            color: inherit;
            transition: color 0.2s;
            position: relative; // Для позиционирования подчеркивания

            &:hover { color: var(--primary); }

            // Состояние активной ссылки
            &.router-link-active {
                color: var(--primary);
                
                // Опционально: добавляем индикатор-точку или линию снизу
                &::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: var(--primary);
                    border-radius: 2px;
                }
            }

            &.router-link-exact-active {
                color: var(--primary);
            }
        }
    }


    /* Языковой переключатель */
    .lang-container {
        position: relative;
    }

    .lang-trigger {
        display: flex;
        align-items: center;
        gap: 6px;
        background: #f1f5f9;
        border: none;
        padding: 6px 10px;
        border-radius: 12px;
        cursor: pointer;
        font-weight: 800;
        font-size: 11px;
        transition: 0.2s;
        min-height: 22px;

        &:hover { background: #e2e8f0; }
    }

    .lang-dropdown {
        position: absolute;
        top: calc(100% + 10px);
        right: 0;
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        padding: 8px;
        display: grid;
        grid-template-columns: 1fr;
        min-width: 160px;
        max-height: 300px;
        overflow-y: auto;
        border: 1px solid #e2e8f0;
    }

    .lang-item {
        display: flex;
        align-items: baseline;
        gap: 10px;
        padding: 10px;
        border: none;
        background: transparent;
        width: 100%;
        text-align: left;
        cursor: pointer;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;

        &:hover { background: #f8fafc; color: var(--primary); }
        &.active { background: #fff5f5; color: var(--primary); }
        .lang-emoji {
            display: flex;
        }
    }

    /* Иконки (предполагаем наличие спрайта или классов) */
    .lang-emoji {
        font-size: 16px;
        line-height: .8;
        height: 16px;
    }

    .total {
        font-weight: bold;
        font-size: 12px;
        background: #f1f5f9;
        padding: 5px 12px;
        border-radius: 20px;
        white-space: nowrap;
    }

   /* Фикс для мобильной верстки */
    @media (max-width: 768px) {
        .header-content, .header-left, .header-right {
            gap: 8px; /* Уменьшаем отступы между элементами */
        }

        .logo {
            font-size: 15px; /* Еще чуть меньше логотип */
            white-space: nowrap;
        }

        .lang-code-text {
            display: none; /* Прячем текст кода (EN, RU), оставляем только флаг */
        }

        .total {
            font-size: 10px;
            padding: 4px 8px;
        }
        
        .header-left {
            flex-direction: column;
            justify-content: start;
            align-items: start;
            nav {
                flex-direction: column;
                gap: 4px;
                font-size: 12px;
                a.router-link-active {
                    padding-left: 8px;
                    border-left: 3px solid var(--primary);
                    &::after { display: none; } // Убираем нижнюю линию
                }
            }
        }
    }

    /* Центрирование выпадающего списка на мобилках */
    @media (max-width: 480px) {
        .lang-dropdown {
            right: -10px; /* Чтобы не уходило за край экрана */
            min-width: 140px;
        }
    }

    /* Анимация меню */
    .fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.2s ease; }
    .fade-slide-enter-from, .fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }

</style>
