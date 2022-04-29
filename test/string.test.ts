import { StringVar } from '../src/string'

test('Test basic parsing', async () => {
  const stringVar = StringVar()
  expect(stringVar.parser('abc')).toEqual('abc')
})

test('Test regex validation', async () => {
  const regexVar = StringVar({ pattern: /^[0-9a-fA-F-]*$/ })
  expect(regexVar.parser('abcdef1234567890')).toEqual('abcdef1234567890')
  expect(() => regexVar.parser('g')).toThrow('Did not match pattern')
})

test('Custom validation works', async () => {
  const maxLengthVar = StringVar({
    validator: (value) => {
      if (value.length > 16) throw new Error('Value too long')
    },
  })
  expect(maxLengthVar.parser('abcdef1234567890')).toEqual('abcdef1234567890')
  expect(() => maxLengthVar.parser('abcdef1234567890-')).toThrow(
    'Value too long'
  )
})
