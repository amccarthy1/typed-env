import type { Declaration, OptionalProps } from './types'

type Params<T extends string> = {
  options: readonly T[]
} & OptionalProps<T>

export function EnumVar<T extends string>({
  options,
  ...props
}: Params<T>): Declaration<T> {
  const parser = (value: string) => {
    if (!(options as readonly string[]).includes(value))
      throw new Error(`Value did not match one of ${options}`)
    return value as T
  }
  return {
    parser,
    ...props,
  }
}
