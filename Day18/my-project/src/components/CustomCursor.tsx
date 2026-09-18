import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only devices with a real mouse pointer should show the custom dot.
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    if (!dot) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let dotX = mouseX
    let dotY = mouseY
    let raf = 0
    const HALF = 4 // half of the 8px dot, so it sits centred under the cursor

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.classList.remove('opacity-0')
    }

    // Chase the mouse a little closer on every animation frame.
    const loop = () => {
      dotX += (mouseX - dotX) * 0.12
      dotY += (mouseY - dotY) * 0.12
      dot.style.transform = `translate3d(${dotX - HALF}px, ${dotY - HALF}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] size-[8px] rounded-full bg-peacock opacity-0 transition-opacity duration-300"
    />
  )
}