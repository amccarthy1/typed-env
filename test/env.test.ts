import { BoolVar } from '../src'
import { DateVar } from '../src'
import { EnumVar } from '../src'
import { optional, TypedEnv } from '../src'
import { IntVar } from '../src'
import { StringVar } from '../src'

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

  test('catches missing non-optional values', async () => {
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

  test('supports default values', async () => {
    const rawEnv = {}
    expect(
      TypedEnv(
        {
          FOO: StringVar({ defaultValue: 'foo' }),
          BAR: IntVar({ defaultValue: 42 }),
          SKYRIM_RELEASE_DATE: DateVar({
            defaultValue: new Date('2011-11-11'),
          }),
          FEELING: EnumVar({
            options: ['happy', 'sad'],
            defaultValue: 'happy',
          }),
          DEBUG: BoolVar({ defaultValue: false }),
        },
        rawEnv
      )
    ).toEqual({
      FOO: 'foo',
      BAR: 42,
      SKYRIM_RELEASE_DATE: new Date('2011-11-11'),
      FEELING: 'happy',
      DEBUG: false,
    })
  })

  test('handles default values with aliased variables', async () => {
    const schema = {
      A: StringVar({ variable: 'B', defaultValue: 'Default Value' }),
    }
    // If A is defined, use default
    const envWithA = {
      A: 'Real Value',
    }
    // If B is defined, use B as A
    const envWithB = {
      B: 'Real Value',
    }
    expect(TypedEnv(schema, envWithA).A).toEqual('Default Value')
    expect(TypedEnv(schema, envWithB).A).toEqual('Real Value')
  })

  test('handles optional variables', async () => {
    const rawEnv = {
      A: 'A',
    }
    expect(
      TypedEnv(
        {
          A: optional(StringVar()),
          B: optional(StringVar()),
        },
        rawEnv
      )
    ).toEqual({
      A: 'A',
      B: null,
    })
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
