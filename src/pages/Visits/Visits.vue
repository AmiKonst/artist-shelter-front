<template>
   <div class="container">
        <header class="header">
            <h1>{{ t('pages.visits.title') }} 🍎</h1>
            <p>{{ t('pages.visits.description') }}</p>
        </header>

       

        <div class="input-group levels">
            <label class="label-muted">{{ t('pages.visits.levels.title') }}:</label>
            <div class="levels-grid">
                <!-- Уровень 1 -->
                <div 
                    class="level-card" 
                    :class="{ active: selectedLevel === 1 }" 
                    @click="selectLevel(1)"
                >
                    <div class="level-icon">📦</div>
                    <div class="level-name">{{ t('pages.visits.levels.level-1') }}</div>
                    <div class="level-price">~0.01 SOL</div>
                </div>

                <!-- Уровень 2 -->
                <div 
                    class="level-card level-2" 
                    :class="{ active: selectedLevel === 2 }" 
                    @click="selectLevel(2)"
                >
                    <div class="level-icon">🍎</div>
                    <div class="level-name">{{ t('pages.visits.levels.level-2') }}</div>
                    <div class="level-price">~0.1 SOL</div>
                </div>

                <!-- Уровень 3 -->
                <div 
                    class="level-card level-3" 
                    :class="{ active: selectedLevel === 3 }" 
                    @click="selectLevel(3)"
                >
                    <div class="level-icon">👑</div>
                    <div class="level-name">{{ t('pages.visits.levels.level-3') }}</div>
                    <div class="level-price">~1 SOL+</div>
                </div>
            </div>
        </div>

         <!-- Реквизиты -->
        <section class="qr-section">
            <h3>{{ t('pages.visits.qr.title') }}</h3>
            <div class="qr-grid">
                <div class="qr-item">
                    <div class="qr-placeholder">
                        <img :src="`/img/wallets/sol-${selectedLevel}.png`" alt="xezEAzwrpMryvEwonDW9XAYB9sRCtPtZp4zFuuVpE8u" />
                    </div>
                    <b>Solana (SOL)</b>
                    <span class="wallet-addr">xezEAzwrpMryvEwonDW9XAYB9sRCtPtZp4zFuuVpE8u</span>
                </div>
                <div class="qr-item">
                    <div class="qr-placeholder">
                        <img :src="`/img/wallets/ton-${selectedLevel}.png`" alt="xezEAzwrpMryvEwonDW9XAYB9sRCtPtZp4zFuuVpE8u" />
                    </div>
                    <b>TON</b>
                    <span class="wallet-addr">UQB10IPuc7gwVX_z03i0a5xKIxWnKXdMhZQlEL4oL8aysETz</span>
                </div>
            </div>
        </section>

        <!-- Форма -->
        <section class="parcel-form">
            <h2>{{ t('pages.visits.form.title') }}</h2>
            <form class="input-group">
                <!-- Hash -->
                <input type="text" v-model="data.form.hash"
                    :placeholder="t('pages.visits.form.hash')">

                <label class="title">{{ t('pages.visits.form.artist.title') }}</label>
                <div class="search-container" >
                    <input type="text" id="artistSearch"
                        class="search-input"
                        :placeholder="t('pages.visits.form.artist.placeholder')"
                        v-model="data.searchStr"
                        @focus="open"
                        @blur="close"
                        @input="open"
                    >

                    <div v-if="data.opened" class="search-results">
                        <!-- Спец-опция -->
                        <div class="search-item" @click="selectArtist({ name: t('pages.visits.form.result.all') })">
                            <div style="font-size: 20px;">🍲</div>
                            <div><b>{{ t('pages.visits.form.result.all') }}</b><br><span>{{ t('pages.visits.form.result.all-label') }}</span></div>
                        </div>

                        <div v-for="item in data.searchResults" :key="item.id" class="search-item" @click="selectArtist(item)">
                            <div style="font-size: 20px;">
                                <img :src="item.photo" :alt="item.name" />
                            </div>
                            <div><b>{{item.name}}</b><br><span>ID: {{item.id}}-LOFI</span></div>
                        </div>
                    </div>
                </div>

                <textarea rows="3"
                    :placeholder="t('pages.visits.form.description')"
                    v-model="data.form.description"
                ></textarea>
                <button type="button"
                    class="btn-send"
                    @click="submit"
                >{{ t('pages.visits.form.submit') }}</button>
            </form>
        </section>

        <!-- История -->
        <h3 class="history-title">{{ t('pages.visits.log.title') }}</h3>
        <div class="parcel-list">
            <div v-for="item in data.items" :key="item.id" class="parcel-card" :class="[`level-${item.rank}`]">
                <div class="parcel-header">
                    <span>
                        {{ t('pages.visits.log.from') }}:
                        <b>{{ item.from }}</b>
                        <span class="rank-badge" :class="[`rank-${item.rank}`]">
                            {{ ['📦','🍎','👑'][item.rank - 1] }}
                            
                            {{ t(`pages.visits.log.rank-${item.rank}`) }}
                        </span>
                    </span>
                    <!-- <span>5 мин назад</span> -->
                </div>
                <div>
                    {{ t('pages.visits.log.artist') }}:
                    <span class="parcel-target">
                        {{ item.artist?.name || t('pages.visits.form.result.all') }}
                    </span>
                </div>
                <div class="parcel-msg" v-html="`«${item.description}»`"></div>
            </div>
        </div>

        <p class="attention">
            {{ t('pages.visits.attention-1') }} <br> {{ t('pages.visits.attention-2') }}
        </p>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue';
    import { useI18n } from 'vue-i18n';
    import api from '🔗/api';

    const { t } = useI18n();
    const donats = api.donats();
    const artists = api.artists();

    import { ref, reactive } from 'vue';

    const data = reactive({
        take: 20,
        total: 0,
        items: [],
        searchStr: '',
        searchResults: [],
        form: {
            from: '',
            hash: '',
            artistName: '',
            description: ''
        },
        opened: false
    });
    window.q = data;

    const open = () => {
        data.opened = true
        const payload = artists.list(0, 3, data.searchStr);
        data.searchResults = payload?.items || [];
        console.log(data.searchResults);
    }

    const close = () => {
        setTimeout(() => { data.opened = false }, 100)
    }

    const submit = () => {
        // https://docs.google.com/forms/d/e/1FAIpQLSdRcAzwSKS9M1cgSalq1lhOKNqh91oeyD9gAzcwBaYcXfhZKQ/viewform?usp=pp_url&entry.1156279207=Name&entry.849578901=Hash&entry.693688954=ArtistName&entry.1479049253=Description

        const baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdRcAzwSKS9M1cgSalq1lhOKNqh91oeyD9gAzcwBaYcXfhZKQ/viewform?usp=pp_url";

        const queryParams = new URLSearchParams({
            "entry.1156279207": '',     // Имя отправителя
            "entry.849578901": data.form.hash, // Хеш
            "entry.693688954": data.form.artistName,    // Имя артиста
            "entry.1479049253": data.form.description  // Сообщение
        });

        const finalUrl = `${baseUrl}&${queryParams.toString()}`;

        // Открываем форму в новой вкладке
        window.open(finalUrl, '_blank');
    }

    const selectArtist = (artist) => {
        console.log(artist);
        data.form.artistName = artist?.name;
        data.searchStr = artist?.name || '';
        close();
    }

    // Состояние выбранного уровня (1, 2 или 3)
    const selectedLevel = ref(2); // По умолчанию "Витамины"

    const selectLevel = (level) => {
        selectedLevel.value = level;
    };

    // Хэш и сообщение тоже сделаем реактивными для формы
    const transactionHash = ref('');
    const donationMessage = ref('');
    const targetArtist = ref(null); // Сюда упадет объект выбранного артиста

    const getDonats = () => {
        const payload = donats.list(data.items.length, data.take);
        console.log(payload.items);

        if (payload?.items) {
            data.items.splice(data.items.length - 1, 0, ...payload.items);
            data.total = payload.total;
        }
    }

    onMounted(() => {
        getDonats();
    })
</script>

<style lang="scss" scoped>
    .container { max-width: 700px; margin: 0 auto; padding: 40px 20px; }

    .attention {
        text-align: center; margin-top: 40px; font-size: 11px; color: var(--text-muted);
    }

    .header {
        text-align: center;
        margin-bottom: 40px;
        h1 {
            font-size: 32px; letter-spacing: -1px;
        }
        p {
            color: var(--text-muted);
        }
    }


    .levels-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        margin-bottom: 20px;
    }

    .level-card {
        cursor: pointer;
        border: 2px solid #e2e8f0;
        padding: 15px 10px;
        border-radius: 12px;
        text-align: center;
        transition: all 0.2s ease;
        background: white;

        &:hover { border-color: var(--secondary); transform: translateY(-2px); }

        &.active {
            border-color: var(--primary);
            background: #fff5f5; // Очень легкий красный фон
            box-shadow: 0 4px 12px rgba(255, 107, 107, 0.1);
            
            &.level-2 { border-color: var(--secondary); background: #f0fdfa; }
            &.level-3 { border-color: #facc15; background: #fffbeb; }
        }

        .level-icon { font-size: 24px; margin-bottom: 5px; }
        .level-name { font-size: 11px; font-weight: 800; color: var(--text-main); }
        .level-price { font-size: 10px; color: var(--primary); font-weight: bold; }
    }

    .label-muted {
        font-size: 12px;
        font-weight: bold;
        color: var(--text-muted);
        margin-bottom: 8px;
        display: block;
    }


    /* БЛОК С РЕКВИЗИТАМИ */
    .qr-section {
        background: white; 
        padding: 30px; 
        border-radius: var(--radius);
        box-shadow: 0 10px 25px rgba(0,0,0,0.05); 
        text-align: center;
        border: 2px solid #e2e8f0; 
        margin-bottom: 30px;
    }
    .qr-grid { 
        display: grid; 
        grid-template-columns: 1fr 1fr; 
        gap: 20px; 
        margin-top: 20px; 
    }
    .qr-item { 
        background: #f8fafc; 
        padding: 15px; 
        border-radius: 12px; 
        border: 1px solid #cbd5e1; 
    }
    .qr-placeholder {
        width: 160px;
        height: 160px;
        background: #ddd;
        margin: 0 auto 10px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: #665;
    }
    .qr-placeholder img {
        display: block;
        width: 100%;
        aspect-ratio: 1;
    }

    .wallet-addr { 
        font-family: monospace;
        font-size: 10px;
        word-break: break-all;
        background: #eee;
        padding: 5px;
        border-radius: 4px;
        display: block;
        margin-top: 5px;
    }

    /* МОБИЛЬНАЯ АДАПТАЦИЯ */
    @media (max-width: 640px) {
        .qr-section {
            padding: 20px 15px; /* Уменьшаем внутренние поля */
        }
        .qr-grid {
            grid-template-columns: 1fr; /* QR-коды встают друг под друга */
            gap: 15px;
        }
        .qr-item {
            padding: 20px 10px; /* Увеличиваем высоту для удобства тапа */
        }
        .qr-placeholder {
            width: 180px; /* На мобилках можно сделать QR чуть крупнее для сканирования */
            height: 180px;
        }
        .wallet-addr {
            font-size: 11px; /* Слегка увеличиваем шрифт для читаемости */
            padding: 8px;
        }
    }



    /* ФОРМА ПЕРЕДАЧКИ */
    .parcel-form {
        background: #fff9db;
        padding: 30px;
        border-radius: var(--radius);
        border: 3px dashed #fab005;
        margin-bottom: 50px;
        .title {
            font-size: 12px;
            font-weight: bold;
            color: var(--text-muted);
        }
    }
    .parcel-form h2 { margin-bottom: 15px;
        font-size: 22px;
    }
    .input-group { display: flex;
        flex-direction: column;
    gap: 12px;
    }

    textarea {
        max-width: 100%;
        min-width: 100%;
    }
    input, textarea, select { padding: 12px;
        border-radius: 8px;
    border: 2px solid #e2e8f0;
    font-family: inherit; width: 100%; }
    .btn-send { background: #fab005; color: #855d00; border: none; padding: 15px; border-radius: 12px; font-weight: 900; cursor: pointer; text-transform: uppercase; margin-top: 10px; }
    .btn-send:hover { background: #fcc419; }

    /* СПИСОК ПОСЛЕДНИХ ПЕРЕДАЧЕК */
    .history-title { font-size: 24px; font-weight: 900; margin-bottom: 20px; text-align: center; }
    .parcel-list { display: flex; flex-direction: column; gap: 15px; }
    .parcel-card {
        background: white; padding: 20px; border-radius: 12px;
        border: 1px solid #e2e8f0; position: relative;
        box-shadow: 0 4px 6px rgba(0,0,0,0.02);
    }
    .parcel-card::before { content: "📦"; position: absolute; left: -15px; top: 15px; font-size: 24px; }
    .parcel-header { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); margin-bottom: 8px; }
    .parcel-target { color: var(--primary); font-weight: bold; }
    .parcel-msg { font-style: italic; color: #475569; border-left: 3px solid var(--secondary); padding-left: 10px; margin-top: 10px; }


    /* УРОВНИ ПЕРЕДАЧЕК */
    .parcel-card.level-1 { border-left: 5px solid #94a3b8; } /* Базовый: Сухпаёк */

    .parcel-card.level-2 { 
        border-left: 5px solid #4ecdc4; 
        background: linear-gradient(90deg, #f0fdfa 0%, #ffffff 100%);
    } /* Средний: Витамины */

    .parcel-card.level-3 { 
        border: 2px solid #facc15; 
        background: linear-gradient(135deg, #fffbeb 0%, #ffffff 100%);
        box-shadow: 0 10px 20px rgba(250, 204, 21, 0.15);
    } /* Топ: Королевский уход */

    .rank-badge {
        font-size: 10px;
        text-transform: uppercase;
        font-weight: 900;
        padding: 2px 8px;
        border-radius: 4px;
        margin-left: 10px;
    }
    .rank-1 { background: #e2e8f0; color: #475569; }
    .rank-2 { background: #ccfbf1; color: #0f766e; }
    .rank-3 { background: #fef3c7; color: #92400e; animation: pulse 2s infinite; }

    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.7; }
        100% { opacity: 1; }
    }

    /* АДАПТАЦИЯ ДЛЯ МОБИЛЬНЫХ (добавь в блок @media (max-width: 640px)) */
    @media (max-width: 640px) {
        .history-title {
            font-size: 20px;
            margin-bottom: 15px;
        }

        .parcel-card {
            padding: 15px;
            margin-left: 10px; /* Оставляем место для иконки, если она абсолютная, но лучше поменять: */
        }

        /* Сдвигаем иконку, чтобы она не висела в воздухе, а была частью карточки или выше */
        .parcel-card::before {
            left: -10px;
            top: -10px;
            font-size: 20px;
            background: var(--bg); /* Чтобы коробка не сливалась с фоном */
            border-radius: 50%;
            padding: 2px;
        }

        /* Шапка: на мобилках лучше в колонку, чтобы длинные ники не слипались с датой */
        .parcel-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
            font-size: 11px;
        }

        /* Убираем отступ у бейджа, чтобы он встал под имя или красиво сбоку */
        .rank-badge {
            margin-left: 0;
            margin-top: 4px;
            display: inline-block;
        }

        /* Сообщение делаем чуть компактнее */
        .parcel-msg {
            font-size: 13px;
            line-height: 1.4;
            padding-left: 8px;
        }

        /* Для уровня 3 на мобилках убираем тяжелые тени, чтобы не тормозило при скролле */
        .parcel-card.level-3 {
            box-shadow: 0 5px 10px rgba(250, 204, 21, 0.1);
        }
    }


    /* Стили для кастомного поиска */
    .search-container {
        position: relative;
        width: 100%;
    }

    .search-input { 
        padding-right: 40px !important; 
        background: white url('data:image/svg+xml;utf8,<svg xmlns="http://w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%2364748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>') no-repeat right 15px center;
    }

    .search-results {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        border: 2px solid var(--secondary);
        border-radius: 12px;
        margin-top: 5px;
        max-height: 250px;
        overflow-y: auto;
        display: block;
        z-index: 50;
        box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    }

    .search-item {
        padding: 12px 15px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: 0.2s;
        border-bottom: 1px solid #f1f5f9;

        img {
            width: 26px;
            aspect-ratio: 1;
            border-radius: 4px;
        }
    }

    .search-item:hover {
        background: #f0fdfa;
        color: var(--secondary);
    }

    .search-item b {
        font-size: 14px;
    }

    .search-item span {
        font-size: 11px;
        color: var(--text-muted);
        background: #f1f5f9;
        padding: 2px 6px;
        border-radius: 4px;
    }
</style>
