<template>
    <div id="modalOverlay" v-show="showed">
        <!-- Модалка -->
        <div ref="modal">
            
            <template v-if="artists.adopt">
                <div class="icon">📦</div>

                <h2>
                    {{ t('adopt.packed', {
                        name: artists.adopt.name
                    }) }}
                </h2>
                
                <div class="stats" v-if="artists.adopt.instruction">
                    <h4>📋 {{ t('adopt.instruction.title') }}:</h4>
                    <ul>
                        <li>🚫 <span v-html="wrapFirstTwoWords(artists.adopt.instruction.care)"></span></li>
                        <li>🎧 <span v-html="wrapFirstTwoWords(artists.adopt.instruction.dontMix)"></span></li>
                        <li>🧡 <span v-html="wrapFirstTwoWords(artists.adopt.instruction.love)"></span></li>
                        <li>🚫 <span v-html="wrapFirstTwoWords(artists.adopt.instruction.promo)"></span></li>
                    </ul>
                </div>

                <p>
                    {{ t('adopt.loading') }}
                </p>

                <button :disabled="lock" @click="closeAdoptionModal">{{ t('adopt.close') }}</button>
            </template>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue'; 
    import { useI18n } from 'vue-i18n';
    import stores from '@/stores';

    const { t } = useI18n();
    const artists = stores.artists();
    const showed = ref(false);
    const lock = ref(false);

    const modal = ref(null);

    const wrapFirstTwoWords = (text) => {
        const words = text.split(' ');

        if (words.length < 2) {
            return `<strong>${text}</strong>`;
        }

        const firstTwo = words.slice(0, 2).join(' ');
        const rest = words.slice(2).join(' ');

        return `<strong>${firstTwo}</strong> ${rest}`;
    };

    function adoptProcess(e) {
        // Находим карточку, в которой нажата кнопка
        const card = document.querySelector(`.artist-card-${ artists.adopt.id }`);

        if (card) {
            // Запускаем анимацию тряски (код из прошлого сообщения)
            card.classList.add('shaking');

            // Создаем ноты-частицы
            for (let i = 0; i < 8; i++) {
                setTimeout(() => createNote(card), i * 100);
            }
        }


        setTimeout(() => {
            if (card) {
                card.classList.remove('shaking');
                card.classList.add('boxed');
            }

            // Показываем наше красивое окно
            showAdoptionModal(artists.adopt.name);
            
            // Генерируем сертификат (функция из прошлого сообщения)
            generateCertificate({
                ...artists.adopt,
                id: artists.adopt.id + "-LOFI"
            });            
        }, card ? 1200 : 0);
    }

    function showAdoptionModal(artistName) {
        showed.value = true;

        // Небольшая задержка для плавного появления
        setTimeout(() => {
            modal.value.style.transform = 'scale(1)';
        }, 10);
    }

    function closeAdoptionModal() {
        modal.value.style.transform = 'scale(0.5)';
        setTimeout(() => {
            showed.value = false;
            artists.adopt = null;
        }, 200);
    }

    function createNote(parent) {
        const notes = ['🎵', '🎶', '✨', '🐾', '🧡'];
        const note = document.createElement('div');
        
        // Обязательные стили для анимации и позиционирования
        note.className = 'note-particle';
        note.style.position = 'fixed'; // Используем fixed, чтобы не зависеть от скролла при расчете
        note.style.zIndex = '2000';
        note.style.pointerEvents = 'none'; // Чтобы не мешали кликам
        
        note.innerText = notes[Math.floor(Math.random() * notes.length)];
        
        // Получаем координаты карточки относительно вьюпорта
        const rect = parent.getBoundingClientRect();
        
        // Центр карточки + небольшой случайный разброс (чтобы не из одной точки)
        const centerX = rect.left + rect.width / 2 + (Math.random() * 40 - 20);
        const centerY = rect.top + rect.height / 2 + (Math.random() * 40 - 20);
        
        note.style.left = centerX + 'px';
        note.style.top = centerY + 'px';
        
        document.body.appendChild(note);
        
        // Удаляем через секунду (когда закончится CSS анимация fly-up)
        setTimeout(() => {
            note.remove();
        }, 1000);
    }



    async function generateCertificate(artistData) {
        lock.value = true;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 500;

        // 1. Фон (Бежевая "гербовая" бумага)
        ctx.fillStyle = '#fdf6e3';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Рамка
        ctx.strokeStyle = '#d2b48c';
        ctx.lineWidth = 15;
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

        // Создаем объект изображения
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = artistData.photo;

        // Ждем загрузки картинки
        await new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = () => {
                console.error("Не удалось загрузить фото артиста");
                resolve(); // Продолжаем без фото, чтобы не ломать скрипт
            };
        });

        // Рисуем белую подложку под фото
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(50, 80, 200, 200);
        ctx.strokeStyle = '#4ecdc4';
        ctx.lineWidth = 5;
        ctx.strokeRect(50, 80, 200, 200);

        if (img.complete && img.naturalWidth > 0) {
            // Отрисовка фото с сохранением пропорций (Cover эффект)
            const aspect = img.width / img.height;
            let sw, sh, sx, sy;
            if (aspect > 1) {
                sh = img.height;
                sw = img.height;
                sx = (img.width - sw) / 2;
                sy = 0;
            } else {
                sw = img.width;
                sh = img.width;
                sx = 0;
                sy = (img.height - sh) / 2;
            }
            ctx.drawImage(img, sx, sy, sw, sh, 55, 85, 190, 190);
        } else {
            // Если фото не загрузилось, рисуем заглушку-эмодзи
            ctx.font = '100px serif';
            ctx.textAlign = 'center';
            ctx.fillText('🎶', 150, 210);
        }

        // 3. Текстовый блок
        ctx.textAlign = 'left';
        ctx.fillStyle = '#1e293b';
        
        // Заголовок
        ctx.font = 'bold 30px "Segoe UI"';
        ctx.fillText(t('adopt.export.title'), 280, 110);
        
        ctx.font = '20px "Segoe UI"';
        ctx.fillText(t('adopt.export.description-1'), 280, 150);
        ctx.fillText(t('adopt.export.description-2'), 280, 175);

        // Данные подопечного
        ctx.font = 'bold 24px "Segoe UI"';
        ctx.fillStyle = '#ff6b6b';
        ctx.fillText(`${t('adopt.export.name')}: ${artistData.name}`, 280, 230);
        
        ctx.font = '16px "Segoe UI"';
        ctx.fillStyle = '#64748b';
        ctx.fillText(`ID: ${artistData.id}`, 280, 260);
        ctx.fillText(`${t('adopt.export.status')}: ${artistData.status}`, 280, 285);
        // ctx.fillText(`Рацион: ${artistData.diet.substring(0, 45)}...`, 280, 310);

        // 4. Текст обязательства
        ctx.font = 'italic 16px "Segoe UI"';
        ctx.fillStyle = '#1e293b';
        const pledge = t('adopt.export.pledge-1');
        const pledge2 = t('adopt.export.pledge-2');
        ctx.fillText(pledge, 50, 380);
        ctx.fillText(pledge2, 50, 405);

        // 5. Печать и подпись
        ctx.font = '60px serif';
        ctx.fillText('🐾', 650, 430); // Подпись директора
        
        ctx.beginPath();
        ctx.arc(700, 400, 60, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 107, 107, 0.5)';
        ctx.lineWidth = 4;
        ctx.stroke();
        
        ctx.save();
        ctx.translate(700, 400);
        ctx.rotate(-0.2);
        ctx.font = 'bold 12px "Segoe UI"';
        ctx.fillStyle = 'rgba(255, 107, 107, 0.7)';
        ctx.textAlign = 'center';
        ctx.fillText(t('adopt.export.approved'), 0, -5);
        ctx.fillText(t('adopt.export.shelter'), 0, 15);
        ctx.restore();

        // 6. Скачивание
        const link = document.createElement('a');
        link.download = `adoption-certificate-${artistData.name}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        lock.value = false;
    }

    watch(
        () => artists.adopt,
        () => {
            if (artists.adopt) {
                adoptProcess();
            }
        }
    );
</script>

<style lang="scss" scoped>
    #modalOverlay {
        display:flex; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:1000; backdrop-filter: blur(5px); align-items:center; justify-content:center;
    }
    #modalOverlay > div {
            max-height: 96vh;
    overflow: auto;
        background:#fff9db; width:90%; max-width:500px; padding:30px; border-radius:20px; border:4px dashed #fd7e14; position:relative; box-shadow: 0 20px 40px rgba(0,0,0,0.3); transform: scale(0.5); transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

        .icon {
            font-size:50px; text-align:center; margin-bottom:15px;
        }

        h2 {
            text-align:center; color:#1e293b; margin-bottom:20px; font-size:24px;
        }


        .stats {
            background:white; padding:20px; border-radius:12px; border:1px solid #e2e8f0;

            h4 {
                text-transform:uppercase; font-size:12px; letter-spacing:1px; color:#fd7e14; margin-bottom:10px;
            }
            ul {
                list-style:none; font-size:14px; color:#475569; line-height:1.8;
            }
        }


        p {
            text-align:center; margin-top:20px; font-size:13px; color:#64748b; font-style:italic;
        }

        button {
            width:100%; margin-top:20px; background:#fd7e14; color:white; border:none; padding:15px; border-radius:10px; font-weight:bold; cursor:pointer; text-transform:uppercase;
        }
    }
</style>

<style lang="scss">
    /* Летающие ноты */
    .note-particle {
        position: absolute;
        pointer-events: none;
        animation: fly-up 1s forwards;
        font-size: 20px;
        z-index: 1000;
    }

    @keyframes fly-up {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-100px) translateX(20px) rotate(20deg); opacity: 0; }
    }
</style>
