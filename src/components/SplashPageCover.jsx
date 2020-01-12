import React from "react"
import styled from "styled-components"

export const HOVER_UNDERLINE_CSS = `
    width: fit-content;
    position: relative;
    cursor: pointer;
    &:after {
      transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
      position: absolute;
      content: "";
      height: 1px;
      width: 0%;
      left: 50%;
      bottom: 0;
      background: cornflowerblue;
    }
    &:hover {
      &:after {
        left: 0%;
        width: 100%;
      }
    }
`

export const splashPageStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: 9999,
}
const SplashPageStyles = styled.div`
  height: 100%;
  background: hsl(0, 0%, 80%);
  overflow: hidden;
  display: grid;
  place-items: center center;

  .imageWrapper {
  }
  .titleWrapper {
    margin-top: -3em;
    display: grid;
    place-items: center center;
  }
  h1 {
    letter-spacing: 0.8em;
  }
  button {
    background: none;
    border: none;
    padding: 0;
    ${HOVER_UNDERLINE_CSS}
    transition: color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    &:hover {
      color: cornflowerblue;
    }
  }
`

const SplashPageCover = ({ handleClick }) => {
  return (
    <SplashPageStyles>
      <div className="imageWrapper"></div>
      <div className="titleWrapper">
        <h1>hyeran lee</h1>
        <div className="btnWrapper">
          <button onClick={handleClick}>info</button>
        </div>
      </div>
    </SplashPageStyles>
  )
}

export default SplashPageCover
