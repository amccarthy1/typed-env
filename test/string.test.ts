import { StringVar } from '../src/string'

describe('StringVar', () => {
  test('can handle basic strings', async () => {
    const stringVar = StringVar()
    expect(stringVar.parser('abc')).toEqual('abc')
  })

  test('can validate regex', async () => {
    const regexVar = StringVar({ pattern: /^[0-9a-fA-F-]*$/ })
    expect(regexVar.parser('abcdef1234567890')).toEqual('abcdef1234567890')
    expect(() => regexVar.parser('g')).toThrow('Did not match pattern')
  })
})
