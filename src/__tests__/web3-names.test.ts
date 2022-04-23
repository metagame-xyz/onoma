import { addressToName, addressToNameObject } from '../index'

const addressUppercaseWith0x = '0x17A059B6B0C8af433032d554B0392995155452E6'
const addressUppercaseWithout0x = '17A059B6B0C8af433032d554B0392995155452E6'
const addresslowercaseWith0x = '0x17a059b6b0c8af433032d554b0392995155452e6'
const addresslowercaseWithout0x = '17a059b6b0c8af433032d554b0392995155452e6'

const brennerNameObject = {
    name: 'Felicita Feeney',
    prefix: 'Miss',
    firstName: 'Felicita',
    middleName: 'Micah',
    lastName: 'Feeney',
}

const miguelNameObject = {
    name: 'Augusta Schuppe',
    prefix: 'Ms.',
    firstName: 'Augusta',
    middleName: 'Shawn',
    lastName: 'Schuppe',
}

const miguelAddress = '0xe340b00b6b622c136ffa5cff130ec8edcddcb39d'

const big1 = '0xfffffffffffff000000000000000000000000000'
const big2 = '0xffffffffffffe000000000000000000000000000'
const small1 = '0x0000000000000000000000000000000000000000'
const small2 = '0x0000000000001000000000000000000000000000'

test('addressToName', () => {
    const name1 = addressToName(addressUppercaseWith0x)
    const name2 = addressToName(addressUppercaseWithout0x)
    const name3 = addressToName(addresslowercaseWith0x)
    const name4 = addressToName(addresslowercaseWithout0x)

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

test('addressToNameObject', () => {
    const name1 = addressToNameObject(addressUppercaseWith0x)
    const name2 = addressToNameObject(addressUppercaseWithout0x)
    const name3 = addressToNameObject(addresslowercaseWith0x)
    const name4 = addressToNameObject(addresslowercaseWithout0x)

    expect(name1).toEqual(brennerNameObject)

    expect(addressToNameObject(big1)).not.toEqual(addressToNameObject(big2))
    expect(addressToNameObject(small1)).not.toEqual(addressToNameObject(small2))
})
