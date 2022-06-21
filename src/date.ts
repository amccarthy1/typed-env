import type { Declaration } from './types'

type Params = {
  variable?: string
  validator?: (value: Date) => void
}
export function DateVar({
  variable,
  validator,
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
    variable,
    parser,
  }
}
