const fs = require('fs');
const path = require('path');

const sharedDirs = path.join(__dirname);
const rootDir = path.dirname(path.dirname(sharedDirs))
const dirs = path.join(rootDir, 'src', 'locale');

const outputDir = path.join(rootDir, 'public', 'i18n');

// Убедимся, что выходная директория существует
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const getLocales = (payload) => {
    // Словарь для хранения локализованных строк
    const locales = {};

    const readFile = (dir, file, prefix) => {
        const filePath = path.join(dir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const name = file.split('.json')[0];

        // Обрабатываем каждый язык
        for (const [lang, translations] of Object.entries(data)) {
            if (!locales[lang]) {
                locales[lang] = {};
            }

            let goal = locales[lang];

            if (prefix) {
                if (!goal[prefix]) {
                    goal[prefix] = {};
                    goal = goal[prefix];
                } else {
                    goal = goal[prefix];
                }
            }

            if (!goal[name]) {
                goal[name] = {};
            }

            Object.keys(translations).forEach(key => {
                goal[name][key] = translations[key];
            });
        }
    }

    const readFolder = (dir, prefix) => {
        fs.readdirSync(dir).forEach(file => {
            if (path.extname(file) === '.json') {
                readFile(dir, file, prefix);
            }
        });
    }

    fs.readdirSync(payload).forEach(file => {
        if (!path.extname(file)) {
            if (['i18n'].indexOf(file) === -1 ) {
                readFolder(path.join(payload, file), file);
            }
        };
        if (path.extname(file) === '.json') {
            readFile(path.join(payload), file);
        }
    });

    return locales;
}

const mergeDeep = (target, source) => {
    // Если source не является объектом, просто возвращаем target
    if (typeof source !== 'object' || source === null) {
        return target;
    }

    // Проходим по всем ключам source
    for (const key in source) {
        // Если ключ уже существует в target и оба значения - объекты, объединяем их рекурсивно
        if (key in target && typeof target[key] === 'object' && typeof source[key] === 'object') {
            target[key] = mergeDeep(target[key], source[key]);
        } else {
            // В противном случае просто присваиваем значение из source в target
            target[key] = source[key];
        }
    }

    return target;
}

const locales = mergeDeep(getLocales(sharedDirs), getLocales(dirs));

// Записываем собранные локали в файлы
Object.keys(locales).forEach(lang => {
    const outputFilePath = path.join(outputDir, `${lang}.json`);
    fs.writeFileSync(outputFilePath, JSON.stringify(locales[lang]));
});
