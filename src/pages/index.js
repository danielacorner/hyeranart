import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import MasonryGrid from "../components/Masonry/MasonryGrid"
import { useImagesQuery } from "../components/queries"

// inspiration:
// https://abstractartcollective.com
// enter animations http://abstractartcollective.com/penny-arnst/

// http://bomomo.com/

// 3d tilt https://codepen.io/dimaZubkov/pen/XqoGeW

// https://www.npmjs.com/package/react-tilt

export default () => {
  const imgFluidArray = useImagesQuery()
  console.log("⚡🚨: imgFluidArray", imgFluidArray)

  return (
    <Layout>
      <SEO title="Home" />
      <MasonryGrid imgFluidArray={imgFluidArray} />
    </Layout>
  )
}
