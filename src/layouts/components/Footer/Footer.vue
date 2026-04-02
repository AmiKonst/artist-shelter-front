<template>
    <footer>
        <div class="container footer-grid">
            <div>
                <div class="footer-logo text-xl">ARTIST SHELTER</div>
                <p>{{ t('footer.description') }}</p>
            </div>
            <div class="footer-links">
                <h4>{{ t('footer.nav') }}</h4>
                <ul>
                    <li><a href="/">{{ t('footer.catalog') }}</a></li>
                    <li><a href="/about">{{ t('footer.about') }}</a></li>
                    <li><a href="/contacts">{{ t('footer.contacts') }}</a></li>
                </ul>
            </div>
            <div class="footer-links">
                <h4>{{ t('footer.help') }}</h4>
                <ul>
                    <li><a href="/about">{{ t('footer.contacts') }}</a></li>
                    <li><a href="/contacts">{{ t('footer.job') }}</a></li>
                </ul>
            </div>
        </div>
        <div class="rights">
            © 2026 Artist Shelter. {{ t('footer.rights') }}
        </div>
    </footer>
</template>

<script setup>
    import { useI18n } from 'vue-i18n';
    import stores from '@/stores';

    const { t } = useI18n();
    const artists = stores.artists();
</script>

<style lang="scss" scoped>
    .rights {
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid #334155;
        text-align: center;
        font-size: 12px;
    }

    footer {
        background: #1e293b;
        color: #94a3b8;
        padding: 60px 0;
        font-size: 14px;
    }

    .footer-grid {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        gap: 40px;
    }

    .footer-logo {
        color: white;
        font-weight: 900;
        margin-bottom: 15px;
    }

    .footer-links h4 {
        color: white;
        margin-bottom: 15px;
        text-transform: uppercase;
        font-size: 12px;
        letter-spacing: 1px;
    }

    .footer-links ul {
        list-style: none;
    }

    .footer-links li {
        margin-bottom: 8px;
    }

    .footer-links a:hover {
        color: var(--primary);
    }

    @media (max-width: 768px) {
        .footer-grid {
            grid-template-columns: 1fr;
            text-align: center;
        }
    }
</style>
