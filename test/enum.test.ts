import { EnumVar } from '../src/enum'

describe('EnumVar', () => {
  const envOptions = ['dev', 'staging', 'prod'] as const
  const enumVar = EnumVar({ options: envOptions })

  test('can handle success cases', async () => {
    expect(enumVar.parser('dev')).toEqual('dev')
    expect(enumVar.parser('staging')).toEqual('staging')
    expect(enumVar.parser('prod')).toEqual('prod')
  })

  test('can handle failure cases', async () => {
    expect(() => enumVar.parser('production')).toThrow(
      'Value did not match one of dev,staging,prod'
    )
  })
})
