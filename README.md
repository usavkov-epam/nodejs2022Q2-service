# Home Library Service

## Prerequisites

- **Git** - [Download & Install Git](https://git-scm.com/downloads).
- **Node.js** - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- **Docker** - [Download & Install Docker](https://docs.docker.com/get-docker).

## Downloading

```
git clone https://github.com/usavkov-epam/nodejs2022Q2-service.git
```
If you are checking "Containerization, Docker" task - checkout to the `docker` branch:
```
git checkout docker
```

## Docker

---

Run containers with docker compose:

```bash
npm run docker
```
or
```bash
yarn docker
```
---
Vulnerabilities scanning of the app:

```bash
npm run scan
```
or
```bash
yarn scan
```
---
Vulnerabilities scanning of the db:

```bash
npm run scan:db
```
or
```bash
yarn scan:db
```
---
