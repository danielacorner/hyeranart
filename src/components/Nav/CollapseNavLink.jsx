import React from "react"
import { camelCase, kebabCase } from "lodash"
import TransitionLink from "gatsby-plugin-transition-link"
import styled from "styled-components/macro"
import { useSpring, animated } from "react-spring"
import { useState } from "react"
import { useImagesQuery } from "../../utils/queries"

const CollapseButtonStyles = styled.li`
  position: relative;
  .subSectionsWrapper {
    position: absolute;
    padding: 0 0 0.75rem 0;
    margin-top: 1.25rem;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    ul {
      margin: 0;
      width: 200%;
      margin-left: -50%;
      background: white;
      box-shadow: 0px 2px 6px #00000036;
      padding: 0.25rem 0.5rem 0.5rem;
    }
    pointer-events: ${props => (props.isExpanded ? "auto" : "none")};
    li {
      margin: auto;
      padding: 0.5rem 0 0;
      a {
        padding: 0.5rem 1rem;
        margin: -0.5rem -1rem;
        white-space: initial;
      }
    }
  }
`

const CollapseNavLink = ({ type, text, isCurrent }) => {
  const { collectionsDataArr } = useImagesQuery()
  const [isExpanded, setIsExpanded] = useState(false)

  const springCollapseExpand = useSpring({ opacity: isExpanded ? 1 : 0 })

  return (
    <CollapseButtonStyles
      isExpanded={isExpanded}
      onMouseOver={() => setIsExpanded(true)}
      onMouseOut={() => setIsExpanded(false)}
    >
      <TransitionLink>{text}</TransitionLink>
      <div className={`subSectionsWrapper`}>
        <animated.ul style={springCollapseExpand}>
          {collectionsDataArr.map(({ url, title }) => (
            <li className={`${camelCase(title)}${isCurrent ? " current" : ""}`}>
              <TransitionLink
                exit={{
                  length: 0.5,
                }}
                entry={
                  {
                    // delay: 0.5,
                  }
                }
                className={`${camelCase(title)} ${type}${
                  isCurrent ? " current" : ""
                }`}
                to={`/collections/${kebabCase(title)}`}
                state={{
                  isInternal: true,
                }}
              >
                {title}
              </TransitionLink>
            </li>
          ))}
        </animated.ul>
      </div>
    </CollapseButtonStyles>
  )
}
export default CollapseNavLink
