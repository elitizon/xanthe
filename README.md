# Xanthe is a simple format validator library

## Content

This library contains a set of functions to validate the following commons data entries

- an email address
- an IP V4 address

> Xanthe means “golden” or “yellow” in Greek. Xanthe is an exotic epithet of Demeter, goddess of the harvest and agriculture.

## HOW TO

### Install

```ts
yarn add xanthe
```

### Use

```ts
import { isEmail, isIPv4 } from "xanthe"

const email = "tom@perdu.com"
console.log(isEmail(email))

const ip = "192.168.X.0"
console.log(isIPv4(ip))

```

## LICENCE

MIT

## Authors

[Elitizon Ltd](https://www.elitizon.com)

