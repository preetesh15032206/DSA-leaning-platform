import { 
  LayoutDashboard, 
  Layers, 
  Code2, 
  Timer, 
  BarChart3, 
  Settings,
  BrainCircuit,
  Binary,
  TreePine,
  Network,
  Zap,
  CheckCircle2,
  AlertCircle,
  TrendingDown,
  Trophy,
  History,
  Terminal,
  Play,
  RotateCcw,
  Pause,
  ArrowRight,
  Search,
  Bell,
  MoreHorizontal,
  Flame,
  Target
} from 'lucide-react';

export interface Topic {
  id: string;
  title: string;
  description: string;
  difficulty: 'Foundational' | 'Intermediate' | 'Advanced' | 'Mastery';
  progress: number;
  totalProblems: number;
  completedProblems: number;
  icon: any;
  color: string;
}

export const TOPICS: Topic[] = [
  {
    id: 'arrays',
    title: 'Arrays',
    description: 'Linear collections of elements stored in contiguous memory locations.',
    difficulty: 'Foundational',
    progress: 0,
    totalProblems: 40,
    completedProblems: 0,
    icon: Binary,
    color: '#3B82F6'
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    description: 'Logarithmic search space optimization and binary decision algorithms.',
    difficulty: 'Intermediate',
    progress: 0,
    totalProblems: 32,
    completedProblems: 0,
    icon: Target,
    color: '#EF4444'
  },
  {
    id: 'strings',
    title: 'Strings',
    description: 'Mastering character manipulation and algorithmic pattern matching.',
    difficulty: 'Intermediate',
    progress: 0,
    totalProblems: 24,
    completedProblems: 0,
    icon: Layers,
    color: '#10B981'
  },
  {
    id: 'linked-list',
    title: 'Linked List',
    description: 'Sequential data structures focusing on node-based connections.',
    difficulty: 'Intermediate',
    progress: 0,
    totalProblems: 31,
    completedProblems: 0,
    icon: Network,
    color: '#F59E0B'
  },
  {
    id: 'recursion',
    title: 'Recursion',
    description: 'Functional decomposition and backtracking algorithms.',
    difficulty: 'Intermediate',
    progress: 0,
    totalProblems: 25,
    completedProblems: 0,
    icon: RotateCcw,
    color: '#EC4899'
  },
  {
    id: 'bit-manipulation',
    title: 'Bit Manipulation',
    description: 'Low-level bitwise operations and mathematical optimization.',
    difficulty: 'Advanced',
    progress: 0,
    totalProblems: 18,
    completedProblems: 0,
    icon: Binary,
    color: '#6366F1'
  },
  {
    id: 'stack-queue',
    title: 'Stack & Queue',
    description: 'Linear data structures with LIFO and FIFO properties.',
    difficulty: 'Intermediate',
    progress: 0,
    totalProblems: 30,
    completedProblems: 0,
    icon: LayoutDashboard,
    color: '#6366F1'
  },
  {
    id: 'sliding-window',
    title: 'Sliding Window',
    description: 'Optimizing subarray and substring problems using two pointers.',
    difficulty: 'Intermediate',
    progress: 0,
    totalProblems: 12,
    completedProblems: 0,
    icon: Zap,
    color: '#8B5CF6'
  },
  {
    id: 'heaps',
    title: 'Heaps',
    description: 'Priority queue implementations and heap-based optimizations.',
    difficulty: 'Intermediate',
    progress: 0,
    totalProblems: 17,
    completedProblems: 0,
    icon: Target,
    color: '#F43F5E'
  },
  {
    id: 'greedy',
    title: 'Greedy',
    description: 'Algorithms that make locally optimal choices at each step.',
    difficulty: 'Intermediate',
    progress: 0,
    totalProblems: 15,
    completedProblems: 0,
    icon: Flame,
    color: '#FB923C'
  },
  {
    id: 'trees',
    title: 'Trees',
    description: 'Hierarchical structures emphasizing Binary Search Trees and traversals.',
    difficulty: 'Intermediate',
    progress: 0,
    totalProblems: 54,
    completedProblems: 0,
    icon: TreePine,
    color: '#3B82F6'
  },
  {
    id: 'graphs',
    title: 'Graphs',
    description: 'Non-linear structures modeling relationships and network flows.',
    difficulty: 'Advanced',
    progress: 0,
    totalProblems: 53,
    completedProblems: 0,
    icon: Network,
    color: '#8B5CF6'
  },
  {
    id: 'dp',
    title: 'Dynamic Programming',
    description: 'Solving complex problems by breaking them down into simpler subproblems.',
    difficulty: 'Mastery',
    progress: 0,
    totalProblems: 55,
    completedProblems: 0,
    icon: BrainCircuit,
    color: '#3B82F6'
  },
  {
    id: 'tries',
    title: 'Tries',
    description: 'Prefix tree implementations for efficient string searching.',
    difficulty: 'Advanced',
    progress: 0,
    totalProblems: 7,
    completedProblems: 0,
    icon: Target,
    color: '#A855F7'
  }
];

export interface Problem {
  id: string;
  serial: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  category: string;
}

export const PROBLEMS: Problem[] = [
  // ARRAYS - EASY
  { id: 'arr-e-1', serial: 1, title: 'Largest Element', difficulty: 'Easy', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-e-2', serial: 2, title: 'Second Largest Element', difficulty: 'Easy', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-e-3', serial: 3, title: 'Check if the Array is Sorted II', difficulty: 'Easy', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-e-4', serial: 4, title: 'Remove duplicates from Sorted array', difficulty: 'Easy', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-e-5', serial: 5, title: 'Left Rotate Array by One', difficulty: 'Easy', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-e-6', serial: 6, title: 'Left Rotate Array by K Places', difficulty: 'Easy', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-e-7', serial: 7, title: 'Move Zeros to End', difficulty: 'Easy', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-e-8', serial: 8, title: 'Linear Search', difficulty: 'Easy', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-e-9', serial: 9, title: 'Union of two sorted arrays', difficulty: 'Easy', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-e-10', serial: 10, title: 'Find missing number', difficulty: 'Easy', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-e-11', serial: 11, title: 'Maximum Consecutive Ones', difficulty: 'Easy', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-e-12', serial: 12, title: 'Find the number that appears once', difficulty: 'Medium', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-e-13', serial: 13, title: 'Longest subarray with given sum K(positives)', difficulty: 'Medium', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-e-14', serial: 14, title: 'Longest subarray with sum K', difficulty: 'Medium', topics: ['Array'], category: 'Arrays' },

  // ARRAYS - MEDIUM
  { id: 'arr-m-1', serial: 1, title: 'Two Sum', difficulty: 'Easy', topics: ['Array', 'Hash Map'], category: 'Arrays' },
  { id: 'arr-m-2', serial: 2, title: "Sort an array of 0's 1's and 2's", difficulty: 'Medium', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-m-3', serial: 3, title: 'Majority Element-I', difficulty: 'Easy', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-m-4', serial: 4, title: "Kadane's Algorithm", difficulty: 'Medium', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-m-5', serial: 5, title: 'Print subarray with maximum subarray sum', difficulty: 'Medium', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-m-6', serial: 6, title: 'Stock Buy and Sell', difficulty: 'Medium', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-m-7', serial: 7, title: 'Rearrange array elements by sign', difficulty: 'Medium', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-m-8', serial: 8, title: 'Next Permutation', difficulty: 'Medium', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-m-9', serial: 9, title: 'Leaders in an Array', difficulty: 'Medium', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-m-10', serial: 10, title: 'Longest Consecutive Sequence in an Array', difficulty: 'Medium', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-m-11', serial: 11, title: 'Set Matrix Zeroes', difficulty: 'Medium', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-m-12', serial: 12, title: 'Rotate matrix by 90 degrees', difficulty: 'Medium', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-m-13', serial: 13, title: 'Print the matrix in spiral manner', difficulty: 'Medium', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-m-14', serial: 14, title: 'Count subarrays with given sum', difficulty: 'Medium', topics: ['Array'], category: 'Arrays' },

  // ARRAYS - HARD
  { id: 'arr-h-1', serial: 1, title: "Pascal's Triangle I", difficulty: 'Easy', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-h-2', serial: 2, title: 'Majority Element-II', difficulty: 'Hard', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-h-3', serial: 3, title: '3 Sum', difficulty: 'Medium', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-h-4', serial: 4, title: '4 Sum', difficulty: 'Medium', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-h-5', serial: 5, title: 'Largest Subarray with Sum 0', difficulty: 'Medium', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-h-6', serial: 6, title: 'Count subarrays with given xor K', difficulty: 'Hard', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-h-7', serial: 7, title: 'Merge Overlapping Subintervals', difficulty: 'Medium', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-h-8', serial: 8, title: 'Merge two sorted arrays without extra space', difficulty: 'Medium', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-h-9', serial: 9, title: 'Find the repeating and missing number', difficulty: 'Hard', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-h-10', serial: 10, title: 'Count Inversions', difficulty: 'Hard', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-h-11', serial: 11, title: 'Reverse Pairs', difficulty: 'Hard', topics: ['Array'], category: 'Arrays' },
  { id: 'arr-h-12', serial: 12, title: 'Maximum Product Subarray in an Array', difficulty: 'Hard', topics: ['Array'], category: 'Arrays' },

  // BINARY SEARCH - 1D
  { id: 'bs-1', serial: 1, title: 'Search X in sorted array', difficulty: 'Easy', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-2', serial: 2, title: 'Lower Bound', difficulty: 'Easy', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-3', serial: 3, title: 'Upper Bound', difficulty: 'Easy', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-4', serial: 4, title: 'Search insert position', difficulty: 'Easy', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-5', serial: 5, title: 'Floor and Ceil in Sorted Array', difficulty: 'Easy', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-6', serial: 6, title: 'First and last occurrence', difficulty: 'Easy', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-7', serial: 7, title: 'Count Occurrences in a Sorted Array', difficulty: 'Easy', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-8', serial: 8, title: 'Search in rotated sorted array-I', difficulty: 'Medium', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-9', serial: 9, title: 'Search in rotated sorted array-II', difficulty: 'Medium', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-10', serial: 10, title: 'Find minimum in Rotated Sorted Array', difficulty: 'Easy', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-11', serial: 11, title: 'Find out how many times the array is rotated', difficulty: 'Easy', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-12', serial: 12, title: 'Single element in a Sorted Array', difficulty: 'Medium', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-13', serial: 13, title: 'Find peak element', difficulty: 'Medium', topics: ['Binary Search'], category: 'Binary Search' },

  // BINARY SEARCH - ANSWERS
  { id: 'bs-a-1', serial: 1, title: 'Find square root of a number', difficulty: 'Medium', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-a-2', serial: 2, title: 'Find Nth root of a number', difficulty: 'Medium', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-a-3', serial: 3, title: 'Koko eating bananas', difficulty: 'Medium', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-a-4', serial: 4, title: 'Minimum days to make M bouquets', difficulty: 'Medium', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-a-5', serial: 5, title: 'Find the smallest divisor', difficulty: 'Medium', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-a-6', serial: 6, title: 'Capacity to Ship Packages Within D Days', difficulty: 'Medium', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-a-7', serial: 7, title: 'Kth Missing Positive Number', difficulty: 'Medium', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-a-8', serial: 8, title: 'Aggressive Cows', difficulty: 'Hard', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-a-9', serial: 9, title: 'Book Allocation Problem', difficulty: 'Hard', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-a-10', serial: 10, title: 'Split array - largest sum', difficulty: 'Hard', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-a-11', serial: 11, title: "Painter's Partition", difficulty: 'Medium', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-a-12', serial: 12, title: 'Minimize Max Distance to Gas Station', difficulty: 'Hard', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-a-13', serial: 13, title: 'Median of 2 sorted arrays', difficulty: 'Hard', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-a-14', serial: 14, title: 'Kth element of 2 sorted arrays', difficulty: 'Medium', topics: ['Binary Search'], category: 'Binary Search' },

  // BINARY SEARCH - 2D
  { id: 'bs-2d-1', serial: 1, title: "Find row with maximum 1's", difficulty: 'Easy', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-2d-2', serial: 2, title: 'Search in a 2D matrix', difficulty: 'Hard', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-2d-3', serial: 3, title: 'Search in 2D matrix - II', difficulty: 'Hard', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-2d-4', serial: 4, title: 'Find Peak Element - II', difficulty: 'Medium', topics: ['Binary Search'], category: 'Binary Search' },
  { id: 'bs-2d-5', serial: 5, title: 'Matrix Median', difficulty: 'Hard', topics: ['Binary Search'], category: 'Binary Search' },

  // STRINGS - BASIC
  { id: 'str-1', serial: 1, title: 'Remove Outermost Parentheses', difficulty: 'Medium', topics: ['String'], category: 'Strings' },
  { id: 'str-2', serial: 2, title: 'Reverse words in a given string / Palindrome Check', difficulty: 'Medium', topics: ['String'], category: 'Strings' },
  { id: 'str-3', serial: 3, title: 'Largest Odd Number in a String', difficulty: 'Easy', topics: ['String'], category: 'Strings' },
  { id: 'str-4', serial: 4, title: 'Longest Common Prefix', difficulty: 'Easy', topics: ['String'], category: 'Strings' },
  { id: 'str-5', serial: 5, title: 'Isomorphic String', difficulty: 'Easy', topics: ['String'], category: 'Strings' },
  { id: 'str-6', serial: 6, title: 'Rotate String', difficulty: 'Easy', topics: ['String'], category: 'Strings' },
  { id: 'str-7', serial: 7, title: 'Check if two strings are anagram of each other', difficulty: 'Easy', topics: ['String'], category: 'Strings' },

  // STRINGS - MEDIUM
  { id: 'str-m-1', serial: 1, title: 'Sort Characters by Frequency', difficulty: 'Easy', topics: ['String'], category: 'Strings' },
  { id: 'str-m-2', serial: 2, title: 'Maximum Nesting Depth of the Parentheses', difficulty: 'Medium', topics: ['String'], category: 'Strings' },
  { id: 'str-m-3', serial: 3, title: 'Roman to Integer', difficulty: 'Medium', topics: ['String'], category: 'Strings' },
  { id: 'str-m-4', serial: 4, title: 'String to Integer (atoi)', difficulty: 'Medium', topics: ['String'], category: 'Strings' },
  { id: 'str-m-5', serial: 5, title: 'Count Number of Substrings', difficulty: 'Easy', topics: ['String'], category: 'Strings' },
  { id: 'str-m-6', serial: 6, title: 'Longest Palindromic Substring', difficulty: 'Medium', topics: ['String'], category: 'Strings' },
  { id: 'str-m-7', serial: 7, title: 'Sum of Beauty of All Substrings', difficulty: 'Medium', topics: ['String'], category: 'Strings' },
  { id: 'str-m-8', serial: 8, title: 'Reverse every word in a string', difficulty: 'Medium', topics: ['String'], category: 'Strings' },

  // LINKED LIST - 1D
  { id: 'll-1', serial: 1, title: 'Introduction to Singly LinkedList', difficulty: 'Easy', topics: ['Linked List'], category: 'Linked List' },
  { id: 'll-2', serial: 2, title: 'Insertion at the head of Linked List', difficulty: 'Easy', topics: ['Linked List'], category: 'Linked List' },
  { id: 'll-3', serial: 3, title: 'Deletion of the head of LL', difficulty: 'Easy', topics: ['Linked List'], category: 'Linked List' },
  { id: 'll-4', serial: 4, title: 'Find the length of the Linked List', difficulty: 'Easy', topics: ['Linked List'], category: 'Linked List' },
  { id: 'll-5', serial: 5, title: 'Search in Linked List', difficulty: 'Medium', topics: ['Linked List'], category: 'Linked List' },

  // LINKED LIST - DOUBLY
  { id: 'dll-1', serial: 1, title: 'Introduction to Doubly LL', difficulty: 'Easy', topics: ['Linked List'], category: 'Linked List' },
  { id: 'dll-2', serial: 2, title: 'Insert node before head in Doubly Linked List', difficulty: 'Easy', topics: ['Linked List'], category: 'Linked List' },
  { id: 'dll-3', serial: 3, title: 'Delete head of Doubly Linked List', difficulty: 'Easy', topics: ['Linked List'], category: 'Linked List' },
  { id: 'dll-4', serial: 4, title: 'Reverse a Doubly Linked List', difficulty: 'Medium', topics: ['Linked List'], category: 'Linked List' },

  // LINKED LIST - MEDIUM DLL
  { id: 'dll-m-1', serial: 1, title: 'Delete all occurrences of a key in DLL', difficulty: 'Hard', topics: ['Linked List'], category: 'Linked List' },
  { id: 'dll-m-2', serial: 2, title: 'Find Pairs with Given Sum in Doubly Linked List', difficulty: 'Medium', topics: ['Linked List'], category: 'Linked List' },
  { id: 'dll-m-3', serial: 3, title: 'Remove duplicates from sorted DLL', difficulty: 'Hard', topics: ['Linked List'], category: 'Linked List' },

  // LINKED LIST - HARD
  { id: 'll-h-1', serial: 1, title: 'Reverse LL in group of given size K', difficulty: 'Hard', topics: ['Linked List'], category: 'Linked List' },
  { id: 'll-h-2', serial: 2, title: 'Rotate a LL', difficulty: 'Hard', topics: ['Linked List'], category: 'Linked List' },
  { id: 'll-h-3', serial: 3, title: 'Flattening of LL', difficulty: 'Hard', topics: ['Linked List'], category: 'Linked List' },
  { id: 'll-h-4', serial: 4, title: 'Clone a LL with random and next pointer', difficulty: 'Hard', topics: ['Linked List'], category: 'Linked List' },

  // RECURSION - COMBOS
  { id: 'rec-c-1', serial: 1, title: 'Palindrome partitioning', difficulty: 'Hard', topics: ['Recursion'], category: 'Recursion' },
  { id: 'rec-c-2', serial: 2, title: 'Word Search', difficulty: 'Hard', topics: ['Recursion'], category: 'Recursion' },
  { id: 'rec-c-3', serial: 3, title: 'N Queen', difficulty: 'Hard', topics: ['Recursion'], category: 'Recursion' },
  { id: 'rec-c-4', serial: 4, title: 'Rat in a Maze', difficulty: 'Hard', topics: ['Recursion'], category: 'Recursion' },
  { id: 'rec-c-5', serial: 5, title: 'Word Break', difficulty: 'Medium', topics: ['Recursion'], category: 'Recursion' },
  { id: 'rec-c-6', serial: 6, title: 'M Coloring Problem', difficulty: 'Hard', topics: ['Recursion'], category: 'Recursion' },
  { id: 'rec-c-7', serial: 7, title: 'Sudoku Solver', difficulty: 'Hard', topics: ['Recursion'], category: 'Recursion' },
  { id: 'rec-c-8', serial: 8, title: 'Expression Add Operators', difficulty: 'Hard', topics: ['Recursion'], category: 'Recursion' },

  // BIT MANIPULATION - INTERVIEW
  { id: 'bit-i-1', serial: 1, title: 'Minimum Bit Flips to Convert Number', difficulty: 'Medium', topics: ['Bit Manipulation'], category: 'Bit Manipulation' },
  { id: 'bit-i-2', serial: 2, title: 'Single Number - I', difficulty: 'Medium', topics: ['Bit Manipulation'], category: 'Bit Manipulation' },
  { id: 'bit-i-3', serial: 3, title: 'Power Set Bit Manipulation', difficulty: 'Medium', topics: ['Bit Manipulation'], category: 'Bit Manipulation' },
  { id: 'bit-i-4', serial: 4, title: 'XOR of numbers in a given range', difficulty: 'Medium', topics: ['Bit Manipulation'], category: 'Bit Manipulation' },
  { id: 'bit-i-5', serial: 5, title: 'Single Number - III', difficulty: 'Medium', topics: ['Bit Manipulation'], category: 'Bit Manipulation' },

  // BIT MANIPULATION - ADVANCED MATHS
  { id: 'bit-a-1', serial: 1, title: 'Print Prime Factors of a Number', difficulty: 'Hard', topics: ['Maths'], category: 'Bit Manipulation' },
  { id: 'bit-a-2', serial: 2, title: 'Divisors of a Number', difficulty: 'Easy', topics: ['Maths'], category: 'Bit Manipulation' },
  { id: 'bit-a-3', serial: 3, title: 'Count primes in range L to R', difficulty: 'Hard', topics: ['Maths'], category: 'Bit Manipulation' },
  { id: 'bit-a-4', serial: 4, title: 'Prime factorisation of a Number', difficulty: 'Hard', topics: ['Maths'], category: 'Bit Manipulation' },
  { id: 'bit-a-5', serial: 5, title: 'Pow(x,n) (Binary Exponentiation)', difficulty: 'Easy', topics: ['Maths'], category: 'Bit Manipulation' },

  // LINKED LIST - MEDIUM
  { id: 'll-m-1', serial: 1, title: 'Middle of a LinkedList [TortoiseHare Method]', difficulty: 'Easy', topics: ['Linked List'], category: 'Linked List' },
  { id: 'll-m-2', serial: 2, title: 'Reverse a LinkedList [Iterative]', difficulty: 'Medium', topics: ['Linked List'], category: 'Linked List' },
  { id: 'll-m-3', serial: 3, title: 'Reverse a LL', difficulty: 'Medium', topics: ['Linked List'], category: 'Linked List' },
  { id: 'll-m-4', serial: 4, title: 'Detect a loop in LL', difficulty: 'Medium', topics: ['Linked List'], category: 'Linked List' },
  { id: 'll-m-5', serial: 5, title: 'Find the starting point in LL', difficulty: 'Medium', topics: ['Linked List'], category: 'Linked List' },
  { id: 'll-m-6', serial: 6, title: 'Length of loop in LL', difficulty: 'Medium', topics: ['Linked List'], category: 'Linked List' },
  { id: 'll-m-7', serial: 7, title: 'Check if LL is palindrome or not', difficulty: 'Medium', topics: ['Linked List'], category: 'Linked List' },
  { id: 'll-m-8', serial: 8, title: 'Segregate odd and even nodes in Linked List', difficulty: 'Medium', topics: ['Linked List'], category: 'Linked List' },
  { id: 'll-m-9', serial: 9, title: 'Remove Nth node from the back of the LL', difficulty: 'Medium', topics: ['Linked List'], category: 'Linked List' },
  { id: 'll-m-10', serial: 10, title: 'Delete the middle node in LL', difficulty: 'Medium', topics: ['Linked List'], category: 'Linked List' },
  { id: 'll-m-11', serial: 11, title: 'Sort LL', difficulty: 'Hard', topics: ['Linked List'], category: 'Linked List' },
  { id: 'll-m-12', serial: 12, title: "Sort a Linked List of 0's 1's and 2's", difficulty: 'Medium', topics: ['Linked List'], category: 'Linked List' },
  { id: 'll-m-13', serial: 13, title: 'Find the intersection point of Y LL', difficulty: 'Medium', topics: ['Linked List'], category: 'Linked List' },
  { id: 'll-m-14', serial: 14, title: 'Add one to a number represented by LL', difficulty: 'Medium', topics: ['Linked List'], category: 'Linked List' },
  { id: 'll-m-15', serial: 15, title: 'Add two numbers in Linked List', difficulty: 'Medium', topics: ['Linked List'], category: 'Linked List' },

  // RECURSION
  { id: 'rec-1', serial: 1, title: 'Recursive Implementation of atoi()', difficulty: 'Medium', topics: ['Recursion'], category: 'Recursion' },
  { id: 'rec-2', serial: 2, title: 'Pow(x, n)', difficulty: 'Easy', topics: ['Recursion'], category: 'Recursion' },
  { id: 'rec-3', serial: 3, title: 'Count Good Numbers', difficulty: 'Medium', topics: ['Recursion'], category: 'Recursion' },
  { id: 'rec-4', serial: 4, title: 'Sort a stack using recursion', difficulty: 'Medium', topics: ['Recursion'], category: 'Recursion' },
  { id: 'rec-5', serial: 5, title: 'Reverse a Stack', difficulty: 'Medium', topics: ['Recursion'], category: 'Recursion' },

  // RECURSION - SUBSEQUENCES
  { id: 'rec-idx-1', serial: 1, title: 'Generate Binary Strings Without Consecutive 1s', difficulty: 'Medium', topics: ['Recursion'], category: 'Recursion' },
  { id: 'rec-idx-2', serial: 2, title: 'Generate Parentheses', difficulty: 'Medium', topics: ['Recursion'], category: 'Recursion' },
  { id: 'rec-idx-3', serial: 3, title: 'Power Set', difficulty: 'Medium', topics: ['Recursion'], category: 'Recursion' },
  { id: 'rec-idx-4', serial: 4, title: 'Learn All Patterns of Subsequences', difficulty: 'Easy', topics: ['Recursion'], category: 'Recursion' },
  { id: 'rec-idx-5', serial: 5, title: 'Count all subsequences with sum K', difficulty: 'Easy', topics: ['Recursion'], category: 'Recursion' },
  { id: 'rec-idx-6', serial: 6, title: 'Check if there exists a subsequence with sum K', difficulty: 'Easy', topics: ['Recursion'], category: 'Recursion' },
  { id: 'rec-idx-7', serial: 7, title: 'Combination Sum', difficulty: 'Medium', topics: ['Recursion'], category: 'Recursion' },
  { id: 'rec-idx-8', serial: 8, title: 'Combination Sum II', difficulty: 'Medium', topics: ['Recursion'], category: 'Recursion' },
  { id: 'rec-idx-9', serial: 9, title: 'Subsets I', difficulty: 'Medium', topics: ['Recursion'], category: 'Recursion' },
  { id: 'rec-idx-10', serial: 10, title: 'Subsets II', difficulty: 'Medium', topics: ['Recursion'], category: 'Recursion' },
  { id: 'rec-idx-11', serial: 11, title: 'Combination Sum III', difficulty: 'Medium', topics: ['Recursion'], category: 'Recursion' },
  { id: 'rec-idx-12', serial: 12, title: 'Letter Combinations of a Phone Number', difficulty: 'Hard', topics: ['Recursion'], category: 'Recursion' },

  // BIT MANIPULATION
  { id: 'bit-1', serial: 1, title: 'Introduction to Bits and Tricks', difficulty: 'Easy', topics: ['Bit Manipulation'], category: 'Bit Manipulation' },
  { id: 'bit-2', serial: 2, title: 'Check if the i-th bit is Set or Not', difficulty: 'Easy', topics: ['Bit Manipulation'], category: 'Bit Manipulation' },
  { id: 'bit-3', serial: 3, title: 'Check if a Number is Odd or Not', difficulty: 'Easy', topics: ['Bit Manipulation'], category: 'Bit Manipulation' },
  { id: 'bit-4', serial: 4, title: 'Check if a Number is Power of 2 or Not', difficulty: 'Easy', topics: ['Bit Manipulation'], category: 'Bit Manipulation' },
  { id: 'bit-5', serial: 5, title: 'Count the Number of Set Bits', difficulty: 'Easy', topics: ['Bit Manipulation'], category: 'Bit Manipulation' },
  { id: 'bit-6', serial: 6, title: 'Set/Unset the rightmost unset bit', difficulty: 'Easy', topics: ['Bit Manipulation'], category: 'Bit Manipulation' },
  { id: 'bit-7', serial: 7, title: 'Swap Two Numbers', difficulty: 'Easy', topics: ['Bit Manipulation'], category: 'Bit Manipulation' },
  { id: 'bit-8', serial: 8, title: 'Divide two numbers without multiplication and division', difficulty: 'Medium', topics: ['Bit Manipulation'], category: 'Bit Manipulation' },

  // STACK & QUEUE - LEARNING
  { id: 'sq-1', serial: 1, title: 'Implement Stack using Arrays', difficulty: 'Easy', topics: ['Stack'], category: 'Stack & Queue' },
  { id: 'sq-2', serial: 2, title: 'Implement Queue using Arrays', difficulty: 'Easy', topics: ['Queue'], category: 'Stack & Queue' },
  { id: 'sq-3', serial: 3, title: 'Implement Stack using Queue', difficulty: 'Easy', topics: ['Stack', 'Queue'], category: 'Stack & Queue' },
  { id: 'sq-4', serial: 4, title: 'Implement Queue using Stack', difficulty: 'Easy', topics: ['Stack', 'Queue'], category: 'Stack & Queue' },
  { id: 'sq-5', serial: 5, title: 'Implement stack using Linkedlist', difficulty: 'Easy', topics: ['Stack', 'Linked List'], category: 'Stack & Queue' },
  { id: 'sq-6', serial: 6, title: 'Implement queue using Linkedlist', difficulty: 'Easy', topics: ['Queue', 'Linked List'], category: 'Stack & Queue' },
  { id: 'sq-7', serial: 7, title: 'Balanced Paranthesis', difficulty: 'Easy', topics: ['Stack'], category: 'Stack & Queue' },
  { id: 'sq-8', serial: 8, title: 'Implement Min Stack', difficulty: 'Hard', topics: ['Stack'], category: 'Stack & Queue' },

  // STACK & QUEUE - CONVERSIONS
  { id: 'sq-c-1', serial: 1, title: 'Infix to Postfix Conversion', difficulty: 'Medium', topics: ['Stack'], category: 'Stack & Queue' },
  { id: 'sq-c-2', serial: 2, title: 'Prefix to Infix Conversion', difficulty: 'Medium', topics: ['Stack'], category: 'Stack & Queue' },
  { id: 'sq-c-3', serial: 3, title: 'Prefix to Postfix Conversion', difficulty: 'Medium', topics: ['Stack'], category: 'Stack & Queue' },
  { id: 'sq-c-4', serial: 4, title: 'Postfix to Prefix Conversion', difficulty: 'Medium', topics: ['Stack'], category: 'Stack & Queue' },
  { id: 'sq-c-5', serial: 5, title: 'Postfix to Infix Conversion', difficulty: 'Easy', topics: ['Stack'], category: 'Stack & Queue' },
  { id: 'sq-c-6', serial: 6, title: 'Infix to Prefix Conversion', difficulty: 'Medium', topics: ['Stack'], category: 'Stack & Queue' },

  // STACK & QUEUE - MONOTONIC
  { id: 'sq-m-1', serial: 1, title: 'Next Greater Element', difficulty: 'Medium', topics: ['Stack'], category: 'Stack & Queue' },
  { id: 'sq-m-2', serial: 2, title: 'Next Greater Element - 2', difficulty: 'Medium', topics: ['Stack'], category: 'Stack & Queue' },
  { id: 'sq-m-3', serial: 3, title: 'Next Smaller Element', difficulty: 'Medium', topics: ['Stack'], category: 'Stack & Queue' },
  { id: 'sq-m-4', serial: 4, title: 'Number of Greater Elements to the Right', difficulty: 'Easy', topics: ['Stack'], category: 'Stack & Queue' },
  { id: 'sq-m-5', serial: 5, title: 'Trapping Rainwater', difficulty: 'Hard', topics: ['Stack', 'Two Pointers'], category: 'Stack & Queue' },
  { id: 'sq-m-6', serial: 6, title: 'Sum of Subarray Minimums', difficulty: 'Medium', topics: ['Stack'], category: 'Stack & Queue' },
  { id: 'sq-m-7', serial: 7, title: 'Asteroid Collision', difficulty: 'Medium', topics: ['Stack'], category: 'Stack & Queue' },
  { id: 'sq-m-8', serial: 8, title: 'Sum of Subarray Ranges', difficulty: 'Medium', topics: ['Stack'], category: 'Stack & Queue' },
  { id: 'sq-m-9', serial: 9, title: 'Remove K Digits', difficulty: 'Medium', topics: ['Stack'], category: 'Stack & Queue' },
  { id: 'sq-m-10', serial: 10, title: 'Largest rectangle in a histogram', difficulty: 'Hard', topics: ['Stack'], category: 'Stack & Queue' },
  { id: 'sq-m-11', serial: 11, title: 'Maximum Rectangles', difficulty: 'Hard', topics: ['Stack'], category: 'Stack & Queue' },

  // STACK & QUEUE - IMPLEMENTATION
  { id: 'sq-i-1', serial: 1, title: 'Sliding Window Maximum', difficulty: 'Hard', topics: ['Queue'], category: 'Stack & Queue' },
  { id: 'sq-i-2', serial: 2, title: 'Stock span problem', difficulty: 'Hard', topics: ['Stack'], category: 'Stack & Queue' },
  { id: 'sq-i-3', serial: 3, title: 'Celebrity Problem', difficulty: 'Hard', topics: ['Stack'], category: 'Stack & Queue' },
  { id: 'sq-i-4', serial: 4, title: 'LRU Cache', difficulty: 'Medium', topics: ['Design'], category: 'Stack & Queue' },
  { id: 'sq-i-5', serial: 5, title: 'LFU Cache', difficulty: 'Hard', topics: ['Design'], category: 'Stack & Queue' },

  // SLIDING WINDOW - HARD
  { id: 'sw-h-1', serial: 1, title: 'Longest Substring With At Most K Distinct Characters', difficulty: 'Hard', topics: ['Sliding Window'], category: 'Sliding Window' },
  { id: 'sw-h-2', serial: 2, title: 'Subarrays with K Different Integers', difficulty: 'Medium', topics: ['Sliding Window'], category: 'Sliding Window' },
  { id: 'sw-h-3', serial: 3, title: 'Minimum Window Substring', difficulty: 'Hard', topics: ['Sliding Window'], category: 'Sliding Window' },
  { id: 'sw-h-4', serial: 4, title: 'Minimum Window Subsequence', difficulty: 'Hard', topics: ['Sliding Window'], category: 'Sliding Window' },

  // HEAPS - HARD
  { id: 'hp-h-1', serial: 1, title: 'Design Twitter', difficulty: 'Medium', topics: ['Heap', 'Design'], category: 'Heaps' },
  { id: 'hp-h-2', serial: 2, title: 'Minimum Cost to Connect Sticks', difficulty: 'Medium', topics: ['Heap'], category: 'Heaps' },
  { id: 'hp-h-3', serial: 3, title: 'Kth largest element in a stream', difficulty: 'Hard', topics: ['Heap'], category: 'Heaps' },
  { id: 'hp-h-4', serial: 4, title: 'Maximum Sum Combination', difficulty: 'Hard', topics: ['Heap'], category: 'Heaps' },
  { id: 'hp-h-5', serial: 5, title: 'Find Median from Data Stream', difficulty: 'Hard', topics: ['Heap'], category: 'Heaps' },
  { id: 'hp-h-6', serial: 6, title: 'Top K Frequent Elements', difficulty: 'Medium', topics: ['Heap'], category: 'Heaps' },

  // SLIDING WINDOW & TWO POINTER
  { id: 'sw-1', serial: 1, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', topics: ['Sliding Window'], category: 'Sliding Window' },
  { id: 'sw-2', serial: 2, title: 'Max Consecutive Ones III', difficulty: 'Medium', topics: ['Sliding Window'], category: 'Sliding Window' },
  { id: 'sw-3', serial: 3, title: 'Fruit Into Baskets', difficulty: 'Medium', topics: ['Sliding Window'], category: 'Sliding Window' },
  { id: 'sw-4', serial: 4, title: 'Longest Repeating Character Replacement', difficulty: 'Hard', topics: ['Sliding Window'], category: 'Sliding Window' },
  { id: 'sw-5', serial: 5, title: 'Binary Subarrays With Sum', difficulty: 'Hard', topics: ['Sliding Window'], category: 'Sliding Window' },
  { id: 'sw-6', serial: 6, title: 'Count number of Nice subarrays', difficulty: 'Hard', topics: ['Sliding Window'], category: 'Sliding Window' },
  { id: 'sw-7', serial: 7, title: 'Number of Substrings Containing All Three Characters', difficulty: 'Hard', topics: ['Sliding Window'], category: 'Sliding Window' },
  { id: 'sw-8', serial: 8, title: 'Maximum Points You Can Obtain from Cards', difficulty: 'Medium', topics: ['Two Pointer'], category: 'Sliding Window' },

  // HEAPS
  { id: 'hp-1', serial: 1, title: 'Heaps (Theory Video)', difficulty: 'Easy', topics: ['Heap'], category: 'Heaps' },
  { id: 'hp-2', serial: 2, title: 'Implement Min Heap', difficulty: 'Medium', topics: ['Heap'], category: 'Heaps' },
  { id: 'hp-3', serial: 3, title: 'Check if an array represents a min heap', difficulty: 'Medium', topics: ['Heap'], category: 'Heaps' },
  { id: 'hp-4', serial: 4, title: 'Convert Min Heap to Max Heap', difficulty: 'Medium', topics: ['Heap'], category: 'Heaps' },
  { id: 'hp-m-1', serial: 1, title: 'K-th Largest element in an array', difficulty: 'Medium', topics: ['Heap'], category: 'Heaps' },
  { id: 'hp-m-2', serial: 2, title: 'Kth smallest element in an array', difficulty: 'Medium', topics: ['Heap'], category: 'Heaps' },
  { id: 'hp-m-3', serial: 3, title: 'Sort K sorted array', difficulty: 'Easy', topics: ['Heap'], category: 'Heaps' },
  { id: 'hp-m-4', serial: 4, title: 'Merge K sorted Lists', difficulty: 'Hard', topics: ['Heap'], category: 'Heaps' },
  { id: 'hp-m-5', serial: 5, title: 'Replace Elements by Their Rank', difficulty: 'Easy', topics: ['Heap'], category: 'Heaps' },
  { id: 'hp-m-6', serial: 6, title: 'Task Scheduler', difficulty: 'Medium', topics: ['Heap'], category: 'Heaps' },
  { id: 'hp-m-7', serial: 7, title: 'Hand of Straights', difficulty: 'Medium', topics: ['Heap'], category: 'Heaps' },

  // GREEDY
  { id: 'gr-1', serial: 1, title: 'Assign Cookies', difficulty: 'Easy', topics: ['Greedy'], category: 'Greedy' },
  { id: 'gr-2', serial: 2, title: 'Fractional Knapsack', difficulty: 'Medium', topics: ['Greedy'], category: 'Greedy' },
  { id: 'gr-3', serial: 3, title: 'Lemonade Change', difficulty: 'Easy', topics: ['Greedy'], category: 'Greedy' },
  { id: 'gr-4', serial: 4, title: 'Valid Paranthesis Checker', difficulty: 'Hard', topics: ['Greedy'], category: 'Greedy' },
  { id: 'gr-m-1', serial: 1, title: 'N meetings in one room', difficulty: 'Medium', topics: ['Greedy'], category: 'Greedy' },
  { id: 'gr-m-2', serial: 2, title: 'Jump Game - I', difficulty: 'Easy', topics: ['Greedy'], category: 'Greedy' },
  { id: 'gr-m-3', serial: 3, title: 'Jump Game II', difficulty: 'Medium', topics: ['Greedy'], category: 'Greedy' },
  { id: 'gr-m-4', serial: 4, title: 'Minimum platforms for railway', difficulty: 'Medium', topics: ['Greedy'], category: 'Greedy' },
  { id: 'gr-m-5', serial: 5, title: 'Job sequencing Problem', difficulty: 'Medium', topics: ['Greedy'], category: 'Greedy' },
  { id: 'gr-m-6', serial: 6, title: 'Candy', difficulty: 'Hard', topics: ['Greedy'], category: 'Greedy' },
  { id: 'gr-m-7', serial: 7, title: 'Shortest Job First', difficulty: 'Medium', topics: ['Greedy'], category: 'Greedy' },
  { id: 'gr-m-8', serial: 8, title: 'LRU Page Replacement Algorithm', difficulty: 'Medium', topics: ['Greedy'], category: 'Greedy' },
  { id: 'gr-m-9', serial: 9, title: 'Insert Interval', difficulty: 'Medium', topics: ['Greedy'], category: 'Greedy' },
  { id: 'gr-m-10', serial: 10, title: 'Merge Intervals', difficulty: 'Medium', topics: ['Greedy'], category: 'Greedy' },
  { id: 'gr-m-11', serial: 11, title: 'Non-overlapping Intervals', difficulty: 'Medium', topics: ['Greedy'], category: 'Greedy' },

  // BINARY TREES - TRAVERSALS PLUS
  { id: 'bt-tp-1', serial: 1, title: 'Pre, Post, Inorder in one traversal', difficulty: 'Easy', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-tp-2', serial: 2, title: 'Post-order Traversal using 2 stack', difficulty: 'Easy', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-tp-3', serial: 3, title: 'Post-order Traversal using 1 stack', difficulty: 'Easy', topics: ['Binary Tree'], category: 'Binary Trees' },

  // BINARY TREES - MEDIUM PLUS
  { id: 'bt-mp-1', serial: 1, title: 'Boundary Traversal', difficulty: 'Medium', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-mp-2', serial: 2, title: 'Vertical Order Traversal', difficulty: 'Medium', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-mp-3', serial: 3, title: 'Top View of BT', difficulty: 'Medium', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-mp-4', serial: 4, title: 'Bottom view of BT', difficulty: 'Medium', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-mp-5', serial: 5, title: 'Right/Left View of Binary Tree', difficulty: 'Medium', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-mp-6', serial: 6, title: 'Symmetric Binary Tree', difficulty: 'Medium', topics: ['Binary Tree'], category: 'Binary Trees' },

  // BINARY TREES - HARD
  { id: 'bt-h-1', serial: 1, title: 'Print root to leaf path in BT', difficulty: 'Medium', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-h-2', serial: 2, title: 'LCA in BT', difficulty: 'Hard', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-h-3', serial: 3, title: 'Maximum Width of BT', difficulty: 'Medium', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-h-4', serial: 4, title: 'Children Sum Property in Binary Tree', difficulty: 'Medium', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-h-5', serial: 5, title: 'Print all nodes at a distance of K in BT', difficulty: 'Hard', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-h-6', serial: 6, title: 'Minimum time to burn the BT', difficulty: 'Hard', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-h-7', serial: 7, title: 'Count total nodes in a complete BT', difficulty: 'Easy', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-h-8', serial: 8, title: 'Requirements to construct unique BT', difficulty: 'Medium', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-h-9', serial: 9, title: 'Construct BT from Preorder and Inorder', difficulty: 'Hard', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-h-10', serial: 10, title: 'Construct BT from Postorder and Inorder', difficulty: 'Hard', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-h-11', serial: 11, title: 'Serialize and De-serialize BT', difficulty: 'Hard', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-h-12', serial: 12, title: 'Morris Preorder Traversal', difficulty: 'Hard', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-h-13', serial: 13, title: 'Morris Inorder Traversal', difficulty: 'Hard', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-h-14', serial: 14, title: 'Flatten Binary Tree to Linked List', difficulty: 'Medium', topics: ['Binary Tree'], category: 'Binary Trees' },

  // BINARY SEARCH TREES - PRACTICE
  { id: 'bst-p-4', serial: 4, title: 'Floor in a BST', difficulty: 'Easy', topics: ['BST'], category: 'Binary Search Tree' },
  { id: 'bst-p-5', serial: 5, title: 'Kth Smallest and Largest in BST', difficulty: 'Medium', topics: ['BST'], category: 'Binary Search Tree' },
  { id: 'bst-p-6', serial: 6, title: 'Check if a tree is a BST or not', difficulty: 'Medium', topics: ['BST'], category: 'Binary Search Tree' },
  { id: 'bst-p-7', serial: 7, title: 'LCA in BST', difficulty: 'Medium', topics: ['BST'], category: 'Binary Search Tree' },
  { id: 'bst-p-8', serial: 8, title: 'Construct BST from preorder', difficulty: 'Medium', topics: ['BST'], category: 'Binary Search Tree' },
  { id: 'bst-p-9', serial: 9, title: 'Inorder Successor/Predecessor in BST', difficulty: 'Medium', topics: ['BST'], category: 'Binary Search Tree' },
  { id: 'bst-p-10', serial: 10, title: "Merge 2 BST's", difficulty: 'Hard', topics: ['BST'], category: 'Binary Search Tree' },
  { id: 'bst-p-11', serial: 11, title: 'Two Sum In BST', difficulty: 'Hard', topics: ['BST'], category: 'Binary Search Tree' },
  { id: 'bst-p-12', serial: 12, title: 'Correct BST with two nodes swapped', difficulty: 'Hard', topics: ['BST'], category: 'Binary Search Tree' },
  { id: 'bst-p-13', serial: 13, title: 'Largest BST in Binary Tree', difficulty: 'Hard', topics: ['BST'], category: 'Binary Search Tree' },

  // GRAPHS - TOPO
  { id: 'g-t-1', serial: 1, title: 'Topo Sort', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-t-2', serial: 2, title: "Kahn's algorithm", difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-t-3', serial: 3, title: 'Detect cycle in directed graph', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-t-4', serial: 4, title: 'Course Schedule I', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-t-5', serial: 5, title: 'Course Schedule II', difficulty: 'Medium', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-t-6', serial: 6, title: 'Find eventual safe states', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-t-7', serial: 7, title: 'Alien Dictionary', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },

  // GRAPHS - SHORTEST PATH PLUS
  { id: 'g-sp-p-1', serial: 1, title: 'Shortest path in undirected unit weights', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-sp-p-2', serial: 2, title: 'Shortest path in DAG', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-sp-p-3', serial: 3, title: 'Shortest Distance in a Binary Maze', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-sp-p-4', serial: 4, title: 'Path with minimum effort', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-sp-p-5', serial: 5, title: 'Cheapest flight within K stops', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-sp-p-6', serial: 6, title: 'Network Delay Time', difficulty: 'Medium', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-sp-p-7', serial: 7, title: 'Number of ways to arrive at destination', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-sp-p-8', serial: 8, title: 'Minimum multiplications to reach end', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-sp-p-9', serial: 9, title: 'Find the city smallest number of neighbors', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-sp-p-10', serial: 10, title: 'Shortest path in weighted undirected graph', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },

  // GRAPHS - MST / DISJOINT SET
  { id: 'g-mst-1', serial: 1, title: "Prim's Algorithm", difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-mst-2', serial: 2, title: 'Disjoint Set (Union-Find)', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-mst-3', serial: 3, title: 'Find MST weight', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-mst-4', serial: 4, title: 'Network connected operations', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-mst-5', serial: 5, title: 'Most stones removed', difficulty: 'Medium', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-mst-6', serial: 6, title: 'Accounts merge', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-mst-7', serial: 7, title: 'Number of islands II', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-mst-8', serial: 8, title: 'Making a large island', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-mst-9', serial: 9, title: 'Swim in Rising Water', difficulty: 'Medium', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-mst-10', serial: 10, title: "Kruskal's Algorithm", difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },

  // GRAPHS - OTHER
  { id: 'g-o-1', serial: 1, title: 'Bridges in graph', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-o-2', serial: 2, title: 'Articulation point in graph', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-o-3', serial: 3, title: "Kosaraju's algorithm", difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },

  // BINARY TREES - TRAVERSALS
  { id: 'bt-1', serial: 1, title: 'Introduction to Trees', difficulty: 'Easy', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-2', serial: 2, title: 'Binary Tree Representation', difficulty: 'Easy', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-3', serial: 3, title: 'Preorder Traversal', difficulty: 'Easy', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-4', serial: 4, title: 'Inorder Traversal', difficulty: 'Easy', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-5', serial: 5, title: 'Postorder Traversal', difficulty: 'Easy', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-6', serial: 6, title: 'Level Order Traversal', difficulty: 'Easy', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-7', serial: 7, title: 'Iterative Preorder', difficulty: 'Easy', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-8', serial: 8, title: 'Iterative Inorder', difficulty: 'Easy', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-9', serial: 9, title: 'Morris Inorder Traversal Basics', difficulty: 'Hard', topics: ['Binary Tree'], category: 'Binary Trees' },

  // BINARY TREES - MEDIUM
  { id: 'bt-m-1', serial: 1, title: 'Maximum Depth in BT', difficulty: 'Medium', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-m-2', serial: 2, title: 'Check for balanced binary tree', difficulty: 'Medium', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-m-3', serial: 3, title: 'Diameter of Binary Tree', difficulty: 'Easy', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-m-4', serial: 4, title: 'Maximum path sum', difficulty: 'Medium', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-m-5', serial: 5, title: 'Check if two trees are identical', difficulty: 'Medium', topics: ['Binary Tree'], category: 'Binary Trees' },
  { id: 'bt-m-6', serial: 6, title: 'Zig Zag or Spiral Traversal', difficulty: 'Medium', topics: ['Binary Tree'], category: 'Binary Trees' },

  // BINARY SEARCH TREES
  { id: 'bst-1', serial: 1, title: 'Introduction to BST', difficulty: 'Easy', topics: ['BST'], category: 'Binary Search Tree' },
  { id: 'bst-2', serial: 2, title: 'Search in a BST', difficulty: 'Easy', topics: ['BST'], category: 'Binary Search Tree' },
  { id: 'bst-3', serial: 3, title: 'Find Min/Max in BST', difficulty: 'Easy', topics: ['BST'], category: 'Binary Search Tree' },
  { id: 'bst-p-1', serial: 1, title: 'Floor and Ceil in a BST', difficulty: 'Easy', topics: ['BST'], category: 'Binary Search Tree' },
  { id: 'bst-p-2', serial: 2, title: 'Insert a given node in BST', difficulty: 'Medium', topics: ['BST'], category: 'Binary Search Tree' },
  { id: 'bst-p-3', serial: 3, title: 'Delete a node in BST', difficulty: 'Medium', topics: ['BST'], category: 'Binary Search Tree' },

  // GRAPHS - LEARNING
  { id: 'g-1', serial: 1, title: 'Introduction to Graph', difficulty: 'Easy', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-2', serial: 2, title: 'Graph Representation', difficulty: 'Easy', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-3', serial: 3, title: 'BFS', difficulty: 'Medium', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-4', serial: 4, title: 'DFS', difficulty: 'Medium', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-5', serial: 5, title: 'Connected Components', difficulty: 'Medium', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-6', serial: 6, title: 'Graph Traversal Theory', difficulty: 'Easy', topics: ['Graph'], category: 'Graphs' },

  // GRAPHS - PROBLEMS (BFS/DFS)
  { id: 'g-p-1', serial: 1, title: 'Number of provinces', difficulty: 'Medium', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-p-2', serial: 2, title: 'Rotten Oranges', difficulty: 'Medium', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-p-3', serial: 3, title: 'Flood fill algorithm', difficulty: 'Medium', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-p-4', serial: 4, title: 'Cycle Detection in Undirected Graph (BFS)', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-p-4-dfs', serial: 5, title: 'Cycle Detection in Undirected Graph (DFS)', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-p-5', serial: 6, title: 'Distance of nearest cell having 1', difficulty: 'Medium', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-p-6', serial: 7, title: 'Surrounded Regions', difficulty: 'Medium', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-p-7', serial: 8, title: 'Number of Enclaves', difficulty: 'Medium', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-p-8', serial: 9, title: 'Word Ladder - I', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-p-9', serial: 10, title: 'Word Ladder - II', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-p-10', serial: 11, title: 'Number of Distinct Islands', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-p-11', serial: 12, title: 'Bipartite Graph (BFS)', difficulty: 'Medium', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-p-12', serial: 13, title: 'Bipartite Graph (DFS)', difficulty: 'Medium', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-p-13', serial: 14, title: 'Detect cycle in a directed graph using DFS', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },

  // GRAPHS - SHORTEST PATH
  { id: 'g-sp-1', serial: 1, title: "Djisktra's Algorithm", difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-sp-2', serial: 2, title: 'Bellman Ford Algorithm', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },
  { id: 'g-sp-3', serial: 3, title: 'Floyd Warshall Algorithm', difficulty: 'Hard', topics: ['Graph'], category: 'Graphs' },

  // DYNAMIC PROGRAMMING - 1D
  { id: 'dp-intro-1', serial: 1, title: 'Introduction to DP', difficulty: 'Easy', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-1', serial: 2, title: 'Climbing stairs', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-2', serial: 3, title: 'Frog Jump', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-2-k', serial: 4, title: 'Frog Jump with k distances', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-3', serial: 5, title: 'Maximum sum of non adjacent elements (House Robber)', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-3-hr2', serial: 6, title: 'House Robber II', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-nt', serial: 7, title: "Ninja's Training", difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },

  // DP ON GRIDS
  { id: 'dp-g-1', serial: 1, title: 'Unique Paths', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-g-1-2', serial: 2, title: 'Unique Paths II', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-g-3', serial: 3, title: 'Minimum Path Sum', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-g-4', serial: 4, title: 'Triangle (Minimum Path Sum)', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-g-5', serial: 5, title: 'Minimum Falling Path Sum', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-g-6', serial: 6, title: '3D DP : Cherry Pickup II', difficulty: 'Hard', topics: ['DP'], category: 'Dynamic Programming' },

  // DP ON SUBSEQUENCES
  { id: 'dp-s-1', serial: 1, title: 'Subset sum equal to target', difficulty: 'Hard', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-s-2', serial: 2, title: 'Partition equal subset sum', difficulty: 'Hard', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-s-3', serial: 3, title: 'Partition set into 2 subsets with min sum diff', difficulty: 'Hard', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-s-4', serial: 4, title: 'Count Subsets with Sum K', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-s-5', serial: 5, title: 'Count Partitions with Given Difference', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-s-6', serial: 6, title: '0/1 Knapsack', difficulty: 'Hard', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-s-7', serial: 7, title: 'Minimum Coins', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-s-8', serial: 8, title: 'Target Sum', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-s-9', serial: 9, title: 'Coin Change 2', difficulty: 'Hard', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-s-10', serial: 10, title: 'Unbounded Knapsack', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-s-11', serial: 11, title: 'Rod Cutting Problem', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },

  // DP ON STRINGS
  { id: 'dp-st-1', serial: 1, title: 'Longest common subsequence', difficulty: 'Hard', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-st-1-p', serial: 2, title: 'Print Longest Common Subsequence', difficulty: 'Hard', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-st-3', serial: 3, title: 'Longest Common Substring', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-st-4', serial: 4, title: 'Longest Palindromic Subsequence', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-st-5', serial: 5, title: 'Minimum insertions to make string palindrome', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-st-6', serial: 6, title: 'Minimum insertions/deletions A to B', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-st-7', serial: 7, title: 'Shortest Common Supersequence', difficulty: 'Hard', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-st-8', serial: 8, title: 'Distinct Subsequences', difficulty: 'Hard', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-st-9', serial: 9, title: 'Edit distance', difficulty: 'Hard', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-st-10', serial: 10, title: 'Wildcard Matching', difficulty: 'Hard', topics: ['DP'], category: 'Dynamic Programming' },

  // DP ON STOCKS
  { id: 'dp-sk-1', serial: 1, title: 'Best time to buy and sell stock', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-sk-2', serial: 2, title: 'Best time to buy and sell stock with transaction fees', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-sk-3', serial: 3, title: 'Best time to buy and sell stock II', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-sk-4', serial: 4, title: 'Best time to buy and sell stock III', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-sk-5', serial: 5, title: 'Best time to buy and sell stock IV', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-sk-6', serial: 6, title: 'Best Time to Buy and Sell Stock with Cooldown', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },

  // DP ON LIS
  { id: 'dp-l-1', serial: 1, title: 'Longest Increasing Subsequence', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-l-2', serial: 2, title: 'Print Longest Increasing Subsequence', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-l-3', serial: 3, title: 'Longest Increasing Subsequence (Binary Search O(N log N))', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-l-4', serial: 4, title: 'Largest Divisible Subset', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-l-5', serial: 5, title: 'Longest String Chain', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-l-6', serial: 6, title: 'Longest Bitonic Subsequence', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-l-7', serial: 7, title: 'Number of Longest Increasing Subsequences', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },

  // MCM DP
  { id: 'dp-m-1', serial: 1, title: 'Matrix chain multiplication', difficulty: 'Hard', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-m-2', serial: 2, title: 'MCM Bottom-Up', difficulty: 'Hard', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-m-3', serial: 3, title: 'Minimum cost to cut the stick', difficulty: 'Hard', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-m-4', serial: 4, title: 'Burst balloons', difficulty: 'Hard', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-m-5', serial: 5, title: 'Evaluate Boolean Expression to True', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-m-6', serial: 6, title: 'Palindrome partitioning II', difficulty: 'Hard', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-m-7', serial: 7, title: 'Partition Array for Maximum Sum', difficulty: 'Medium', topics: ['DP'], category: 'Dynamic Programming' },

  // DP ON SQUARES
  { id: 'dp-sq-1', serial: 1, title: 'Maximum Rectangle Area with all 1s', difficulty: 'Hard', topics: ['DP'], category: 'Dynamic Programming' },
  { id: 'dp-sq-2', serial: 2, title: 'Count Square Submatrices with All Ones', difficulty: 'Easy', topics: ['DP'], category: 'Dynamic Programming' },

  // STRINGS - HARD
  { id: 'str-h-1', serial: 1, title: 'Minimum bracket reversals', difficulty: 'Hard', topics: ['String'], category: 'Strings' },
  { id: 'str-h-2', serial: 2, title: 'Count and say', difficulty: 'Hard', topics: ['String'], category: 'Strings' },
  { id: 'str-h-3', serial: 3, title: 'Hashing In Strings | Theory', difficulty: 'Easy', topics: ['String'], category: 'Strings' },
  { id: 'str-h-4', serial: 4, title: 'Rabin Karp Algorithm', difficulty: 'Hard', topics: ['String'], category: 'Strings' },
  { id: 'str-h-5', serial: 5, title: 'Z function', difficulty: 'Hard', topics: ['String'], category: 'Strings' },
  { id: 'str-h-6', serial: 6, title: 'KMP Algorithm', difficulty: 'Hard', topics: ['String'], category: 'Strings' },
  { id: 'str-h-7', serial: 7, title: 'Shortest Palindrome', difficulty: 'Hard', topics: ['String'], category: 'Strings' },
  { id: 'str-h-8', serial: 8, title: 'Longest happy prefix', difficulty: 'Hard', topics: ['String'], category: 'Strings' },
  { id: 'str-h-9', serial: 9, title: 'Count Palindromic Subsequences', difficulty: 'Medium', topics: ['String'], category: 'Strings' },

  // TRIES
  { id: 'tr-intro', serial: 1, title: 'Introduction to Tries', difficulty: 'Easy', topics: ['Trie'], category: 'Tries' },
  { id: 'tr-1', serial: 2, title: 'Trie Implementation', difficulty: 'Hard', topics: ['Trie'], category: 'Tries' },
  { id: 'tr-2', serial: 3, title: 'Maximum XOR of two numbers', difficulty: 'Hard', topics: ['Trie', 'Bit Manipulation'], category: 'Tries' },
  { id: 'tr-3', serial: 4, title: 'Trie Implementation II (Advanced)', difficulty: 'Hard', topics: ['Trie'], category: 'Tries' },
  { id: 'tr-4', serial: 5, title: 'Longest Word with All Prefixes', difficulty: 'Medium', topics: ['Trie'], category: 'Tries' },
  { id: 'tr-5', serial: 6, title: 'Number of distinct substrings', difficulty: 'Medium', topics: ['Trie'], category: 'Tries' },
  { id: 'tr-6', serial: 7, title: 'Maximum Xor with an element from array', difficulty: 'Hard', topics: ['Trie'], category: 'Tries' }
];

export interface Stat {
  label: string;
  value: string;
  change?: string;
  icon: any;
  color: string;
  tag?: string;
}

export const USER_STATS: Stat[] = [
  { label: 'Total Solved', value: '482', change: '+12%', icon: CheckCircle2, color: '#3B82F6' },
  { label: 'Accuracy', value: '84.2%', tag: 'Top 5%', icon: Zap, color: '#8B5CF6' },
  { label: 'Global Rank', value: '#1,204', icon: Trophy, color: '#ffb786' },
  { label: 'Active Streak', value: '15 Days', icon: Flame, color: '#ffb4ab' }
];
