import React, { useState } from "react"
import Masonry from "react-masonry-css"
import Img from "gatsby-image"
import styled from "styled-components/macro"
import { NAV_HEIGHT, get3DCanvasStyles } from "../Carousel/CarouselStyles"
import { useImagesQuery } from "../queries"
import { useSpring, animated } from "react-spring"

const GRID_GAP = 30
const CANVAS_THICKNESS = 30

const MasonryStyles = styled.div`
  width: 100%;
  min-height: calc(100vh - ${NAV_HEIGHT}px);
  .masonry-grid {
    display: flex;
    margin-left: -${GRID_GAP}px; /* gutter size offset */
    width: auto;
  }
  .masonry-grid_column {
    padding-left: ${GRID_GAP}px; /* gutter size */
    background-clip: padding-box;
  }
  .gatsby-image-wrapper {
  }
`
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

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
}

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
      !xPct ? 0 : (0.5 - xPct) * 60
    }deg) rotateX(${!yPct ? 0 : (0.5 - yPct) * 60}deg)`,
  })
  const springOpacity = useSpring({
    opacity: 1 - xPct / 3 + yPct / 4,
  })

  // TODO: pass in from dataset
  const width = widthInches * 32
  const height = heightInches * 32
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

export default () => {
  const { imagesDataArr, imagesArr } = useImagesQuery()
  // TODO: filter for only images that have info

  return (
    <MasonryStyles>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={"masonry-grid"}
        columnClassName={"masonry-grid_column"}
      >
        {imagesDataArr.map(
          (
            {
              id,
              Image,
              caption,
              date,
              moreInfo,
              path,
              price,
              title,
              width,
              height,
            },
            idx
          ) => (
            <AnimatedImage
              key={id}
              fluid={imagesArr[idx]}
              widthInches={width}
              heightInches={height}
            />
          )
        )}
      </Masonry>
    </MasonryStyles>
  )
}
