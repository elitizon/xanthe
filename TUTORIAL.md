# How to tutorial

## Step by step tutorial

**This tutorial explains:**

- How to configure a typescript package from zero
- How to add the support of Jest for the unit tests
- How to publish the library in [npmjs.com](https://www.npmjs.com/)
- How to generate the tests coverage
- How to use the package once it has been published

### Create a package.json file

```json
{
  "name": "format-validator",
  "version": "0.0.1",
  "author": {
    "email": "contact@elitizon.com",
    "name": "elitizon"
  },
  "license": "MIT",
  "description": "A library to validate common formats such as emails, numbers, phone numbers, and IP addresses",
  "contributors": [
    "raphaelmansuy"
  ],
  "keywords": [
    "format",
    "validator",
    "email validation",
    "phone number validation",
    "IP address validation"
  ],
  "dependencies": {},
  "devDependencies": {}
}

```

### Install typescript as a development dependencies

```bash
yarn add -D typescript
```

### Create the src and test directory

```bash
mkdir src
```

```bash
mkdir tests
```

## Install a testing environment

### Install Jest as a development dependency

> [Jest](!https://github.com/facebook/jest) is a testing library developed by Facebook.

```bash
yarn add -D jest ts-jest
```

### Create a jest.config.js file to configure Jest


```js
module.exports = {
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testEnvironment: 'node',
  testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}
```

- All the files ending by **.ts** will be handled by **ts-jest**.
- The test environment is **nodejs**
- The test files are situed in the **./tests** and must have **.test.** or **.spec.** in the filename and must end by **.ts** or **.tsx**

### Create a script section in the package.json file

```json
  "scripts": {
    "build": "tsc",
    "test": "yarn build && jest",
    "coverage": "jest --coverage"
  },
```

- **build**: invoke the typescript transpiler
- **test**: build and invoke the tests
- **coverage**: generate the tests coverage in the *coverage directory*

### Create a tsconfig.json file to configure typescript

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    "outDir": "./build",                        /* Redirect output structure to the directory. */
    "strict": true,                           /* Enable all strict type-checking options. */
    /* Advanced Options */
    "skipLibCheck": true,                     /* Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true  /* Disallow inconsistently-cased references to the same file. */
  }
}
```

The **build command** will generate the CommonJS files in the *./build/* directory

### Creation of the validations functions

#### Create a file email.ts in ./src/validators/ directory

```ts

/**
 * @param email to validate. No spaces or tab or is allowed at the start or at the end of the string
 * @returns true of false if the email is valid or not
 */
function isEmail(email: string) : boolean {
  // An email address is a word followed by an unique @ followed by a word then a . followed by a word with a length from 2 to 3 characters
  const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const result = regEx.test(email)
  return result
}


export {
  isEmail
}
```

#### Create a file ipV4.js in ./src/validators/ directory

```ts

/**
 * @param ip to validate. (No spaces or tab or is allowed at the start or at the end of the string)
 * @returns true of false if the IP is valid or not
 */
function isIPv4(ip: string) : boolean {
  // An ip V4 address has the form of X.X.X.X
  // Where X is a number between 0 to 255
  const regEx = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  const result = regEx.test(ip)
  return result
}


export {
  isIPv4
}
```

#### Create a file index.ts in ./src/

```ts
import { isEmail } from "./validators/email"
import { isIPv4 } from "./validators/ipv4"

export { isEmail, isIPv4 }
```

Our module is now nearly ready lets create the unit tests.

### Creation of the unit tests

#### Create the email.test.ts in ./src/tests directory

```ts
import { isEmail } from "../src/index"

test("email luc@perdu.com valid", () => {
  expect(isEmail("luc@perdu.com")).toBe(true)
})

test("Empty string not valid", () => {
  expect(isEmail("")).toBe(false)
})

test("No double @ in an email", () => {
  expect(isEmail("martin@toto@titi.com")).toBe(false)
})

test("not trimed email to be false", () => {
  expect(isEmail(" luc@perdu.com ")).toBe(false)
})

```

### Create the ipV4.test.ts in ./src/tests/ directory

```ts
import { isIPv4 } from "../src"

test("192.168.0.1 is valid", () => {

    expect(isIPv4("192.168.0.1")).toBe(true)
})

test("1920.168.0.1 is not valid", () => {

  expect(isIPv4("1920.168.0.1")).toBe(false)
})

test("192.1682.0.1 is not valid", () => {

  expect(isIPv4("192.1682.0.1")).toBe(false)
})

test("192.168.256.1 is not valid", () => {

  expect(isIPv4("192.168.256.1")).toBe(false)
})

test("192.168.255.500 is not valid", () => {

  expect(isIPv4("192.168.255.500")).toBe(false)
})

test("192.168.255.255 is valid", () => {
  expect(isIPv4("192.168.255.255")).toBe(true)
})

test("192.168.X.255 is valid", () => {
  expect(isIPv4("192.168.X.255")).toBe(false)
})

```

#### Let's compile and tests

```bash
yarn build
```

```bash
yarn test
```

#### Execute the tests coverage

```bash
yarn coverage
```

A *coverage* has been generated with all the information about the tests coverage

### Creation of git repository

#### Create of a .gitignore file

```text
node_modules
build
coverage
```

#### run git init

```bash
git init
```

#### add the files

```bash
git *
```

### commit the files

```bash
git commit -m "First commit"
```

### Publish the file to a Github repository

An empty Github project must be created before publishing.

The file ```package.json``` need to be updated as follow:

```json
  "repository": {
    "url": "https://github.com/myorganisation/simple-format-validator.git",
    "type": ""
  },
```

> *myorganisation* represents your Github account

We can know set the Github project as the remote representation of the local project, and push the local master branch to the remote server (origin).

```bash
git remote add origin`https://github.com/myorganisation/simple-format-validator.git
git branch -M master
git push -u origin master
```

### Publish to npmjs.org

An account must be created before publishing a package in the npm registry.

- Once the account created you need to log into

```bash
npm login
```

- Enter your username, password, and email address registered on npmjs.org

- Modify the ```package.json``as follow

```json
  "scripts": {
    "build": "tsc",
    "test": "yarn build && jest",
    "coverage": "jest --coverage",
    "prepublish": "tsc",
    "publish": "npm publish --access=public"
  },
```

> We have added the **publish** script to publish to npmjs.org with public access.

- We can now publish to the library to npmjs.org

```bash
yarn publish
```

A few questions will be asked such as the new version number 0.0.0.1



