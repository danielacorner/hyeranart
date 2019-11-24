import React, { useState } from "react"
import Img from "gatsby-image"
import { useSpring, animated } from "react-spring"
import styled from "styled-components/macro"
import { get3DCanvasStyles } from "../Carousel/CarouselStyles"
import { GRID_GAP, GRID_SIZE } from "./MasonryGrid"

const CANVAS_THICKNESS = 30

const SceneWrapperStyles = styled.div`
  ${get3DCanvasStyles(CANVAS_THICKNESS)}
  margin-bottom: ${GRID_GAP}px;
  perspective:3000;
`

const ImgWrapperStyles = styled.div`
  width: 100%;
  height: 100%;
  * {
    width: 100%;
    height: 100%;
  }
`

const AnimatedImage = ({ fluid, widthInches, heightInches }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePstn, setMousePstn] = useState([null, null])
  const [xPct, yPct] = mousePstn
  const handleMouseOver = event => {
    if (!isHovered) {
      setIsHovered(true)
    }
    const bbox = event.target.getBoundingClientRect()

    const mouseXPosnOnImage = event.pageX - bbox.left
    const mouseXPosnPct = mouseXPosnOnImage / bbox.width

    const mouseYPosnOnImage = event.pageY - bbox.top
    const mouseYPosnPct = mouseYPosnOnImage / bbox.height
    setMousePstn([1 - mouseXPosnPct, mouseYPosnPct])
  }
  const handleMouseOut = () => {
    setIsHovered(false)
    setMousePstn([null, null])
  }

  const springOnHover = useSpring({
    transform: `translateZ(${CANVAS_THICKNESS}px) translateY(${
      isHovered ? -4 : 0
    }px) scale(${isHovered ? 1.04 : 1}) rotateY(${
      !xPct ? 0 : (0.5 - xPct) * 40
    }deg) rotateX(${!yPct ? 0 : (0.5 - yPct) * 40}deg)`,
  })
  const springOpacity = useSpring({
    opacity: 1 - xPct / 4 + yPct / 3,
  })

  // TODO: set these as span row and col values
  // grid-column: span ${width}
  // grid-row: span ${height}
  // https://youtu.be/OkCnhz__aFM?t=365
  // const depth = depthInches
  const width = widthInches * GRID_SIZE
  const height = heightInches * GRID_SIZE
  return (
    <SceneWrapperStyles className="scene">
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
            transform: `rotateY(90deg) translateZ(${width -
              CANVAS_THICKNESS / 2}px)`,
          }}
        ></div>

        <div className="cube__face cube__face--left"></div>
        <div className="cube__face cube__face--top"></div>
        <div
          className="cube__face cube__face--bottom"
          style={{
            transform: `rotateX(-90deg) translateZ(${height -
              CANVAS_THICKNESS / 2}px)`,
          }}
        ></div>
      </animated.div>
    </SceneWrapperStyles>
  )
}

export default AnimatedImage
