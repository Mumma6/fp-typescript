const curriedSum1 = (x: number) => (y: number) => x + y
console.log(curriedSum1(1)(2))

/*

// curry takes only 1 argument per function but partial can take many

// Currying function
const add = x => y => z => x + y + z;
// Partial Application function
const add = x => (y, z) => x + y + z;
*/

// Partial function, instead of doing all the calls we wall it just once
const padd10 = curriedSum1(10)
console.log(padd10(5))

const padd5 = curriedSum1(5)
console.log(padd5(5))

const normalSum = (x: number, y: number) => x + y
console.log(normalSum(1, 2))

const normalSum2 = (x: number, y: number, z: number) => x + y + z

// takes a function with 2 params (p1, p2) and turn it into (p1)(p2)

type Curry2P = <A, B, C>(f: (a: A, b: B) => C) => (a: A) => (b: B) => C
const curryFn: Curry2P = (f) => (a) => (b) => f(a, b)

type Curry3P = <A, B, C, D>(f: (a: A, b: B, c: C) => D) => (a: A) => (b: B) => (c: C) => D
const curryFn3: Curry3P = (f) => (a) => (b) => (c) => f(a, b, c)

const sum = curryFn(normalSum)
console.log(sum(10)(2))

const sum3 = curryFn3(normalSum2)

console.log(sum3(10)(2)(1))
console.log(normalSum2(10, 2, 1))
