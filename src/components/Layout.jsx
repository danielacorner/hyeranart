/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import SideNav, { SIDENAV_WIDTH } from "../components/Nav/SideNav"
import { useMediaQuery } from "@material-ui/core"
import { BREAKPOINTS } from "../utils/constants"
import TopNav from "../components/Nav/TopNav"
import styled from "styled-components/macro"

import "./layout.css"

const LayoutStyles = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100vh;
  main {
    width: 100vw;
    @media (min-width: ${BREAKPOINTS.TABTOP}px) {
      width: calc(100vw - ${SIDENAV_WIDTH}px);
    }
    height: 100%;
  }
`

const Layout = ({ children }) => {
  const isTabletOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.TABTOP}px)`)

  return (
    <LayoutStyles>
      {isTabletOrLarger ? <SideNav /> : <TopNav />}
      <main>{children}</main>
    </LayoutStyles>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
