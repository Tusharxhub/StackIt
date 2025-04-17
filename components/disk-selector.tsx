"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DiskSelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export default function DiskSelector({ value, onChange, min = 3, max = 8 }: DiskSelectorProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  // Generate disk preview elements
  const disks = Array.from({ length: value }, (_, i) => {
    const width = 100 - i * (70 / value)
    return (
      <motion.div
        key={i}
        className="bg-gradient-to-r from-primary/80 to-primary h-2 rounded-full mx-auto"
        style={{ width: `${width}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${width}%` }}
        transition={{ duration: 0.3 }}
      />
    )
  })

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium">Number of Disks</label>

      <motion.div
        className="p-4 rounded-lg bg-muted/30 backdrop-blur-sm border border-border/50 relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ duration: 0.2 }}
      >
        {/* Background animation */}
        <motion.div
          className="absolute inset-0 bg-primary/5 rounded-lg"
          animate={{
            scale: isHovered ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            repeatType: "reverse",
          }}
        />

        <div className="relative z-10">
          {/* Disk preview */}
          <div className="flex flex-col-reverse gap-1 mb-4 h-20 justify-end">{disks}</div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon" onClick={handleDecrement} disabled={value <= min} className="h-8 w-8">
              <Minus className="h-4 w-4" />
              <span className="sr-only">Decrease</span>
            </Button>

            <div className="text-2xl font-bold">{value}</div>

            <Button variant="outline" size="icon" onClick={handleIncrement} disabled={value >= max} className="h-8 w-8">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
        </div>
      </motion.div>

      <p className="text-xs text-muted-foreground text-center">
        {value} disks require minimum {Math.pow(2, value) - 1} moves
      </p>
    </div>
  )
}
