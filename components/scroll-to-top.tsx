"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Si la URL trae un ancla (/#contacto), hay que ir a esa seccion y no al
    // inicio. La seccion puede no estar todavia en su lugar definitivo cuando
    // se hidrata la pagina, asi que esperamos un frame antes de posicionarnos.
    const id = window.location.hash.slice(1)

    if (id) {
      // Sin animar: se llega desde otra pagina, hay que aterrizar ya en la seccion.
      const ir = () =>
        document.getElementById(id)?.scrollIntoView({ behavior: "instant" })
      ir()
      const reintento = setTimeout(ir, 150)
      return () => clearTimeout(reintento)
    }

    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
