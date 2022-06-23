import type { Declaration, OptionalProps } from './types'

type Params = {
  pattern?: RegExp
  validator?: (value: string) => void
} & OptionalProps<string>

export function StringVar({
  pattern,
  validator,
  ...props
}: Params = {}): Declaration<string> {
  const parser = (value: string) => {
    if (pattern) {
      if (!pattern.exec(value))
        throw new Error(`Did not match pattern ${pattern}`)
    }
    if (validator) validator(value)
    return value
  }
  return {
    parser,
    ...props,
  }
}
