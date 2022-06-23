export type Parser<T> = (value: string) => T

export type OptionalProps<T> = {
  variable?: string
  defaultValue?: T
}

export type Declaration<T> = {
  parser: Parser<T>
} & OptionalProps<T>
