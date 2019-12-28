/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import SideNav from "../components/Nav/SideNav"
import { useMediaQuery } from "@material-ui/core"
import { BREAKPOINTS } from "../utils/constants"
import TopNav from "../components/Nav/TopNav"

import "./layout.css"

const Layout = ({ children }) => {
  // TODO: title
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const isTabletOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.TABTOP}px)`)

  return (
    <>
      <div
        style={{
          margin: `0 auto`,
          display: "flex",
        }}
      >
        {isTabletOrLarger ? <SideNav /> : <TopNav />}

        <main style={{ width: "100%" }}>{children}</main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
