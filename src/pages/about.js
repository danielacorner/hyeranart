import React from "react"


import { SEO } from "../components/seo"
import AboutPageTemplate from "../templates/aboutPageTemplate"
import { animated } from "react-spring"
import { useSpringTransitionLink } from "../utils/customHooks"

const About = ({ transitionStatus }) => {
  const springTransitionLink = useSpringTransitionLink(transitionStatus)

  return (
    <>
      <SEO title="About" />
      <animated.div style={springTransitionLink}>
        <AboutPageTemplate />
      </animated.div>
    </>
  )
}
export default About

export { Head } from "./index"
