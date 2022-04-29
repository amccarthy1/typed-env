import type { Declaration } from './types'

const parseValue = <T>(
  [key, declaration]: [string, Declaration<T>],
  env: Record<string, string | undefined>
) => {
  const envVarName = declaration.variable ?? key
  const envValue = env[envVarName]
  if (typeof envValue === 'undefined') {
    throw new Error(`No value specified for ${envVarName}`)
  }
  try {
    return [key, declaration.parser(envValue)] as [string, T]
  } catch (error) {
    throw new Error(`Error while parsing env var ${envVarName}: ${error}`)
  }
}

export function TypedEnv<T extends Record<string, unknown>>(
  declarations: {
    [E in keyof T]: Declaration<T[E]>
  },
  values?: Record<string, string>
): T {
  const env = values ?? process.env
  const result = Object.fromEntries(
    Object.entries(declarations).map(
      ([key, declaration]: [string, Declaration<unknown>]) =>
        parseValue([key, declaration], env)
    )
  )
  return result as T
}
