
# Project Name - Backend API for Feedback Management

Этот проект представляет собой backend API, разработанный для управления отзывами, оптимизированный для масштабируемости и работы в среде с многоконтейнерной архитектурой. Проект поддерживает TypeScript, использует Prisma для работы с базой данных PostgreSQL, а также обеспечивает автоматизацию задач с помощью Docker.

---

## Оглавление

- [Основные возможности](#основные-возможности)
- [Используемые технологии](#используемые-технологии)
- [Структура проекта](#структура-проекта)
- [Инструкции по установке](#инструкции-по-установке)
- [Разработка](#разработка)
- [Запуск в production](#запуск-в-production)
- [Переменные окружения](#переменные-окружения)
- [Скрипты](#скрипты)
- [Примеры использования Docker](#примеры-использования-docker)

---

## Основные возможности

- **REST API** для операций CRUD над отзывами, пользователями и категориями.
- **Управление аутентификацией**: JWT-токены для защиты API.
- **Валидация данных** с помощью библиотек `zod` и `express-validator`.
- **Логгирование**: Winston с поддержкой ежедневной ротации логов.
- **Контейнеризация**: Использование Docker и Docker Compose для разработки и продакшена.
- **База данных**: PostgreSQL с Prisma ORM для работы со схемой базы данных и миграциями.
- **Конфигурация окружений**: Чёткое разделение development и production окружений.
- **Документация API**: Swagger для автодокументации API.

---

## Используемые технологии

- **Язык программирования**: TypeScript
- **Фреймворк**: Express.js
- **База данных**: PostgreSQL
- **ORM**: Prisma
- **Контейнеризация**: Docker, Docker Compose
- **Валидация**: `zod`, `express-validator`
- **Логгирование**: Winston
- **Аутентификация**: JSON Web Tokens (jsonwebtoken)
- **Hot-Reload**: nodemon и SWC для удобной разработки.
- **Реверс-прокси**: Nginx (в production).

---

## Структура проекта

```
├── src                # Основной код приложения
│   ├── adapter        # Логика подключения к базе данных и внешним сервисам
│   ├── delivery       # Определение маршрутов API (Express)
│   ├── domain         # Реализация бизнес-логики
│   ├── lib            # Утилиты (напр. JWT, логгер)
│   ├── prisma         # Схемы базы данных для ORM Prisma
│   └── environment    # Файлы конфигурации окружений
├── prisma             # SQL схемы и миграции
├── Dockerfile         # Dockerfile для билдов
├── docker-compose.*   # Файлы Docker Compose для dev/prod
├── .env.*             # Переменные окружения для dev/prod
├── .eslint*           # Конфиги для линтинга
└── README.md          # Документация
```

---

## Инструкции по установке

### Предварительные требования

Для запуска проекта убедитесь, что у вас установлено:

- **Node.js** (рекомендуемая версия `v22.12.0`)
- **Docker** и **Docker Compose**
- **PostgreSQL** (если запускаете проект без контейнеров)

---

### Локальная установка (development)

1. **Клонируйте репозиторий:**

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Установите зависимости:**

   ```bash
   npm install
   ```

3. **Настройте переменные окружения:**
   - Скопируйте и переименуйте файл `.env.example` в `.env.development`.
   - Укажите значения переменных среды.

4. **Запустите development-окружение через Docker Compose:**

   ```bash
   docker-compose -f docker-compose.development.yml up --build
   ```

5. **Доступ к API:**
   - Базовый URL: `http://localhost:3000/api/v1`
   - Swagger документация: `http://localhost:3000/api/v1/swagger`

---

### Production

Запуск в production среде также поддерживается Docker Compose.

1. **Скопируйте файл в [.env.production](.env.production) в [.env](.env) и настройте переменные:**
   - Укажите данные для базы данных PostgreSQL, JWT-секрета и других настроек.

2. **Соберите и запустите сервис в Docker:**

   ```bash
   docker-compose -f docker-compose.production.yml up --build
   ```

3. **Доступ к API:**
   - API будет доступен через реверс-прокси (например, Nginx).

---

## Переменные окружения

Основные переменные окружения для разработки и продакшен-среды находятся в файлах `.env.development` и `.env.production`.

Пример `.env` файла:

```dotenv
# Настройки приложения
APP_NODE_ENV=development
APP_HOST=0.0.0.0
APP_PORT=3000
APP_IMAGE_NAME=back-end-test/app:latest

# PostgreSQL
DB_IMAGE_NAME=postgres:13
DB_CONTAINER_NAME=back-end-test-db
DB_USER=dev
DB_PASSWORD=dev
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dev_db

# JWT Token
JWT_SECRET=supersecretjwtkey

# Пример сообщения
EXAMPLE_MESSAGE="Hello, world!"
```

---

## Скрипты

Полезные команды, доступные через `npm`:

- `npm start` — запуск приложения в production.
- `npm run start:dev` — запуск в режиме разработки.
- `npm run build` — сборка TypeScript в JavaScript.
- `npm run prisma:generate` — генерация Prisma clients.
- `npm run prisma:migrate:dev` — запуск миграций БД.
- `npm test` — запуск unit-тестов.

---

## Примеры использования Docker

### Локальный запуск приложения

Для локального запуска используйте:

```bash
    docker-compose -f docker-compose.development.yml up --build
```

### Production запуск

Для production используйте такой же подход, но с файлом для продакшена:

```bash
    docker-compose -f docker-compose.production.yml up --build
```
