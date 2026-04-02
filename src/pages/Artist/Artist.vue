<template>
   <div class="container">
       <div class="profile-grid">
           <!-- Левая колонка: Визуал -->
           <Preview :artist="artist" v-if="!isMobile" />

           <!-- Правая колонка: Инфо -->
           <div class="profile-right">
               <span class="badge">ID: {{ artist.id }}-LOFI</span>
               <h1>{{ artist.name }}</h1>
               <p class="status">● {{ artist.status }}</p>
               
               <p class="description" style="">
                    {{  artist.description }}
               </p>

              <Preview :artist="artist" v-if="isMobile" />

               <div class="traits">
                   <div class="trait-item">
                       <div class="trait-label">{{
                            t('entity.artist.stats.badge')
                       }}</div>
                       <div class="trait-value">
                            {{ artist.badge }}
                       </div>
                   </div>
                   <div class="trait-item">
                       <div class="trait-label">{{
                            t('entity.artist.stats.home')
                       }}</div>
                       <div class="trait-value">
                            {{ artist.home }}
                       </div>
                   </div>
                   <div class="trait-item">
                       <div class="trait-label">{{
                            t('entity.artist.stats.vaccination')
                       }}</div>
                       <div class="trait-value">
                            {{ artist.vaccination }}
                       </div>
                   </div>
                   <div class="trait-item">
                       <div class="trait-label">{{
                            t('entity.artist.stats.age')
                       }}</div>
                       <div class="trait-value">
                            {{ artist.age }}
                       </div>
                   </div>
               </div>

               <div class="social-passport">
                   <h3>📂 {{ t('pages.artist.links') }}:</h3>
                   <div class="social-links">
                        <a v-if="artist.links.spotify" :href="artist.links.spotify"
                            target="_blank" class="social-item" :title="t('pages.artist.link-title-1')">
                           <span>🎧</span> Spotify
                        </a>
                        <a v-if="artist.links.youtube" :href="artist.links.youtube"
                            target="_blank" class="social-item" :title="t('pages.artist.link-title-3')">
                           <span>📺</span> YouTube
                        </a>

                        <a v-if="artist.links.applemusic" :href="artist.links.applemusic"
                            target="_blank" class="social-item" :title="t('pages.artist.link-title-2')">
                           <span>🍎</span> Apple Music
                        </a>
                        <a v-if="artist.links.vk" :href="artist.links.vk"
                            target="_blank" class="social-item" :title="t('pages.artist.link-title-8')">
                            <span>💙</span> VK
                        </a>

                         <a v-if="artist.links.threads" :href="artist.links.threads"
                            target="_blank" class="social-item" :title="t('pages.artist.link-title-7')">
                            <span>📝</span> Threads
                        </a>

                        <a v-if="artist.links.instagram" :href="artist.links.instagram"
                            target="_blank" class="social-item" :title="t('pages.artist.link-title-5')">
                           <span>📸</span> Instagram
                        </a>

                        <a v-if="artist.links.telegram" :href="artist.links.telegram"
                            target="_blank" class="social-item" :title="t('pages.artist.link-title-9')">
                            <span>✈️</span> Telegram
                        </a>

                        <a v-if="artist.links.yandexmusic" :href="artist.links.yandexmusic"
                            target="_blank" class="social-item" :title="t('pages.artist.link-title-6')">
                            <span>💛</span> Yandex.Music
                        </a>

                        <a v-if="artist.links.soundcloud" :href="artist.links.soundcloud"
                            target="_blank" class="social-item" :title="t('pages.artist.link-title-4')">
                           <span>☁️</span> SoundCloud
                        </a>
                   </div>
                   <p>
                       {{ t('pages.artist.attention') }}
                   </p>
               </div>

               <div class="actions">
                    <a v-if="artist?.media" target="_blank"
                        :href="artist.media" class="btn-large btn-adopt">
                        {{ t('pages.artist.share-video') }}
                    </a>

                    <button class="btn-large btn-share"
                        @click="artists.shareProcess(artist)"
                    >{{ t('pages.artist.share-social') }}</button>
               </div>
               
               <p class="attention">
                   {{ t('pages.artist.attention-2') }}
               </p>
           </div>
       </div>
   </div>
</template>

<script setup>
    import { defineProps, ref, onMounted, onUnmounted } from 'vue';
    import stores from '@/stores';
    import { useI18n } from 'vue-i18n';

    import Preview from './components/Preview.vue';

    const artists = stores.artists();
    const { t } = useI18n();

    const isMobile = ref(false)

    const props = defineProps({
        code: {
            type: String,
            required: true
        }
    });

    const artist = ref(stores.artists().getArtist(props.code));

    const checkWidth = () => {
        // Условие: если экран БОЛЬШЕ 780, телепорт отключен (disabled = true)
        isMobile.value = window.innerWidth <= 768
    }

    onMounted(() => {
        checkWidth()
        window.addEventListener('resize', checkWidth)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', checkWidth)
    })
</script>

<style lang="scss" scoped>

    /* Стили кнопок (вынесены для соответствия общему дизайну) */
    .btn {
        padding: 10px 24px;
        border-radius: 8px;
        font-weight: bold;
        font-size: 12px;
        text-transform: uppercase;
        cursor: pointer;
        border: none;
        transition: 0.2s;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        &:hover {
            opacity: 0.9;
            transform: translateY(-2px);
        }

        &-main {
            background: var(--text-main);
            color: white;
        }

        &-action {
            background: var(--primary);
            color: white;
        }
    }

   .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }


        /* ОСНОВНАЯ КАРТОЧКА */
        .profile-grid {
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            gap: 30px;
            background: var(--card-bg);
            padding: 40px;
            border-radius: var(--radius);
            box-shadow: var(--shadow);

            .description {
                color: var(--text-muted); font-size: 15px;
                margin: 0 0 25px;
            }
            .attention {
                text-align: center; font-size: 12px; color: var(--text-muted);
            }
            .profile-left {
                margin: 0 0 25px;
            }
        }

        .badge {
            display: inline-block;
            padding: 4px 12px;
            background: #f1f5f9;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 10px;
            color: var(--text-muted);
        }

        h1 { font-size: 36px; margin-bottom: 5px; }
        .status { color: var(--secondary); font-weight: bold; margin-bottom: 20px; font-size: 14px; }

        /* ХАРАКТЕРИСТИКИ (ВЕТ-КАРТА) */
        .traits {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin: 0 0 25px;
        }
        .trait-item {
            padding: 12px;
            background: #f8fafc;
            border-radius: 12px;
            border-left: 4px solid var(--secondary);
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .trait-label { font-size: 10px; text-transform: uppercase; color: var(--text-muted); font-weight: 800; }
        .trait-value { font-weight: bold; font-size: 14px; line-height: 1; }

        /* КНОПКИ ДЕЙСТВИЯ */
        .actions { margin-top: 30px; }
        .btn-large {
            display: block;
            text-align: center;
            width: 100%;
            padding: 18px;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 900;
            cursor: pointer;
            text-transform: uppercase;
            margin-bottom: 15px;
            transition: 0.2s;
        }
        .btn-adopt { background: var(--primary); color: white; box-shadow: 0 4px 0 #e65252; }
        .btn-adopt:active { transform: translateY(3px); box-shadow: none; }
        .btn-share { background: #f1f5f9; color: var(--text-main); }


        @media (max-width: 768px) {
            .profile-grid { grid-template-columns: 1fr; padding: 20px; }
        }


    /* Дополнительные стили для блока ссылок */
        .social-passport {
            margin-top: 25px;
            padding: 20px;
            background: #f1f5f9;
            border-radius: var(--radius);
            border: 2px solid #e2e8f0;
            p {
                font-size: 11px; color: var(--text-muted); margin-top: 12px; font-style: italic;
            }
        }
        .social-passport h3 {
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .social-links {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .social-item {
            display: flex;
            align-items: center;
            gap: 8px;
            background: white;
            padding: 8px 12px;
            border-radius: 8px;
            text-decoration: none;
            color: var(--text-main);
            font-size: 13px;
            font-weight: bold;
            border: 1px solid #cbd5e1;
            transition: 0.2s;
        }
        .social-item:hover {
            border-color: var(--primary);
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        }
        .social-item span { font-size: 16px; }
</style>
