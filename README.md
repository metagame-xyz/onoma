[![GitHub license](https://img.shields.io/github/license/the-metagame/onoma)](https://github.com/the-metagame/onoma/blob/main/LICENSE)

# onoma
a library for deterministically turning web3 addresses into names


# Why?

## Why is it called onoma?

Onomastics is the study of the history and origin of proper names, especially personal names.

(shoutout to [0xmts](https://twitter.com/0xmts) for the name)

## Why did Metagame build this?
During Metagame's work on making transactions more human readable, we found ourselves often using the first 6 characters of an address as the wallet/contract's "name" when it didn't have an ENS associated with it. This is much harder to make an association with than a *real* name, so thought we'd give every wallet a name!



# Installation

```zsh
npm add onoma
```

```zsh
yarn add onoma
```

# Usage

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

// You can also use abbreviated addresses with looseValidation
const abbreviatedAddress = '0x17A0...52E6'
const nameObjFromAbbr = addressToNameObject(abbreviatedAddress, true) // Pass true for looseValidation

console.log(nameObjFromAbbr)
// Returns a different result than the full address above, but a name nonetheless. Use only when you can't get the full address.

# Notes

Currently only supports 40 char hexidecimal addresses (EVM wallet addresses). Would be great if someone wanted to add support for other types of addresses :)

It can handle:
- Addresses with or without the `0x` prefix
- Both lowercase and uppercase addresses
- Abbreviated addresses in the format `0x1234...5678` when using `looseValidation`
