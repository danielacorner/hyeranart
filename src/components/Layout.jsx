/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState, useRef, useEffect, useContext } from "react"
import PropTypes from "prop-types"
import DesktopNav from "../components/Nav/DesktopNav"
import { useMediaQuery } from "@material-ui/core"
import { BREAKPOINTS } from "../utils/constants"
import styled from "styled-components"
import { useSpring, animated } from "react-spring"
import "./layout.css"
import { GlobalStateContext } from "../context/GlobalContextProvider"

export const SPRING_LEFT_RIGHT_PX = 30

const LayoutStyles = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  main {
    width: 100vw;
    height: 100%;
  }
`

const Layout = ({ children, location }) => {
  const [isMounted, setIsMounted] = useState(false)
  const { isMovingRight } = useContext(GlobalStateContext)

  const navigateFnRef = useRef(() => null)

  const springExit = useSpring({
    from: {
      opacity: isMounted ? 1 : 0,
      transform: `translateX(${
        isMounted ? 0 : (isMovingRight ? -1 : 1) * SPRING_LEFT_RIGHT_PX
      }px)`,
    },
    to: {
      opacity: isMounted ? 1 : 0,
      transform: `translateX(${
        isMounted ? 0 : (isMovingRight ? 1 : -1) * SPRING_LEFT_RIGHT_PX
      }px)`,
    },
    config: { friction: 5, tension: 100, clamp: true },
    onRest: () => {
      if (!isMounted) {
        setIsMounted(true)
        navigateFnRef.current()
      }
    },
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleNavigate = ({ navigateFn }) => {
    navigateFnRef.current = navigateFn
    setIsMounted(false)
  }

  return (
    <LayoutStyles>
      <DesktopNav handleNavigate={handleNavigate} location={location} />
      <animated.main style={springExit}>{children}</animated.main>
    </LayoutStyles>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
