import styled from "styled-components/macro"
const CAROUSEL_MAX_WIDTH = 960
export const NAV_HEIGHT = 64
const CANVAS_BACKGROUND_COLOR = "hsl(0,0%,90%)"
const CANVAS_BORDER_COLOR = "hsl(0,0%,80%)"

export const Scene3DCanvasStyles = styled.div`
  perspective: 3000;
  .scene,
  &.scene {
    width: fit-content;
    height: fit-content;
    transform-style: preserve-3d;
    position: relative;
  }
  .cube {
    width: 100%;
    height: fit-content;
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
    transform: rotateY(0deg) translateZ(${props => props.thicknessPx / 2}px);
  }
  .cube__face--right {
    width: ${props => props.thicknessPx}px;
  }
  .cube__face--back {
    transform: rotateY(180deg) translateZ(${props => props.thicknessPx / 2}px);
  }
  .cube__face--left {
    width: ${props => props.thicknessPx}px;
    transform: rotateY(-90deg) translateZ(${props => props.thicknessPx / 2}px);
  }
  .cube__face--top {
    height: ${props => props.thicknessPx}px;
    transform: rotateX(90deg) translateZ(${props => props.thicknessPx / 2}px);
  }
  .cube__face--bottom {
    height: ${props => props.thicknessPx}px;
  }
`

export const CarouselStyles = styled.div`
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
