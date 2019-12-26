import React, { useState } from "react"
import styled from "styled-components/macro"
import { BREAKPOINTS } from "../../utils/constants"
import { SECTION_LINKS, COLLECTION_LINKS, LINK_CSS } from "./SideNav"
import MenuIcon from "@material-ui/icons/Menu"
import CloseIcon from "@material-ui/icons/Close"
import { IconButton } from "@material-ui/core"
import { useSpring, animated } from "react-spring"

const TopNavStyles = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  z-index: 9999;
  .popupAnimated {
    transform-origin: top right;
    display: flex;
    justify-content: flex-end;
    position: absolute;
    left: 10px;
    top: 5px;
    right: 10px;
    pointer-events: ${props => (props.isModalOpen ? "auto" : "none")};
    .popupContainer {
      position: relative;
      margin-top: 8px;
      flex-grow: 1;
      @media (min-width: ${BREAKPOINTS.TABLET}px) {
        flex-grow: 0;
        width: 360px;
      }
      box-shadow: 0 50px 100px -20px rgba(50, 50, 93, 0.25),
        0 30px 60px -30px rgba(0, 0, 0, 0.3),
        0 -18px 60px -10px rgba(0, 0, 0, 0.025);
      border-radius: 4px;
      font-size: 17px;
      line-height: 40px;
      height: fit-content;
      width: fit-content;
      font-family: system-ui;
      background: white;
      padding: 17px 26px;
    }
  }
  .popupOpenButton {
    margin: 8px 10px 0 0;
    .MuiSvgIcon-root {
      transform: scaleY(1.2);
    }
  }
  .popupCloseButton {
    position: absolute;
    top: 0;
    right: 0;
  }
  a {
    ${LINK_CSS}
  }
  li {
    list-style-type: none;
    margin: 0;
  }
  ul {
    margin: 0;
  }
  .linksContainer {
    display: grid;
    grid-template-rows: auto auto;
    height: fit-content;
    .sectionLinks {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .collectionLinks {
      margin-top: 17px;
    }
  }
`

export default () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggleModal = () => setIsModalOpen(!isModalOpen)
  const springScaleUp = useSpring({
    opacity: isModalOpen ? 1 : 0,
    transform: `scale(${isModalOpen ? 1 : 0.97})`,
    config: { mass: 0.4, tension: 270 },
  })
  return (
    <TopNavStyles isModalOpen={isModalOpen}>
      <IconButton className="popupOpenButton" onClick={toggleModal}>
        <MenuIcon />
      </IconButton>
      <animated.div style={springScaleUp} className="popupAnimated">
        <div className="popupContainer">
          <IconButton className="popupCloseButton" onClick={toggleModal}>
            <CloseIcon />
          </IconButton>
          <div className="linksContainer">
            <ul className="sectionLinks">
              {SECTION_LINKS.map(({ url, text }) => (
                // TODO: replace with Link once in-site
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <li>{text}</li>
                </a>
              ))}
            </ul>
            <ul className="collectionLinks">
              {COLLECTION_LINKS.map(({ url, text }) => (
                // TODO: replace with Link once in-site
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <li>{text}</li>
                </a>
              ))}
            </ul>
          </div>
        </div>
      </animated.div>
    </TopNavStyles>
  )
}
