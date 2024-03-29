import { useSpring } from "@react-spring/core"
import { useRef, useEffect } from "react"

export function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef()

  // Store current value in ref
  useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current
}

export function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return
        }

        handler(event)
      }

      document.addEventListener("mousedown", listener)
      document.addEventListener("touchstart", listener)

      return () => {
        document.removeEventListener("mousedown", listener)
        document.removeEventListener("touchstart", listener)
      }
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  )
}

export function useMount(cb) {
  useEffect(cb, []) // eslint-disable-line react-hooks/exhaustive-deps
}

export const useSpringTransitionLink = (transitionStatus) =>
  useSpring(
    ["entering", "entered"].includes(transitionStatus)
      ? {
          opacity: 1,
        }
      : ["exiting", "exited"].includes(transitionStatus)
      ? {
          opacity: 0,
        }
      : { opacity: 1 }
  )
