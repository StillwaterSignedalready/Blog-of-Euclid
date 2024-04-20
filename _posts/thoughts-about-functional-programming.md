---
title: "Thoughts About Functional Programming"
excerpt: "Sometimes the purpose of currying is to customize multiple similar functions. For example, the function (a) => (b) => (c) => a + b + c. The purpose is to obtain a function (c) => someValue + c, where the value of someValue depends on the specific scenario, which is somewhat similar to a function constructor. "
coverImage: "/assets/blog/thoughts-about-functional-programming/cover.jpg"
date: "2020-04-12T05:35:07.322Z"
---

- Sometimes the purpose of currying is to customize multiple similar functions. For example, the function (a) => (b) => (c) => a + b + c. The purpose is to obtain a function (c) => someValue + c, where the value of someValue depends on the specific scenario, which is somewhat similar to a function constructor. Additionally, Cheng Mo (a respected figure) mentioned that currying is the primary way to pass parameters in functional programming.

- The purpose of currying can also be understood as follows: step-by-step parameter passing. Basic functions can only accept parameters all at once, often requiring multiple variables to store parameters, and then calling the function with all parameters at once. Curried functions, on the other hand, are much more convenient.

- Compose is a kind of pipeline mechanism. Given pure functions a, b, c, const foo = c(b(a(arg))). When running foo(val), the functions a, b, c are pushed into the execution stack in the order of c, b, a, and then the parameter arg is returned in the order of a, b, c. This is similar to gulp's pipe mechanism, where the order of operations (abc) is crucial.

- Functions that are parameters of higher-order functions will naturally be called within the higher-order function and are highly likely to be passed parameters from the scope of the higher-order function, which might also be functions.

- Functional programming encourages minimizing the use of this, which is generally not needed.

- For immutable objects, the Object.freeze method is required.

- Any interaction with the external environment from a function is considered a side effect.

- Due to the characteristic of pure functions - "the same input always results in the same output", memoization functions can be created, forming a closure cache, corresponding to the knapsack problem.

- Pure functions must be honest about their dependencies, and all dependencies should be written in the parameters they accept.

- Currying and classes are similar in that they both serve as blueprints.

- Consider placing functions with side effects into a namespace to strictly limit their usage.

- Function signature example: foo :: string -> [string].

- The power of functors lies in: 1. They define a unified type, preventing unexpected situations in chained calls. 2. This enables safe chained calls, similar to compose. 3. They allow better customization of the map function's behavior, such as adding throttling functionality. 4. Containers, like VMs, act as intermediaries between data and behavior, separating mapping from behavior. 5. This means we only need to focus on mapping - functions, which is declarative programming. 6. Furthermore, inferences can be made in the map function's parameters, such as compose, partial parameter passing, etc., as long as the final parameter of map is a pure function.

- A functor is a container type that implements the map function and adheres to certain specific rules; it's mappable. This is analogous to Promise being thenable.

- JS arrays are now mappable and can be used as functors. The performance of arrays in React and Vue demonstrates the safety of functors.

- Curried partial parameter passing may be well suited for continuous asynchronous operations, passing one parameter at a time.

- I believe functional programming should be practiced like this: Basic functions declared manually should accomplish the most basic task, such as obj => obj.prop, and complex functionalities should be composed using compose with basic functions. This kind of code has good readability and transitions smoothly from concrete to abstract, allowing for both abstraction and concreteness.

- A Promise is a kind of monad. Resolve places a value into a container and then triggers map(f)/then(f). If the value resolved is a Promise, it will recursively resolve until a non-Promise value is obtained.

- map(map(func, functor)), the reason for such nested mapping is that sometimes the value in the functor is itself a functor.

- Elements of a monad: of method, join method (flattens multiple layers of functors).

- I think React components are very much like functors: state is the _value, and render is the parameter for map. Higher-order components are similar to curried higher-order functions.

- Functors are similar to VMs; they act as an intermediary layer between data and mappings. Their main significance lies in being able to separate mappings from operations and focus on them, which is closer to human thinking than imperative programming.
