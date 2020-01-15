import { initializeReminder, isDateValid} from './utils'

describe('initializeReminder', () => {
    test('initializeReminder to return an object', () => {
        expect(typeof initializeReminder()).toBe('object')
    })
})

describe('isDateValid', () => {
    test('expect string with length less than 8 to return false', () => {
        expect(isDateValid('1234567')).toBe(false)
    })

    test('expect string with length more than 10 to return false', () => {
        expect(isDateValid('12345678910')).toBe(false)
    })

    test('expect string with length 8 return true', () => {
        expect(isDateValid('1/1/2039')).toBe(true)
    })

    test('expect string with length 9 return true', () => {
        expect(isDateValid('01/1/2039')).toBe(true)
    })

    test('expect string with length 10 return true', () => {
        expect(isDateValid('01/01/2039')).toBe(true)
    })

    test('expect string with a day less than 1 to return false', () => {
        expect(isDateValid('00/01/2039')).toBe(false)
    })

    test('expect string with a day more than 31 to return false', () => {
        expect(isDateValid('32/01/2039')).toBe(false)
    })

    test('expect string with month less than 0 to return false', () => {
        expect(isDateValid('00/-1/2039')).toBe(false)
    })

    test('expect string with month more than 11 to return false', () => {
        expect(isDateValid('00/12/2039')).toBe(false)
    })

    test('expect string with year less than current year to return false', () => {
        expect(isDateValid('00/12/2019')).toBe(false)
    })

    test('expect string with year more than 2040 to return false', () => {
        expect(isDateValid('00/12/2041')).toBe(false)
    })

    test('expect string with future date to return true', () => {
        expect(isDateValid('12/12/2040')).toBe(true)
    })
})

