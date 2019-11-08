import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import ArrowRightIcon from "@material-ui/icons/ArrowForwardIos"
import { IconButton } from "@material-ui/core"
import { animated, useSpring } from "react-spring"
import { useImagesQuery } from "./queries"

const ArrowLeftIcon = () => (
  <ArrowRightIcon style={{ transform: "rotate(180deg)" }} />
)

const CAROUSEL_MAX_WIDTH = 960
const NAV_HEIGHT = 64

const CarouselStyles = styled.div`
  max-width: ${CAROUSEL_MAX_WIDTH}px;
  max-height: calc(100vh - ${NAV_HEIGHT}px);
  margin: auto;
  display: grid;
  align-items: center;
  align-content: center;
  .gatsby-image-wrapper {
    height: 100%;
  }
  .images-wrapper {
    display: grid;
    grid-auto-flow: column;
    height: 100%;
    .img-wrapper {
      display: grid;
      align-items: center;
      height: 100%;
      max-height: calc(100vh - ${NAV_HEIGHT}px);
      max-width: ${CAROUSEL_MAX_WIDTH}px;
      width: 100vw;
      img {
        width: 100%;
        height: 100%;
        /* object-fit: contain !important; */
      }
    }
  }
  position: relative;
  .arrow-wrapper {
    position: absolute;
    z-index: 1;
    height: 100%;
    display: grid;
    align-items: center;
    &.arrow-right {
      right: -3em;
    }
    &.arrow-left {
      left: -3em;
    }
    .MuiIconButton-root {
      /* color: rgba(255, 255, 255, 0.54); */
    }
    .MuiButtonBase-root.MuiIconButton-root {
      background-color: rgba(255, 255, 255, 0.36);
    }
    .MuiButtonBase-root.MuiIconButton-root:hover {
      /* background-color: rgba(255, 255, 255, 0.16); */
    }
  }
`

export default () => {
  const images = useImagesQuery()

  const [selectedImgIndex, setSelectedImgIndex] = useState(0)
  const [carouselWidth, setCarouselWidth] = useState(0)

  useEffect(() => {
    // window is not defined during gatsby build
    // must wait until we're in the browser
    const newCarouselWidth = Math.min(window.innerWidth, CAROUSEL_MAX_WIDTH)
    if (newCarouselWidth !== carouselWidth) {
      setCarouselWidth(newCarouselWidth)
    }
  }, [carouselWidth])

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown)
    return () => {
      window.removeEventListener("keydown", handleKeydown)
    }
  })

  const handlePrevious = () => {
    const prevIndex = selectedImgIndex - 1
    setSelectedImgIndex(prevIndex < 0 ? images.length - 1 : prevIndex)
  }
  const handleNext = () => {
    const nextIndex = selectedImgIndex + 1
    setSelectedImgIndex(nextIndex > images.length - 1 ? 0 : nextIndex)
  }
  const handleKeydown = event => {
    if (["ArrowRight", "ArrowDown"].includes(event.key)) {
      handleNext()
    } else if (["ArrowLeft", "ArrowUp"].includes(event.key)) {
      handlePrevious()
    }
  }
  const springLeftRight = useSpring({
    transform: `translate(${-selectedImgIndex * carouselWidth}px,0)`,
  })

  return (
    <CarouselStyles>
      <div className="arrow-wrapper arrow-left">
        <IconButton onClick={handlePrevious}>
          <ArrowLeftIcon />
        </IconButton>
      </div>
      <animated.div className="images-wrapper" style={springLeftRight}>
        {images.map((image, idx) => (
          <div className="img-wrapper">
            <Img key={idx} title={"hi"} fluid={image} />
          </div>
        ))}
      </animated.div>
      <div className="arrow-wrapper arrow-right">
        <IconButton onClick={handleNext}>
          <ArrowRightIcon />
        </IconButton>
      </div>
    </CarouselStyles>
  )
}
