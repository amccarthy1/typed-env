import { DateVar } from '../src/date'
import { EnumVar } from '../src/enum'
import { TypedEnv } from '../src/env'
import { IntVar } from '../src/integer'
import { StringVar } from '../src/string'

describe('TypedEnv', () => {
  test('basic parsing works', async () => {
    const rawEnv = {
      FOO: 'bar',
      BAR: '12345',
      ENV: 'prod',
      SKYRIM_RELEASE_DATE: '11/11/11 Z',
    }
    const typedEnv = TypedEnv(
      {
        FOO: StringVar(),
        BAR: IntVar(),
        ENV: EnumVar({ options: ['dev', 'staging', 'prod'] }),
        skyrimReleaseDate: DateVar({ variable: 'SKYRIM_RELEASE_DATE' }),
      },
      rawEnv
    )
    expect(typedEnv.FOO).toEqual('bar')
    expect(typedEnv.BAR).toEqual(12345)
    expect(typedEnv.ENV).toEqual('prod')
    expect(typedEnv.skyrimReleaseDate).toEqual(new Date('2011-11-11'))
  })

  test('catches missing values', async () => {
    const rawEnv = {
      FOO: 'foo',
    }
    expect(() =>
      TypedEnv(
        {
          FOO: StringVar(),
          BAR: IntVar(),
        },
        rawEnv
      )
    ).toThrow('No value specified for BAR')
  })

  test('throws helpful errors', async () => {
    const rawEnv = {
      FOO: 'a',
    }
    expect(() =>
      TypedEnv({ FOO: StringVar({ pattern: /b/ }) }, rawEnv)
    ).toThrow(
      'Error while parsing env var FOO: Error: Did not match pattern /b/'
    )
  })

  test('Defaults to process.env', async () => {
    const schema = {
      SOME_RANDOM_VAR_NAME: StringVar(),
    } as const
    process.env.SOME_RANDOM_VAR_NAME = 'SOME_VALUE'
    expect(TypedEnv(schema).SOME_RANDOM_VAR_NAME).toEqual('SOME_VALUE')
    delete process.env.SOME_RANDOM_VAR_NAME
  })
})
