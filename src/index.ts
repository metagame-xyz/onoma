import { Faker } from '@faker-js/faker'
import faker from '@faker-js/faker/locale/en'

const validAddress = new RegExp(/^0x[a-fA-F0-9]{40}$/)

export const validateAddress = (address: string): string => {
    const lowercaseAddress = address.toLowerCase()
    const with0xAddress = lowercaseAddress.slice(0, 2) === '0x' ? address : `0x${address}`
    if (!validAddress.test(with0xAddress)) {
        throw new Error(`Invalid address: ${address}. Only evm addresses are supported.`)
    }
    return with0xAddress
}

function getFaker(address: string): Faker {
    const normalizedAddress = validateAddress(address)

    // faker needs a number, and javascript loses precision at 15 hexedecimal digits
    const sixteenOnly = normalizedAddress.slice(0, 15)

    const number = parseInt(sixteenOnly, 16)

    faker.seed(number)
    return faker
}

export type NameObject = {
    name: string
    prefix: string
    firstName: string
    middleName: string
    lastName: string
}

function getNameObject(faker: Faker): NameObject {
    // every time you call a function on faker, it shakes the dice. If we want to add more things about the name, they must get added below the last call to faker
    const firstName = faker.name.firstName()
    const middleName = faker.name.middleName()
    const lastName = faker.name.lastName()
    const prefix = faker.name.prefix()

    return {
        name: firstName + ' ' + lastName,
        prefix,
        firstName,
        middleName,
        lastName,
    }
}

/**
 * returns a deterministic name based on the address. ex: "Felicita Feeney"
 *
 * @param address - the address to convert to a name
 * @returns a first and last name
 */
function addressToName(address: string): string {
    const faker = getFaker(address)
    const nameObject = getNameObject(faker)
    return nameObject.name
}

/**
 * returns a deterministic name object based on the address
 *
 * @param address - the address to convert to a name object
 * @returns an object with name, first name, middle name, last name, and prefix
 */
function addressToNameObject(address: string): NameObject {
    const faker = getFaker(address)
    return getNameObject(faker)
}

export { addressToName, addressToNameObject }
