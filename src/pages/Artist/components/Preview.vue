<template>
   <div class="profile-left">
       <div class="artist-photo">
            <img :src="artist.photo" :alt="artist.name" />
       </div>
       <div class="care-notes">
           <h3>🍲 {{ t('pages.artist.diet') }}</h3>

           <p>
                {{ artist.diet }}
           </p>
       </div>

       <div class="actions">
            <button class="btn btn-action" @click="artists.adoptProcess(artist)">
                {{ t('common.pick-up') }}
            </button>
        </div>
   </div>
</template>

<script setup>
    import { defineProps } from 'vue';
    import stores from '@/stores';
    import { useI18n } from 'vue-i18n';

    const artists = stores.artists();
    const { t } = useI18n();

    const props = defineProps({
        artist: {
            type: Object,
            required: true
        }
    });
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


    .profile-left {
        .actions {
            padding: 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: end;
        }
    }

    .artist-photo {
        width: 100%; aspect-ratio: 1;
        background: #e2f3f1;
        border-radius: var(--radius);
        display: flex; align-items: center; justify-content: center;
        font-size: 100px;
        border: 4px solid var(--secondary);
        overflow: hidden;
        img {
            display: block;
            width: 100%;
            aspect-ratio: 1;
        }
    }

            /* БЛОК ПИТАНИЯ/УХОДА */
        .care-notes {
            margin-top: 30px;
            padding: 20px;
            background: #fff9db;
            border-radius: 12px;
            border: 1px dashed #fab005;
            p {
                font-size: 13px;
            }
        }
        .care-notes h3 { font-size: 16px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
        .actions { margin-top: 30px; }
</style>
