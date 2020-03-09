import React from "react"
import Img from "gatsby-image"
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
  fluid,
  width,
  height,
  depthPx,
  metadata,
}) => (
  <div
    style={{
      position: "relative",
    }}
  >
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
            <Img fluid={fluid} />
          </div>
          <PaintingMetadata metadata={metadata} />
        </ImgWrapperStyles>
      </div>
    </Scene3DCanvasStyles>
  </div>
)
