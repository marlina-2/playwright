# Використовуємо офіційний образ Node.js
FROM mcr.microsoft.com/playwright:v1.32.0-focal

# Встановлюємо робочу директорію в контейнері
WORKDIR /app

# Копіюємо package.json та package-lock.json (або yarn.lock)
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо решту файлів проекту
COPY . .

# Копіюємо .env файл
COPY .env .env

# Встановлюємо Playwright браузери
RUN npx playwright install --with-deps

# Вказуємо команду для запуску тестів
CMD ["npx", "playwright", "test"]
