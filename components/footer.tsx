"use client"

import { motion } from "framer-motion"
import { FaGithub, FaEnvelope, FaInstagram, FaLinkedin, FaHeart } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"

export default function Footer() {
  return (
    <footer className="w-full py-12 border-t relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <GlassmorphismCard className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="flex flex-col space-y-2">
                <h3 className="font-medium">Towers of Hanoi: BFS Solver</h3>
                <p className="text-sm text-muted-foreground">
                  An interactive visualization of the Towers of Hanoi puzzle solved using the Breadth-First Search
                  algorithm.
                </p>
              </div>

              <div className="flex flex-col space-y-4 md:items-center">
                <h3 className="font-medium">Connect</h3>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" asChild>
                    <a href="https://github.com/Tusharxhub" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <FaGithub className="h-5 w-5" />
                    </a>
                  </Button>
                    <Button variant="ghost" size="icon" asChild>
                    <a
                      href="mailto:thetushardev0@gmail.com?subject=Professional%20Inquiry&body=Dear%20Tushar%2C%0D%0A%0D%0AI%20hope%20this%20message%20finds%20you%20well.%20I%20would%20like%20to%20connect%20with%20you%20regarding%20a%20potential%20opportunity.%20Please%20let%20me%20know%20a%20convenient%20time%20for%20you."

                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Email"
                    >
                      <FaEnvelope className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <a href="https://www.instagram.com/tushardevx01/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <FaInstagram className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <a href="https://www.linkedin.com/in/tushar-kanti-dey-86185b28b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <FaLinkedin className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
                <ModeToggle />
              </div>

              <div className="flex flex-col space-y-2 md:items-end">
                <h3 className="font-medium">About</h3>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 w-fit" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="h-4 w-4" />
                    <span>GitHub Repository</span>
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground flex items-center">
                  Made with <FaHeart className="h-3 w-3 mx-1 text-red-500" /> by Tushar
                </p>
                <p className="text-xs text-muted-foreground">
                  &copy; {new Date().getFullYear()} Towers of Hanoi BFS Solver
                </p>
              </div>
            </div>
          </GlassmorphismCard>
        </motion.div>
      </div>
    </footer>
  )
}
