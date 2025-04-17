"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"

export default function Hero() {
  const visualizerRef = useRef<HTMLDivElement>(null)
  const movingDiskControls = useAnimation()

  const scrollToVisualizer = () => {
    visualizerRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const sequence = async () => {
      await movingDiskControls.start({
        x: "calc(50% - 50px)",
        y: "calc(0% + 20px)",
        opacity: 1,
        transition: { delay: 2, duration: 1 },
      })
      await movingDiskControls.start({
        x: "calc(75% + 25px)",
        y: "calc(0% + 20px)",
        transition: { duration: 1 },
      })
      await movingDiskControls.start({
        x: "calc(75% + 25px)",
        y: "calc(100% - 32px)",
        transition: { duration: 1 },
      })
      await movingDiskControls.start({
        opacity: 0,
        transition: { duration: 0.5 },
      })
    }

    sequence()
  }, [movingDiskControls])

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 1.2, duration: 0.8 },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 1.6, duration: 0.5 },
    },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  }

  const titleText = "Towers of Hanoi using BFS"
  const titleLetters = titleText.split("")

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 animate-gradient"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>

        {/* Animated circles */}
        <motion.div
          className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-secondary/10 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container px-4 md:px-6 z-10 text-center">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              {titleLetters.map((letter, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="max-w-[700px] text-muted-foreground mx-auto text-lg md:text-xl mb-8"
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
            >
              Explore how the Breadth-First Search algorithm efficiently solves the classic Towers of Hanoi puzzle
              through interactive visualization and animation.
            </motion.p>

            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              <Button onClick={scrollToVisualizer} size="lg" className="group">
                Try the Interactive Demo
                <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
              </Button>
            </motion.div>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <GlassmorphismCard className="w-full max-w-md p-4 md:p-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative h-64 w-full"
              >
                {/* Base */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end">
                  <motion.div
                    className="h-4 w-64 bg-muted-foreground/70 rounded-md"
                    initial={{ width: 0 }}
                    animate={{ width: 256 }}
                    transition={{ duration: 0.8 }}
                  />
                </div>

                {/* Peg */}
                <motion.div
                  className="absolute bottom-4 left-1/2 w-2 h-48 bg-muted-foreground/70 rounded-full -translate-x-1/2"
                  initial={{ height: 0 }}
                  animate={{ height: 192 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />

                {/* Disks */}
                <motion.div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col-reverse items-center">
                  <motion.div
                    className="h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-md shadow-lg flex items-center justify-center"
                    initial={{ width: 0 }}
                    animate={{ width: 180 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <span className="text-xs font-bold text-white">1</span>
                  </motion.div>

                  <motion.div
                    className="h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-md shadow-lg flex items-center justify-center"
                    initial={{ width: 0 }}
                    animate={{ width: 140 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <span className="text-xs font-bold text-white">2</span>
                  </motion.div>

                  <motion.div
                    className="h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-md shadow-lg flex items-center justify-center"
                    initial={{ width: 0 }}
                    animate={{ width: 100 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <span className="text-xs font-bold text-white">3</span>
                  </motion.div>
                </motion.div>

                {/* Moving Disk Animation */}
                <motion.div
                  className="absolute h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-md shadow-lg flex items-center justify-center"
                  style={{ width: 100 }}
                  animate={movingDiskControls}
                >
                  <span className="text-xs font-bold text-white">3</span>
                </motion.div>
              </motion.div>
            </GlassmorphismCard>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      <div ref={visualizerRef} className="absolute bottom-0"></div>
    </section>
  )
}
