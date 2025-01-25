import { Faker } from '@faker-js/faker'
import faker from '@faker-js/faker/locale/en'

export const validAddressRegex = /^0x[a-fA-F0-9]{40}$/
export const validAbbreviatedAddressRegex = /0x[a-fA-F0-9]{4,}[.]{3}[a-fA-F0-9]{4,}/

export const validateAddress = (address: string): string => {
    const lowercaseAddress = address.toLowerCase()
    const with0xAddress = lowercaseAddress.slice(0, 2) === '0x' ? lowercaseAddress : `0x${lowercaseAddress}`
    if (!validAddressRegex.test(with0xAddress)) {
        throw new Error(`Invalid address: ${address}. Only evm addresses are supported.`)
    }
    return with0xAddress
}

function getFaker(address: string): Faker {
    const normalizedAddress = validateAddress(address)

    // faker needs a number, and javascript loses precision at 15 hexedecimal digits
    const sixteenOnly = normalizedAddress.slice(2, 17)

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
 * @param looseValidation - if true, allows abbreviated addresses in the format 0x1234...5678
 * @returns an object with name, first name, middle name, last name, and prefix
 */
function addressToNameObject(address: string, looseValidation = false): NameObject {
    // If using loose validation and the address matches the abbreviated format
    if (looseValidation && validAbbreviatedAddressRegex.test(address)) {
        // Use the parts we have to generate the name
        const [start, end] = address.split('...')
        // Get the useful numbers (4 after 0x from start, and 4 from end)
        const startNums = start.slice(2)
        const endNums = end
        // We need 40 chars total after 0x. We have 8 chars (4 + 4), need 32 more
        // Repeat the pattern 8 times to fill the middle (8 * 4 = 32)
        const middlePadding = (startNums + endNums).repeat(4)
        const paddedAddress = '0x' + startNums + middlePadding + endNums

        // Validate we have exactly 42 chars (0x + 40)
        if (paddedAddress.length !== 42) {
            throw new Error('Generated address has incorrect length')
        }

        const faker = getFaker(paddedAddress)
        return getNameObject(faker)
    }

    const faker = getFaker(address)
    return getNameObject(faker)
}

export { addressToName, addressToNameObject }
