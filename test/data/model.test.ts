import assert from 'assert'
import * as data from '../../src/data'

const sampleTable: data.Table = [
  { A: 1, B: 1, value: 1 },
  { A: 1, B: 2, value: 2 },
  { A: 2, B: 1, value: 3 },
  { A: 2, B: 2, value: 4 },
]

describe('filter', () => {
  describe('by: A, matchIf: ==, value: 1', () => {
    it('should return a filtered Table only with Rows where variable A == 1', () => {
      const actual = data.filter(sampleTable, 'A', '==', 1)
      const expected: data.Table = [
        { A: 1, B: 1, value: 1 },
        { A: 1, B: 2, value: 2 },
      ]

      assert.deepEqual(actual, expected)
    })
  })

  describe('by: A, matchIf: <=, value: 1', () => {
    it('should return a filtered Table only with Rows where variable A <= 1', () => {
      const actual = data.filter(sampleTable, 'A', '<=', 1)
      const expected: data.Table = [
        { A: 1, B: 1, value: 1 },
        { A: 1, B: 2, value: 2 },
      ]

      assert.deepEqual(actual, expected)
    })
  })

  describe('by: A, matchIf: >=, value: 2', () => {
    it('should return a filtered Table only with Rows where variable A >= 2', () => {
      const actual = data.filter(sampleTable, 'A', '>=', 2)
      const expected: data.Table = [
        { A: 2, B: 1, value: 3 },
        { A: 2, B: 2, value: 4 },
      ]

      assert.deepEqual(actual, expected)
    })
  })

  describe('by: B, matchIf: <, value: 2', () => {
    it('should return a filtered Table only with Rows where variable B < 2', () => {
      const actual = data.filter(sampleTable, 'B', '<', 2)
      const expected: data.Table = [
        { A: 1, B: 1, value: 1 },
        { A: 2, B: 1, value: 3 },
      ]

      assert.deepEqual(actual, expected)
    })
  })

  describe('by: B, matchIf: >, value: 1', () => {
    it('should return a filtered Table only with Rows where variable B > 1', () => {
      const actual = data.filter(sampleTable, 'B', '>', 1)
      const expected: data.Table = [
        { A: 1, B: 2, value: 2 },
        { A: 2, B: 2, value: 4 },
      ]

      assert.deepEqual(actual, expected)
    })
  })
})

describe('sortBy', () => {
  describe('by: B', () => {
    it('should return a Table sorted by B in ascending order', () => {
      const actual = data.sortBy(sampleTable, 'B')
      const expected: data.Table = [
        { A: 1, B: 1, value: 1 },
        { A: 2, B: 1, value: 3 },
        { A: 1, B: 2, value: 2 },
        { A: 2, B: 2, value: 4 },
      ]

      assert.deepEqual(actual, expected)
    })
  })

  describe('by: A, order: desc', () => {
    it('should return a Table sorted by A in descending order', () => {
      const actual = data.sortBy(sampleTable, 'A', 'desc')
      const expected: data.Table = [
        { A: 2, B: 1, value: 3 },
        { A: 2, B: 2, value: 4 },
        { A: 1, B: 1, value: 1 },
        { A: 1, B: 2, value: 2 },
      ]

      assert.deepEqual(actual, expected)
    })
  })

  describe('by: B, order: asc', () => {
    it('should return a Table sorted by B in ascending order', () => {
      const actual = data.sortBy(sampleTable, 'B', 'asc')
      const expected: data.Table = [
        { A: 1, B: 1, value: 1 },
        { A: 2, B: 1, value: 3 },
        { A: 1, B: 2, value: 2 },
        { A: 2, B: 2, value: 4 },
      ]

      assert.deepEqual(actual, expected)
    })
  })

  describe('by: value, order: desc', () => {
    it('should return a Table sorted by value in descending order', () => {
      const actual = data.sortBy(sampleTable, 'value', 'desc')
      const expected: data.Table = [
        { A: 2, B: 2, value: 4 },
        { A: 2, B: 1, value: 3 },
        { A: 1, B: 2, value: 2 },
        { A: 1, B: 1, value: 1 },
      ]

      assert.deepEqual(actual, expected)
    })
  })
})

describe('select', () => {
  describe('cols: A, value', () => {
    it('should return a Table with A and value columns only', () => {
      const actual = data.select(sampleTable, 'A', 'value')
      const expected: data.Table = [
        { A: 1, value: 1 },
        { A: 1, value: 2 },
        { A: 2, value: 3 },
        { A: 2, value: 4 },
      ]

      assert.deepEqual(actual, expected)
    })
  })
})
