import React from "react"
import { useTransition, animated } from "react-spring"
import styled from "styled-components/macro"
import { SeeInARoomButton } from "./OptionsButtons"

const OptionsPopupStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
`

const POPUP_HEIGHT = 50

export default ({ isSelected, title }) => {
  const buttonsToDisplay = [
    { iconButton: <SeeInARoomButton />, text: "see in a room" },
    { iconButton: <SeeInARoomButton />, text: "make an offer" },
  ]
  const transitions = useTransition(
    buttonsToDisplay,
    item => item.text + title,
    {
      from: { transform: `translate3d(0,0px,0)` },
      enter: {
        transform: `translate3d(0,0px,0)`,
      },
      update: {
        transform: `translate3d(0,-${isSelected ? POPUP_HEIGHT : 0}px,0)`,
      },
      leave: { transform: `translate3d(0,0px,0)` },
      trail: 75,
    }
  )

  return (
    <OptionsPopupStyles>
      {transitions.map(({ item, props, key }) => (
        <animated.div className="animationWrapper" key={key} style={props}>
          {item.iconButton}
        </animated.div>
      ))}
    </OptionsPopupStyles>
  )
}
