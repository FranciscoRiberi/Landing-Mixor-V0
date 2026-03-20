"use client"
import { useState, useEffect } from "react"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [marketing, setMarketing] = useState(true)

  useEffect(() => {
    const consent = localStorage.getItem("mixor-cookies")
    if (!consent) setVisible(true)
  }, [])

  function loadMetaPixel() {
    if (typeof window === "undefined") return
    const w = window as any
    if (w.fbq) return
    w._fbq = w.fbq = function () {
      w.fbq.callMethod
        ? w.fbq.callMethod.apply(w.fbq, arguments)
        : w.fbq.queue.push(arguments)
    }
    w.fbq.push = w.fbq
    w.fbq.loaded = true
    w.fbq.version = "2.0"
    w.fbq.queue = []
    const script = document.createElement("script")
    script.async = true
    script.src = "https://connect.facebook.net/en_US/fbevents.js"
    document.head.appendChild(script)
    w.fbq("init", "4068365436756268")
    w.fbq("track", "PageView")
  }

  function acceptAll() {
    localStorage.setItem("mixor-cookies", "all")
    setVisible(false)
    loadMetaPixel()
  }

  function rejectAll() {
    localStorage.setItem("mixor-cookies", "essential")
    setVisible(false)
  }

  function acceptCustom() {
    localStorage.setItem("mixor-cookies", marketing ? "all" : "essential")
    setVisible(false)
    if (marketing) loadMetaPixel()
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl border border-white/[0.08] bg-black/95 backdrop-blur-3xl p-6 md:p-7">

        {/* Specular highlight */}
        <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* Red glow */}
        <div className="absolute -bottom-16 -left-10 w-72 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-5">

          {/* Icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
              <path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/>
            </svg>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-bold text-foreground mb-1">
              Usamos cookies.{" "}
              <span className="text-primary">Las buenas, no las de galletita.</span>
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Nos ayudan a saber qué productos te interesan y mejorar tu experiencia. Nada raro, prometido.
            </p>

            {/* Toggles */}
            <div className="flex flex-wrap gap-5 mt-3">
              <label className="flex items-center gap-2 text-xs text-muted-foreground/50 cursor-not-allowed select-none">
                <div className="w-7 h-4 rounded-full bg-primary/40 border border-white/10 relative opacity-40">
                  <div className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-white" />
                </div>
                Esenciales
              </label>
              <label
                className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none"
                onClick={() => setMarketing(!marketing)}
              >
                <div className={`w-7 h-4 rounded-full border relative transition-all duration-200 ${marketing ? "bg-primary/70 border-primary/30" : "bg-white/10 border-white/10"}`}>
                  <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-200 ${marketing ? "right-0.5" : "left-0.5"}`} />
                </div>
                Marketing
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
            <button
              onClick={rejectAll}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-full text-xs font-medium text-muted-foreground bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              Solo esenciales
            </button>
            <button
              onClick={acceptAll}
              className="flex-1 md:flex-none px-5 py-2.5 rounded-full text-xs font-bold text-white bg-primary hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 border border-white/15 relative overflow-hidden"
            >
              <span className="absolute top-0 left-0 right-0 h-px bg-white/25" />
              Acepto todo
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
