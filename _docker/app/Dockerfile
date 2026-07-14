FROM php:8.4-fpm

RUN apt-get update && apt-get install -y \
      apt-utils \
      pkg-config \
      libpq-dev \
      libpng-dev \
      libjpeg62-turbo-dev \
      libfreetype6-dev \
      libzip-dev \
      libicu-dev \
      libonig-dev \
      zip unzip \
      git

RUN docker-php-ext-configure gd --with-freetype --with-jpeg

RUN docker-php-ext-install -j$(nproc) \
      pdo_mysql \
      bcmath \
      gd \
      zip \
      mbstring \
      exif \
      intl

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY ./_docker/app/php.ini /usr/local/etc/php/conf.d/php.ini

ENV COMPOSER_ALLOW_SUPERUSER=1
RUN curl -sS https://getcomposer.org/installer | php -- \
    --filename=composer \
    --install-dir=/usr/local/bin

WORKDIR /var/www