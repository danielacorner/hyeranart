import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
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

export const AnimatedImageContent = ({
  title,
  image,
  width,
  height,
  depthPx,
  metadata,
}) => {
  return (
    <Scene3DCanvasStyles className="scene" thicknessPx={depthPx}>
      <div
        className="cube"
        style={{
          width,
          height,
        }}
      >
        <ImgWrapperStyles className={`${title} cube__face cube__face--front`}>
          <div>
            <GatsbyImage
              image={image}
              alt={title}
              style={{ pointerEvents: "none" }}
            />
          </div>
          <PaintingMetadata metadata={metadata} />
        </ImgWrapperStyles>
      </div>
    </Scene3DCanvasStyles>
  )
}
