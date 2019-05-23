# Quiz App

A quiz app using nodejs with expressjs and reactjs

## Installation

Must have:
- Nodejs version 8.x ([How to install](https://www.hugeserver.com/kb/install-nodejs8-centos7-debian8-ubuntu16/))
- MongoDB ([How to install](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-centos-7))
- Yarn
```bash
npm install yarn -g
```
## Usage

- Config `.env `
```bash
PORT=3000
MONGODB_HOST=localhost
MONGODB_PORT=2701
```
- Install packet via `yarn`
```bash
yarn install
```
- Build with `webpack`:
```bash
yarn build
```

- Start `app`:
```bash
yarn start
```
### Using PM2
```bash
npm install pm2 -g
```
```bash
pm2 start yarn -- start
