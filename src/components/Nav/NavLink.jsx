import React from "react"
import { camelCase } from "lodash"
import { globalHistory } from "@reach/router"
import TransitionLink from "gatsby-plugin-transition-link"
import styled from "styled-components/macro"
import { useSpring, animated } from "react-spring"
import { useState } from "react"

const CollapseButtonStyles = styled.li`
  position: relative;
  .subSectionsWrapper {
    position: absolute;
    padding: 0.75rem 0;
    top: 0;
    left: 0;
    right: 0;
    margin: 0;
    width: 100%;
    pointer-events: ${props => (props.isExpanded ? "auto" : "none")};
    li {
      margin: auto;
      padding: 0.5rem 0 0;
      a {
        padding: 0.5rem 1rem;
        margin: -0.5rem -1rem;
      }
    }
  }
`

const CollapseNavLink = ({ subSections, type, text, isCurrent }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const springCollapseExpand = useSpring({ opacity: isExpanded ? 1 : 0 })
  return (
    <CollapseButtonStyles
      isExpanded={isExpanded}
      onMouseOver={() => setIsExpanded(true)}
      onMouseOut={() => setIsExpanded(false)}
    >
      <TransitionLink>{text}</TransitionLink>
      <animated.ul
        className={`subSectionsWrapper`}
        style={springCollapseExpand}
      >
        {subSections.map(({ url, text }) => (
          <li className={`${camelCase(text)}${isCurrent ? " current" : ""}`}>
            <TransitionLink
              exit={{
                length: 0.5,
              }}
              entry={
                {
                  // delay: 0.5,
                }
              }
              className={`${camelCase(text)} ${type}${
                isCurrent ? " current" : ""
              }`}
              to={url}
              state={{
                isInternal: true,
              }}
            >
              {text}
            </TransitionLink>
          </li>
        ))}
      </animated.ul>
    </CollapseButtonStyles>
  )
}

export function NavLink({ type, url, text, idx, subSections }) {
  const path = globalHistory.location.pathname
  const isCurrent = `${url}` === path

  return !subSections ? (
    <TransitionLink
      // https://transitionlink.tylerbarnes.ca/docs/transitionlink/
      exit={{
        length: 0.5,
      }}
      entry={
        {
          // delay: 0.5,
        }
      }
      className={`${camelCase(text)} ${type}${isCurrent ? " current" : ""}`}
      to={url}
      state={{ isInternal: true }}
    >
      <li className={`${camelCase(text)}${isCurrent ? " current" : ""}`}>
        {text}
      </li>
    </TransitionLink>
  ) : (
    <CollapseNavLink
      type={type}
      text={text}
      subSections={subSections}
      isCurrent={isCurrent}
    />
  )
}
