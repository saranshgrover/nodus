type ArrayElement<A> = A extends readonly (infer T)[] ? T : never
type Maybe<T> = T | null
