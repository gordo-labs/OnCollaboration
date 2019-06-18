# On Collaboration

## How to deploy the project

##Step 1: Building the working framework

#### Windows:
Install package manager:
https://chocolatey.org/install

#### MacOS:
Install package manager:
https://brew.sh/index_es

###Step 2: Installing global dependencies

#### Windows:

##### Installing NodeJS
In cmd:
```
choco install nodejs.install
```

##### Installing Git
In cmd:
```
choco install git.install
```

#### MacOS:

##### Installing NodeJS
In the terminal:
```
brew install node
```

##### Installing Git
In the terminal:
``` bash
brew install git
```

##Step 3: Building project dependencies 
(All of these are commands in the terminal / cmd)

We are using a front-end javascript framework called [Vue.js](https://vuejs.org/).
This javascript abstraction offers the posibility to work with websites as independent elements that gets nearer to design, faster and an amazing performance.

And over it, a framework build with Vue.js called [NUXT](https://nuxtjs.org/). This framework charges Vue.js with the tools to maintain SEO and prebuild HTML views instead of load ll dinamically.

Installing Vue.js 
``` bash
npm install -g vue-cli
```

##Step 4: Downloading project files (git & github)

Create the project folder in which it will be located

``` bash
# download the project
$ git clone https://github.com/sergormo/OnCollaboration

# go into de project
$ git clone https://github.com/sergormo/OnCollaboration
```


##Step 5: Installing dependency files

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
