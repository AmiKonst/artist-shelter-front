<template>
  <div class="shelter-banner">
    <div class="fence"></div>
    <!-- Добавляем обертку для клеток, чтобы контролировать их кучность -->
    <div class="cages-container">
        <div class="cage"><span>🎸</span><div class="label">{{ t('pages.about.photo.sector-1') }}</div></div>
        <div class="cage active"><span>🎤</span><div class="label">{{ t('pages.about.photo.sector-2') }}</div></div>
        <div class="cage"><span>🎹</span><div class="label">{{ t('pages.about.photo.sector-3') }}</div></div>
        <!-- Эту клетку скроем на совсем маленьких экранах (iphone SE и т.д.) -->
        <div class="cage hide-mobile"><span>🎷</span><div class="label">{{ t('pages.about.photo.sector-4') }}</div></div>
    </div>
    
    <div class="overlay-text">
       <span class="location">📍 {{ t('pages.about.photo.location-1') }}</span>
       <span class="status">{{ t('pages.about.photo.mode') }}</span>
    </div>
  </div>
</template>

<script setup>
    import { useI18n } from 'vue-i18n';
    const { t } = useI18n();
</script>

<style scoped>
.shelter-banner {
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%);
  border-radius: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 40px;
  position: relative;
  overflow: hidden;
  border: 4px solid white;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.cages-container {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 15px; /* Удобный контроль расстояния */
  width: 100%;
  padding: 0 10px;
  z-index: 2;
}

.fence {
  position: absolute;
  bottom: 20px;
  width: 110%;
  height: 60px;
  background-image: repeating-linear-gradient(90deg, #1e293b, #1e293b 2px, transparent 2px, transparent 40px);
  border-top: 3px solid #1e293b;
  opacity: 0.3;
  z-index: 1;
}

.cage {
  width: 100px; /* Уменьшили базовую ширину */
  height: 140px;
  background: white;
  border-radius: 12px 12px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 40px; /* Уменьшили эмодзи */
  position: relative;
  border: 2px solid #1e293b;
  border-bottom: none;
  flex-shrink: 1; /* Позволяем сжиматься */
}

.cage.active {
  transform: scale(1.1) translateY(-5px);
  box-shadow: 0 0 20px rgba(255,107,107,0.4);
  z-index: 3;
}

.label {
  position: absolute;
  bottom: -15px;
  font-size: 9px;
  font-weight: 900;
  text-transform: uppercase;
  color: #1e293b;
  background: #facc15;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap; /* Чтобы текст не переносился */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.overlay-text {
  position: absolute;
  top: 15px;
  left: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 4;
}

.location, .status {
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 10px;
  width: fit-content;
  white-space: nowrap;
}

/* АДАПТИВ ПОД МОБИЛКИ */
@media (max-width: 600px) {
  .shelter-banner {
    height: 240px;
    padding-bottom: 30px;
  }
  
  .cages-container {
    gap: 8px;
  }

  .cage {
    width: 70px;
    height: 100px;
    font-size: 30px;
  }

  .hide-mobile {
    display: none; /* Прячем 4-ю клетку на узких экранах */
  }

  .label {
    font-size: 8px;
    bottom: -10px;
  }
  
  .overlay-text {
    top: 10px;
    left: 10px;
  }
}
</style>
