import type { Declaration } from './types'

const parseValue = <T>(
  [key, declaration]: [string, Declaration<T>],
  env: Record<string, string | undefined>
) => {
  const envVarName = declaration.variable ?? key
  const envValue = env[envVarName]
  if (typeof envValue === 'undefined') {
    if (typeof declaration.defaultValue === 'undefined') {
      throw new Error(`No value specified for ${envVarName}`)
    }
    if (declaration.validator) declaration.validator(declaration.defaultValue)
    return [key, declaration.defaultValue]
  }
  try {
    const value: T = declaration.parser(envValue)
    if (declaration.validator) declaration.validator(value)
    return [key, value]
  } catch (error) {
    throw new Error(`Error while parsing env var ${envVarName}: ${error}`)
  }
}

export function optional<T>({
  parser,
  defaultValue,
  validator,
  ...others
}: Declaration<T>): Declaration<T | null> {
  return {
    parser,
    defaultValue: defaultValue || null,
    validator:
      validator &&
      ((value: T | null) => {
        if (value !== null) {
          validator(value)
        }
      }),
    ...others,
  }
}

/**
 * Construct a TypedEnv object given a schema and, optionally,
 * a record of string values from which to read variables.
 *
 * @param schema An object representing variables to parse.
 * By default, schema keys should match environment variable names,
 * but you can override this by passing the optional `variable`
 * property to a variable declaration.
 * E.G. `numThreads: IntVar({variable: NUM_THREADS})`
 *
 * @param values Pass an object to use that instead of `process.env`.
 * Useful for testing or cases where your application is configured
 * using something other than environment variables.
 *
 * @returns A typed object matching the schema specified.
 *
 * @throws Any runtime errors associated with parsing the environment variable stack, such as:
 * - A required variable was not defined.
 * - A variable failed validation.
 * - A variable did not parse.
 * For security, the thrown error message will not include the value of the environment variable
 * to prevent accidental logging of secrets. However, if you include a custom validator, any error
 * messages _will_ be re-thrown.
 */
export function TypedEnv<T extends Record<string, unknown>>(
  schema: {
    [E in keyof T]: Declaration<T[E]>
  },
  values?: Record<string, string>
): T {
  const env = values ?? process.env
  const result = Object.fromEntries(
    Object.entries(schema).map(
      ([key, declaration]: [string, Declaration<unknown>]) =>
        parseValue([key, declaration], env)
    )
  )
  return result as T
}
