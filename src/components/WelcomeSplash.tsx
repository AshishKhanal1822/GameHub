"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2 } from "lucide-react";

interface WelcomeSplashProps {
    children: React.ReactNode;
}

export const WelcomeSplash = ({ children }: WelcomeSplashProps) => {
    const [showSplash, setShowSplash] = useState(true);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Mark as ready after component mounts
        setIsReady(true);

        // Check if user has seen the splash before in this session
        const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

        if (hasSeenSplash) {
            setShowSplash(false);
            return;
        }

        // Show splash for 4.5 seconds to ensure all animations complete
        const timer = setTimeout(() => {
            setShowSplash(false);
            sessionStorage.setItem("hasSeenSplash", "true");
        }, 4500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {showSplash && isReady && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-background via-primary/10 to-background overflow-hidden"
                        style={{ isolation: "isolate" }}
                    >
                        {/* Animated background particles */}
                        <div className="absolute inset-0 overflow-hidden">
                            <motion.div
                                animate={{
                                    opacity: [0.3, 0.6, 0.3],
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
                            />
                            <motion.div
                                animate={{
                                    opacity: [0.2, 0.5, 0.2],
                                    scale: [1.2, 1, 1.2],
                                }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl"
                            />
                        </div>

                        {/* Main content */}
                        <div className="relative z-10 text-center space-y-8 px-4">
                            {/* Gamepad icon with pulse animation */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 15,
                                    delay: 0.3
                                }}
                            >
                                <motion.div
                                    animate={{
                                        y: [0, -15, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="inline-block"
                                >
                                    <Gamepad2 className="w-28 h-28 md:w-40 md:h-40 text-primary drop-shadow-[0_0_40px_rgba(115,103,240,1)]" />
                                </motion.div>
                            </motion.div>

                            {/* Welcome text */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                                className="space-y-6"
                            >
                                <h1 className="text-6xl md:text-8xl font-gaming font-black tracking-tight leading-none">
                                    <span className="gaming-text-gradient drop-shadow-[0_0_20px_rgba(115,103,240,0.5)]">
                                        Welcome
                                    </span>
                                </h1>
                                <motion.h2
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.1, duration: 0.6 }}
                                    className="text-4xl md:text-6xl font-gaming font-bold text-foreground drop-shadow-lg"
                                >
                                    Gamers
                                </motion.h2>
                            </motion.div>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.6, duration: 0.8 }}
                                className="text-xl md:text-2xl text-muted-foreground font-medium max-w-md mx-auto"
                            >
                                Your ultimate gaming destination awaits
                            </motion.p>

                            {/* Loading indicator */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2.0 }}
                                className="flex justify-center gap-3 pt-6"
                            >
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            scale: [1, 1.8, 1],
                                            opacity: [0.5, 1, 0.5],
                                        }}
                                        transition={{
                                            duration: 1.2,
                                            repeat: Infinity,
                                            delay: i * 0.3,
                                        }}
                                        className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(115,103,240,0.8)]"
                                    />
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main content - only show after splash is done */}
            {!showSplash && children}
        </>
    );
};
