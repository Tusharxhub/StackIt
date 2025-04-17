"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import { ArrowRight, X } from "lucide-react"

interface EntryPageProps {
  onContinue: () => void
  onExit: () => void
}

export default function EntryPage({ onContinue, onExit }: EntryPageProps) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 animate-gradient-slow"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>

        {/* Animated circles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md px-4"
        variants={containerVariants}
        initial="hidden"
        animate={isReady ? "visible" : "hidden"}
        exit="exit"
      >
        <GlassmorphismCard className="p-8">
          <motion.div variants={itemVariants} className="text-center mb-8">
            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Welcome to Towers of Hanoi
            </motion.h1>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Explore the classic puzzle solved with Breadth-First Search algorithm
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button onClick={onContinue} className="w-full py-6 text-lg group" size="lg">
                Continue to Website
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button onClick={onExit} variant="outline" className="w-full py-6 text-lg" size="lg">
                Exit
                <X className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </GlassmorphismCard>
      </motion.div>
    </div>
  )
}
