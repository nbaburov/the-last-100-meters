#!/usr/bin/env bash
# Showcase CI: what "builds and runs from a clean checkout" means for this repository.
# Called by the shared workflow in nbaburov/.github; run it locally with `bash ci.sh`.
# Every check runs in a pinned container, so the result does not depend on the machine.
set -euo pipefail
cd "$(dirname "$0")"

net=l100-ci
trap 'code=$?; [ $code -ne 0 ] && docker compose logs --no-color; docker compose down -v >/dev/null 2>&1; docker rm -f l100-ci-db >/dev/null 2>&1; docker network rm $net >/dev/null 2>&1; rm -f .env; exit $code' EXIT

echo "== Backend tests"
docker network create $net >/dev/null
docker run -d --name l100-ci-db --network $net -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=interoff_db mysql:8.0 >/dev/null
for _ in $(seq 1 60); do docker exec l100-ci-db mysqladmin ping -h localhost -uroot -proot --silent >/dev/null 2>&1 && break; sleep 2; done
docker run --rm --network $net -v "$PWD/backend":/w -v /w/.gradle -v /w/build -w /w \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://l100-ci-db:3306/interoff_db -e SPRING_DATASOURCE_USERNAME=root -e SPRING_DATASOURCE_PASSWORD=root \
  eclipse-temurin:17-jdk ./gradlew --no-daemon test

echo "== Stack boot"
printf 'MYSQL_ROOT_PASSWORD=ci-root\nMYSQL_PASSWORD=ci-app\n' > .env
docker compose up -d --build
for _ in $(seq 1 60); do curl -sf -o /dev/null localhost:8080/docs && break; sleep 5; done

echo "== Smoke"
curl -sf localhost:8080/maps/1 > /dev/null
route=$(curl -sf -X GET localhost:8080/maps/solve/1 -H 'Content-Type: application/json' -d '{"floor":1,"row":3,"col":5}')
echo "route $route"
test "$route" = "RRRRR^DDL"
curl -sf -X POST localhost:8080/packages/8710993009240 > /dev/null
curl -sf -o /dev/null localhost:5173
