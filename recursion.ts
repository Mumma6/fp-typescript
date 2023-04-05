const sumAll = (nums: number[]): number => {
  if (nums.length === 0) {
    return 0
  }

  const [head, ...tail] = nums

  return head + sumAll(tail)
}

console.log(sumAll([1, 2, 3, 4]))

const list = [1, 2, 3, 4, 5]
const dubble = (x: number) => x * 2

const strings = ["a", "b", "c", "d"]
const toUpperCase = (x: string) => x.toUpperCase()
const toNumber = (x: string) => Number(x)

const map = <T, G>([head, ...tail]: T[], fn: (x: T) => G): G[] => {
  if (typeof head === "undefined") {
    return []
  }

  return [fn(head), ...map(tail, fn)]
}

console.log(map(list, dubble))
console.log(map(strings, toNumber))

const stringsNums = ["1", "2", "3"]
console.log(map(stringsNums, toNumber))

interface INames {
  name: string
  age: number
}

const names: INames[] = [
  {
    name: "martin",
    age: 20,
  },
  {
    name: "emily",
    age: 21,
  },
]

const add10ToAge = (pe: INames) => ({
  ...pe,
  age: pe.age + 10,
})

console.log(map(names, add10ToAge))
console.log(names.map(add10ToAge))
