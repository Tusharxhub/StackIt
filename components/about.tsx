"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, GitBranch, Layers, Code } from "lucide-react"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"

export default function About() {
  const [activeTab, setActiveTab] = useState("puzzle")

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="w-full py-12 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-muted/30"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <motion.h2
            className="text-3xl font-bold tracking-tighter md:text-4xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About the Project
          </motion.h2>
          <motion.p
            className="max-w-[700px] text-muted-foreground md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Learn about the Towers of Hanoi puzzle and how the Breadth-First Search algorithm is used to solve it.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlassmorphismCard className="p-6">
            <Tabs defaultValue="puzzle" className="w-full max-w-4xl mx-auto" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="puzzle">The Puzzle</TabsTrigger>
                <TabsTrigger value="bfs">BFS Algorithm</TabsTrigger>
                <TabsTrigger value="implementation">Implementation</TabsTrigger>
                <TabsTrigger value="code">Code Snippet</TabsTrigger>
              </TabsList>

              <motion.div key={activeTab} initial="hidden" animate="visible" variants={fadeInVariants}>
                <TabsContent value="puzzle" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Layers className="mr-2 h-5 w-5" />
                        The Towers of Hanoi Puzzle
                      </CardTitle>
                      <CardDescription>
                        A classic mathematical puzzle with a fascinating history and solution
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-2">What is the Towers of Hanoi?</h3>
                          <p className="text-muted-foreground">
                            The Towers of Hanoi is a mathematical puzzle consisting of three pegs and a number of disks
                            of different sizes. The puzzle starts with all disks stacked on one peg in order of size,
                            with the largest at the bottom.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">The Rules</h3>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>Only one disk can be moved at a time</li>
                            <li>
                              Each move consists of taking the top disk from one stack and placing it on top of another
                              stack
                            </li>
                            <li>No disk may be placed on top of a smaller disk</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Mathematical Properties</h3>
                        <p className="text-muted-foreground">
                          For a tower with n disks, the minimum number of moves required to solve the puzzle is 2
                          <sup>n</sup> - 1. This can be proven by mathematical induction and represents an exponential
                          growth in complexity as the number of disks increases.
                        </p>
                      </div>

                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">Did you know?</h4>
                        <p className="text-sm text-muted-foreground">
                          According to legend, there is a temple with three diamond pegs and 64 golden disks. Monks have
                          been moving these disks according to the rules of the Towers of Hanoi since the beginning of
                          time. When they finish moving all 64 disks, the world will end. If they move one disk per
                          second, it would take them 2<sup>64</sup> - 1 seconds (about 585 billion years)!
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="bfs" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Search className="mr-2 h-5 w-5" />
                        Breadth-First Search (BFS) Algorithm
                      </CardTitle>
                      <CardDescription>
                        Understanding how BFS works and why it's effective for solving the Towers of Hanoi
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">What is BFS?</h3>
                        <p className="text-muted-foreground">
                          Breadth-First Search is a graph traversal algorithm that explores all the vertices of a graph
                          at the present depth before moving on to vertices at the next depth level. In the context of
                          puzzles, BFS explores all possible states at a given number of moves before considering states
                          that require more moves.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-2">How BFS Solves Towers of Hanoi</h3>
                          <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                            <li>Start with the initial state (all disks on the first peg)</li>
                            <li>Explore all possible moves from the current state</li>
                            <li>For each new state, check if it's the goal state (all disks on the third peg)</li>
                            <li>If not, add the new state to a queue for further exploration</li>
                            <li>Continue until the goal state is found</li>
                          </ol>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">Advantages of BFS</h3>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>Guarantees the shortest solution path</li>
                            <li>Systematically explores all possibilities</li>
                            <li>Works well for puzzles with a finite state space</li>
                            <li>Avoids getting stuck in infinite loops</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">BFS vs. Recursive Solution</h4>
                        <p className="text-sm text-muted-foreground">
                          While the Towers of Hanoi is often solved using a recursive algorithm, BFS provides a
                          different perspective by exploring the state space systematically. The recursive solution is
                          more elegant and efficient for this specific puzzle, but BFS is a general-purpose algorithm
                          that can solve many different types of problems.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="implementation" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <GitBranch className="mr-2 h-5 w-5" />
                        Implementation Details
                      </CardTitle>
                      <CardDescription>
                        How this interactive visualization was built using modern web technologies
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-2">Tech Stack</h3>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>Next.js for the framework</li>
                            <li>TypeScript for type safety</li>
                            <li>Tailwind CSS for styling</li>
                            <li>Framer Motion for animations</li>
                            <li>Web Audio API for sound effects</li>
                            <li>Lottie for vector animations</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">Key Features</h3>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>Interactive visualization of the puzzle</li>
                            <li>Step-by-step solution using BFS</li>
                            <li>Adjustable number of disks and speed</li>
                            <li>Sound effects for moves and completion</li>
                            <li>Responsive design for all devices</li>
                            <li>Glassmorphism UI elements</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">UI/UX Design</h3>
                        <p className="text-muted-foreground">
                          The interface uses glassmorphism, a modern design trend that creates a frosted glass effect
                          with background blur and transparency. This creates depth and hierarchy in the UI while
                          maintaining a clean, minimal aesthetic. Animations are used throughout to provide visual
                          feedback and create a more engaging experience.
                        </p>
                      </div>

                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">Performance Considerations</h4>
                        <p className="text-sm text-muted-foreground">
                          For larger numbers of disks, the state space grows exponentially, making a pure BFS approach
                          computationally intensive. This implementation uses optimizations to handle up to 8 disks
                          efficiently in the browser. For educational purposes, this is sufficient to demonstrate how
                          BFS works while maintaining smooth animations and interactions.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="code" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Code className="mr-2 h-5 w-5" />
                        BFS Algorithm Code
                      </CardTitle>
                      <CardDescription>The core algorithm implementation in TypeScript</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm">
                        <code>{`// BFS algorithm to solve Towers of Hanoi
const solveTowersOfHanoiBFS = (n: number): State[] => {
  // Initial state
  const initialState: State = {
    pegs: [[...Array(n).keys()].map((i) => n - i), [], []]
  }

  // Goal state - all disks on the third peg
  const isGoalState = (state: State): boolean => {
    return state.pegs[2].length === n && 
           state.pegs[2].every((disk, index) => disk === n - index)
  }

  // Get valid moves from current state
  const getValidMoves = (state: State): Move[] => {
    const moves: Move[] = []
    
    for (let from = 0; from < 3; from++) {
      if (state.pegs[from].length === 0) continue
      
      const disk = state.pegs[from][state.pegs[from].length - 1]
      
      for (let to = 0; to < 3; to++) {
        if (from === to) continue
        
        const topDiskAtTo = state.pegs[to].length > 0 
          ? state.pegs[to][state.pegs[to].length - 1] 
          : Infinity
          
        if (disk < topDiskAtTo) {
          moves.push({ disk, from, to })
        }
      }
    }
    
    return moves
  }

  // Apply move to state
  const applyMove = (state: State, move: Move): State => {
    const newState: State = {
      pegs: state.pegs.map(peg => [...peg]) as [Peg, Peg, Peg],
      lastMove: move
    }
    
    const disk = newState.pegs[move.from].pop()!
    newState.pegs[move.to].push(disk)
    
    return newState
  }

  // BFS implementation
  const queue: { state: State, path: State[] }[] = [
    { state: initialState, path: [initialState] }
  ]
  const visited = new Set<string>()
  
  while (queue.length > 0) {
    const { state, path } = queue.shift()!
    
    // Convert state to string for visited set
    const stateStr = JSON.stringify(state.pegs)
    
    if (visited.has(stateStr)) continue
    visited.add(stateStr)
    
    if (isGoalState(state)) {
      return path
    }
    
    const moves = getValidMoves(state)
    
    for (const move of moves) {
      const nextState = applyMove(state, move)
      const nextStateStr = JSON.stringify(nextState.pegs)
      
      if (!visited.has(nextStateStr)) {
        queue.push({
          state: nextState,
          path: [...path, nextState]
        })
      }
    }
  }
  
  return [initialState] // Fallback if no solution found
}`}</code>
                      </pre>
                    </CardContent>
                  </Card>
                </TabsContent>
              </motion.div>
            </Tabs>
          </GlassmorphismCard>
        </motion.div>
      </div>
    </section>
  )
}
