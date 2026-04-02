<template>
    <main class="container">
        <h3 class="grid-title">{{ t('pages.home.artists.our-wards') }}</h3>
        <p class="grid-subtitle">{{ t('pages.home.artists.description') }}</p>
        
        <div class="grid">
            <Artist v-for="item in artists.artists"
                :key="item.code"
                :item="item"
            />
        </div>

        <div v-if="artists.total > artists.artists.length"
            class="load-more-container"
            @click="artists.getArtists"
        >
            <button class="btn-load">{{ t('pages.home.artists.more') }}</button>
        </div>
    </main>
</template>

<script setup>
    import { useI18n } from 'vue-i18n';
    import stores from '@/stores';

    import Artist from './Artist.vue';

    const { t } = useI18n();
    const artists = stores.artists();
</script>

<style lang="scss" scoped>
    .grid-title {
        margin: 50px 0 10px;
        font-size: 32px;
        font-weight: 800;
    }

    .grid-subtitle {
        color: var(--text-muted);
        margin-bottom: 30px;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 25px;
        margin-bottom: 40px;
    }

    /* CARD */
    .card {
        background: var(--card-bg);
        border-radius: var(--radius);
        padding: 20px;
        box-shadow: var(--shadow);
        transition: 0.3s;
        border: 1px solid #e2e8f0;
    }
    .card:hover {
        transform: translateY(-5px);
        border-color: var(--secondary);
    }

    .card-img {
        width: 100%;
        aspect-ratio: 1;
        background: #f8fafc;
        border-radius: 10px;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 50px;
    }

    .card-name {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 5px;
    }

    .card-desc {
        font-size: 13px;
        color: var(--text-muted);
        margin-bottom: 20px;
        height: 40px;
        overflow: hidden;
    }

    /* BUTTONS */
    .btn-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }

    .btn {
        border: none;
        padding: 12px;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        font-size: 11px;
        text-transform: uppercase;
    }
    .btn-main {
        background: var(--text-main);
        color: white;
    }

    .btn-action {
        background: var(--primary);
        color: white;
    }
    
    /* LOAD MORE */
    .load-more-container {
        text-align: center;
        margin: 40px 0 80px;
    }

    .btn-load {
        background: transparent;
        border: 2px solid var(--secondary);
        color: var(--secondary);
        padding: 15px 40px;
        border-radius: 30px;
        font-weight: 900;
        cursor: pointer;
        transition: 0.3s;
    }
    .btn-load:hover {
        background: var(--secondary);
        color: white;
    }
</style>
