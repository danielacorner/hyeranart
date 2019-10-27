import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PaintingStack from "../components/PaintingStack"

// inspiration:
// https://abstractartcollective.com
// enter animations http://abstractartcollective.com/penny-arnst/

// http://bomomo.com/

// 3d tilt https://codepen.io/dimaZubkov/pen/XqoGeW

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hyeran Art</h1>
    <PaintingStack />

    <Link to="/works-large/">Large Works</Link>
    <Link to="/works-medium/">Medium Works</Link>
    <Link to="/works-small/">Small Works</Link>
  </Layout>
)

export default IndexPage
