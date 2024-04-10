---
title: "Discrete Mathematics"
excerpt: "The logical equivalence P∨Q <=> ┐P→Q can be understood using set theory: given that an element is in set P or set Q, we can conclude that if this element is not in set P, then it must be in set Q."
coverImage: "/assets/blog/discrete-mathematics/cover.png"
date: "2020-01-16T05:35:07.322Z"
author:
  name: Wayne Dai
  picture: "/assets/blog/authors/wayne.jpg"
ogImage:
  url: "/assets/blog/discrete-mathematics/cover.png"
---

The logical equivalence P∨Q <=> ┐P→Q can be understood using set theory: given that an element is in set P or set Q, we can conclude that if this element is not in set P, then it must be in set Q.

The quantifier 'forall' (∀) corresponds to the logical operator 'and' (∧), while 'exists' (∃) corresponds to the logical operator 'or' (∨).

In most cases, a value can correspond to an infinite number of expressions. For example, the value 1 can be expressed as 1 or 2-1 or 3/3, and so on. Computing an expression is essentially the process of transforming one expression into another equivalent expression. So, what should be the endpoint of this transformation? It should be the one that is most obvious. For example, a single number is very straightforward.

Sets and Boolean values are intimately connected. Boolean values can be expressed as being inside or outside a set, while sets consist of elements that satisfy properties based on Boolean values.

False means outside the set, which also means inside the complement of the set. From the perspective of the complement set, it then becomes true.

Basic proposition equivalences can be derived from truth tables, and then complex proposition equivalences can be derived from them.

De Morgan's Law: ¬(p1 or p2 or p3...) is equivalent to ¬p1 and ¬p2 and ¬p3.... One interpretation is: ¬(for all x, P) <=> there exists an x such that ¬P.

A proposition with undetermined truth value (usually containing individual variables) corresponds to a set. Its true value represents a state falling within this set.

I personally believe that ∀x(P→Q) implies a sense of filtering: array.filter(x => P) scopes all x for Q.

Quantifiers in propositions: For multiple quantifiers ∀ and ∃, if they are of the same type, the order doesn't matter; if they are different, the order cannot be arbitrarily changed. The outermost quantifier has a decisive influence.

Most operators in expressions are based on binary relations (two variables), so complex expressions can often be decomposed through divide and conquer, layer by layer, into binary expressions at the lowest level.

The transition of states in a state machine can form a graph (graph theory). Each state machine is a function, and each function corresponds to a node in the graph and the edges starting from this node. The parameters of the function determine the edge to reach the next state, so a state machine often returns another state machine or a terminal state, which means transitioning from one state to another (similar to the concept of vectors)."