FROM composer:2 AS phpbuild
COPY src/* /app

RUN composer install --ignore-platform-reqs

FROM bitnami/laravel:11.0.6 AS runner

COPY --from=phpbuild /app /app