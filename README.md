npx create-next-app@latest



npm i --save-dev prisma@latest
npm i @prisma/client@latest 


npx prisma migrate dev --name init
npx prisma generate


npx prisma migrate save --name add_index_content
npx prisma migrate up


openssl rand -base64 32



ln -s ~/Desktop/images/profile/ /public/images/profile

npm i next@latest react@latest react-dom@latest eslint-config-next@latest