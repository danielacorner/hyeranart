/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import "./layout.css"
import loadable from "@loadable/component"
import { useMount } from "../utils/customHooks"
import { globalHistory } from "@reach/router"

const DesktopNavLoadable = loadable(() => import("./Nav/DesktopNav"))

const LayoutStyles = styled.div`
  margin: 0 auto;
  min-height: 90vh;
  .navigationWrapper {
    height: 45px;
    max-width: 100vw;
    position: relative;
    z-index: ${(p) => (p.showNav ? 9999 : 1)};
  }
  .navigationWrapper,
  main {
    transition: opacity 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
    opacity: ${(props) => (props.isSplashPageClicked ? 1 : 0)};
  }
  main {
    position: relative;
    z-index: 1;
    width: 100vw;
    height: 100%;
  }
`

const Layout = ({ children, isSplashPageClicked = true }) => {
  const { location } = globalHistory
  const showNav =
    isSplashPageClicked && !location.pathname.includes("/paintings/")
  return (
    <LayoutStyles {...{ isSplashPageClicked, showNav }}>
      <div className="navigationWrapper">
        <MountLater>
          <DesktopNavLoadable />
        </MountLater>
      </div>
      <main>{children}</main>
    </LayoutStyles>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
function MountLater({ children, delay = 1 }) {
  const [mounted, setMounted] = useState(false)
  useMount(() => {
    setTimeout(() => {
      setMounted(true)
    }, delay)
  })
  return mounted ? children : null
}
