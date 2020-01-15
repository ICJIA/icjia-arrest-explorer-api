// https://spin.atomicobject.com/2018/11/05/using-an-int-type-in-typescript/
export type Int = number & { __int__: void }

export function toInt(value: string | number): Int {
  return Number.parseInt(value.toString()) as Int
}
