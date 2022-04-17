import React, { useEffect, useMemo } from "react"
import { camelCase, kebabCase } from "lodash"
import TransitionLink from "gatsby-plugin-transition-link"
import styled from "styled-components/macro"
import { useSpring, animated } from "react-spring"
import { useState } from "react"
import { globalHistory } from "@reach/router"
import { UNDERLINE_ACTIVE_CSS } from "../SplashPageCover"
import { ClickAwayListener } from "@material-ui/core"

const EXIT_DELAY = 0.5
const ListItemLink = ({ type, isCurrent, title, onClick }) => (
  <li className={`${camelCase(title)}${isCurrent ? " active" : ""}`}>
    <TransitionLink
      onClick={() => {
        setTimeout(onClick, EXIT_DELAY * 1000)
      }}
      exit={{
        length: EXIT_DELAY,
      }}
      entry={{
        delay: 0.3,
      }}
      className={`${camelCase(title)} ${type}${isCurrent ? " active" : ""}`}
      to={`/collections/${kebabCase(title)}`}
      state={{
        isInternal: true,
      }}
    >
      {title}
    </TransitionLink>
  </li>
)

const CollapseNavLink = ({ type, text, isCurrent }) => {
  // console.log(
  //   "🌟🚨 ~ file: CollapseNavLink.jsx ~ line 80 ~ CollapseNavLink ~ collectionsDataArr",
  //   collectionsDataArr
  // )
  const [isClicked, setIsClicked] = useState(false)
  const [isMouseover, setIsMouseover] = useState(false)

  const springCollapseExpand = useSpring({
    opacity: isMouseover || isClicked ? 1 : 0,
  })

  const handleMouseEnter = () => {
    setIsMouseover(true)
  }
  const handleMouseLeave = () => {
    setIsMouseover(false)
  }
  const handleClick = () => {
    setIsMouseover(true)
    setIsClicked(true)
  }
  const handleClickAway = () => {
    setIsMouseover(false)
    setIsClicked(false)
  }

  const path = globalHistory.location.pathname
  const collectionsSorted = useMemo(
    () => COLLECTIONS_DATA_ARR.sort((a, b) => a.order - b.order),
    [COLLECTIONS_DATA_ARR]
  )

  const isExpanded = isMouseover || isClicked
  const ccText = camelCase(text)
  useEffect(() => {
    if (isCurrent) {
      return
    }
    if (isClicked) {
      document.querySelector(`li.${ccText}`)?.classList.add("active")
    } else {
      document.querySelector(`li.${ccText}`)?.classList.remove("active")
    }
  }, [isClicked, isCurrent])
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <CollapseLinkWrapperStyles
        isExpanded={isExpanded}
        onClick={handleClick}
        onPointerDown={handleClick}
        onTouchStart={handleMouseEnter}
        onMouseEnter={handleMouseEnter}
        onFocus={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        // onBlur={handleMouseLeave}
        className="sectionLink navLink"
      >
        <div>{text}</div>
        <div className={`subSectionsWrapper`}>
          <animated.ul style={springCollapseExpand} onBlur={handleMouseLeave}>
            {collectionsSorted.map(({ url, title }) => {
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
    </ClickAwayListener>
  )
}
export default CollapseNavLink

const CollapseLinkWrapperStyles = styled.div`
  &&& {
    padding: 1rem;
    padding-bottom: 2rem;
    margin: -1rem;
    margin-bottom: -2rem;
  }
  position: relative;
  cursor: pointer;
  .subSectionsWrapper {
    position: absolute;
    z-index: 9999999;
    padding: 0 0 0.75em 0;
    display: flex;
    justify-content: center;
    width: 0;
    left: 50%;
    right: 50%;
    top: 40px;
    @media (min-width: 1200px) {
      top: 2.5em;
    }
    ul {
      margin: 0;
      width: fit-content;
      background: white;
      box-shadow: 0px 2px 6px #00000036;
      padding: 0 0.5em 0.5em;
    }
    pointer-events: ${(props) => (props.isExpanded ? "auto" : "none")};
    li {
      margin: auto;
      padding: 0.5em 0 0;
      a {
        padding: 0.5em 1em;
        margin: -0.5em -1em;
        white-space: nowrap;
      }
    }
  }
  li.active {
    pointer-events: none;
    ${UNDERLINE_ACTIVE_CSS}
    a {
      color: #999999;
    }
  }
`
const COLLECTIONS_DATA_ARR = [
  {
    title: "WORKS | 48 W +",
    visible: true,
    order: 0,
    moreInfo: null,
    isSold: null,
    width: null,
    height: null,
    date: "2020-02-12T14:26:34.097Z",
    Image: null,
    depth: null,
    saatchiLink: null,
    images: [
      {
        Image: "47th Correlation",
      },
      {
        Image: "46th Correlation",
      },
      {
        Image: "21st Correlation",
      },
      {
        Image: "Coexistence 39",
      },
    ],
    id: "1ac39b21-c9e1-54da-b95b-55c173d58c2b",
    fluid: null,
  },
  {
    title: "WORKS | 36 H x 36 W",
    visible: true,
    order: 1,
    moreInfo: null,
    isSold: null,
    width: null,
    height: null,
    date: "2020-02-11T21:24:04.502Z",
    Image: null,
    depth: null,
    saatchiLink: null,
    images: [
      {
        Image: "58th Correlation",
      },
      {
        Image: "Under the Sun",
      },
      {
        Image: "Coexistence 31",
      },
      {
        Image: "Coexistence 26",
      },
      {
        Image: "Coexistence 49",
      },
      {
        Image: "Coexistence 38",
      },
    ],
    id: "b2c17e21-8c3c-516f-8fd7-a27f915f4de1",
    fluid: null,
  },
  {
    title: "WORKS | 40 H x 30 W",
    visible: true,
    order: 2,
    moreInfo: null,
    isSold: null,
    width: null,
    height: null,
    date: "2020-01-28T03:25:04.470Z",
    Image: null,
    depth: null,
    saatchiLink: null,
    images: [
      {
        Image: "Departure",
      },
      {
        Image: "Coexistence 41",
      },
      {
        Image: "Coexistence 48",
      },
      {
        Image: "20th Correlation",
      },
      {
        Image: "Coexistence 22",
      },
      {
        Image: "Coexistence 20",
      },
      {
        Image: "Coexistence 45",
      },
      {
        Image: "Season's Creations 3",
      },
    ],
    id: "c38878d2-0ecd-5663-ad7b-b912c26e3bd4",
    fluid: null,
  },
  {
    title: "WORKS | 30 H x 40 W",
    visible: true,
    order: 3,
    moreInfo: null,
    isSold: null,
    width: null,
    height: null,
    date: "2020-01-31T05:00:00.000Z",
    Image: null,
    depth: null,
    saatchiLink: "",
    images: [
      {
        Image: "36th Correlation",
      },
      {
        Image: "35th Correlation",
      },
      {
        Image: "Life is",
      },
      {
        Image: "Fourth Correlation",
      },
      {
        Image: "Coexistence 46",
      },
      {
        Image: "53rd Correlation",
      },
      {
        Image: "26th Correlation",
      },
      {
        Image: "A Dream Worth Waiting For",
      },
    ],
    id: "c04c9537-5a85-5433-bff6-057e4ff589ca",
    fluid: null,
  },
  {
    title: "WORKS | 30 H X 30 W",
    visible: true,
    order: 4,
    moreInfo: null,
    isSold: null,
    width: null,
    height: null,
    date: "2020-01-28T03:06:18.151Z",
    Image: null,
    depth: null,
    saatchiLink: "",
    images: [
      {
        Image: "Tenth Correlation",
      },
      {
        Image: "Seventeenth Correlation",
      },
      {
        Image: "Seventh Correlation",
      },
      {
        Image: "Eleventh Correlation",
      },
      {
        Image: "38th Correlation",
      },
      {
        Image: "Coexistence 9",
      },
      {
        Image: "Coexistence 12",
      },
      {
        Image: "Coexistence 14",
      },
      {
        Image: "Coexistence 19-I",
      },
      {
        Image: "Coexistence 19-II",
      },
      {
        Image: "28th Correlation",
      },
      {
        Image: "27th Correlation",
      },
      {
        Image: "Coexistence 36",
      },
    ],
    id: "e5e28467-c543-55a6-be4b-26ef161534f0",
    fluid: null,
  },
  {
    title: "WORKS | 30 H x 24 W",
    visible: true,
    order: 5,
    moreInfo: null,
    isSold: null,
    width: null,
    height: null,
    date: "2020-01-28T03:07:35.004Z",
    Image: null,
    depth: null,
    saatchiLink: null,
    images: [
      {
        Image: "Kiss",
      },
      {
        Image: "One Step at a Time",
      },
      {
        Image: "Coexistence 17-I",
      },
      {
        Image: "Coexistence 17-II",
      },
      {
        Image: "Coexistence 18-I",
      },
      {
        Image: "Coexistence 18-II",
      },
      {
        Image: "Season's Creations 2",
      },
      {
        Image: "Season's Creations 1",
      },
    ],
    id: "f0966c79-8954-561c-a756-3e1b6a1f7d05",
    fluid: null,
  },
  {
    title: "WORKS | 24 H x 24 W",
    visible: true,
    order: 6,
    moreInfo: null,
    isSold: null,
    width: null,
    height: null,
    date: "2022-01-01T03:45:22.890Z",
    Image: null,
    depth: null,
    saatchiLink: "",
    images: [
      {
        Image: "Coexistence 11-I",
      },
      {
        Image: "Coexistence 11-II",
      },
      {
        Image: "45th Correlation",
      },
      {
        Image: "43rd Correlation",
      },
      {
        Image: "Coexistence 5",
      },
      {
        Image: "Coexistence 43",
      },
      {
        Image: "60th Correlation",
      },
      {
        Image: "Being Here 2",
      },
      {
        Image: "Anticipation 5",
      },
      {
        Image: "Happy Day",
      },
    ],
    id: "438d839f-dee1-52b7-9580-51d5b6f834cd",
    fluid: null,
  },
  {
    title: "WORKS | 24 H x 18 W",
    visible: true,
    order: 7,
    moreInfo: null,
    isSold: null,
    width: null,
    height: null,
    date: "2022-01-01T23:32:40.696Z",
    Image: null,
    depth: null,
    saatchiLink: "",
    images: [
      {
        Image: "Coexistence 35",
      },
      {
        Image: "Be Yourself",
      },
      {
        Image: "Let it go",
      },
      {
        Image: "A Summer Night",
      },
      {
        Image: "61st Correlation",
      },
      {
        Image: "Let it go",
      },
    ],
    id: "6ee0bae6-1d00-5681-970b-5310cd595a26",
    fluid: null,
  },
]
