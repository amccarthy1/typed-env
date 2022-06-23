import type { Declaration, OptionalProps } from './types'

type Params = OptionalProps<boolean>

const invalidValueMessage = 'Value did not match a valid boolean format!'

const trueValues = new Set(['true', 't', '1', 'yes', 'y', 'on'])
const falseValues = new Set(['false', 'f', '0', 'no', 'n', 'off'])

const parser = (value: string) => {
  const norm = value.toLowerCase()
  if (trueValues.has(norm)) return true
  if (falseValues.has(norm)) return false
  throw new Error(invalidValueMessage)
}

export function BoolVar(props: Params = {}): Declaration<boolean> {
  return { parser, ...props }
}
