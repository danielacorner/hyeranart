import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import AboutPageTemplate from "../templates/aboutPageTemplate"
import { animated } from "react-spring"
import { useSpringTransitionLink } from "../utils/customHooks"

const About = ({ transitionStatus }) => {
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
export default About
