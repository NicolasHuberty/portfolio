"use client"

import { useState, useEffect } from "react"

export default function WelcomePopup() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // Show popup when component mounts (page loads)
        setIsOpen(true)
    }, [])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 p-8 shadow-2xl">
                {/* Decorative elements */}
                <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

                <div className="relative text-center">
                    <h2 className="mb-4 text-4xl font-bold text-white">Hello You! 👋</h2>
                    <p className="mb-6 text-lg text-white/80">Welcome to my portfolio</p>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="rounded-full bg-white px-8 py-3 font-semibold text-violet-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                        Let&apos;s Go!
                    </button>
                </div>
            </div>
        </div>
    )
}
