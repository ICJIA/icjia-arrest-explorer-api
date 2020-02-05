import assert from 'assert'
import * as rest from '../../../src/http/rest'

describe('toPath', () => {
  it('should return a URL path based on table name', () => {
    const actual = rest.toPath('ArrestsByAgegroupAndGender')
    const expected = '/arrests/by-agegroup-and-gender'

    assert.deepEqual(actual, expected)
  })

  it('should return a URL path based on reference table name', () => {
    const actual = rest.toPath('RefAgegroup')
    const expected = '/ref/agegroup'

    assert.deepEqual(actual, expected)
  })
})
