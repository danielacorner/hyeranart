import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import Gallery from "../components/Masonry/Gallery"
import { useSpringLeftRightNavigate } from "."
import { animated } from "react-spring"

export default ({ transitionStatus }) => {
  const springLeftRightNavigate = useSpringLeftRightNavigate(transitionStatus)

  return (
    <Layout>
      <SEO title="Artworks" />
      <animated.div style={springLeftRightNavigate}>
        <Gallery />
      </animated.div>
    </Layout>
  )
}
