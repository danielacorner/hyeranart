import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import Gallery from "../components/Masonry/Gallery"
import { animated } from "react-spring"
import { useSpringTransitionLink } from "../utils/customHooks"

const Artworks = ({ transitionStatus }) => {
  const springTransitionLink = useSpringTransitionLink(transitionStatus)

  return (
    <Layout>
      <SEO title="Artworks" />
      <animated.div style={springTransitionLink}>
        <Gallery />
      </animated.div>
    </Layout>
  )
}
export default Artworks
