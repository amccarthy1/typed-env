import { IntVar } from '../src/integer'

describe('IntVar', () => {
  test('can parse base 10 integers', async () => {
    const intvar = IntVar()
    expect(intvar.parser('12345')).toEqual(12345)
    expect(intvar.parser('-54321')).toEqual(-54321)
    expect(() => intvar.parser('1.5')).toThrow()
  })

  test('can parse bases other than 10', async () => {
    const intvar = IntVar()
    expect(intvar.parser('0xffff')).toEqual(0xffff)
    expect(intvar.parser('0b101101101')).toEqual(365)
    expect(() => intvar.parser('0xfffg')).toThrow('not an integer')
  })

  test('throws errors for random garbage', async () => {
    const intvar = IntVar()
    expect(() => intvar.parser('')).toThrow('not an integer')
    expect(() => intvar.parser(' ')).toThrow('not an integer')
    expect(() => intvar.parser('false')).toThrow('not an integer')
  })
})
