import styled from "styled-components"
import { UNDERLINE_ACTIVE_CSS, HOVER_UNDERLINE_CSS } from "../SplashPageCover"
import { BREAKPOINTS } from "../../utils/constants"

export const LinksUlStyles = styled.ul`
  display: flex;
  margin-bottom: 0;
  margin-left: auto;
  margin-right: 12px;
  @media (min-width: ${BREAKPOINTS.MOBILE}px) {
    margin-right: 16px;
  }
  width: fit-content;
  a {
    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    text-decoration: none;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.03);
    color: black;
    &.saatchiart {
      text-decoration: underline;
    }
    &.theOtherArtFairBrooklyn {
      line-height: 1.4em;
    }
  }
  li {
    list-style-type: none;
    padding: 4px;
    margin-bottom: 0.3rem;
    ${HOVER_UNDERLINE_CSS}
    &.active {
      ${UNDERLINE_ACTIVE_CSS}
      color: #999999;
    }
    &:after {
      background: hsl(0, 0%, 60%);
    }
  }
  .sectionLink {
    padding: 0.5rem;
    margin: -0.5rem;
    &:active,
    &.active {
      color: #999999;
    }
    &.active {
      li {
        ${UNDERLINE_ACTIVE_CSS}
      }
      pointer-events: none;
    }
  }
`
