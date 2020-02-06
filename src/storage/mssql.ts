import mssql from 'mssql'
import * as data from './../data'

type Storage = {
  tables: { [key: string]: data.Table }
}

export async function fetchFromDB(
  pool: mssql.ConnectionPool,
  sql: string,
): Promise<data.Table> {
  return (await pool.request().query(sql)).recordset
}

export function buildSqlForTable(name: string): string {
  if (name.substring(0, 3) === 'Ref') {
    return `SELECT * FROM ${name} ORDER BY id, value`
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [head, ...tail] = name.split(/By|And/)
    const order = ['arrestyear', ...tail].join(', ').toLowerCase()

    return `SELECT * FROM ${name} ORDER BY ${order}`
  }
}

async function fetchTables(
  pool: mssql.ConnectionPool,
): Promise<{ [key: string]: data.Table }> {
  const sql = `SELECT TABLE_NAME AS name FROM ${String(
    process.env.MSSQL_DATABASE,
  )}.INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'`
  const tableNames = (await fetchFromDB(pool, sql)).map(({ name }) => name)

  const tables: { [key: string]: data.Table } = {}
  for (const name of tableNames) {
    tables[name] = await fetchFromDB(pool, buildSqlForTable(String(name)))
  }

  return tables
}

export async function NewStorage(): Promise<Storage> {
  const config = {
    user: String(process.env.MSSQL_USER),
    password: String(process.env.MSSQL_PASSWORD),
    server: String(process.env.MSSQL_SERVER),
    database: String(process.env.MSSQL_DATABASE),
  }

  const pool = await new mssql.ConnectionPool(config).connect()
  const tables = await fetchTables(pool)

  pool.close()

  return {
    tables,
  }
}
