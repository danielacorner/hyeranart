import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import { useImagesQuery } from "../utils/queries"
import Img from "gatsby-image"

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

  /* ensure no edges visible when transitioning up */
  box-sizing: content-box;
  padding: 50vw 0;
  margin-top: -50vw;

  background: white;
  overflow: hidden;
  display: grid;
  place-items: center center;
  align-content: center;

  .imageWrapper {
    width: 80vw;
    max-width: 1024px;
    max-width: 90vh;
    height: auto;
  }
  .titleWrapper {
    display: grid;
    place-items: center center;
  }
  h1 {
    font-size: 5.5vw;
    font-family: "Avenir";

    letter-spacing: 0.8em;
    text-indent: 0.8em;

    margin: 0.5em 0;
    text-align: center;
  }
  button {
    font-size: 0.8em;
    @media (min-width: 1280px) {
      font-size: 1.6vw;
    }
    background: none;
    border: none;
    padding: 0;
    ${HOVER_UNDERLINE_CSS}
    transition: color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    &:hover {
      color: cornflowerblue;
    }
  }
  @media (min-width: 1280px) {
    h1 {
      font-size: 3.6em;
    }
    button {
      font-size: 1.2em;
    }
  }
`

const SplashPageCover = ({ handleClick }) => {
  const data = useStaticQuery(graphql`
    query IndexPageTemplate {
      markdownRemark(frontmatter: { templateKey: { eq: "landing-page" } }) {
        id
        frontmatter {
          title
          date
          moreInfo
          saatchiLink
          Image
          price
          body
          templateKey
        }
      }
    }
  `)
  const { frontmatter } = data.markdownRemark
  const { imagesDataArr } = useImagesQuery()
  const splashPageImage = imagesDataArr.find(
    image => image.title === frontmatter.title
  ) || { fluid: null }

  return (
    <SplashPageStyles onClick={handleClick}>
      <div className="imageWrapper">
        <Img fluid={splashPageImage.fluid} />
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
