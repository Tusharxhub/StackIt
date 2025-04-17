"use client"

import { motion } from "framer-motion"

export default function SkeletonLoader() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <div className="w-full max-w-md px-4">
        <div className="flex flex-col items-center">
          <motion.div
            className="w-16 h-16 mb-8"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="w-full h-full relative">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              ></motion.div>
            </div>
          </motion.div>

          <div className="w-full space-y-4">
            <div className="h-8 bg-muted/50 rounded-md animate-pulse"></div>
            <div className="h-4 bg-muted/30 rounded-md w-3/4 mx-auto animate-pulse"></div>

            <div className="space-y-2 pt-4">
              <div className="h-24 bg-muted/40 rounded-md animate-pulse"></div>
              <div className="h-24 bg-muted/40 rounded-md animate-pulse"></div>
              <div className="h-24 bg-muted/40 rounded-md animate-pulse"></div>
            </div>
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              Loading assets...
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  )
}
