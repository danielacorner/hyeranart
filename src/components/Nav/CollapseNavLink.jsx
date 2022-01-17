import React from "react"
import { camelCase, kebabCase } from "lodash"
import TransitionLink from "gatsby-plugin-transition-link"
import styled from "styled-components/macro"
import { useSpring, animated } from "react-spring"
import { useState } from "react"
import { useImagesQuery } from "../../utils/queries"
import { globalHistory } from "@reach/router"
import { UNDERLINE_ACTIVE_CSS } from "../SplashPageCover"

const CollapseLinkWrapperStyles = styled.div`
  position: relative;
  cursor: default;
  .subSectionsWrapper {
    position: absolute;
    padding: 0 0 0.75rem 0;
    top: 2.5em;
    @media (min-width: 1090px) {
      top: 3em;
    }
    left: 0;
    right: 0;
    z-index: 9999;
    ul {
      margin: 0;
      width: 200%;
      margin-left: -50%;
      background: white;
      box-shadow: 0px 2px 6px #00000036;
      padding: 0 0.5rem 0.5rem;
    }
    pointer-events: ${(props) => (props.isExpanded ? "auto" : "none")};
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
  li.current {
    pointer-events: none;
    ${UNDERLINE_ACTIVE_CSS}
  }
`

const ListItemLink = ({ type, isCurrent, title, onClick }) => (
  <li className={`${camelCase(title)}${isCurrent ? " current" : ""}`}>
    <TransitionLink
      onClick={onClick}
      exit={{
        length: 0.5,
      }}
      entry={{
        delay: 0.3,
      }}
      className={`${camelCase(title)} ${type}${isCurrent ? " current" : ""}`}
      to={`/collections/${kebabCase(title)}`}
      state={{
        isInternal: true,
      }}
    >
      {title}
    </TransitionLink>
  </li>
)

const CollapseNavLink = ({ type, text }) => {
  const { collectionsDataArr } = useImagesQuery()
  const [isExpanded, setIsExpanded] = useState(false)

  const springCollapseExpand = useSpring({ opacity: isExpanded ? 1 : 0 })

  const handleMouseEnter = () => {
    setIsExpanded(true)
  }
  const handleMouseLeave = () => {
    setIsExpanded(false)
  }
  const path = globalHistory.location.pathname

  return (
    <CollapseLinkWrapperStyles
      isExpanded={isExpanded}
      onClick={handleMouseEnter}
      onTouchStart={handleMouseEnter}
      onMouseEnter={handleMouseEnter}
      onFocus={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onBlur={handleMouseLeave}
      className="sectionLink"
    >
      <li>{text}</li>
      <div className={`subSectionsWrapper`}>
        <animated.ul style={springCollapseExpand}>
          {collectionsDataArr
            .sort((a, b) => a.order - b.order)
            .map(({ url, title }) => {
              const isCurrent = `/collections/${kebabCase(title)}` === path
              return (
                <ListItemLink
                  onClick={handleMouseLeave}
                  key={title}
                  isCurrent={isCurrent}
                  title={title}
                  type={type}
                />
              )
            })}
        </animated.ul>
      </div>
    </CollapseLinkWrapperStyles>
  )
}
export default CollapseNavLink
