/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import DesktopNav from "../components/Nav/DesktopNav"
import styled from "styled-components"
import "./layout.css"

const LayoutStyles = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  .navigationWrapper {
    position: relative;
  }
  .navigationWrapper,
  main {
    transition: opacity 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
    opacity: ${props => (props.isSplashPageClicked ? 1 : 0)};
  }
  main {
    width: 100vw;
    height: 100%;
  }
`

const Layout = ({ children, isSplashPageClicked = true }) => {
  return (
    <LayoutStyles isSplashPageClicked={isSplashPageClicked}>
      <div className="navigationWrapper">
        <DesktopNav />
      </div>
      <main>{children}</main>
    </LayoutStyles>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
