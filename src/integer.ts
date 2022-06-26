import type { Declaration, OptionalProps } from './types'

type Params = OptionalProps<number>

const invalidIntMessage = 'Value is not an integer!'

export function IntVar(props: Params = {}): Declaration<number> {
  const parser = (value: string) => {
    if (value.trim() === '') {
      // Special case; whitespace-only string will parse but should not.
      throw new Error(invalidIntMessage)
    }
    const numberValue = Number(value)
    if (!Number.isInteger(numberValue)) throw new Error(invalidIntMessage)
    return numberValue
  }
  return {
    parser,
    ...props,
  }
}
