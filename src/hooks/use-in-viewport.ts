import { useEffect, useRef, useState } from 'react'

/**
 * Returns a ref and a boolean indicating whether the element is currently
 * visible in the viewport. Used to pause expensive animations (RAF loops,
 * intervals) when the user scrolls away.
 */
export function useInViewport<T extends HTMLElement = HTMLElement>(
  threshold = 0.1
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}
