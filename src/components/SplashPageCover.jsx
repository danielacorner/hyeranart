import React from "react"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"

const SplashPageCover = () => {
  return (
    <SplashPageStyles>
      <div className="imageWrapper">
        <StaticImage
          breakpoints={[360, 480, 750, 1132]}
          sizes={`(max-width: 360px) 80vw,
          (max-width: 480px) 80vw,
          (max-width: 750px) 80vw,
          (max-width: 1132px) 908px
          `}
          loading="eager"
          src={"../../static/images/uploads/life-is.jpg"}
          alt={""}
          layout="constrained"
          width={908}
          placeholder="tracedSVG"
          // sizes="(min-width: 908px) 908px, 100vw"
        />
      </div>
      <div className="titleWrapper">
        <h1>hyeran lee</h1>
        <div className="btnWrapper">
          <button>info</button>
        </div>
      </div>
    </SplashPageStyles>
  )
}

export default SplashPageCover

export const CUBIC_BEZIER = "cubic-bezier(0.165, 0.84, 0.44, 1)"

export const UNDERLINE_ACTIVE_CSS = `
&:after {
  left: 0%;
  width: 100%;
}
`
export const HOVER_UNDERLINE_CSS = `
    width: fit-content;
    position: relative;
    cursor: pointer;
    &:after {
      transition: all 0.3s ${CUBIC_BEZIER};
      position: absolute;
      content: "";
      height: 1px;
      width: 0%;
      left: 50%;
      bottom: 0;
      background: cornflowerblue;
    }
    &:hover {
${UNDERLINE_ACTIVE_CSS}
    }
`

export const SplashPageWrapperStyles = styled.div`
  cursor: pointer;
  opacity: 1;
  transform: translateY(0px);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  pointer-events: ${(props) => (props.isClicked ? "none" : "auto")};
`

const SplashPageStyles = styled.div`
  min-height: 200vh;
  max-width: 100vw;
  padding-top: 9vw;
  @media (min-width: 1028px) {
    padding-top: 5em;
  }
  /* ensure no edges visible when transitioning up */
  box-sizing: content-box;
  background: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  .imageWrapper {
    width: 80vw;
    max-width: min(100vw, 1024px);
    max-width: 90vh;
    height: auto;
  }
  .titleWrapper {
    display: grid;
    place-items: center center;
  }
  h1 {
    font-family: "AvenirUltraLight";
    font-size: 5.7vw;
    font-family: "AvenirLight";
    letter-spacing: 0.8em; /* TODO: switch all ems to rems */
    text-indent: 0.8em;
    margin: 0.5em 0;
    text-align: center;
  }
  button {
    font-size: 1.9vw;
    background: none;
    border: none;
    padding: 0;
    ${HOVER_UNDERLINE_CSS}
    transition: color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    &:hover {
      color: cornflowerblue;
    }
  }
  @media (min-width: 1140px) {
    h1 {
      font-size: 3.6rem;
    }
    button {
      font-size: 1.2rem;
    }
  }
`
