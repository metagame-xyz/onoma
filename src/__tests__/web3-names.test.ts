import {
    addressToName,
    addressToNameObject,
    validAbbreviatedAddressRegex,
    validAddressRegex,
    validateAddress,
} from '../index'

const addressUppercaseWith0x = '0x17A059B6B0C8af433032d554B0392995155452E6'
const addressUppercaseWithout0x = '17A059B6B0C8af433032d554B0392995155452E6'
const addressLowercaseWith0x = '0x17a059b6b0c8af433032d554b0392995155452e6'
const addressLowercaseWithout0x = '17a059b6b0c8af433032d554b0392995155452e6'

const brennerNameObject = {
    name: 'Ana Boyle',
    prefix: 'Dr.',
    firstName: 'Ana',
    middleName: 'Alex',
    lastName: 'Boyle',
}

const miguelNameObject = {
    name: 'Gloria Klein',
    firstName: 'Gloria',
    lastName: 'Klein',
}

const miguelAddress = '0xe340b00b6b622c136ffa5cff130ec8edcddcb39d'

const big1 = '0xfffffffffffff000000000000000000000000000'
const big2 = '0xffffffffffffe000000000000000000000000000'
const small1 = '0x0000000000000000000000000000000000000000'
const small2 = '0x0000000000001000000000000000000000000000'

describe('validateAddress', () => {
    test('handles various address formats', () => {
        expect(validateAddress(addressUppercaseWith0x)).toBe(addressLowercaseWith0x)
        expect(validateAddress(addressUppercaseWithout0x)).toBe(addressLowercaseWith0x)
        expect(validateAddress(addressLowercaseWith0x)).toBe(addressLowercaseWith0x)
        expect(validateAddress(addressLowercaseWithout0x)).toBe(addressLowercaseWith0x)
    })

    test('throws on invalid addresses', () => {
        expect(() => validateAddress('invalid')).toThrow()
        expect(() => validateAddress('0xinvalid')).toThrow()
        expect(() => validateAddress('0x123')).toThrow()
        expect(() => validateAddress('66WJDgCrc3SwUXdstY6u5wAnxRyWRT8veawJNfn6QxKo')).toThrow() // solana address
    })
})

describe('address regex', () => {
    test('validAddressRegex matches valid addresses', () => {
        expect(validAddressRegex.test(addressUppercaseWith0x)).toBe(true)
        expect(validAddressRegex.test(addressLowercaseWith0x)).toBe(true)
        expect(validAddressRegex.test('0x1234567890123456789012345678901234567890')).toBe(true)
        expect(validAddressRegex.test('invalid')).toBe(false)
        expect(validAddressRegex.test('0x123')).toBe(false)
    })

    test('validAbbreviatedAddressRegex matches abbreviated addresses', () => {
        expect(validAbbreviatedAddressRegex.test('0x1234...5678')).toBe(true)
        expect(validAbbreviatedAddressRegex.test('0x12345...67890')).toBe(true)
        expect(validAbbreviatedAddressRegex.test('0x123...456')).toBe(false)
        expect(validAbbreviatedAddressRegex.test('invalid')).toBe(false)
    })
})

describe('addressToName', () => {
    test('returns consistent names for various address formats', () => {
        const name1 = addressToName(addressUppercaseWith0x)
        const name2 = addressToName(addressUppercaseWithout0x)
        const name3 = addressToName(addressLowercaseWith0x)
        const name4 = addressToName(addressLowercaseWithout0x)

        expect(name1).toEqual(brennerNameObject.name)
        expect(name1).toEqual(name2)
        expect(name1).toEqual(name3)
        expect(name1).toEqual(name4)

        const miguelName = addressToName(miguelAddress)
        expect(miguelName).toEqual(miguelNameObject.name)

        expect(addressToName(big1)).not.toEqual(addressToName(big2))
        expect(addressToName(small1)).not.toEqual(addressToName(small2))

        // solana address, don't know how to parse these into a number, someone please add this
        expect(() => addressToName('66WJDgCrc3SwUXdstY6u5wAnxRyWRT8veawJNfn6QxKo')).toThrow()
    })
})

describe('addressToNameObject', () => {
    test('returns consistent name objects for various address formats', () => {
        const name1 = addressToNameObject(addressUppercaseWith0x)
        const name2 = addressToNameObject(addressUppercaseWithout0x)
        const name3 = addressToNameObject(addressLowercaseWith0x)
        const name4 = addressToNameObject(addressLowercaseWithout0x)

        expect(name1).toEqual(brennerNameObject)
        expect(name2).toEqual(brennerNameObject)
        expect(name3).toEqual(brennerNameObject)
        expect(name4).toEqual(brennerNameObject)
    })

    test('generates different names for different addresses', () => {
        expect(addressToNameObject(big1)).not.toEqual(addressToNameObject(big2))
        expect(addressToNameObject(small1)).not.toEqual(addressToNameObject(small2))
    })

    test('handles abbreviated addresses with looseValidation', () => {
        const abbreviated = '0x17a0...52e6'
        expect(() => addressToNameObject(abbreviated, false)).toThrow()

        const nameObject = addressToNameObject(abbreviated, true)
        expect(nameObject).toHaveProperty('name')
        expect(nameObject).toHaveProperty('prefix')
        expect(nameObject).toHaveProperty('firstName')
        expect(nameObject).toHaveProperty('middleName')
        expect(nameObject).toHaveProperty('lastName')

        // Should be consistent for same abbreviated address
        expect(addressToNameObject(abbreviated, true)).toEqual(nameObject)
    })

    test('throws for invalid abbreviated addresses even with looseValidation', () => {
        expect(() => addressToNameObject('0x123...456', true)).toThrow() // too short
        expect(() => addressToNameObject('0xinvalid...format', true)).toThrow()
    })
})
