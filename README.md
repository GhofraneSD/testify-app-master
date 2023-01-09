## Welcome to the mean stack

The mean stack is intended to provide a simple and fun starting point for cloud native fullstack javascript applications.  
MEAN is a set of Open Source components that together, provide an end-to-end framework for building dynamic web applications; starting from the top (code running in the browser) to the bottom (database). The stack is made up of:

### Pre-requisites

- git - [Installation guide](https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/) .
- node.js - [Download page](https://nodejs.org/en/download/) .
- npm - comes with node or download yarn - [Download page](https://yarnpkg.com/lang/en/docs/install) .
- mongodb - [Download page](https://www.mongodb.com/download-center/community) .

### Installation

```
git clone https://github.com/linnovate/mean
cd mean
cp .env.example .env
yarn
yarn start (for development)
```

### Docker based

> ⚠️ Make sure your Docker version is 19.03.0+.

```
git clone https://github.com/linnovate/mean
cd mean
cp .env.example .env
docker-compose up -d
```