// type definitions
export type Row = { [key: string]: number | string }

export type Table = Row[]

// Table functions
export function filter(
  tbl: Table,
  by: string,
  matchIf: '==' | '<=' | '>=' | '<' | '>',
  value: number,
): Table {
  return tbl.filter(row => eval(`${row[by]} ${matchIf} ${value}`))
}

export function select(tbl: Table, ...cols: string[]): Table {
  return tbl.map(row => Object.assign({}, ...cols.map(c => ({ [c]: row[c] }))))
}

export function sortBy(
  tbl: Table,
  by: string,
  order: 'asc' | 'desc' = 'asc',
): Table {
  const compare = (a: Row, b: Row): number => {
    if (a[by] < b[by]) return order === 'asc' ? -1 : 1
    if (a[by] > b[by]) return order === 'asc' ? 1 : -1
    return 0
  }

  return tbl
    .map((row, index) => ({ row, index }))
    .sort((a, b) => compare(a.row, b.row) || a.index - b.index)
    .map(({ row }) => row)
}
