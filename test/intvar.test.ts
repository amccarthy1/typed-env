import { IntVar } from '../src/integer'

test('Test base 10 int var parsing', async () => {
  const intvar = IntVar()
  expect(intvar.parser('12345')).toEqual(12345)
  expect(intvar.parser('-54321')).toEqual(-54321)
  expect(() => intvar.parser('1.5')).toThrow()
})

test('Test other bases parsing', async () => {
  const intvar = IntVar()
  expect(intvar.parser('0xffff')).toEqual(0xffff)
  expect(intvar.parser('0b101101101')).toEqual(365)
  expect(() => intvar.parser('0xfffg')).toThrow('not an integer')
})

test('Test random garbage', async () => {
  const intvar = IntVar()
  expect(() => intvar.parser('')).toThrow('not an integer')
  expect(() => intvar.parser(' ')).toThrow('not an integer')
  expect(() => intvar.parser('false')).toThrow('not an integer')
})
