import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import MasonryGrid from "../components/Masonry/MasonryGrid"
import { useStaticQuery, graphql } from "gatsby"

// inspiration:
// https://abstractartcollective.com
// enter animations http://abstractartcollective.com/penny-arnst/

// http://bomomo.com/

// 3d tilt https://codepen.io/dimaZubkov/pen/XqoGeW

// https://www.npmjs.com/package/react-tilt

export default () => {
  const allDirectoriesData = useStaticQuery(graphql`
    query RecipePageByID {
      allDirectory {
        edges {
          node {
            id
            relativePath
          }
        }
      }
    }
  `)
  const allDirectoriesArr = allDirectoriesData.allDirectory.edges
  console.log("⚡🚨: allDirectoriesArr", allDirectoriesArr)

  return (
    <Layout>
      <SEO title="Home" />
      <MasonryGrid />
    </Layout>
  )
}
