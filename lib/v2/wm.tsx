"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react"

export type AppId =
  | "finder"
  | "terminal"
  | "readme"
  | "mail"
  | "book"
  | "spotlight"

export type WindowState = "open" | "minimised" | "maximised"

export type Win = {
  id: string
  appId: AppId
  title: string
  x: number
  y: number
  w: number
  h: number
  z: number
  state: WindowState
  props?: Record<string, unknown>
}

type WMState = {
  wins: Win[]
  focusedId: string | null
  nextZ: number
  cascade: number
}

type Action =
  | {
      type: "launch"
      appId: AppId
      props?: Record<string, unknown>
      title?: string
    }
  | { type: "close"; id: string }
  | { type: "focus"; id: string }
  | { type: "minimise"; id: string }
  | { type: "maximise"; id: string }
  | { type: "move"; id: string; x: number; y: number }
  | { type: "resize"; id: string; w: number; h: number }
  | { type: "restore"; state: WMState }
  | { type: "cleanup"; viewport: { w: number; h: number } }
  | { type: "setTitle"; id: string; title: string }

const defaultTitleFor = (appId: AppId, props?: Record<string, unknown>) => {
  switch (appId) {
    case "finder":
      return (props?.path as string) || "Finder"
    case "terminal":
      return "Terminal"
    case "readme":
      return (props?.path as string) || "Readme"
    case "mail":
      return "Mail"
    case "book":
      return "Book a call"
    default:
      return "Window"
  }
}

const defaultSizeFor = (appId: AppId) => {
  switch (appId) {
    case "terminal":
      return { w: 720, h: 440 }
    case "finder":
      return { w: 820, h: 520 }
    case "readme":
      return { w: 760, h: 560 }
    case "mail":
      return { w: 560, h: 460 }
    case "book":
      return { w: 640, h: 540 }
    default:
      return { w: 640, h: 480 }
  }
}

function reduce(state: WMState, action: Action): WMState {
  switch (action.type) {
    case "launch": {
      // If an identical single-instance app is open, focus it.
      const singleInstance = ["terminal", "mail", "book"].includes(action.appId)
      if (singleInstance) {
        const existing = state.wins.find(w => w.appId === action.appId)
        if (existing) {
          return reduce(state, { type: "focus", id: existing.id })
        }
      }
      const size = defaultSizeFor(action.appId)
      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2)
      const cIdx = state.cascade
      const win: Win = {
        id,
        appId: action.appId,
        title: action.title || defaultTitleFor(action.appId, action.props),
        x: 60 + cIdx * 28,
        y: 60 + cIdx * 24,
        w: size.w,
        h: size.h,
        z: state.nextZ + 1,
        state: "open",
        props: action.props,
      }
      return {
        ...state,
        wins: [...state.wins, win],
        focusedId: id,
        nextZ: state.nextZ + 1,
        cascade: (cIdx + 1) % 6,
      }
    }
    case "close": {
      const wins = state.wins.filter(w => w.id !== action.id)
      return {
        ...state,
        wins,
        focusedId:
          state.focusedId === action.id
            ? wins.length
              ? wins[wins.length - 1].id
              : null
            : state.focusedId,
      }
    }
    case "focus": {
      return {
        ...state,
        focusedId: action.id,
        nextZ: state.nextZ + 1,
        wins: state.wins.map(w =>
          w.id === action.id
            ? {
                ...w,
                z: state.nextZ + 1,
                state: w.state === "minimised" ? "open" : w.state,
              }
            : w,
        ),
      }
    }
    case "minimise": {
      return {
        ...state,
        wins: state.wins.map(w =>
          w.id === action.id ? { ...w, state: "minimised" } : w,
        ),
        focusedId: state.focusedId === action.id ? null : state.focusedId,
      }
    }
    case "maximise": {
      return {
        ...state,
        wins: state.wins.map(w =>
          w.id === action.id
            ? {
                ...w,
                state: w.state === "maximised" ? "open" : "maximised",
              }
            : w,
        ),
      }
    }
    case "move": {
      return {
        ...state,
        wins: state.wins.map(w =>
          w.id === action.id ? { ...w, x: action.x, y: action.y } : w,
        ),
      }
    }
    case "resize": {
      return {
        ...state,
        wins: state.wins.map(w =>
          w.id === action.id
            ? { ...w, w: Math.max(280, action.w), h: Math.max(200, action.h) }
            : w,
        ),
      }
    }
    case "setTitle": {
      return {
        ...state,
        wins: state.wins.map(w =>
          w.id === action.id ? { ...w, title: action.title } : w,
        ),
      }
    }
    case "cleanup": {
      const open = state.wins.filter(w => w.state !== "minimised")
      const n = Math.max(1, open.length)
      const cols = n <= 2 ? n : 2
      const rows = Math.ceil(n / cols)
      const margin = 48
      const top = 40
      const dock = 92
      const ww = (action.viewport.w - margin * (cols + 1)) / cols
      const wh = (action.viewport.h - top - dock - margin * (rows + 1)) / rows
      let i = 0
      const updated = state.wins.map(w => {
        if (w.state === "minimised") return w
        const row = Math.floor(i / cols)
        const col = i % cols
        i++
        return {
          ...w,
          x: margin + col * (ww + margin),
          y: top + margin + row * (wh + margin),
          w: ww,
          h: wh,
          state: "open" as WindowState,
        }
      })
      return { ...state, wins: updated }
    }
    case "restore":
      return action.state
    default:
      return state
  }
}

const initial: WMState = {
  wins: [],
  focusedId: null,
  nextZ: 10,
  cascade: 0,
}

type WMApi = {
  state: WMState
  launch: (
    appId: AppId,
    props?: Record<string, unknown>,
    title?: string,
  ) => void
  close: (id: string) => void
  focus: (id: string) => void
  minimise: (id: string) => void
  maximise: (id: string) => void
  move: (id: string, x: number, y: number) => void
  resize: (id: string, w: number, h: number) => void
  cleanup: () => void
  setTitle: (id: string, title: string) => void
}

const Ctx = createContext<WMApi | null>(null)

const STORAGE_KEY = "huberty.os:wm"

export function WMProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reduce, initial)
  const hydrated = useRef(false)

  useEffect(() => {
    if (hydrated.current) return
    hydrated.current = true
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as WMState
        if (parsed && Array.isArray(parsed.wins)) {
          dispatch({ type: "restore", state: parsed })
        }
      }
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    if (!hydrated.current) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignore
    }
  }, [state])

  const api = useMemo<WMApi>(
    () => ({
      state,
      launch: (appId, props, title) =>
        dispatch({ type: "launch", appId, props, title }),
      close: id => dispatch({ type: "close", id }),
      focus: id => dispatch({ type: "focus", id }),
      minimise: id => dispatch({ type: "minimise", id }),
      maximise: id => dispatch({ type: "maximise", id }),
      move: (id, x, y) => dispatch({ type: "move", id, x, y }),
      resize: (id, w, h) => dispatch({ type: "resize", id, w, h }),
      cleanup: () =>
        dispatch({
          type: "cleanup",
          viewport: {
            w: window.innerWidth,
            h: window.innerHeight,
          },
        }),
      setTitle: (id, title) => dispatch({ type: "setTitle", id, title }),
    }),
    [state],
  )

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useWM() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useWM must be used inside WMProvider")
  return ctx
}

export function useLaunch() {
  const { launch } = useWM()
  return useCallback(
    (appId: AppId, props?: Record<string, unknown>, title?: string) =>
      launch(appId, props, title),
    [launch],
  )
}
