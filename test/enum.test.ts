import { EnumVar } from '../src/enum'

test('Enums work', async () => {
  const envOptions = ['dev', 'staging', 'prod'] as const
  const enumVar = EnumVar({ options: envOptions })
  expect(enumVar.parser('dev')).toEqual('dev')
  expect(enumVar.parser('staging')).toEqual('staging')
  expect(enumVar.parser('prod')).toEqual('prod')
  expect(() => enumVar.parser('production')).toThrow(
    'Value did not match one of dev,staging,prod'
  )
})
