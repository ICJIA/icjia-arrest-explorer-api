import assert from 'assert'
import * as data from '../../src/data'

const sampleTable: data.Table = [
  {
    variables: [
      { name: 'A', value: data.toInt(1), type: 'int' },
      { name: 'B', value: data.toInt(1), type: 'int' },
    ],
    value: data.toInt(1),
  },
  {
    variables: [
      { name: 'A', value: data.toInt(1), type: 'int' },
      { name: 'B', value: data.toInt(2), type: 'int' },
    ],
    value: data.toInt(2),
  },
  {
    variables: [
      { name: 'A', value: data.toInt(2), type: 'int' },
      { name: 'B', value: data.toInt(1), type: 'int' },
    ],
    value: data.toInt(3),
  },
  {
    variables: [
      { name: 'A', value: data.toInt(2), type: 'int' },
      { name: 'B', value: data.toInt(2), type: 'int' },
    ],
    value: data.toInt(4),
  },
]

const sampleTableDTO: data.TableDTO = [
  {
    A: data.toInt(1),
    B: data.toInt(1),
    value: data.toInt(1),
  },
  {
    A: data.toInt(1),
    B: data.toInt(2),
    value: data.toInt(2),
  },
  {
    A: data.toInt(2),
    B: data.toInt(1),
    value: data.toInt(3),
  },
  {
    A: data.toInt(2),
    B: data.toInt(2),
    value: data.toInt(4),
  },
]

describe('filter', () => {
  describe('by: A, matchIf: ==, value: 1', () => {
    it('should return a filtered Table only with Rows where variable A == 1', () => {
      const actual = data.filter(sampleTable, 'A', '==', data.toInt(1))
      const expected: data.Table = [
        {
          variables: [
            { name: 'A', value: data.toInt(1), type: 'int' },
            { name: 'B', value: data.toInt(1), type: 'int' },
          ],
          value: data.toInt(1),
        },
        {
          variables: [
            { name: 'A', value: data.toInt(1), type: 'int' },
            { name: 'B', value: data.toInt(2), type: 'int' },
          ],
          value: data.toInt(2),
        },
      ]

      assert.deepEqual(actual, expected)
    })
  })

  describe('by: A, matchIf: <=, value: 1', () => {
    it('should return a filtered Table only with Rows where variable A <= 1', () => {
      const actual = data.filter(sampleTable, 'A', '<=', data.toInt(1))
      const expected: data.Table = [
        {
          variables: [
            { name: 'A', value: data.toInt(1), type: 'int' },
            { name: 'B', value: data.toInt(1), type: 'int' },
          ],
          value: data.toInt(1),
        },
        {
          variables: [
            { name: 'A', value: data.toInt(1), type: 'int' },
            { name: 'B', value: data.toInt(2), type: 'int' },
          ],
          value: data.toInt(2),
        },
      ]

      assert.deepEqual(actual, expected)
    })
  })

  describe('by: A, matchIf: >=, value: 2', () => {
    it('should return a filtered Table only with Rows where variable A >= 2', () => {
      const actual = data.filter(sampleTable, 'A', '>=', data.toInt(2))
      const expected: data.Table = [
        {
          variables: [
            { name: 'A', value: data.toInt(2), type: 'int' },
            { name: 'B', value: data.toInt(1), type: 'int' },
          ],
          value: data.toInt(3),
        },
        {
          variables: [
            { name: 'A', value: data.toInt(2), type: 'int' },
            { name: 'B', value: data.toInt(2), type: 'int' },
          ],
          value: data.toInt(4),
        },
      ]

      assert.deepEqual(actual, expected)
    })
  })

  describe('by: B, matchIf: <, value: 2', () => {
    it('should return a filtered Table only with Rows where variable B < 2', () => {
      const actual = data.filter(sampleTable, 'B', '<', data.toInt(2))
      const expected: data.Table = [
        {
          variables: [
            { name: 'A', value: data.toInt(1), type: 'int' },
            { name: 'B', value: data.toInt(1), type: 'int' },
          ],
          value: data.toInt(1),
        },
        {
          variables: [
            { name: 'A', value: data.toInt(2), type: 'int' },
            { name: 'B', value: data.toInt(1), type: 'int' },
          ],
          value: data.toInt(3),
        },
      ]

      assert.deepEqual(actual, expected)
    })
  })

  describe('by: B, matchIf: >, value: 1', () => {
    it('should return a filtered Table only with Rows where variable B > 1', () => {
      const actual = data.filter(sampleTable, 'B', '>', data.toInt(1))
      const expected: data.Table = [
        {
          variables: [
            { name: 'A', value: data.toInt(1), type: 'int' },
            { name: 'B', value: data.toInt(2), type: 'int' },
          ],
          value: data.toInt(2),
        },
        {
          variables: [
            { name: 'A', value: data.toInt(2), type: 'int' },
            { name: 'B', value: data.toInt(2), type: 'int' },
          ],
          value: data.toInt(4),
        },
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
        {
          variables: [
            { name: 'A', value: data.toInt(1), type: 'int' },
            { name: 'B', value: data.toInt(1), type: 'int' },
          ],
          value: data.toInt(1),
        },
        {
          variables: [
            { name: 'A', value: data.toInt(2), type: 'int' },
            { name: 'B', value: data.toInt(1), type: 'int' },
          ],
          value: data.toInt(3),
        },
        {
          variables: [
            { name: 'A', value: data.toInt(1), type: 'int' },
            { name: 'B', value: data.toInt(2), type: 'int' },
          ],
          value: data.toInt(2),
        },
        {
          variables: [
            { name: 'A', value: data.toInt(2), type: 'int' },
            { name: 'B', value: data.toInt(2), type: 'int' },
          ],
          value: data.toInt(4),
        },
      ]

      assert.deepEqual(actual, expected)
    })
  })

  describe('by: A, order: desc', () => {
    it('should return a Table sorted by A in descending order', () => {
      const actual = data.sortBy(sampleTable, 'A', 'desc')
      const expected: data.Table = [
        {
          variables: [
            { name: 'A', value: data.toInt(2), type: 'int' },
            { name: 'B', value: data.toInt(1), type: 'int' },
          ],
          value: data.toInt(3),
        },
        {
          variables: [
            { name: 'A', value: data.toInt(2), type: 'int' },
            { name: 'B', value: data.toInt(2), type: 'int' },
          ],
          value: data.toInt(4),
        },
        {
          variables: [
            { name: 'A', value: data.toInt(1), type: 'int' },
            { name: 'B', value: data.toInt(1), type: 'int' },
          ],
          value: data.toInt(1),
        },
        {
          variables: [
            { name: 'A', value: data.toInt(1), type: 'int' },
            { name: 'B', value: data.toInt(2), type: 'int' },
          ],
          value: data.toInt(2),
        },
      ]

      assert.deepEqual(actual, expected)
    })
  })

  describe('by: B, order: asc', () => {
    it('should return a Table sorted by B in ascending order', () => {
      const actual = data.sortBy(sampleTable, 'B', 'asc')
      const expected: data.Table = [
        {
          variables: [
            { name: 'A', value: data.toInt(1), type: 'int' },
            { name: 'B', value: data.toInt(1), type: 'int' },
          ],
          value: data.toInt(1),
        },
        {
          variables: [
            { name: 'A', value: data.toInt(2), type: 'int' },
            { name: 'B', value: data.toInt(1), type: 'int' },
          ],
          value: data.toInt(3),
        },
        {
          variables: [
            { name: 'A', value: data.toInt(1), type: 'int' },
            { name: 'B', value: data.toInt(2), type: 'int' },
          ],
          value: data.toInt(2),
        },
        {
          variables: [
            { name: 'A', value: data.toInt(2), type: 'int' },
            { name: 'B', value: data.toInt(2), type: 'int' },
          ],
          value: data.toInt(4),
        },
      ]

      assert.deepEqual(actual, expected)
    })
  })

  describe('by: value, order: desc', () => {
    it('should return a Table sorted by value in descending order', () => {
      const actual = data.sortBy(sampleTable, 'value', 'desc')
      const expected: data.Table = [
        {
          variables: [
            { name: 'A', value: data.toInt(2), type: 'int' },
            { name: 'B', value: data.toInt(2), type: 'int' },
          ],
          value: data.toInt(4),
        },
        {
          variables: [
            { name: 'A', value: data.toInt(2), type: 'int' },
            { name: 'B', value: data.toInt(1), type: 'int' },
          ],
          value: data.toInt(3),
        },
        {
          variables: [
            { name: 'A', value: data.toInt(1), type: 'int' },
            { name: 'B', value: data.toInt(2), type: 'int' },
          ],
          value: data.toInt(2),
        },
        {
          variables: [
            { name: 'A', value: data.toInt(1), type: 'int' },
            { name: 'B', value: data.toInt(1), type: 'int' },
          ],
          value: data.toInt(1),
        },
      ]

      assert.deepEqual(actual, expected)
    })
  })
})

describe('select', () => {
  describe('varNames: A', () => {
    it('should return a Table with variable A only', () => {
      const actual = data.select(sampleTable, 'A')
      const expected: data.Table = [
        {
          variables: [{ name: 'A', value: data.toInt(1), type: 'int' }],
          value: data.toInt(1),
        },
        {
          variables: [{ name: 'A', value: data.toInt(1), type: 'int' }],
          value: data.toInt(2),
        },
        {
          variables: [{ name: 'A', value: data.toInt(2), type: 'int' }],
          value: data.toInt(3),
        },
        {
          variables: [{ name: 'A', value: data.toInt(2), type: 'int' }],
          value: data.toInt(4),
        },
      ]

      assert.deepEqual(actual, expected)
    })
  })
})

describe('flatten', () => {
  it('should return a flattened Table based on a proper Table', () => {
    const actual = data.flatten(sampleTable)
    const expected = sampleTableDTO

    assert.deepEqual(actual, expected)
  })
})

describe('unflatten', () => {
  it('should return a proper Table based on a flattened Table', () => {
    const actual = data.unflatten(sampleTableDTO)
    const expected = sampleTable

    assert.deepEqual(actual, expected)
  })
})
