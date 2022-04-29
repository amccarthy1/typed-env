import type { Declaration } from './types'

type Params = {
  pattern?: RegExp
  variable?: string
  validator?: (value: string) => void
}

export function StringVar({
  variable,
  pattern,
  validator,
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
    variable,
    parser,
  }
}
