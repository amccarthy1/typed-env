import { EnumVar } from '../src/enum'
import { TypedEnv } from '../src/env'
import { IntVar } from '../src/integer'
import { StringVar } from '../src/string'

test('Basic case works', async () => {
  const rawEnv = {
    FOO: 'bar',
    BAR: '12345',
    ENV: 'prod',
  }
  const typedEnv = TypedEnv(
    {
      FOO: StringVar(),
      BAR: IntVar(),
      ENV: EnumVar({ options: ['dev', 'staging', 'prod'] }),
    },
    rawEnv
  )
  expect(typedEnv.FOO).toEqual('bar')
  expect(typedEnv.BAR).toEqual(12345)
  expect(typedEnv.ENV).toEqual('prod')
})
