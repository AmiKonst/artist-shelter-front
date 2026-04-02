<template>
    <div class="container">
        <div class="director-card">
            <span class="pin">{{ t('pages.contacts.role-2') }}</span>

            <div class="avatar">
                <img src="/img/me.jpg" alt="Tyufyakin Konstantin" />
            </div>

            <h1>Tyufyakin Konstantin</h1>
            <div class="job-title">{{ t('pages.contacts.role') }}</div>
            <p class="subtitle">{{ t('pages.contacts.subtitle') }}</p>

            <div class="contact-grid">
                <a href="https://open.spotify.com/artist/5l0NPpIKBDNIrlyYj9vqVn" target="_blank" class="contact-link">
                    <span>🎧 {{ t('pages.contacts.listen') }}</span>
                    <span>Spotify</span>
                </a>
                
                <a href="https://www.youtube.com/@konstantintyufyakin" target="_blank" class="contact-link">
                    <span>📹 {{ t('pages.contacts.youtube') }}</span>
                    <span>YouTube</span>
                </a>
                
                <a href="https://www.instagram.com/konstantintyufyakin/" target="_blank" class="contact-link">
                    <span>📸 {{ t('pages.contacts.instagram') }}</span>
                    <span>Instagram</span>
                </a>
                
                 <!-- ТЕЛЕГРАМ -->
                <a href="https://t.me/konstantintyufyakin" target="_blank" class="contact-link tg">
                    <span>💬 {{ t('pages.contacts.telegram') }}</span>
                    <span>Telegram</span>
                </a>

                <!-- ЯНДЕКС МУЗЫКА -->
                <a href="https://music.yandex.ru/artist/5903397" target="_blank" class="contact-link ya-music">
                    <span>🎧 {{ t('pages.contacts.yandex-music') }}</span>
                    <span>Yandex Music</span>
                </a>
                
                <!-- ВК -->
                <a href="https://vk.com/artist/konstantintyufyakin" target="_blank" class="contact-link vk">
                    <span>🎸 {{ t('pages.contacts.vk') }}</span>
                    <span>VK</span>
                </a>
                
                <!-- ПОЧТА -->
                <a href="mailto:tiufyakin@gmail.com" class="contact-link email">
                    <span>📩 {{ t('pages.contacts.email') }}</span>
                    <span>Email</span>
                </a>
            </div>

            <div class="badge-list">
                <span class="badge">● {{ t('pages.contacts.badge-1') }}</span>
                <span class="badge">● {{ t('pages.contacts.badge-2') }}</span>
                <span class="badge">● {{ t('pages.contacts.badge-3') }}</span>
            </div>
        </div>

        <div class="footer-note">
            <p>{{ t('pages.contacts.silence') }}</p>
        </div>
    </div>
</template>

<script setup>
    import { useI18n } from 'vue-i18n';
    import stores from '@/stores';

    const { t } = useI18n();
    const artists = stores.artists();
</script>

<style lang="scss" scoped>
    .container { max-width: 650px; margin: 0 auto; padding: 40px 20px; }


    h1 { 
        font-size: 28px; 
        margin-bottom: 4px; 
        color: var(--text-main); 
    }

    .job-title {
        font-size: 18px;
        font-weight: 600;
        color: var(--primary); /* Или используй #0d9488 для акцента */
        margin-bottom: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .subtitle { 
        color: var(--text-muted); 
        font-size: 14px; 
        margin-bottom: 30px; 
        font-style: italic; 
        max-width: 80%;
        margin-left: auto;
        margin-right: auto;
    }

    /* КАРТОЧКА ДИРЕКТОРА */
    .director-card {
        background: var(--card-bg);
        border-radius: var(--radius);
        padding: 40px;
        text-align: center;
        box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        border: 1px solid #e2e8f0;
        position: relative;
        overflow: hidden;
    }
    
    .director-card .pin {
        // content: "ДИРЕКТОР";
        position: absolute;
        top: 20px;
        right: -30px;
        background: #facc15;
        padding: 5px 40px;
        transform: rotate(45deg);
        font-size: 10px;
        font-weight: 900;
        letter-spacing: 1px;
    }

    .avatar {
        width: 120px; height: 120px;
        background: #f1f5f9;
        border-radius: 50%;
        margin: 0 auto 20px;
        display: flex; align-items: center; justify-content: center;
        font-size: 60px;
        border: 4px solid var(--secondary);
        overflow: hidden;

        img {
            display: block;
            aspect-ratio: 1;
            width: 100%
        }
    }

    // h1 { font-size: 28px; margin-bottom: 10px; }
    // .subtitle { color: var(--text-muted); font-size: 14px; margin-bottom: 30px; font-style: italic; }

    /* ССЫЛКИ */
    .contact-grid { display: grid; gap: 15px; margin-top: 30px; }
    
    .contact-link {
        text-align: start;
        // display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 18px;
        background: #f8fafc;
        border-radius: 12px;
        text-decoration: none;
        color: var(--text-main);
        font-weight: bold;
        transition: 0.3s;
        border: 1px solid #e2e8f0;
        display: block;
        span {
            display: inline-block;
            width: 100%;
        }
        span:last-child {
            // padding: 0 4px;
        }
    }

    @media (min-width: 768px) {
        .contact-link {
            display: flex;
            span {
                width: auto;
            }
        }
    }
    
    .contact-link:hover {
        transform: translateX(5px);
        border-color: var(--primary);
        background: white;
    }

    .contact-link span:last-child {
        font-size: 12px;
        text-transform: uppercase;
        color: var(--primary);
        letter-spacing: 1px;
    }

    .badge-list {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 40px;
        flex-wrap: wrap;
    }
    
    .badge {
        font-size: 11px;
        background: #e2f3f1;
        color: #0d9488;
        padding: 5px 12px;
        border-radius: 20px;
        font-weight: bold;
    }

    .footer-note {
        margin-top: 50px;
        text-align: center;
        font-size: 12px;
        color: var(--text-muted);
        border-top: 1px dashed #cbd5e1;
        padding-top: 20px;
    }
</style>
