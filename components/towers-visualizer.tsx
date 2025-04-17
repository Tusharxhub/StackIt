"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipForward, RotateCcw, Volume2, VolumeX, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import DiskSelector from "@/components/disk-selector"

// Types
type Peg = number[]
type State = {
  pegs: [Peg, Peg, Peg]
  lastMove?: { disk: number; from: number; to: number }
}
type Move = { disk: number; from: number; to: number }

export default function TowersVisualizer() {
  const [numDisks, setNumDisks] = useState(3)
  const [currentState, setCurrentState] = useState<State>({ pegs: [[], [], []] })
  const [solution, setSolution] = useState<State[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1) // 1 = normal speed
  const [isMuted, setIsMuted] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const { toast } = useToast()

  // Refs for audio elements
  const diskMoveAudioRef = useRef<HTMLAudioElement | null>(null)
  const completionAudioRef = useRef<HTMLAudioElement | null>(null)
  const resetAudioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio elements
  useEffect(() => {
    // Create audio elements with error handling
    const createAudio = (path: string): HTMLAudioElement | null => {
      try {
        const audio = new Audio()
        audio.src = path

        // Add error handling
        audio.onerror = (e) => {
          console.warn(`Audio failed to load: ${path}`, e)
        }

        return audio
      } catch (error) {
        console.warn(`Failed to create audio for ${path}:`, error)
        return null
      }
    }

    // Try to load audio files, but continue if they fail
    diskMoveAudioRef.current = createAudio("/sounds/disk-move.mp3")
    completionAudioRef.current = createAudio("/sounds/completion.mp3")
    resetAudioRef.current = createAudio("/sounds/reset.mp3")

    return () => {
      diskMoveAudioRef.current = null
      completionAudioRef.current = null
      resetAudioRef.current = null
    }
  }, [])

  // Play sound effect
  const playSound = (type: "move" | "complete" | "reset") => {
    if (isMuted) return

    try {
      if (type === "move" && diskMoveAudioRef.current) {
        diskMoveAudioRef.current.currentTime = 0
        const playPromise = diskMoveAudioRef.current.play()

        // Handle the play promise to catch any errors
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn("Audio playback failed:", error)
          })
        }
      } else if (type === "complete" && completionAudioRef.current) {
        completionAudioRef.current.currentTime = 0
        const playPromise = completionAudioRef.current.play()

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn("Audio playback failed:", error)
          })
        }
      } else if (type === "reset" && resetAudioRef.current) {
        resetAudioRef.current.currentTime = 0
        const playPromise = resetAudioRef.current.play()

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn("Audio playback failed:", error)
          })
        }
      }
    } catch (error) {
      console.warn("Error playing sound:", error)
    }
  }

  // Initialize the puzzle
  useEffect(() => {
    resetPuzzle()
  }, [numDisks])

  // Animation timer for auto-play
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isPlaying && currentStep < solution.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => {
          const nextStep = prev + 1
          if (nextStep === solution.length - 1) {
            setIsPlaying(false)
            playSound("complete")
            toast({
              title: "Puzzle Solved!",
              description: `Completed in ${solution.length - 1} moves using BFS algorithm.`,
            })
          } else {
            playSound("move")
          }
          return nextStep
        })
      }, 1000 / speed)
    }

    return () => clearTimeout(timer)
  }, [isPlaying, currentStep, solution.length, speed, toast])

  // Update current state when step changes
  useEffect(() => {
    if (solution.length > 0 && currentStep < solution.length) {
      setCurrentState(solution[currentStep])
    }
  }, [currentStep, solution])

  // BFS algorithm to solve Towers of Hanoi
  const solveTowersOfHanoiBFS = (n: number): State[] => {
    // Initial state
    const initialState: State = {
      pegs: [[...Array(n).keys()].map((i) => n - i), [], []],
    }

    // Goal state - all disks on the third peg
    const isGoalState = (state: State): boolean => {
      return state.pegs[2].length === n && state.pegs[2].every((disk, index) => disk === n - index)
    }

    // Get valid moves from current state
    const getValidMoves = (state: State): Move[] => {
      const moves: Move[] = []

      for (let from = 0; from < 3; from++) {
        if (state.pegs[from].length === 0) continue

        const disk = state.pegs[from][state.pegs[from].length - 1]

        for (let to = 0; to < 3; to++) {
          if (from === to) continue

          const topDiskAtTo =
            state.pegs[to].length > 0 ? state.pegs[to][state.pegs[to].length - 1] : Number.POSITIVE_INFINITY

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
        pegs: state.pegs.map((peg) => [...peg]) as [Peg, Peg, Peg],
        lastMove: move,
      }

      const disk = newState.pegs[move.from].pop()!
      newState.pegs[move.to].push(disk)

      return newState
    }

    // BFS implementation
    const queue: { state: State; path: State[] }[] = [{ state: initialState, path: [initialState] }]
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
            path: [...path, nextState],
          })
        }
      }
    }

    return [initialState] // Fallback if no solution found
  }

  // Reset the puzzle
  const resetPuzzle = () => {
    const solution = solveTowersOfHanoiBFS(numDisks)
    setSolution(solution)
    setCurrentStep(0)
    setIsPlaying(false)
    playSound("reset")
  }

  // Step forward
  const stepForward = () => {
    if (currentStep < solution.length - 1) {
      setCurrentStep((prev) => prev + 1)
      playSound("move")
    }
  }

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  // Toggle info panel
  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  // Calculate disk width based on size
  const getDiskWidth = (size: number) => {
    const baseWidth = 60
    const increment = 20
    return baseWidth + size * increment
  }

  // Get disk color based on size
  const getDiskColor = (size: number) => {
    const colors = [
      "bg-gradient-to-r from-red-500 to-red-600",
      "bg-gradient-to-r from-orange-500 to-orange-600",
      "bg-gradient-to-r from-amber-500 to-amber-600",
      "bg-gradient-to-r from-yellow-500 to-yellow-600",
      "bg-gradient-to-r from-lime-500 to-lime-600",
      "bg-gradient-to-r from-green-500 to-green-600",
      "bg-gradient-to-r from-emerald-500 to-emerald-600",
      "bg-gradient-to-r from-teal-500 to-teal-600",
      "bg-gradient-to-r from-cyan-500 to-cyan-600",
      "bg-gradient-to-r from-sky-500 to-sky-600",
    ]
    return colors[size % colors.length]
  }

  return (
    <section className="w-full py-12 md:py-24 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        animate={{
          x: [50, 0, 50],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">Interactive Visualizer</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassmorphismCard className="p-6">
                <h3 className="text-xl font-semibold mb-4">Configuration</h3>

                <div className="space-y-6">
                  <DiskSelector value={numDisks} onChange={setNumDisks} min={3} max={8} />

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Animation Speed</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[0.5, 1, 2].map((s) => (
                        <Button
                          key={s}
                          variant={speed === s ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSpeed(s)}
                          className="w-full"
                        >
                          {s}x
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Sound Effects</label>
                      <Button variant="ghost" size="sm" onClick={toggleMute} className="h-8 w-8 p-0">
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button onClick={resetPuzzle} className="w-full">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset Puzzle
                    </Button>
                  </div>
                </div>
              </GlassmorphismCard>
            </motion.div>
          </div>

          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <GlassmorphismCard className="p-6">
                {/* Towers visualization */}
                <div className="relative h-[300px] md:h-[400px] mb-8 flex justify-center items-end">
                  {[0, 1, 2].map((pegIndex) => (
                    <div key={pegIndex} className="relative mx-4 md:mx-8 flex flex-col-reverse items-center">
                      {/* Peg */}
                      <motion.div
                        className="absolute bottom-0 w-2 h-[200px] md:h-[250px] bg-muted-foreground/70 rounded-full"
                        initial={{ height: 0 }}
                        animate={{ height: "250px" }}
                        transition={{ duration: 0.8, delay: 0.2 * pegIndex }}
                      ></motion.div>

                      {/* Base */}
                      <motion.div
                        className="w-32 md:w-48 h-4 bg-muted-foreground/70 rounded-md"
                        initial={{ width: 0 }}
                        animate={{ width: "12rem" }}
                        transition={{ duration: 0.8, delay: 0.2 * pegIndex }}
                      ></motion.div>

                      {/* Disks */}
                      <div className="relative h-[200px] md:h-[250px] flex flex-col-reverse items-center justify-end mb-4">
                        <AnimatePresence>
                          {currentState.pegs[pegIndex].map((diskSize, diskIndex) => (
                            <motion.div
                              key={diskSize}
                              className={`absolute flex items-center justify-center h-8 rounded-md shadow-lg ${getDiskColor(diskSize)}`}
                              style={{
                                width: getDiskWidth(diskSize),
                                bottom: `${diskIndex * 32}px`,
                                zIndex: numDisks - diskSize,
                              }}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                              }}
                              whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                              <span className="text-xs font-bold text-white">{diskSize + 1}</span>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>

                      {/* Peg label */}
                      <div className="mt-2 text-sm font-medium">Peg {pegIndex + 1}</div>
                    </div>
                  ))}
                </div>

                {/* Move information */}
                <div className="text-center mb-6">
                  {currentStep > 0 && currentState.lastMove && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={currentStep}>
                      <p className="text-muted-foreground">
                        Move {currentStep}: Disk {currentState.lastMove.disk + 1} from Peg{" "}
                        {currentState.lastMove.from + 1} to Peg {currentState.lastMove.to + 1}
                      </p>
                    </motion.div>
                  )}
                  <p className="text-sm mt-2">
                    Step {currentStep} of {solution.length - 1}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    variant={isPlaying ? "secondary" : "default"}
                    size="icon"
                    onClick={togglePlay}
                    className="h-10 w-10"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={stepForward}
                    disabled={currentStep >= solution.length - 1}
                    className="h-10 w-10"
                  >
                    <SkipForward className="h-5 w-5" />
                    <span className="sr-only">Step Forward</span>
                  </Button>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={toggleInfo}
                          className={`h-10 w-10 ${showInfo ? "bg-primary/20" : ""}`}
                        >
                          <Info className="h-5 w-5" />
                          <span className="sr-only">Information</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Toggle information panel</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Info Panel */}
                <AnimatePresence>
                  {showInfo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                        <h4 className="font-medium mb-2">How BFS Solves This Puzzle</h4>
                        <p className="text-sm text-muted-foreground">
                          The Breadth-First Search algorithm explores all possible moves at each step, finding the
                          shortest path to the solution. For {numDisks} disks, the minimum number of moves required is 2
                          <sup>{numDisks}</sup> - 1 = {Math.pow(2, numDisks) - 1}.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassmorphismCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
