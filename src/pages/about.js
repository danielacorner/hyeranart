import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import AboutPageTemplate from "../templates/aboutPageTemplate"
import { animated } from "react-spring"
import { useSpringTransitionLink } from "."

export default ({ transitionStatus }) => {
  const springTransitionLink = useSpringTransitionLink(transitionStatus)

  return (
    <Layout>
      <SEO title="About" />
      <animated.div style={springTransitionLink}>
        <AboutPageTemplate />
      </animated.div>
    </Layout>
  )
}
