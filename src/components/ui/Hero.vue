<template>
    <section class="hero" v-if="artists.randomArtist">
        <div class="container">
            <div class="hero-card">
                <div class="hero-badge" v-if="artists.randomArtist.herobadge">
                    {{ artists.randomArtist.herobadge }}
                </div>
                
                <div class="hero-img">
                    <img :src="artists.randomArtist.photo" :alt="artists.randomArtist.name" />
                </div>
                
                <div class="hero-info">
                    <h2 class="artist-name">{{ artists.randomArtist.name }}</h2>
                    <p class="artist-desc">
                        {{ artists.randomArtist.description }}
                    </p>
                    
                    <div class="hero-actions">
                        <router-link :to="{
                            name: 'artist',
                            params: {
                                code: artists.randomArtist.code
                            }
                        }" class="btn btn-main">{{ t('common.questionnaire') }}</router-link>
                        <button class="btn btn-action" @click="artists.adoptProcess(artists.randomArtist)">
                            {{ t('common.pick-up') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { useI18n } from 'vue-i18n';
    import stores from '@/stores';

    const { t } = useI18n();
    const artists = stores.artists();
</script>

<style lang="scss" scoped>
    .hero {
        background: #e2f3f1;
        padding: 40px 0;
        border-bottom: 1px solid #cbd5e1;
    }

    .hero-card {
        background: var(--card-bg);
        border-radius: var(--radius);
        padding: 30px;
        display: flex;
        gap: 30px;
        align-items: center;
        box-shadow: var(--shadow);
        position: relative;

        @media (max-width: 640px) {
            flex-direction: column;
            text-align: center;
        }
    }

    .hero-badge {
        position: absolute;
        top: 15px; right: 15px;
        background: #facc15; font-size: 10px; font-weight: bold;
        padding: 4px 10px; border-radius: 20px;
        z-index: 2;
    }

    .hero-img {
        flex-shrink: 0;
        width: 120px;
        height: 120px;
        background: #f1f5f9;
        border-radius: 12px;
        border: 3px solid var(--secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 50px;
        overflow: hidden;
        img {
            display: block;
            aspect-ratio: 1;
            width: 100%;
        }
    }

    .hero-info {
        flex-grow: 1;
    }

    .artist-name {
        font-size: 24px;
        margin-bottom: 8px;
        font-weight: 800;
    }

    .artist-desc {
        color: var(--text-muted);
        max-width: 500px;
        font-size: 14px;
        margin-bottom: 20px;
    }

    .hero-actions {
        display: flex;
        gap: 12px;

        @media (max-width: 640px) {
            justify-content: center;
        }
    }

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
</style>
