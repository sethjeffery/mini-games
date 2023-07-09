import { useEffect } from 'react'

function useTick(callback: (delta: number) => void) {
  useEffect(() => {
    let frameId: number
    let timeoutId: NodeJS.Timeout
    const tick = (delta: number) => {
      callback(delta)
      timeoutId = setTimeout(() => {
        frameId = requestAnimationFrame(tick)
      }, 1000 / 60)
    }
    requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frameId)
      clearTimeout(timeoutId)
    }
  }, [callback])
}

export default useTick
