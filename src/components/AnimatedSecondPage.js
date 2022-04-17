import React from "react"
import { animated } from "react-spring"
import SecondPage from "./SecondPage"
import { useSpringTransitionLink } from "../utils/customHooks"

export default function AnimatedSecondPage({ transitionStatus }) {
  const springTransitionLink = useSpringTransitionLink(transitionStatus)

  return (
    <animated.div style={springTransitionLink}>
      <SecondPage />
    </animated.div>
  )
}
