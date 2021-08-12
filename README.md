# Шаблон для проекта на vue

## Запуск

### `Локальный`

- **Клонировать репозиторий шаблона:**

```bash
git clone https://github.com/ilya-belik/vue-project-layout.git
```

- **Установить зависимости:**

```bash
yarn install
```

- **Запустить проект:**

```bash
yarn serve
```

- **Билдить так:**

```bash
yarn build
```

### `Github Pages` и `Github Actions`

- **Создать репозиторий на `Github`**
- **Создать в репозитории ветки `main` и `build`**
- **Перейти в раздел репозитория `Settings`** ![Settings](./docs/settings.png)
- **В настройках выбрать раздел `Pages`** ![Pages](./docs/pages.png)
- **В разделе `Source` выбрать ветку `build`** ![Source](./docs/build.png)
- **Если у вас появилось зеленое уведомление - все выполнено правильно**
  ![Notify](./docs/notify.png)

---

## Faq

**Как работает `Github Pages` и `Github Actions`**

При любом коммите в main вызывается `action`
[./github/workflows/build.yml](./github/workflows/build.yml)

Список файлов коммиты в которые `action` игнорирует:

- `.gitignore`
- `.prettierrc.json`
- `**.md`
- `**.lock`
