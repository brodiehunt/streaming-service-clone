# Streaming service clone Nextjs app

A full-stack web application clone of 9Now (Channel 9's streaming service) built with NextJS.

## Techstack

### Core

- Nextjs 14
- React 18
- Typescript
- PostgreSQL
- Prisma ORM

### State Management and forms

- Jotai
- React Hook Form
- Zod

### Authentication

- Oslo - Auth utilities
- bycryptjs - password hashing
- Resend - Email service for password reset/passwordless login

### Styling

- Styled Components (For client)
- Tailwind css

### Development and Testing

- Jest
- React Testing Library
- ESLint & Prettier
- Husky and lint-staged - git hooks

## Getting started

### Docker Development (Recommended)

#### Prequisites

- Docker desktop [Get Docker Here](https://www.docker.com/)
- Node.js 18+

#### Set up

1. Clone this repository

```
  git clone git@github.com:brodiehunt/streaming-service-clone.git
```

2. Install the dependencies

```
  npm i
```

3. Create a .env file in the root directory with the following

```
  POSTGRES_USER=postgres
  POSTGRES_PASSWORD=postgrespassword
  POSTGRES_DB=nine_now
  RESEND_API_KEY=your_resend_api_key  (Only required for password reset and passwordless sign in)
```

4. Start the development environment

```
  docker compose up --build
```

5. Seed the database

```
  docker compose exec app npm run db:seed
```

### Local Development

#### Prequisites

- A postgresql db
- Node.js 18+

#### Set up

1. Clone this repository

```
  git clone git@github.com:brodiehunt/streaming-service-clone.git
```

2. Install the dependencies

```
  npm i
```

3. Create a .env file in the root directory with the following

```
  DATABASE_URL=your_local_db_url
  RESEND_API_KEY=your_resend_api_key  (Only required for password reset and passwordless sign in)
```

4. Generate the prisma client, run migration and seed the db

```
  npx prisma generate
  npx prisma migrate deploy
  npm run db:seed
```

5. Start the dev server

```
  npm run dev
```
