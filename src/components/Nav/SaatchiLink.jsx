import React from "react"
import styled from "@emotion/styled"
import { useImagesQuery } from "../../utils/queries"
import { BREAKPOINTS } from "../../utils/constants"
import { kebabCase } from "lodash"

export default function SaatchiLink({ paintingNameFromUrl }) {
  const { imagesDataArr } = useImagesQuery()
  const paintingData = imagesDataArr.find((imageData) => {
    return kebabCase(imageData.title) === kebabCase(paintingNameFromUrl)
  })
  const saatchiLink = paintingData ? paintingData.saatchiLink : null
  return saatchiLink ? (
    <SaatchiLinkStyles>
      <a href={saatchiLink} target="_blank" rel="noopener noreferrer">
        <li>Available on Saatchi Art</li>
      </a>
    </SaatchiLinkStyles>
  ) : null
}
const SaatchiLinkStyles = styled.div`
  position: fixed;
  top: 54px;
  right: 20px;
  text-transform: uppercase;
  display: flex;
  margin-bottom: 0;
  margin-left: auto;
  margin-right: 12px;
  font-size: 12px;
  @media (min-width: ${BREAKPOINTS.MOBILE}px) {
    margin-right: 0;
  }
  width: fit-content;
  a {
    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    text-decoration: none;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.03);
    color: black;
    text-decoration: underline;
    padding: 0.5rem;
    margin: -0.5rem;
    margin-top: 0.25rem;
  }
  li {
    list-style-type: none;
    padding: 4px;
    margin-bottom: 0.3rem;

    &:after {
      background: hsl(0, 0%, 60%);
    }
  }
`
