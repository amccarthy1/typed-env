import type { Declaration, OptionalProps } from './types'

type Params = {
  pattern?: RegExp
} & OptionalProps<string>

export function StringVar({
  pattern,
  ...props
}: Params = {}): Declaration<string> {
  const parser = (value: string) => {
    if (pattern) {
      if (!pattern.exec(value))
        throw new Error(`Did not match pattern ${pattern}`)
    }
    return value
  }
  return {
    parser,
    ...props,
  }
}
