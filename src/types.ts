export type Parser<T> = (value: string) => T
export type Validator<T> = (value: T) => void

export type OptionalProps<T> = {
  variable?: string
  defaultValue?: T
  validator?: Validator<T>
}

export type Declaration<T> = {
  parser: Parser<T>
} & OptionalProps<T>
