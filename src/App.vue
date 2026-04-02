<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import layout from '@/layouts/index.vue';

const route = useRoute();

const layoutComponent = computed(() => {
    if (route.name === undefined) {
        return;
    }

    return layout;
});
</script>

<template>
    <component :is="layoutComponent"></component>
</template>
