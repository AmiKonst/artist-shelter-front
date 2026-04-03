import { createRouter, createWebHistory } from 'vue-router';

const goHome = (to, from, next) => {
    next({ name: 'home' });
};

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../pages/Home/Home.vue'),
        abort: []
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../pages/About/About.vue'),
        abort: []
    },
    {
        path: '/contacts',
        name: 'contacts',
        component: () => import('../pages/Contacts/Contacts.vue'),
        abort: []
    },
    {
        path: '/visits',
        name: 'visits',
        component: () => import('../pages/Visits/Visits.vue'),
        abort: []
    },
    {
        path: '/:code',
        name: 'artist',
        component: () => import('../pages/Artist/Artist.vue'),
        props: true,
        abort: []
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'error-page',
        beforeEnter: goHome
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
    routes,
    // Добавь этот блок:
    scrollBehavior(to, from, savedPosition) {
        // Если есть сохраненная позиция (например, при нажатии кнопки "Назад"), 
        // браузер вернет её, иначе — всегда скроллим в начало (0, 0)
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0, behavior: 'smooth' }; // smooth сделает переход плавным
        }
    }
});

router.beforeEach((to, from, next) => {
    const savedPage = localStorage.getItem('page');

    // Если мы зашли на корень '/' и у нас есть сохраненная страница
    if (to.path === '/' && savedPage) {
        // Очищаем, чтобы не зациклиться при последующих переходах
        localStorage.removeItem('page');
        
        // Переходим по сохраненному пути
        next(savedPage);
    } else {
        next();
    }
});


export default router;
