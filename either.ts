interface Left<E> {
  _tag: "Left"
  left: E
}

interface Right<A> {
  _tag: "Right"
  right: A
}

type Either<E, A> = Left<E> | Right<A>

const left = <E, A = never>(error: E): Either<E, A> => ({
  _tag: "Left",
  left: error,
})

const right = <A, E = never>(data: A): Either<E, A> => ({
  _tag: "Right",
  right: data,
})

export const eMap = <E, A, B>(either: Either<E, A>, f: (a: A) => B): Either<E, B> =>
  either._tag === "Right" ? right(f(either.right)) : either

export const eChain = <E, A, B>(either: Either<E, A>, f: (a: A) => Either<E, B>): Either<E, B> =>
  either._tag === "Right" ? f(either.right) : either

export const eFold = <E, A, B>(either: Either<E, A>, leftFn: (e: E) => B, rightFn: (a: A) => B): B =>
  either._tag === "Right" ? rightFn(either.right) : leftFn(either.left)

const isLeft = <E, A>(x: Either<E, A>): x is Left<E> => x._tag === "Left"

const divideTwoIfEven = (n: number): Either<string, number> => {
  if (n === 0) {
    return left("Cannot divide by 0")
  } else if (n % 2 !== 0) {
    return left("not even")
  }

  return right(2 / n)
}

const a = divideTwoIfEven(0)

const unWrap = <A, E>(x: Either<A, E>) => (isLeft(x) ? x.left : x.right)

console.log(isLeft(a) ? a.left : a.right)
const b = divideTwoIfEven(3)
console.log(unWrap(b))
const c = unWrap(divideTwoIfEven(4))
console.log(c)
