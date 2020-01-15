import { Int, toInt } from './int'

// type definitions
export type IntOrString = Int | string

export type Variable = {
  name: string
  value: IntOrString
  type: 'int' | 'string'
}

export type Row = {
  variables: Variable[]
  value: Int
}

export type flatRow = { [key: string]: number | string }

export type Table = Row[]

export type TableDTO = flatRow[]

// Table functions
export function filter(
  tbl: Table,
  by: string,
  matchIf: '==' | '<=' | '>=' | '<' | '>',
  value: Int,
): Table {
  return tbl.filter(r => {
    let match = false
    r.variables.some(v => {
      if (v.name == by) {
        switch (matchIf) {
          case '==':
            match = v.value == value
            break
          case '<=':
            match = v.value <= value
            break
          case '>=':
            match = v.value >= value
            break
          case '<':
            match = v.value < value
            break
          case '>':
            match = v.value > value
        }
        return true
      }
    })
    return match
  })
}

export function select(tbl: Table, ...varNames: string[]): Table {
  return tbl.map(r => {
    const selected = r.variables.filter(v => varNames.includes(v.name))

    return {
      variables: selected,
      value: r.value,
    }
  })
}

export function sortBy(
  tbl: Table,
  by: string,
  order: 'asc' | 'desc' = 'asc',
): Table {
  const compare = (a: Row, b: Row): number => {
    let va: IntOrString = ''
    let vb: IntOrString = ''

    if (by === 'value') {
      va = a.value
      vb = b.value
    } else {
      a.variables.forEach(v => {
        if (v.name == by) va = v.value
      })

      b.variables.forEach(v => {
        if (v.name == by) vb = v.value
      })
    }

    if (va < vb) return order === 'asc' ? -1 : 1
    if (va > vb) return order === 'asc' ? 1 : -1
    return 0
  }

  return tbl
    .map((row, index) => ({ row, index }))
    .sort((a, b) => compare(a.row, b.row) || a.index - b.index)
    .map(({ row }) => row)
}

export function flatten(tbl: Table): TableDTO {
  return tbl.map(row => {
    const flatRow: flatRow = {}

    row.variables.forEach(variable => {
      flatRow[variable.name] = variable.value
    })

    flatRow.value = row.value

    return flatRow
  })
}

export function unflatten(tbl: TableDTO): Table {
  return tbl.map(flatRow => {
    const variables: Variable[] = []
    let value = toInt(0)

    Object.keys(flatRow).forEach(name => {
      if (name == 'value') value = toInt(flatRow[name])
      else {
        const value = flatRow[name]
        const variable: Variable =
          typeof value === 'number'
            ? {
                name,
                value: toInt(value),
                type: 'int',
              }
            : {
                name,
                value,
                type: 'string',
              }

        variables.push(variable)
      }
    })

    return {
      variables,
      value,
    }
  })
}
