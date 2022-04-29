import type { Declaration } from './types'

type Params<T extends string> = {
  variable?: string
  options: readonly T[]
}

export function EnumVar<T extends string>({
  variable,
  options,
}: Params<T>): Declaration<T> {
  const parser = (value: string) => {
    if (!(options as readonly string[]).includes(value))
      throw new Error(`Value did not match one of ${options}`)
    return value as T
  }
  return {
    variable,
    parser,
  }
}
