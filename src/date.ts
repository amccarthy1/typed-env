import type { Declaration, OptionalProps } from './types'

type Params = {
  validator?: (value: Date) => void
} & OptionalProps<Date>
export function DateVar({
  validator,
  ...props
}: Params = {}): Declaration<Date> {
  const parser = (value: string) => {
    const dateValue = new Date(value)
    if (dateValue.toString() === 'Invalid Date') {
      throw new Error('Value did not match a valid date format!')
    }
    if (validator) validator(dateValue)
    return dateValue
  }
  return {
    parser,
    ...props,
  }
}
