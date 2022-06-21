import type { Declaration } from './types'

type Params = {
  variable?: string
  validator?: (intValue: number) => void
}

const invalidIntMessage = 'Value is not an integer!'

export function IntVar({
  variable,
  validator,
}: Params = {}): Declaration<number> {
  const parser = (value: string) => {
    if (value.trim() === '') {
      // Special case; whitespace-only string will parse but should not.
      throw new Error(invalidIntMessage)
    }
    const numberValue = Number(value)
    if (!Number.isInteger(numberValue)) throw new Error(invalidIntMessage)
    if (validator) validator(numberValue)
    return numberValue
  }
  return {
    variable,
    parser,
  }
}
