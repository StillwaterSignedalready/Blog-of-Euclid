---
title: "Algorithm & Data Structure Experience"
excerpt: "The running time of an algorithm corresponds to the depth of the decision tree path. The number of leaf nodes in the decision tree is n!, which is exponential. The reason why comparison-based sorting is at least O(nlgn) is that the height of the corresponding decision tree is at least O(nlgn)."
coverImage: "/assets/blog/algorithm-&-data-structure-experience/cover.png"
date: "2018-02-07T05:35:07.322Z"
author:
  name: Tim Neutkens
  picture: "/assets/blog/authors/wayne.jpg"
ogImage:
  url: "/assets/blog/algorithm-&-data-structure-experience/cover.png"
---

Comparing linked lists and arrays, arrays have faster lookup speed than linked lists. Why is that? Combining knowledge from computer architecture, my speculation is: When using index to look up an item in an array, the CPU first reads the address of the array into a register, then adds the index multiplied by a coefficient to directly obtain the address of the item, requiring only one memory read. However, when looking up an item in a linked list, depending on the size of the index, it may require reading the memory multiple times.

Hash table sizes are often prime numbers because the return value of a hash function needs to be divided by the size of the hash table to get the remainder. If the size is not a prime number, the return values are more likely to overlap.

To check if an integer is prime: try dividing it by all prime numbers less than or equal to its square root.

To find prime numbers within a certain range, you can use the sieve of Eratosthenes algorithm.

Tail recursion can optimize recursion to prevent stack overflow. It takes the form of let re = (n, r) => re(n-1, r* n); re(6,1), where the result of the previous round of calculations is passed directly as a parameter to the next round. This forms a behavior similar to a loop.

One important advantage of tree structures is their abstraction capability. For example, in a binary search tree, all nodes on the left of a current node can be abstracted as "a bunch of nodes smaller than the current node," or all nodes on the left side (upstream + downstream) of a certain node can be abstracted as nodes smaller than that node.

Given an unordered array let arr: number[], to reconstruct it as a binary tree, you would first sort it, then take arr[Math.floor(arr.length/2)] as the root node. Place elements smaller than it on the left and larger ones on the right, and then recurse.

Balanced binary trees can be abstracted into the following steps: 1. Rotate the peripheral nodes to switch the root node. 2. If a sub-trinary tree appears, convert it to a binary tree. Regardless of how the external nodes are rotated (switching the root node), the original root node will never have a sub-trinary structure, but other nodes are likely to have one.

Insertion sort generally has two loops: the outer loop (i) iterates from left to right through the array, and the inner loop, starting from i-1, iterates from right to left through the array. Before finding the insertion position, each time the inner loop copies the current component one position to the right. When the position is found, insert it, and end the current outer loop.

The principle of divide and conquer: Decompose a problem of size n into multiple (how many?) smaller problems (how small?), until the size is small enough to derive results for each branch, then merge them.

O(g(n)) is a set of functions like {f(n) | there exist constants [c,m] such that f(n) ≤ cg(n) for all numbers greater than m}.

Omega is the opposite of O, and theta is the intersection of O and Omega.

Small o and omega are equivalent to removing equal from the definitions of big O and Omega sets, and changing exist to for all.

The running time of an algorithm corresponds to the depth of the decision tree path. The number of leaf nodes in the decision tree is n!, which is exponential. The reason why comparison-based sorting is at least O(nlgn) is that the height of the corresponding decision tree is at least O(nlgn).

Counting sort first determines the range of elements in the sorted array, such as 1-k, then declares an array of length k to store the number of occurrences of each number from 1-k. Based on this, traverse the arr and perform corresponding operations on the array of 1-k. The complexity is O(k+n), so it is very efficient when k is small.

A good sorting algorithm should have stability: during the sorting process, the already sorted parts should not become unsorted again. This is obviously a waste.

Radix sort: Suppose an int has b digits, and r is the step length of digits, that is, in 2r base, there are b/r digits, then traverse each digit from the lowest digit, use the number of that digit for countingSort, and the time complexity is O(b/r(n+2r)). Regarding the selection of r, it should ensure that n >= 2r.

B-tree: To reduce the number of disk I/Os, compress the number of layers in the binary tree: 1. Each node contains multiple elements. 2. Each node has many children. When making changes, the following principles should be followed: 1. Self-balancing. 2. Try to create nodes with fewer elements (to facilitate direct insertion of subsequent elements).

How to determine if a linked list has a cycle, and if it does, find the entry node of the cycle: Start with two pointers simultaneously from the starting point, one slow and one fast. Each cycle, the slow pointer moves one step, and the fast pointer moves two steps. If there is a cycle, they will definitely meet after entering the cycle because their relative speed is one step. Then, to find the entry node of the cycle: Suppose the slow pointer moves s steps and the fast pointer moves 2s steps, and has run n rounds in the cycle, with a cycle length of r steps. Then 2s = s + nr, resulting in s = nr (critical! designed to have double speed). The fast pointer has run an extra n rounds compared to the slow one. At this time, the number of steps taken by the slow pointer is nr, and if it continues to move a steps, it will reach the entry node of the cycle, which is nr + a. Thus, nr + a = a + nr. Here, a + nr is the number of steps taken after entering the cycle and then running n rounds. Therefore, start the other node from the starting point at the same time as the slow pointer, with a step size of 1. When they meet, it is the entry node of the cycle.

Regarding dynamic programming, there is a key point that, in essence, involves reversing the decision tree. While it is possible to generate a decision tree going forward in time, it is also possible to do it in reverse.

Both recursion and dynamic programming are based on mathematical induction.

Double pointers are used in scenarios such as linked lists, sorted arrays, and linked lists.

Consider starting with a brute-force approach and then optimizing it.

While loops should have a limited condition range. If > or < can be used instead of !==, it should be used to avoid infinite loops.

Backtracking algorithms: They are suitable for problems with certain characteristics (such as permutations): At the end of tree traversal, partial answers are obtained, and parameters are passed from the upper layer to the lower layer. If these parameters are reference types or have a certain structure, they may cause significant space complexity (and indirectly increase time complexity). At this time, the concept of backtracking is introduced. Some of the parameters passed from the upper layer to the lower layer are elevated to the global level, similar to a stack. When entering the lower layer, the parameters are modified, and when returning to the upper layer, the modifications are reverted. Therefore, the code often exhibits symmetry at this point. It is recommended to draw a tree diagram and analyze it from both depth and breadth perspectives.