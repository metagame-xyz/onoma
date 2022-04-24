[![GitHub license](https://img.shields.io/github/license/the-metagame/onoma)](https://github.com/the-metagame/onoma/blob/main/LICENSE)

# onoma

a library for making web3 addresses more human-readable

# installation

```zsh
npm add onoma
```

```zsh
yarn add onoma
```

# usage

```typescript
import { addressToName, addressToNameObject } from 'onoma'

const address = '0x17A059B6B0C8af433032d554B0392995155452E6'

const name = addressToName(address)

console.log(name)
// Felicita Feeney

const nameObj = addressToNameObject(address)

console.log(nameObj)

/*
 {
    name: 'Felicita Feeney',
    prefix: 'Miss',
    firstName: 'Felicita',
    middleName: 'Micah',
    lastName: 'Feeney'
 }
*/
```

# notes

Currently only supports 40 char hexidecimal addresses (EVM wallet addresses). Would be great if someone wanted to add support for other types of addresses :)

It can handle addresses with or without the `0x` prefix, and both lowercase and uppercase.
