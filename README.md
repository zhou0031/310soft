npx create-next-app@latest

npm i --save-dev prisma@latest
npm i @prisma/client@latest

npx prisma migrate dev --name init
npx prisma generate

npx prisma migrate dev --name add-newField
npx prisma generate

openssl rand -base64 32

npm i next@latest react@latest react-dom@latest eslint-config-next@latest
