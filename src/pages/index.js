import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import MasonryGrid from "../components/Masonry/MasonryGrid"
import { useStaticQuery, graphql } from "gatsby"
import SideNav from "../components/Nav/SideNav"
import { useMediaQuery } from "@material-ui/core"
import { BREAKPOINTS } from "../utils/constants"

if (process.env.NODE_ENV !== "production") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render")
  whyDidYouRender(React)
}
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

  const isTabletOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.TABTOP}px)`)

  return (
    <Layout>
      <SEO title="Home" />
      <div style={{ display: "flex" }}>
        {isTabletOrLarger && <SideNav />}
        <MasonryGrid />
      </div>
    </Layout>
  )
}
