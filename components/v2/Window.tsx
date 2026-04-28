"use client"

import {
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { motion } from "framer-motion"
import { useWM, Win } from "@/lib/v2/wm"

type Props = {
  win: Win
  children: ReactNode
  focused: boolean
}

const MENUBAR_H = 28
const DOCK_H = 76

export default function Window({ win, children, focused }: Props) {
  const { close, focus, minimise, maximise, move, resize } = useWM()
  const ref = useRef<HTMLDivElement>(null)
  const [drag, setDrag] = useState<null | {
    kind: "move" | "resize"
    startX: number
    startY: number
    origX: number
    origY: number
    origW: number
    origH: number
    edge?: string
  }>(null)

  // Maximised geometry
  const maximised = win.state === "maximised"
  const style: React.CSSProperties = maximised
    ? {
        left: 8,
        top: MENUBAR_H + 8,
        width: "calc(100vw - 16px)",
        height: `calc(100vh - ${MENUBAR_H + DOCK_H + 16}px)`,
        zIndex: win.z,
      }
    : {
        left: win.x,
        top: win.y,
        width: win.w,
        height: win.h,
        zIndex: win.z,
      }

  const onTitleDown = (e: ReactMouseEvent) => {
    if (maximised) return
    focus(win.id)
    setDrag({
      kind: "move",
      startX: e.clientX,
      startY: e.clientY,
      origX: win.x,
      origY: win.y,
      origW: win.w,
      origH: win.h,
    })
  }

  const onResizeDown = (edge: string) => (e: ReactMouseEvent) => {
    if (maximised) return
    e.stopPropagation()
    focus(win.id)
    setDrag({
      kind: "resize",
      startX: e.clientX,
      startY: e.clientY,
      origX: win.x,
      origY: win.y,
      origW: win.w,
      origH: win.h,
      edge,
    })
  }

  useEffect(() => {
    if (!drag) return
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - drag.startX
      const dy = e.clientY - drag.startY
      if (drag.kind === "move") {
        const nx = Math.max(0, drag.origX + dx)
        const ny = Math.max(MENUBAR_H, drag.origY + dy)
        move(win.id, nx, ny)
      } else {
        let nw = drag.origW
        let nh = drag.origH
        let nx = drag.origX
        let ny = drag.origY
        const edge = drag.edge!
        if (edge.includes("e")) nw = Math.max(280, drag.origW + dx)
        if (edge.includes("s")) nh = Math.max(200, drag.origH + dy)
        if (edge.includes("w")) {
          nw = Math.max(280, drag.origW - dx)
          nx = drag.origX + (drag.origW - nw)
        }
        if (edge.includes("n")) {
          nh = Math.max(200, drag.origH - dy)
          ny = drag.origY + (drag.origH - nh)
        }
        resize(win.id, nw, nh)
        if (nx !== win.x || ny !== win.y) move(win.id, nx, ny)
      }
    }
    const onUp = () => setDrag(null)
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
    }
  }, [drag, move, resize, win.id, win.x, win.y])

  const onClickWin = useCallback(() => {
    if (!focused) focus(win.id)
  }, [focused, focus, win.id])

  if (win.state === "minimised") return null

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="os-window absolute flex flex-col overflow-hidden rounded-[6px] border"
      style={{
        ...style,
        borderColor: "var(--os-ink)",
        background: "var(--os-bg-window)",
        boxShadow: focused
          ? "8px 8px 0 var(--os-ink)"
          : "6px 6px 0 var(--os-ink-faint)",
      }}
      onMouseDown={onClickWin}
      role="dialog"
      aria-label={win.title}
    >
      {/* Title bar */}
      <div
        onMouseDown={onTitleDown}
        onDoubleClick={() => maximise(win.id)}
        className="flex h-[32px] cursor-grab select-none items-center px-3 active:cursor-grabbing"
        style={{
          background: "var(--os-ink)",
          color: "var(--os-bg-window)",
          opacity: focused ? 1 : 0.6,
        }}
      >
        <div className="flex items-center gap-2">
          <button
            aria-label="Close"
            onClick={e => {
              e.stopPropagation()
              close(win.id)
            }}
            className="os-traffic"
            style={{ background: "#ff5c5c" }}
          />
          <button
            aria-label="Minimise"
            onClick={e => {
              e.stopPropagation()
              minimise(win.id)
            }}
            className="os-traffic"
            style={{ background: "#f0c03f" }}
          />
          <button
            aria-label="Maximise"
            onClick={e => {
              e.stopPropagation()
              maximise(win.id)
            }}
            className="os-traffic"
            style={{ background: "#2dd86f" }}
          />
        </div>
        <div
          className="flex-1 text-center text-[11px]"
          style={{ fontFamily: "var(--os-mono)" }}
        >
          {win.title}
        </div>
        <div className="w-[54px]" />
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-auto"
        style={{ background: "var(--os-bg-window)", color: "var(--os-ink)" }}
      >
        {children}
      </div>

      {/* Resize handles */}
      {!maximised && (
        <>
          <div
            onMouseDown={onResizeDown("n")}
            className="absolute left-2 right-2 top-0 h-1 cursor-ns-resize"
          />
          <div
            onMouseDown={onResizeDown("s")}
            className="absolute bottom-0 left-2 right-2 h-1 cursor-ns-resize"
          />
          <div
            onMouseDown={onResizeDown("e")}
            className="absolute bottom-2 right-0 top-2 w-1 cursor-ew-resize"
          />
          <div
            onMouseDown={onResizeDown("w")}
            className="absolute bottom-2 left-0 top-2 w-1 cursor-ew-resize"
          />
          <div
            onMouseDown={onResizeDown("se")}
            className="absolute bottom-0 right-0 h-2 w-2 cursor-se-resize"
          />
          <div
            onMouseDown={onResizeDown("sw")}
            className="absolute bottom-0 left-0 h-2 w-2 cursor-sw-resize"
          />
          <div
            onMouseDown={onResizeDown("ne")}
            className="absolute right-0 top-0 h-2 w-2 cursor-ne-resize"
          />
          <div
            onMouseDown={onResizeDown("nw")}
            className="absolute left-0 top-0 h-2 w-2 cursor-nw-resize"
          />
        </>
      )}
    </motion.div>
  )
}
