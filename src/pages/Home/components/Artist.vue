<template>
   <div class="card" :class="[`artist-card-${item.id}`]" v-if="item">
        <div class="card-img">
            <img :src="item.photo" :alt="item.name" />
        </div>
        <div class="card-name">{{ item.name }}</div>
        <div class="card-desc">{{ item.description }}</div>
        <div class="btn-group">
            <router-link :to="{
                name: 'artist',
                params: {
                    code: item.code
                }
            }" class="btn btn-main">{{ t('common.questionnaire') }}</router-link>
            <button class="btn btn-action" @click="artists.adoptProcess(item)">
                {{ t('common.pick-up') }}
            </button>
        </div>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue';
    import { useI18n } from 'vue-i18n';
    import stores from '@/stores';

    const { t } = useI18n();
    const artists = stores.artists();

    const props = defineProps({
        item: {
            type: Object,
            required: true
        }
    });
</script>

<style lang="scss" scoped>
    .card {
        background: var(--card-bg);
        border-radius: var(--radius);
        padding: 20px;
        box-shadow: var(--shadow);
        transition: 0.3s;
        border: 1px solid #e2e8f0;
        display: flex;
        flex-direction: column;
    }
    .card:hover {
        transform: translateY(-5px);
        border-color: var(--secondary);
    }

    .card-img {
        width: 100%;
        aspect-ratio: 1;
        background: #f8fafc;
        border: solid 2px #f8fafc;
        border-radius: 10px;
        margin-bottom: 15px;
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

    .card-name {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 5px;
    }

    .card-desc {
        font-size: 13px;
        color: var(--text-muted);
        margin-bottom: 20px;
        min-height: 40px;
        overflow: hidden;
    }

    /* BUTTONS */
    .btn-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-top: auto;
    }

    .btn {
        border: none;
        padding: 12px;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        font-size: 11px;
        text-transform: uppercase;
        text-align: center;
    }
    .btn-main {
        background: var(--text-main);
        color: white;
    }

    .btn-action {
        background: var(--primary);
        color: white;
    }

    /* Контейнер для эффекта тряски */
    .shaking {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        backface-visibility: hidden;
        perspective: 1000px;
    }

    @keyframes shake {
        0% { transform: translate(0, 0) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
        60% { transform: translate(-3px, 1px) rotate(0deg); }
        70% { transform: translate(3px, 1px) rotate(-1deg); }
        80% { transform: translate(-1px, -1px) rotate(1deg); }
        90% { transform: translate(1px, 2px) rotate(0deg); }
        100% { transform: translate(1px, -2px) rotate(-1deg); }
    }

    /* Стиль превращения в коробку */
    .boxed {
        background-color: #d2b48c !important; /* Картонный цвет */
        border: 4px dashed #8b4513 !important;
        position: relative;
        transition: all 0.3s ease;
        transform: scale(0.9); /* Коробка чуть меньше карточки */
    }

    /* Эмодзи коробки поверх всего */
    .boxed::before {
        content: "📦";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 70px;
        z-index: 10;
    }

    /* Скрываем всё содержимое карточки, когда она стала коробкой */
    .boxed > * {
        opacity: 0 !important;
        pointer-events: none;
    }
</style>
