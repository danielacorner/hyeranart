import React from "react"
import Img from "gatsby-image"
import { animated } from "react-spring"
import styled from "styled-components"
import { Scene3DCanvasStyles } from "../Animated/Scene3DStyles"
import PaintingMetadata from "../Masonry/PaintingMetadata"

const ImgWrapperStyles = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  * {
    width: 100%;
    height: 100%;
  }
`

const noop = () => null

export const AnimatedImageContent = ({
  handleMouseOut,
  handleMouseOver,
  springOnHover,
  title,
  fluid,
  springOpacityWhite,
  springOpacityBlack,
  width,
  height,
  depthPx,
  handleClick,
  metadata,
  isModalImage,
  shouldDisableAnimation,
}) => (
  <div
    onClick={handleClick}
    style={{
      position: "relative",
    }}
  >
    <Scene3DCanvasStyles className="scene" thicknessPx={depthPx}>
      <animated.div
        className="cube"
        onMouseOut={!shouldDisableAnimation ? handleMouseOut : noop}
        onMouseMove={!shouldDisableAnimation ? handleMouseOver : noop}
        style={{
          ...(!shouldDisableAnimation ? springOnHover : {}),
          width: width,
          height: height,
        }}
      >
        <ImgWrapperStyles className={`${title} cube__face cube__face--front`}>
          <div>
            <Img fluid={fluid} />
            {!shouldDisableAnimation && (
              <>
                <animated.div
                  style={springOpacityWhite}
                  className="overlay overlay-white"
                />
                <animated.div
                  style={springOpacityBlack}
                  className="overlay overlay-black"
                />
              </>
            )}
          </div>
          {!isModalImage && <PaintingMetadata metadata={metadata} />}
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
  </div>
)
