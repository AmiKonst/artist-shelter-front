<template>
    <div id="shareModalOverlay" v-show="showed">
        <div ref="modal">
            <template v-if="artists.share">
                <h3>{{ t('ui.share.title') }}</h3>
                
                <div>
                    <button @click="shareMedia('story')">
                        <span>📸</span> {{ t('ui.share.stories') }}
                    </button>
                    <button @click="shareMedia('post')">
                        <span>🖼️</span> {{ t('ui.share.post') }}
                    </button>
                    
                    <div></div>
                    
                    <!-- Копирование ссылки -->
                    <button @click="copyToClipboard(window.location.href)">
                        <span>🔗</span> {{ t('ui.share.link') }}
                    </button>

                    <button @click="copyToClipboard(artists.share.links?.spotify)"
                        v-if="artists.share.links?.spotify">
                       <span>🎧</span> Spotify
                    </button>

                    <button @click="copyToClipboard(artists.share.links?.spotify)"
                        v-if="artists.share.links?.applemusic">
                       <span>🍎</span> Apple Music
                    </button>

                    <button @click="copyToClipboard(artists.share.links?.spotify)"
                        v-if="artists.share.links?.youtube">
                       <span>📺</span> YouTube
                    </button>

                    <button @click="copyToClipboard(artists.share.links?.spotify)"
                        v-if="artists.share.links?.soundcloud">
                       <span>☁️</span> SoundCloud
                    </button>

                    <button @click="copyToClipboard(artists.share.links?.spotify)"
                        v-if="artists.share.links?.instagram">
                       <span>📸</span> Instagram
                    </button>

                    <button @click="copyToClipboard(artists.share.links?.spotify)"
                        v-if="artists.share.links?.yandexmusic">
                        <span>💛</span> Yandex.Music
                    </button>

                    <button @click="copyToClipboard(artists.share.links?.spotify)"
                        v-if="artists.share.links?.threads">
                        <span>📝</span> Threads
                    </button>

                    <button @click="copyToClipboard(artists.share.links?.spotify)"
                        v-if="artists.share.links?.vk">
                        <span>💙</span> VK
                    </button>

                    <button @click="copyToClipboard(artists.share.links?.spotify)"
                        v-if="artists.share.links?.telegram">
                        <span>✈️</span> Telegram
                    </button>
                </div>

                <button :disabled="lock" @click="closeShareModal">
                    {{ t('ui.share.close') }}
                </button>
            </template>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';

    import { useI18n } from 'vue-i18n';
    import stores from '@/stores';

    const { tm, rt, t } = useI18n();
    const artists = stores.artists();
    const showed = ref(false);
    const lock = ref(false);

    const modal = ref(null);

    // async function shareMedia(type) {
    //     const isStory = type === 'story';
    //     const artistName = artists.share.name;
    //     const artistPhotoUrl = artists.share.photo;

    //     let tags = tm('ui.share.tags');
    //     tags = Array.isArray(tags) ? tags.map(item => rt(item)) : [];
    //     const randomTag = tags[Math.floor(Math.random() * tags.length)];

    //     let descriptions = tm('ui.share.export.descriptions');
    //     descriptions = Array.isArray(descriptions) ? descriptions.map(item => rt(item)) : [];
    //     const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];


    //     const canvas = document.createElement('canvas');
    //     const ctx = canvas.getContext('2d');
    //     canvas.width = isStory ? 1080 : 1200;
    //     canvas.height = isStory ? 1920 : 630;

    //     // --- 1. ЗАГРУЗКА ИЗОБРАЖЕНИЯ ---
    //     const img = new Image();
    //     img.crossOrigin = "anonymous";
    //     img.src = artistPhotoUrl;

    //     await new Promise((resolve) => {
    //         img.onload = resolve;
    //         img.onerror = () => { resolve(); };
    //     });

    //     // --- 2. ФОН ---
    //     const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    //     grad.addColorStop(0, '#FF6B6B');
    //     grad.addColorStop(1, '#4ECDC4');
    //     ctx.fillStyle = grad;
    //     ctx.fillRect(0, 0, canvas.width, canvas.height);

    //     // Подложка
    //     ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    //     if (isStory) {
    //         ctx.beginPath();
    //         ctx.roundRect(80, 400, 920, 1100, 40); // Сместили чуть выше
    //         ctx.fill();
    //     } else {
    //         ctx.beginPath();
    //         ctx.roundRect(50, 50, 1100, 530, 40);
    //         ctx.fill();
    //     }

    //     // --- 3. ОТРИСОВКА ФОТО ---
    //     if (img.complete && img.naturalWidth > 0) {
    //         const imgSize = isStory ? 600 : 380;
    //         const imgX = isStory ? (canvas.width - imgSize) / 2 : 100;
    //         const imgY = isStory ? 480 : 125;

    //         ctx.save();
    //         ctx.beginPath();
    //         ctx.roundRect(imgX, imgY, imgSize, imgSize, 40);
    //         ctx.clip();

    //         const aspect = img.width / img.height;
    //         let sw, sh, sx, sy;
    //         if (aspect > 1) {
    //             sh = img.height; sw = img.height;
    //             sx = (img.width - sw) / 2; sy = 0;
    //         } else {
    //             sw = img.width; sh = img.width;
    //             sx = 0; sy = (img.height - sh) / 2;
    //         }

    //         ctx.drawImage(img, sx, sy, sw, sh, imgX, imgY, imgSize, imgSize);
    //         ctx.restore();
    //     }

    //     // --- Вспомогательная функция для подгонки текста ---
    //     const fillTextWithSpacing = (text, x, y, maxWidth, initialFontSize) => {
    //         let fontSize = initialFontSize;
    //         ctx.font = `bold ${fontSize}px sans-serif`;
            
    //         // Уменьшаем шрифт, пока текст шире допустимого
    //         while (ctx.measureText(text).width > maxWidth && fontSize > 20) {
    //             fontSize -= 2;
    //             ctx.font = `bold ${fontSize}px sans-serif`;
    //         }
    //         ctx.fillText(text, x, y);
    //         return fontSize; // Возвращаем итоговый размер для подписи
    //     };

    //     // --- 4. ТЕКСТЫ (С автоматической подгонкой) ---
    //     ctx.fillStyle = '#1e293b';
        
    //     if (isStory) {
    //         ctx.textAlign = 'center';
    //         // Поднимаем имя чуть выше (было 1220 -> стало 1180), чтобы сократить пустоту снизу
    //         const currentSize = fillTextWithSpacing(artistName, 540, 1180, 800, 90);
            
    //         ctx.font = 'italic 40px sans-serif';
    //         ctx.fillStyle = '#64748b';
    //         // Описание сразу под именем
    //         ctx.fillText(randomDescription, 540, 1180 + (currentSize * 0.8));
    //     } else {
    //         ctx.textAlign = 'left';
    //         const currentSize = fillTextWithSpacing(artistName, 520, 280, 600, 75); // Подняли имя в Post
            
    //         ctx.font = 'italic 32px sans-serif';
    //         ctx.fillStyle = '#64748b';
    //         ctx.fillText(randomDescription, 520, 280 + (currentSize * 0.8));
    //     }


    //     // --- 5. БИРКА ---
    //     ctx.save();
    //     // Позиция бирки: в сторис сверху фото, в посте справа вверху
    //     ctx.translate(isStory ? 720 : 920, isStory ? 450 : 100);
    //     ctx.rotate(0.15);
    //     ctx.fillStyle = '#facc15';
    //     ctx.beginPath();
    //     ctx.roundRect(0, 0, 240, 80, 15);
    //     ctx.fill();
    //     ctx.fillStyle = '#1e293b';
    //     ctx.textAlign = 'center';
    //     ctx.font = 'bold 30px sans-serif';
    //     ctx.fillText(randomTag, 120, 50);
    //     ctx.restore();

    //     // --- 6. АДРЕС САЙТА И ПОДПИСЬ (Корректировка отступов) ---
    //     // В Story infoY подняли с 1550 до 1420, чтобы "прижать" к контенту
    //     // В Post infoY опустили с 470 до 490, чтобы убрать прилипание к описанию
    //     const infoX = isStory ? 540 : 810; 
    //     const infoY = isStory ? 1420 : 490; 
        
    //     ctx.textAlign = 'center';

    //     // Призыв к действию
    //     ctx.fillStyle = isStory ? 'rgba(255, 255, 255, 0.8)' : '#64748b';
    //     ctx.font = isStory ? 'bold 34px sans-serif' : 'bold 16px sans-serif';
    //     // Увеличили зазор от призыва до плашки в Post (-30 вместо -20)
    //     ctx.fillText("СПАСИ ДРУГИХ АРТИСТОВ ТУТ:", infoX, isStory ? infoY - 25 : infoY - 30);

    //     // Плашка под адрес
    //     ctx.fillStyle = isStory ? 'rgba(255, 255, 255, 0.2)' : '#f1f5f9';
    //     ctx.beginPath();
    //     // В Story плашка теперь 100px в высоту (была 120), чтобы не быть громоздкой
    //     ctx.roundRect(infoX - (isStory ? 350 : 250), infoY, isStory ? 700 : 500, isStory ? 100 : 70, 20);
    //     ctx.fill();

    //     // Текст адреса
    //     ctx.fillStyle = isStory ? 'white' : '#1e293b';
    //     ctx.font = isStory ? 'bold 50px sans-serif' : 'bold 28px sans-serif';
    //     // Центрируем текст внутри плашки по вертикали
    //     ctx.fillText("ARTIST-SHELTER.COM", infoX, infoY + (isStory ? 65 : 45));

    //     if (isStory) {
    //         ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    //         ctx.font = '30px sans-serif';
    //         // Подняли "ищи ссылку" (1750 вместо 1800), чтобы не прилипала к краю экрана
    //         ctx.fillText("ищи ссылку в описании профиля", 540, 1750);
    //     }

    //     // --- 7. ФИНАЛИЗАЦИЯ (Скачивание) ---
    //     canvas.toBlob(async (blob) => {
    //         const fileName = `shelter-${artistName.toLowerCase().replace(/\s+/g, '-')}-${type}.png`;
    //         const file = new File([blob], fileName, { type: "image/png" });
    //         const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    //         if (isMobile && navigator.canShare && navigator.canShare({ files: [file] })) {
    //             try {
    //                 await navigator.share({ files: [file], title: artistName });
    //                 return;
    //             } catch (err) { console.log(err); }
    //         }

    //         const link = document.createElement('a');
    //         link.href = canvas.toDataURL("image/png");
    //         link.download = fileName;
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //     }, 'image/png');
    // }

    async function shareMedia(type) {
        const isStory = type === 'story';
        const artistName = artists.share.name;
        const artistPhotoUrl = artists.share.photo;

        let tags = tm('ui.share.tags');
        tags = Array.isArray(tags) ? tags.map(item => rt(item)) : [];
        const randomTag = tags[Math.floor(Math.random() * tags.length)];

        let descriptions = tm('ui.share.export.descriptions');
        descriptions = Array.isArray(descriptions) ? descriptions.map(item => rt(item)) : [];
        const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = isStory ? 1080 : 1200;
        canvas.height = isStory ? 1920 : 630;

        // 1. ЗАГРУЗКА ФОТО
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = artistPhotoUrl;
        await new Promise((resolve) => { img.onload = resolve; img.onerror = () => resolve(); });

        // 2. ФОН
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, '#FF6B6B');
        grad.addColorStop(1, '#4ECDC4');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 3. ПОДЛОЖКА (Выверенные размеры)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        if (isStory) {
            // Story: Подложка заканчивается на 1350, оставляя место снизу
            ctx.beginPath();
            ctx.roundRect(80, 400, 920, 950, 40); 
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.roundRect(50, 50, 1100, 530, 40);
            ctx.fill();
        }

        // 4. ФОТО АРТИСТА
        if (img.complete && img.naturalWidth > 0) {
            const imgSize = isStory ? 580 : 380;
            const imgX = isStory ? (canvas.width - imgSize) / 2 : 100;
            const imgY = isStory ? 480 : 125;

            ctx.save();
            ctx.beginPath();
            ctx.roundRect(imgX, imgY, imgSize, imgSize, 40);
            ctx.clip();

            const aspect = img.width / img.height;
            let sw, sh, sx, sy;
            if (aspect > 1) { sh = img.height; sw = img.height; sx = (img.width - sw) / 2; sy = 0; }
            else { sw = img.width; sh = img.width; sx = 0; sy = (img.height - sh) / 2; }

            ctx.drawImage(img, sx, sy, sw, sh, imgX, imgY, imgSize, imgSize);
            ctx.restore();
        }

        // --- Вспомогательная функция для подгонки текста ---
        const fillTextFitted = (text, x, y, maxWidth, initialSize, isItalic = false) => {
            let size = initialSize;
            ctx.font = `${isItalic ? 'italic' : 'bold'} ${size}px sans-serif`;
            while (ctx.measureText(text).width > maxWidth && size > 18) {
                size -= 2;
                ctx.font = `${isItalic ? 'italic' : 'bold'} ${size}px sans-serif`;
            }
            ctx.fillText(text, x, y);
            return size;
        };


         // 5. ТЕКСТЫ (Имя и Описание)
        ctx.fillStyle = '#1e293b';
        if (isStory) {
            ctx.textAlign = 'center';
            const nameSize = fillTextFitted(artistName, 540, 1160, 800, 90);
            ctx.fillStyle = '#64748b';
            fillTextFitted(randomDescription, 540, 1160 + (nameSize * 0.9), 800, 40, true);
        } else {
            ctx.textAlign = 'left';
            // Подняли имя ещё чуть выше (с 310 до 280), чтобы освободить место снизу
            const nameSize = fillTextFitted(artistName, 520, 280, 580, 75);
            ctx.fillStyle = '#64748b';
            fillTextFitted(randomDescription, 520, 280 + (nameSize * 0.9), 580, 32, true);
        }

        // 6. БИРКА
        ctx.save();
        ctx.translate(isStory ? 730 : 930, isStory ? 430 : 100);
        ctx.rotate(0.15);
        ctx.fillStyle = '#facc15';
        ctx.beginPath(); ctx.roundRect(0, 0, 240, 80, 15); ctx.fill();
        ctx.fillStyle = '#1e293b';
        ctx.textAlign = 'center';
        ctx.font = 'bold 30px sans-serif';
        ctx.fillText(randomTag, 120, 52);
        ctx.restore();

        // 7. АДРЕС САЙТА И ПРИЗЫВ (Больше "воздуха" снизу)
        const infoX = isStory ? 540 : 810; 
        // В Post режиме подняли infoY с 510 до 460
        const infoY = isStory ? 1480 : 460; 
        
        ctx.textAlign = 'center';

        // Текст "СПАСИ ДРУГИХ"
        ctx.fillStyle = isStory ? 'rgba(255, 255, 255, 0.8)' : '#64748b';
        ctx.font = isStory ? 'bold 34px sans-serif' : 'bold 16px sans-serif';
        ctx.fillText(`${t('ui.share.export.save')}:`, infoX, infoY - 25);

        // Плашка с адресом
        ctx.fillStyle = isStory ? 'rgba(255, 255, 255, 0.2)' : '#f1f5f9';
        ctx.beginPath();
        // Высота плашки в Post режиме уменьшена до 70px для компактности
        ctx.roundRect(infoX - (isStory ? 350 : 250), infoY, isStory ? 700 : 500, isStory ? 100 : 70, 20);
        ctx.fill();

        // Адрес сайта
        ctx.fillStyle = isStory ? 'white' : '#1e293b';
        ctx.font = isStory ? 'bold 50px sans-serif' : 'bold 28px sans-serif';
        ctx.fillText("ARTIST-SHELTER.COM", infoX, infoY + (isStory ? 68 : 46));

        if (isStory) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.font = '32px sans-serif';
            ctx.fillText(t('ui.share.export.link'), 540, 1800);
        }

        // 8. СКАЧИВАНИЕ
        canvas.toBlob(async (blob) => {
            const fileName = `shelter-${artistName.toLowerCase().replace(/\s+/g, '-')}-${type}.png`;
            const file = new File([blob], fileName, { type: "image/png" });
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            if (isMobile && navigator.canShare && navigator.canShare({ files: [file] })) {
                try { await navigator.share({ files: [file], title: artistName }); return; } catch (err) { }
            }

            const dataUrl = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, 'image/png');
    }



    // Полифилл для скругленных углов (если браузер старый)
    if (!CanvasRenderingContext2D.prototype.roundRect) {
        CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
            if (w < 2 * r) r = w / 2;
            if (h < 2 * r) r = h / 2;
            this.beginPath();
            this.moveTo(x + r, y);
            this.arcTo(x + w, y, x + w, y + h, r);
            this.arcTo(x + w, y + h, x, y + h, r);
            this.arcTo(x, y + h, x, y, r);
            this.arcTo(x, y, x + w, y, r);
            this.closePath();
            return this;
        };
    }


    /** 
     * Вспомогательная функция для рисования скругленных прямоугольников 
     * (нужна для старых браузеров, если roundRect не поддерживается)
    */
    if (!CanvasRenderingContext2D.prototype.roundRect) {
       CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
           if (w < 2 * r) r = w / 2;
           if (h < 2 * r) r = h / 2;
           this.beginPath();
           this.moveTo(x + r, y);
           this.arcTo(x + w, y, x + w, y + h, r);
           this.arcTo(x + w, y + h, x, y + h, r);
           this.arcTo(x, y + h, x, y, r);
           this.arcTo(x, y, x + w, y, r);
           this.closePath();
           return this;
       };
    }


    function copyToClipboard(text) {
       navigator.clipboard.writeText(text);
       alert("Скопировано в буфер обмена! 🐾");
    }

    function openShareModal() {
        showed.value = true;

        // 1. Сбрасываем начальное состояние для анимации
        modal.value.style.transform = 'scale(0.8)';
        modal.value.style.opacity = '0';
        modal.value.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

        // 2. Через миг запускаем анимацию появления
        setTimeout(() => {
            modal.value.style.transform = 'scale(1)';
            modal.value.style.opacity = '1';
        }, 10);
    }

    function closeShareModal() {
        showed.value = false;

        modal.value.style.transform = 'scale(0.8)';
        modal.value.style.opacity = '0';
    }

    watch(
        () => artists.share,
        () => {
            if (artists.share) {
                openShareModal();
            }
        }
    );
</script>

<style lang="scss" scoped>
</style>

<style lang="scss">
    #shareModalOverlay {
        display:flex;
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.8);
        z-index:2000;
        backdrop-filter:blur(8px);
        align-items:center;
        justify-content:center;

        & > div {
            background:white;
            width:90%;
            max-width:400px;
            border-radius:24px;
            padding:25px;
            position:relative;
            max-height: 96vh;
            overflow: auto;
            h3 {
                text-align:center;
                margin-bottom:20px;

            }

            & > div {
                display:grid;
                gap:12px;

                button {
                    display:flex;
                    align-items:center;
                    gap:15px;
                    background:#f1f5f9;
                    border:none;
                    padding:15px;
                    border-radius:12px;
                    cursor:pointer;
                    font-weight:bold;
                    text-align: start;
                }

                & > div {
                    height:1px;
                    background:#e2e8f0;
                    margin:10px 0;
                }
            }

            & > button {
                width:100%;
                margin-top:20px;
                background:none;
                border:none;
                color:#64748b;
                font-weight:bold;
                cursor:pointer;
            }
        }
    }
</style>
