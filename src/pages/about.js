import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import About from "../components/About"
import { animated } from "react-spring"
import { useSpringTransitionLink } from "."

export default ({ transitionStatus }) => {
  const springTransitionLink = useSpringTransitionLink(transitionStatus)

  return (
    <Layout>
      <SEO title="About" />
      <animated.div style={springTransitionLink}>
        <About />
      </animated.div>
    </Layout>
  )
}
