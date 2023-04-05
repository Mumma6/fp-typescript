/** COMPOSE */

const increment = (x: number) => x + 1
const numberToString = (x: number) => `The number is: ${x}`

// These types will be infer from the function call.
type Compose = <A, B, C>(f: (x: B) => C, g: (x: A) => B) => (x: A) => C

const compose: Compose = (f, g) => (x) => f(g(x))

const incrementThenToString = compose(numberToString, increment)

// PIPELINE

const add10 = (x: number) => x + 10
const dubble = (x: number) => x * 2
const square = (x: number) => x * x

// We could also use a function overload. This is to make sure we get type safety in our pipe steps. But we also need to have a upper bound.
interface Pipeline {
  <A, B>(fn1: (input: A) => B): (value: A) => B
  <A, B, C>(fn1: (input: A) => B, fn2: (input: B) => C): (value: A) => C
  <A, B, C, D>(fn1: (input: A) => B, fn2: (input: B) => C, fn3: (input: C) => D): (value: A) => D
  <A, B, C, D, E>(fn1: (input: A) => B, fn2: (input: B) => C, fn3: (input: C) => D, fn4: (input: D) => E): (value: A) => E
  <A, B, C, D, E, F>(
    fn1: (input: A) => B,
    fn2: (input: B) => C,
    fn3: (input: C) => D,
    fn4: (input: D) => E,
    fn5: (input: E) => F
  ): (value: A) => F
}

const pipeline: Pipeline =
  (...fns: Function[]) =>
  (value: unknown): unknown =>
    fns.reduce((acc, fn) => fn(acc), value)

const numberMagicToString = pipeline(add10, dubble, numberToString)(15)

const numbersArray = [1, 2, 3, 4, 5]

const add10toArray = (arr: number[]) => arr.map((x) => x + 10)
const doubbleArray = (arr: number[]) => arr.map((x) => x * 2)
const squareArray = (arr: number[]) => arr.map((x) => x * x)

const numberArrayMagic = pipeline(add10toArray, doubbleArray, squareArray)(numbersArray)
console.log(numberArrayMagic)

const pipe =
  <T>(...fns: Array<(arg: T) => T>) =>
  (value: T) =>
    fns.reduce((acc, fn) => fn(acc), value)

const numberArrayMagic2 = pipe(add10toArray, doubbleArray, doubbleArray, doubbleArray)(numbersArray)

console.log(numberArrayMagic2)
