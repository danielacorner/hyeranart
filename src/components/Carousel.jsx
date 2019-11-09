import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components/macro"
import Img from "gatsby-image"
import ArrowRightIcon from "@material-ui/icons/ArrowForwardIos"
import { IconButton } from "@material-ui/core"
import { animated, useSpring } from "react-spring"
import { useImagesQuery } from "./queries"
import Tilt from "react-tilt"
import ContainerDimensions from "react-container-dimensions"

const ArrowLeftIcon = () => (
  <ArrowRightIcon style={{ transform: "rotate(180deg)" }} />
)

const CAROUSEL_MAX_WIDTH = 960
const IMG_WIDTH = 960
const CANVAS_THICKNESS = 60
const NAV_HEIGHT = 64
const CANVAS_BACKGROUND_COLOR = "hsl(0,0%,90%)"
const CANVAS_BORDER_COLOR = "hsl(0,0%,80%)"

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
  .animated-images-wrapper {
    position: relative;
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
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        /* object-fit: contain !important; */
      }
    }
  }

  .scene {
    transform-style: preserve-3d;
  }
  .cube {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
  }
  .cube__face {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${CANVAS_BACKGROUND_COLOR};
    border: 1px solid ${CANVAS_BORDER_COLOR};
  }
  .cube__face--front {
    transform: rotateY(0deg) translateZ(${CANVAS_THICKNESS / 2}px);
  }
  .cube__face--right {
    width: ${CANVAS_THICKNESS}px;
    transform: rotateY(90deg) translateZ(${IMG_WIDTH - CANVAS_THICKNESS / 2}px);
  }
  .cube__face--back {
    transform: rotateY(180deg) translateZ(${CANVAS_THICKNESS / 2}px);
  }
  .cube__face--left {
    width: ${CANVAS_THICKNESS}px;
    transform: rotateY(-90deg) translateZ(${CANVAS_THICKNESS / 2}px);
  }
  .cube__face--top {
    height: ${CANVAS_THICKNESS}px;
    transform: rotateX(90deg) translateZ(${CANVAS_THICKNESS / 2}px);
  }
  .cube__face--bottom {
    height: ${CANVAS_THICKNESS}px;
    transform: rotateX(-90deg) translateZ(${props => props.imageHeight}px);
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
  .animated-modal-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`
export function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const CubeStyles = styled.div``

export default () => {
  const images = useImagesQuery()

  const [selectedImgIndex, setSelectedImgIndex] = useState(0)
  const prevSelectedImgIndex = usePrevious(selectedImgIndex)
  const [carouselWidth, setCarouselWidth] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    setIsModalOpen(false)
    const prevIndex = selectedImgIndex - 1
    setSelectedImgIndex(prevIndex < 0 ? images.length - 1 : prevIndex)
  }
  const handleNext = () => {
    setIsModalOpen(false)
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

  const springModalBackground = useSpring({
    opacity: isModalOpen ? 1 : 0,
    pointerEvents: isModalOpen ? "auto" : "none",
    background: `hsla(0,0%,30%,${isModalOpen ? 0.8 : 0})`,
  })
  const springModalImage = useSpring({
    transform: `scale(${isModalOpen ? 0.8 : 1})`,
  })

  // TODO
  const IMAGE_HEIGHT = 756

  return (
    <CarouselStyles>
      <div className="arrow-wrapper arrow-left">
        <IconButton onClick={handlePrevious}>
          <ArrowLeftIcon />
        </IconButton>
      </div>

      <animated.div className="animated-images-wrapper" style={springLeftRight}>
        {images.map((image, idx) => (
          <div
            key={idx}
            className="img-wrapper"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <Img title={"hi"} fluid={image} />
          </div>
        ))}
      </animated.div>

      <div className="arrow-wrapper arrow-right">
        <IconButton onClick={handleNext}>
          <ArrowRightIcon />
        </IconButton>
      </div>

      <animated.div
        className="animated-modal-wrapper"
        style={springModalBackground}
      >
        <Tilt
          options={{
            // https://www.npmjs.com/package/react-tilt
            max: 60,
            perspective: 8000,
          }}
          style={{
            height: "100%",
          }}
          className="scene"
        >
          <ContainerDimensions>
            {({ height }) => (
              <animated.div
                className="img-wrapper cube"
                style={springModalImage}
                onClick={() => setIsModalOpen(false)}
              >
                <div className="cube__face cube__face--front">
                  <Img
                    title={"hi"}
                    fluid={
                      images[
                        prevSelectedImgIndex ||
                          (prevSelectedImgIndex === 0
                            ? prevSelectedImgIndex
                            : selectedImgIndex)
                      ]
                    }
                  />
                </div>
                <div className="cube__face cube__face--right"></div>
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
            )}
          </ContainerDimensions>
        </Tilt>
      </animated.div>
    </CarouselStyles>
  )
}
