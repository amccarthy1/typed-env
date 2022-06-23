import { BoolVar } from '../src/boolean'

describe('BoolVar', () => {
  test('Can read common true values', async () => {
    const boolvar = BoolVar()
    const trueValues = ['TRUE', '1', 'yes', 'Y', 'oN']
    trueValues.forEach((v: string) => expect(boolvar.parser(v)).toBe(true))
  })

  test('Can read common false values', async () => {
    const boolvar = BoolVar()
    const trueValues = ['FALSE', '0', 'no', 'N', 'oFF']
    trueValues.forEach((v: string) => expect(boolvar.parser(v)).toBe(false))
  })

  test('Fails for invalid values', () => {
    const boolvar = BoolVar()
    const badValues = ['bad', 'nope', 'good', 'potato']
    badValues.forEach((v: string) =>
      expect(() => boolvar.parser(v)).toThrow(
        'Value did not match a valid boolean format!'
      )
    )
  })
})
