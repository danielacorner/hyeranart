import React, { useState } from "react"
import Img from "gatsby-image"
import { useSpring, animated } from "react-spring"
import styled from "styled-components/macro"
import { Scene3DCanvasStyles } from "../Animated/Scene3DStyles"

const ImgWrapperStyles = styled.div`
  width: 100%;
  height: 100%;
  * {
    width: 100%;
    height: 100%;
  }
`

const TILT_DEG = 30
const LIGHT_SHADOW_PCT = TILT_DEG / 2
const SPRING_TENSION = 120

const AnimatedImage = ({
  title,
  fluid,
  widthInches,
  heightInches,
  depthInches,
  gridSize,
}) => {
  // TODO: set these as span row and col values
  // grid-column: span ${width}
  // grid-row: span ${height}
  // https://youtu.be/OkCnhz__aFM?t=365
  const width = widthInches * gridSize
  const height = heightInches * gridSize
  const depthPx = depthInches * gridSize
  const [isHovered, setIsHovered] = useState(false)
  const [mousePstn, setMousePstn] = useState([null, null])
  const [rightPct, bottomPct] = mousePstn
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
      !rightPct ? 0 : (0.5 - rightPct) * TILT_DEG
    }deg) rotateX(${!bottomPct ? 0 : (0.5 - bottomPct) * TILT_DEG}deg)`,
    config: { tension: SPRING_TENSION },
  })

  const lightnessPct = rightPct - bottomPct
  const darknessPct = bottomPct - rightPct

  const springOpacityWhite = useSpring({
    opacity: lightnessPct * (LIGHT_SHADOW_PCT / 100),
    config: { tension: SPRING_TENSION, mass: 2, clamp: true },
  })
  const springOpacityBlack = useSpring({
    opacity: darknessPct * (LIGHT_SHADOW_PCT / 100),
    config: { tension: SPRING_TENSION, mass: 2, clamp: true },
  })

  return (
    <Scene3DCanvasStyles className="scene" thicknessPx={depthPx}>
      <animated.div
        className="cube"
        onMouseOut={handleMouseOut}
        onMouseMove={handleMouseOver}
        style={{ ...springOnHover, width, height }}
      >
        <ImgWrapperStyles className={`${title} cube__face cube__face--front`}>
          <div>
            <Img fluid={fluid} />
            <animated.div
              style={springOpacityWhite}
              className="overlay overlay-white"
            />
            <animated.div
              style={springOpacityBlack}
              className="overlay overlay-black"
            />
          </div>
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
