import { DependencyList, useCallback, useEffect, useRef } from "react"

export default function useIntersectionObserver<T extends HTMLElement>(
  callback: () => void,
  deps: DependencyList
) {
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    return () =>  observer.current?.disconnect()
  }, []);

  const ref = useCallback(
    (node: T) => {
      if (deps.every(Boolean)) {
        observer.current?.disconnect()
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) callback()
        })
        if (node) observer.current.observe(node)
      }
    },
    [deps, callback]
  )
  return ref
}