[![GitHub license](https://img.shields.io/github/license/the-metagame/web3-names)](https://github.com/the-metagame/web3-names/blob/main/LICENSE)

# web3-names

a library for making web3 addresses more human-readable

# installation

```zsh
npm add web3-names
```

```zsh
yarn add web3-names
```

# usage

```typescript
import { addressToName, addressToNameObject } from 'web3-names'

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
