// FP dont have null

interface Some<A> {
  _tag: "Some"
  value: A
}

interface None {
  _tag: "None"
}

type Options<A> = Some<A> | None

const some = <A>(x: A): Options<A> => ({
  _tag: "Some",
  value: x,
})

const none: Options<never> = {
  _tag: "None",
}

const isNone = <A>(x: Options<A>): x is None => x._tag === "None"

const divide = (x: number) => (x === 0 ? none : some(2 / x))

const a = divide(4)

console.log(a)

const b = divide(0)

console.log(b)
console.log(isNone(a))
