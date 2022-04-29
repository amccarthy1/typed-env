export type Parser<T> = (value: string) => T

export type Declaration<T> = {
  variable?: string
  parser: Parser<T>
}
