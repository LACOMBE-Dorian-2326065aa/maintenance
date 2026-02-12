FROM php:8.3-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl \
    zip \
    unzip \
    sqlite \
    sqlite-dev \
    bash

# Install PHP extensions
RUN docker-php-ext-install \
    pdo \
    pdo_sqlite

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Symfony CLI
RUN curl -sS https://get.symfony.com/cli/installer | bash && \
    mv /root/.symfony5/bin/symfony /usr/local/bin/

WORKDIR /app

# Copy composer files
COPY composer.json composer.lock ./

# Install dependencies
RUN composer install --no-interaction --no-scripts --ignore-platform-reqs || \
    composer install --no-interaction --no-scripts

# Copy application
COPY . .

# Create var directory with permissions
RUN mkdir -p var && chmod -R 777 var

EXPOSE 8000

CMD ["symfony", "serve", "--no-tls", "--allow-http", "--listen-ip=0.0.0.0", "--port=8000"]
