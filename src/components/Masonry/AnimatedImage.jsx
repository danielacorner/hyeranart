import React, { useState } from "react"
import Img from "gatsby-image"
import { useSpring, animated } from "react-spring"
import styled from "styled-components/macro"
import { Scene3DCanvasStyles } from "../Carousel/CarouselStyles"
import { GRID_SIZE } from "./MasonryGrid"

const ImgWrapperStyles = styled.div`
  width: 100%;
  height: 100%;
  * {
    width: 100%;
    height: 100%;
  }
`

const AnimatedImage = ({ fluid, widthInches, heightInches, depthInches }) => {
  // TODO: set these as span row and col values
  // grid-column: span ${width}
  // grid-row: span ${height}
  // https://youtu.be/OkCnhz__aFM?t=365
  const width = widthInches * GRID_SIZE
  const height = heightInches * GRID_SIZE
  const depthPx = depthInches * GRID_SIZE
  const [isHovered, setIsHovered] = useState(false)
  const [mousePstn, setMousePstn] = useState([null, null])
  const [xPct, yPct] = mousePstn
  const handleMouseOver = event => {
    if (!isHovered) {
      setIsHovered(true)
    }
    const bbox = event.target.getBoundingClientRect()

    const mouseXPosnOnImage = event.clientX - bbox.left
    const mouseXPosnPct = mouseXPosnOnImage / bbox.width

    const mouseYPosnOnImage = event.clientY - bbox.top
    const mouseYPosnPct = mouseYPosnOnImage / bbox.height
    setMousePstn([1 - mouseXPosnPct, mouseYPosnPct])
  }
  const handleMouseOut = () => {
    setIsHovered(false)
    setMousePstn([null, null])
  }

  const springOnHover = useSpring({
    transform: `translateZ(${depthPx}px) translateY(${
      isHovered ? -4 : 0
    }px) scale(${isHovered ? 1.04 : 1}) rotateY(${
      !xPct ? 0 : (0.5 - xPct) * 40
    }deg) rotateX(${!yPct ? 0 : (0.5 - yPct) * 40}deg)`,
  })
  // TODO: add white, black transparent backgrounds on top
  // TODO: & render one or the other opaque to simulate light/shadow
  const springOpacity = useSpring({
    opacity: 1 - xPct / 4 + yPct / 3,
  })

  return (
    <Scene3DCanvasStyles className="scene" thicknessPx={depthPx}>
      <animated.div
        className="cube"
        onMouseOut={handleMouseOut}
        onMouseMove={handleMouseOver}
        style={{ ...springOnHover, width, height }}
      >
        <ImgWrapperStyles className="cube__face cube__face--front">
          <animated.div style={springOpacity}>
            <Img fluid={fluid} />
          </animated.div>
        </ImgWrapperStyles>
        <div
          className="cube__face cube__face--right"
          style={{
            transform: `rotateY(90deg) translateZ(${width - depthPx / 2}px)`,
          }}
        ></div>

        <div className="cube__face cube__face--left"></div>
        <div className="cube__face cube__face--top"></div>
        <div
          className="cube__face cube__face--bottom"
          style={{
            transform: `rotateX(-90deg) translateZ(${height - depthPx / 2}px)`,
          }}
        ></div>
      </animated.div>
    </Scene3DCanvasStyles>
  )
}

export default AnimatedImage
