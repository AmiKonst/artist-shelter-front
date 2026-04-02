<template>
    <Header />
    <RouterView />
    <Adopt />
    <Share />
    <Footer />
</template>

<script setup>
// import stores from '@/stores';

import Header from '@/layouts/components/Header/Header.vue';
import Footer from '@/layouts/components/Footer/Footer.vue';
import Adopt from '@/layouts/components/Adopt/Adopt.vue';
import Share from '@/layouts/components/Share/Share.vue';

// const artists = stores.artists();
</script>

<style scoped lang="scss">
</style>
