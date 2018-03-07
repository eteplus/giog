# Giog

> This Blog built with Vue 2.x, vue-router & vuex  with server-side rendering by koa.

> It's powered by Github Issues and use github GraphQL API v4

## Init Setup

Required:

* node >= 8.9.4
* npm >= 5.6.0

```bash
# install dependencies
npm install # or yarn
```

1. Modify config/config.js.

```js
userInfo: {
  github: 'https://github.com/eteplus',
  userName: 'ETEPLUS',
  avatar: '/static/img/avatar.jpeg',
  motto: 'Designer and Coder. ^_^',
},

siteInfo: {
  name: 'ETEPLUS',
  // website record number - ICP备xxxxx号
  recordText: ''
}
```

2. Copy config/github.example.json to config/github.json and modify it.

> Apply accessToken -> [Page](https://github.com/settings/tokens) -> Personal access tokens -> Generate new token

> pageSize: The number of synchronizations per page

```json
{
  "accessToken": "github accessToken",
  "owner": "github username",
  "repository": "issues repository",
  "pageSize": 8
}
```

3. Excute Database migrate and sync issues

```bash
npm run db:migrate

npm run sync
```

Reverse:

> All data will be cleared, u need to re-excute the above operation

```bash
npm run db:migrate:undo
```

## Build Setup

```bash

# serve in dev mode, with hot reload at 127.0.0.1:3030
npm run dev

# build for production
npm run build

# serve in production mode
npm start
```

## Deploy Setup

Modify pm2.json and use pm2 to manage the application

```bash
pm2 startOrReload pm2.json
```

## Author

**Giog** © [ETEPLUS](https://github.com/eteplus), Released under the [MIT](https://github.com/eteplus/giog/blob/master/LICENSE) License
