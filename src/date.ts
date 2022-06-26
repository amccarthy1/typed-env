import type { Declaration, OptionalProps } from './types'

type Params = OptionalProps<Date>
export function DateVar(props: Params = {}): Declaration<Date> {
  const parser = (value: string) => {
    const dateValue = new Date(value)
    if (dateValue.toString() === 'Invalid Date') {
      throw new Error('Value did not match a valid date format!')
    }
    return dateValue
  }
  return {
    parser,
    ...props,
  }
}
