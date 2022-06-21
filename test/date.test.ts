import { DateVar } from '../src/date'

test('Can parse valid date formats', async () => {
  const datevar = DateVar()
  expect(datevar.parser('1994-06-21').toISOString()).toEqual(
    '1994-06-21T00:00:00.000Z'
  )
  expect(datevar.parser('2000-01-01T00:00:00-05:00').toISOString()).toEqual(
    '2000-01-01T05:00:00.000Z'
  )
  expect(datevar.parser('1970-01-01').toISOString()).toEqual(
    '1970-01-01T00:00:00.000Z'
  )
})

test('Throws for invalid date formats', async () => {
  const datevar = DateVar()
  expect(() => datevar.parser('2000-00-00')).toThrow(
    'Value did not match a valid date format!'
  )
})

test('Supports custom validators', async () => {
  const datevar = DateVar({
    validator: (v) => {
      if (v < new Date('2011-11-11')) {
        throw new Error(
          'This date precedes the release of The Elder Scrolls V: Skyrim!'
        )
      }
    },
  })
  expect(() => datevar.parser('11/10/11')).toThrow('Skyrim')
  expect(() => datevar.parser('11/11/11')).not.toThrow('Skyrim')
})
