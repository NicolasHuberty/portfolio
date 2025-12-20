"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"

interface MetricCardProps {
  title: string
  value: number
  suffix?: string
  prefix?: string
  color: string
  trend?: "up" | "down"
  icon: string
  delay?: number
}

function MetricCard({
  title,
  value,
  suffix = "",
  prefix = "",
  color,
  trend,
  icon,
  delay = 0,
}: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 2000
    const increment = value / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="relative overflow-hidden rounded-xl border border-slate-800/50 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-4 backdrop-blur-sm"
    >
      {/* Background glow */}
      <motion.div
        className={`absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-20 blur-2xl`}
        style={{ backgroundColor: color }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-slate-500">{title}</span>
          <span className="text-lg">{icon}</span>
        </div>

        <div className="flex items-baseline gap-1">
          <motion.span
            className="text-3xl font-bold text-white"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.3 }}
            key={displayValue}
          >
            {prefix}
            {displayValue}
            {suffix}
          </motion.span>
          {trend && (
            <motion.span
              className={`text-sm ${trend === "up" ? "text-emerald-400" : "text-red-400"}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              {trend === "up" ? "↗" : "↘"} {Math.floor(Math.random() * 15 + 5)}%
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function ProgressBar({
  label,
  value,
  color,
  delay = 0,
}: {
  label: string
  value: number
  color: string
  delay?: number
}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value)
    }, delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">{label}</span>
        <span className="font-semibold text-white">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay }}
        />
      </div>
    </motion.div>
  )
}

function MiniChart({
  data,
  color,
  delay = 0,
}: {
  data: number[]
  color: string
  delay?: number
}) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className="flex h-16 items-end justify-between gap-1"
    >
      {data.map((value, index) => {
        const height = ((value - min) / range) * 100
        return (
          <motion.div
            key={index}
            className="w-full rounded-t"
            style={{ backgroundColor: color }}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 0.5, delay: delay + index * 0.05 }}
          />
        )
      })}
    </motion.div>
  )
}

export default function AIDashboard() {
  const [activeModels, setActiveModels] = useState(3)
  const [apiCalls, setApiCalls] = useState(847)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setApiCalls(prev => prev + Math.floor(Math.random() * 5))
      if (Math.random() > 0.7) {
        setActiveModels(prev => Math.min(prev + 1, 8))
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const chartData = [65, 75, 70, 85, 80, 90, 95, 88, 92, 98]

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-10" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-6 flex items-center justify-between"
      >
        <div>
          <h3 className="text-xl font-bold text-white">AI Operations</h3>
          <p className="text-sm text-slate-400">
            Real-time performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            className="h-2 w-2 rounded-full bg-emerald-400"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          <span className="text-xs text-slate-400">Live</span>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="relative z-10 mb-6 grid grid-cols-2 gap-4">
        <MetricCard
          title="Model Accuracy"
          value={98}
          suffix=".5%"
          color="#10b981"
          trend="up"
          icon="🎯"
          delay={0.1}
        />
        <MetricCard
          title="Active Models"
          value={activeModels}
          color="#3b82f6"
          icon="🤖"
          delay={0.2}
        />
        <MetricCard
          title="API Calls Today"
          value={apiCalls}
          prefix=""
          color="#8b5cf6"
          trend="up"
          icon="⚡"
          delay={0.3}
        />
        <MetricCard
          title="Processing Speed"
          value={124}
          suffix="ms"
          color="#f59e0b"
          icon="⚙️"
          delay={0.4}
        />
      </div>

      {/* Progress Bars Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative z-10 space-y-4 rounded-xl border border-slate-800/50 bg-slate-900/50 p-4 backdrop-blur-sm"
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-300">
            Training Progress
          </span>
          <span className="text-xs text-slate-500">Last 7 days</span>
        </div>

        <ProgressBar
          label="GPT Fine-tuning"
          value={94}
          color="#10b981"
          delay={0.6}
        />
        <ProgressBar
          label="Image Classification"
          value={87}
          color="#3b82f6"
          delay={0.7}
        />
        <ProgressBar
          label="Sentiment Analysis"
          value={98}
          color="#8b5cf6"
          delay={0.8}
        />
      </motion.div>

      {/* Mini Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="relative z-10 mt-4 rounded-xl border border-slate-800/50 bg-slate-900/50 p-4 backdrop-blur-sm"
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-300">
            Accuracy Trend
          </span>
          <span className="flex items-center gap-1 text-xs text-emerald-400">
            <span>↗</span>
            <span>+12.3%</span>
          </span>
        </div>
        <MiniChart data={chartData} color="#10b981" delay={1.0} />
      </motion.div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-blue-400/30"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Bottom status bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between rounded-lg border border-slate-800/50 bg-slate-950/80 px-4 py-2 backdrop-blur-sm"
      >
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            System Healthy
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Uptime: 99.9%</span>
        </div>
        <span className="text-xs text-slate-500">
          Last updated: {new Date().toLocaleTimeString()}
        </span>
      </motion.div>
    </div>
  )
}
