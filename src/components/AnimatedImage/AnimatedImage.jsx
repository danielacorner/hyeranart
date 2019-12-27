import React, { useState, useRef } from "react"
import { useSpring } from "react-spring"
import { useOnClickOutside } from "../../utils/customHooks"
import { AnimatedImageContent } from "./AnimatedImageContent"
import { SpringInOut } from "../Animated/Springs"
import styled from "styled-components/macro"
import { Portal } from "@material-ui/core"

export const SCALE_ON_HOVER = 1.04
const TILT_DEG = 30
const LIGHT_SHADOW_PCT = TILT_DEG / 2
const SPRING_TENSION = 120

const ModalWrapperStyles = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  place-items: center;
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  pointer-events: ${props => (props.in ? "auto" : "none")};
  background: ${props => (props.in ? "hsla(0,0%,0%,0.3)" : "none")};
`
const AnimatedImageStyles = styled.div``

const AnimatedImage = ({
  title,
  fluid,
  widthInches,
  heightInches,
  depthInches,
  gridSize,
  gridGap,
  fullScreenLink,
  inARoomLink,
}) => {
  // grid-column: span ${width}
  // grid-row: span ${height}
  // https://youtu.be/OkCnhz__aFM?t=365
  const width = widthInches * gridSize
  const height = heightInches * gridSize
  const depthPx = depthInches * gridSize
  // TODO: are any not paintings?
  const metadata = {
    widthInches,
    heightInches,
    depthInches,
    title,
    type: "Painting",
  }
  const [isSelected, setIsSelected] = useState(false)
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

  const handleClick = () => {
    if (!isSelected) {
      setIsSelected(true)
    }
  }

  const handleClickAway = () => {
    if (isSelected) {
      setIsSelected(false)
    }
  }

  const clickOutsideRef = useRef()
  useOnClickOutside(clickOutsideRef, handleClickAway)

  const springOnHover = useSpring({
    transform: `translateZ(${depthPx}px) translateY(${
      isHovered ? -4 : 0
    }px) scale(${isHovered ? SCALE_ON_HOVER : 1}) rotateY(${
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
    <AnimatedImageStyles>
      <AnimatedImageContent
        clickOutsideRef={clickOutsideRef}
        width={width}
        height={height}
        depthPx={depthPx}
        handleMouseOver={handleMouseOver}
        handleMouseOut={handleMouseOut}
        handleClick={handleClick}
        springOnHover={springOnHover}
        springOpacityWhite={springOpacityWhite}
        springOpacityBlack={springOpacityBlack}
        title={title}
        fluid={fluid}
        isSelected={isSelected}
        gridGap={gridGap}
        fullScreenLink={fullScreenLink}
        inARoomLink={inARoomLink}
        metadata={metadata}
        isModalImage={false}
      />
      <Portal>
        <ModalWrapperStyles in={isSelected}>
          <SpringInOut in={isSelected} widthPx={width} heightPx={height}>
            <AnimatedImageContent
              clickOutsideRef={clickOutsideRef}
              width={width}
              height={height}
              depthPx={depthPx}
              handleMouseOver={handleMouseOver}
              handleMouseOut={handleMouseOut}
              handleClick={handleClick}
              springOnHover={springOnHover}
              springOpacityWhite={springOpacityWhite}
              springOpacityBlack={springOpacityBlack}
              title={title}
              fluid={fluid}
              isSelected={isSelected}
              gridGap={gridGap}
              fullScreenLink={fullScreenLink}
              inARoomLink={inARoomLink}
              metadata={metadata}
              isModalImage={true}
            />
          </SpringInOut>
        </ModalWrapperStyles>
      </Portal>
    </AnimatedImageStyles>
  )
}

export default AnimatedImage
