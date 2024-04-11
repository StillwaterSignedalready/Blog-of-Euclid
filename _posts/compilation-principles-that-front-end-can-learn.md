---
title: "Compilation Principles That Front End Can Learn"
excerpt: "In modern front-end development, when requirements involve the display and editing of code and expressions, one of the programmers' three romances, compiler theory, is involved. It is a seemingly deep and complex field."
coverImage: "/assets/blog/compilation-principles-that-front-end-can-learn/cover.png"
date: "2023-08-22T05:35:07.322Z"
author:
  name: Wayne Dai
  picture: "/assets/blog/authors/wayne.jpg"
ogImage:
  url: "/assets/blog/compilation-principles-that-front-end-can-learn/cover.png"
---
In modern front-end development, when requirements involve the display and editing of code and expressions, one of the programmers' three romances, compiler theory, is involved. It is a seemingly deep and complex field. In this article, we will demonstrate how to build a compiler-based project using TypeScript, parsing arithmetic expressions to construct a syntax tree. This not only deepens your understanding of compiler theory but also adds a highlight to your front-end skillset.

## Project Overview

<iframe src="https://stillwatersignedalready.github.io/expression-validator/" width="700" height="700"></iframe>

[code here 👈](https://github.com/StillwaterSignedalready/expression-validator)

In this project, we will create a tool for validating and computing mathematical expressions. The tool will accept a mathematical expression as input, validate it, and then calculate its value. To achieve this functionality, we will use concepts from compiler theory such as finite-state machines, lexical analysis, and syntax analysis.

## Key Concepts and Technologies
> The Completeness of Concepts is Crucial

- In this project, we use the following key concepts and technologies:
Finite-State Machines: We use finite-state machines to perform lexical analysis, converting the input mathematical expression into a sequence of tokens.
- Lexical Analysis: Through finite-state machines, we parse the input string into a series of tokens, where each token contains a type and value. e.g., 1+11 => [1, +, 11]
- Syntax Analysis: We construct a syntax tree step by step by consuming tokens from left to right, similar to Array.reduce. It's noteworthy that, since multiplication and division have higher precedence than addition and subtraction, when encountering multiplication and division, we should expand the expression to the right until hitting a wall, and then merge it into the syntax tree. This idea aligns with mathematical induction and can be expressed as follows:
    ![image.jpg](/_next/image?url=%2Fassets%2Fblog%2Fcompilation-principles-that-front-end-can-learn%2Fmathematical-induction.jpg&w=3840&q=75)
    - EOF: end of file, expression end
    - AdditiveExpression: addition and subtraction expression
    - MultiplicativeExpression: multiplication and division expression
    - ps: ps: Here `|` is the same as `|` in TypeScript

## Lexical Analysis
As mentioned above, it is the process of splitting the expression string into sequences of numbers and operator.

- Iterate over each character with a pointer.
- Define a state machine 'inNumber,' which means the pointer is within a number range. When the pointer leaves the 'inNumber' state, remember to submit this number to the Token sequence (remember to mark the type of Token).

Let's take '12 + 34' as an example:
![image.jpg](/_next/image?url=%2Fassets%2Fblog%2Fcompilation-principles-that-front-end-can-learn%2Flexical-analysis.jpg&w=3840&q=75)


## Syntax Analysis
With the Token queue, we can build a syntax tree based on it in a similar way to Array.reduce. Here's an example with '[11, +, 22, *, 33]':
Look at the picture. We should start traversing the Token queue from left to right.
![image.jpg](/_next/image?url=%2Fassets%2Fblog%2Fcompilation-principles-that-front-end-can-learn%2Fsyntax-analysis-0.jpg&w=3840&q=75)

The plus sign is detected and the additiveExpression process is entered (if the plus sign-digit combination does not stop, the additiveExpression process will be continuously forked accordingly)
![image.jpg](/_next/image?url=%2Fassets%2Fblog%2Fcompilation-principles-that-front-end-can-learn%2Fsyntax-analysis-1.jpg&w=3840&q=75)


The multiplication sign is detected. Since multiplication takes precedence over addition, leave a hole for the multiplication expression first and enter the multiplicativeExpression process.
![image.jpg](/_next/image?url=%2Fassets%2Fblog%2Fcompilation-principles-that-front-end-can-learn%2Fsyntax-analysis-2.jpg&w=3840&q=75)

![image.jpg](/_next/image?url=%2Fassets%2Fblog%2Fcompilation-principles-that-front-end-can-learn%2Fsyntax-analysis-3.jpg&w=3840&q=75)

The traversal ends and the multiplication expression returns

## Conclusion
Through this project, we have gained an initial understanding of some concepts in compiler theory, such as finite-state machines, lexical analysis, and syntax analysis. We demonstrated how to build a simple expression validation and calculation tool using TypeScript, thereby deepening our understanding of compiler theory and mastering more powerful skills in front-end development. Whether you want to deepen your technical depth or enrich your skill set, compiler theory is a field worth exploring.