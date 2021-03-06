# Typed Env

[![codecov](https://codecov.io/gh/amccarthy1/typed-env/branch/main/graph/badge.svg?token=MA2UGQG274)](https://codecov.io/gh/amccarthy1/typed-env)

A strongly-typed, 0-dependency environment variable parser for Typescript!

## Get started

```bash
npm install --save @amccarthy1/typed-env  # npm
```

```bash
yarn add @amccarthy1/typed-env  # yarn
```

```ts
import { TypedEnv, EnumVar } from '@amccarthy1/typed-env'

const env = TypedEnv({
  ENVIRONMENT: EnumVar({ options: ['dev', 'staging', 'prod'] }),
})

doWhateverToRunApp(env.ENVIRONMENT) // env.ENVIRONMENT is of type 'dev' | 'staging' | 'prod'
```

## Why is this useful

Many services use environment variables for runtime configuration, anything from the current
environment or logging verbosity, to things like API keys and secrets. But many times, these
environment variables are unvalidated and naively parsed from strings when needed.

This library aims to allow you to define environment variables in a more type-safe way. Take this
example:

```ts
const environment = process.env.ENVIRONMENT

const makePayment = (amount: bigint) => {
  if (environment === 'prod') {
    makeRealPayment(amount)
  } else {
    makeMockPayment(amount)
  }
}
```

What if you configured your server with `ENVIRONMENT=production` instead of `ENVIRONMENT=prod`?
Suddenly, all your users are getting free products because you're making mock payments instead of
real ones!

If you'd used TypedEnv instead, you'd get this

```ts
const env = TypedEnv({
  ENVIRONMENT: EnumVar({ options: ['dev', 'staging', 'production'] }),
})

const makePayment = (amount: bigint) => {
  if (env.ENVIRONMENT === 'prod') {
    // TypeError!
    // `This condition will always return 'false' since
    // the types '"dev" | "staging" | "production"' and
    // '"prod"' have no overlap.`
    return makeRealPayment(amount)
  } else {
    return makeFakePayment(amount)
  }
}
```

## What types are supported?

Currently, strings, enums, integers, booleans, and dates are supported, although you can define your own custom type
using the `Declaration<T>` type

```ts
export type Declaration<T> = {
  variable?: string // The name of the environment variable; defaults to match the key if not specified
  parser: Parser<T> // A function (value: string) => T
}
```

## What about optional variables?

TypedEnv is primarily built for required variables, but does support optionals using a `defaultValue` property.
If you do not want to use an explicit default, you can use the `optional()` wrapper provided, which will automatically
inject a default value of `null` and convert a `Declaration<T>` to a `Declaration<T|null>`

```ts
const env = TypedEnv({
  required: BoolVar({ defaultValue: false }),
  optional: optional(BoolVar()),
})
// This schema yields the following type object
const env: {
  required: boolean
  optional: boolean | null
}
```

It is generally preferred to use `defaultValue` over the `optional` wrapper, but `optional` may be useful in migrating
existing codebases which already treat env vars as optional.
