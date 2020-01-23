import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import About from "../components/About"
import { animated } from "react-spring"
import { useSpringLeftRightNavigate } from "."

export default ({ transitionStatus }) => {
  const springLeftRightNavigate = useSpringLeftRightNavigate(transitionStatus)

  return (
    <Layout>
      <SEO title="About" />
      <animated.div style={springLeftRightNavigate}>
        <About />
      </animated.div>
    </Layout>
  )
}
