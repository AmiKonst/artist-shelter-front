<template>
   <div class="container">
       <!-- "Фото" приюта -->
       <!-- <div class="shelter-photo-container">
           <div class="emoji-cluster">🏘️ 🎸 🔊 ☁️ 🐕</div>
           <div class="shelter-photo-text">
            {{ t('pages.about.photo.alt') }}
            </div>
       </div> -->

       <Photo/>





       <section class="about-section">
           <h2>{{ t('pages.about.title') }}</h2>
           <p>{{ t('pages.about.description-1') }}</p>
           <br>
           <p>{{ t('pages.about.description-2') }}</p>
           <p></p>
       </section>

        <section class="bilbo-section">
           <div class="bilbo-content">
               <div class="bilbo-badge">{{ t('pages.about.partner.label') }}</div>
               <h2>{{ t('pages.about.partner.title') }} 🌳</h2>

               <p v-html="t('pages.about.partner.description')"></p>

               <ul class="bilbo-features">
                   <li>🤖 <strong>{{ t('pages.about.partner.achieve-1') }}:</strong> {{ t('pages.about.partner.achieve-1-1') }}</li>
                   <li>📱 <strong>{{ t('pages.about.partner.achieve-2') }}:</strong> {{ t('pages.about.partner.achieve-2-2') }}</li>
                   <li>🙌 <strong>{{ t('pages.about.partner.achieve-3') }}:</strong> {{ t('pages.about.partner.achieve-3-3') }}</li>
               </ul>
               <a href="https://bilbomusic.com" target="_blank" class="btn-bilbo">{{ t('pages.about.partner.visite') }}</a>
           </div>
       </section>

       <!-- Смешная форма -->
       <div class="drop-box">
           <h3>📦 {{ t('pages.about.form.title') }}</h3>
           <p style="font-size: 14px; color: #868e96;">{{ t('pages.about.form.description-1') }}</p>
           
           <form class="input-group">
               <label style="font-size: 12px; font-weight: bold;">{{ t('pages.about.form.name.title') }}</label>
               <input type="text"
                    v-model="data.name"
                    :placeholder="t('pages.about.form.name.placeholder')">
               
               <label style="font-size: 12px; font-weight: bold;">{{ t('pages.about.form.description.title') }}</label>
                <textarea rows="3"
                    v-model="data.description"
                    :placeholder="t('pages.about.form.description.placeholder')"></textarea>
               
                <button type="button"
                    @click="submit"
                    class="btn-submit">{{ t('pages.about.form.submit') }}</button>
           </form>
       </div>

       <div class="footer-links">
           <p>{{ t('pages.about.address') }}</p>
           <p style="margin-top: 10px;">📧 tiufyakin@gmail.com</p>
       </div>
   </div>
</template>

<script setup>
    import { reactive } from 'vue';
    import { useI18n } from 'vue-i18n';
    import stores from '@/stores';
    import Photo from './components/Photo.vue'

    const { t } = useI18n();
    const artists = stores.artists();

    const data = reactive({
        name: '',
        description: ''
    })

    const submit = () => {
        const baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfiywnRPFQtSUblZltl1c1HXq_VZ1wtn78VXR1pGM0MDweOdw/viewform?usp=pp_url";

        const queryParams = new URLSearchParams({
            "entry.1481386257": data.name, // Имя артиста
            "entry.263289091": data.description  // Сообщение
        });

        const finalUrl = `${baseUrl}&${queryParams.toString()}`;

        // Открываем форму в новой вкладке
        window.open(finalUrl, '_blank');
    }
</script>

<style lang="scss" scoped>
        .container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
   /* ФОТО ПРИЮТА */
        .shelter-photo-container {
            position: relative;
            background: #cbd5e1;
            height: 300px;
            border-radius: var(--radius);
            overflow: hidden;
            margin-bottom: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 5px solid white;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .shelter-photo-text {
            position: absolute;
            bottom: 15px;
            left: 15px;
            background: rgba(0,0,0,0.6);
            color: white;
            padding: 5px 12px;
            border-radius: 8px;
            font-size: 12px;
        }
        .emoji-cluster { font-size: 50px; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.2)); }

        /* ТЕКСТОВЫЙ БЛОК */
        .about-section { background: white; padding: 30px; border-radius: var(--radius); margin-bottom: 30px; }
        h2 { color: var(--primary); margin-bottom: 15px; }

        /* ФОРМА "ПОДКИНУТЬ АРТИСТА" */
        .drop-box {
            background: #fff4e6;
            border: 3px dashed #fd7e14;
            padding: 30px;
            border-radius: var(--radius);
            text-align: center;
        }
        .input-group { margin-top: 20px; display: flex; flex-direction: column; gap: 10px; text-align: left; }
        input, textarea {
            padding: 12px;
            border: 2px solid #dee2e6;
            border-radius: 8px;
            font-family: inherit;
        }
        .btn-submit {
            background: #fd7e14;
            color: white;
            border: none;
            padding: 15px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 10px;
        }

        .footer-links { text-align: center; margin-top: 40px; font-size: 14px; color: var(--text-muted); }


        .bilbo-section {
            background: #f0f7ff;
            border-radius: var(--radius);
            padding: 35px;
            margin-bottom: 30px;
            border: 2px solid #3b82f6;
            position: relative;
            overflow: hidden;

            .bilbo-badge {
                position: absolute;
                top: 15px;
                right: 15px;
                background: #3b82f6;
                color: white;
                font-size: 10px;
                font-weight: 900;
                padding: 4px 10px;
                border-radius: 20px;
            }

            h2 { color: #1d4ed8; }
            
            .bilbo-features {
                list-style: none;
                padding: 0;
                margin: 20px 0;
                font-size: 14px;
                
                li {
                    margin-bottom: 10px;
                    // display: flex;
                    // align-items: center;
                    // gap: 10px;
                }
            }

            .btn-bilbo {
                display: inline-block;
                background: #3b82f6;
                color: white;
                padding: 12px 25px;
                border-radius: 10px;
                text-decoration: none;
                font-weight: bold;
                transition: 0.3s;
                
                &:hover {
                    background: #2563eb;
                    transform: translateY(-2px);
                }
            }
        }
</style>
