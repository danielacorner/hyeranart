import React from "react"
import { useTransition, animated } from "react-spring"
import styled from "styled-components/macro"
import { SeeInARoomButton, ZoomButton, CommentsButton } from "./OptionsButtons"
import { SCALE_ON_HOVER } from "../AnimatedImage"

const BUTTON_WIDTH = 40
const BUTTON_MARGIN = 6

const getInitialTransform = (idx, length) => {
  const x = getX(idx, length)
  return { transform: `translate3d(${-4 * x}px,0px,0) scale(0.2)`, opacity: 0 }
}
const getX = (idx, length) => {
  const xPct = idx / (length - 1)
  const x = (xPct - 0.5) * (2 * BUTTON_MARGIN)
  return x
}

const OptionsPopupStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  .animationWrapper {
    width: ${BUTTON_WIDTH}px;
    margin: 0 ${BUTTON_MARGIN}px;
  }
`

export default ({ isSelected, title, gridGap, height }) => {
  const popupHeight = gridGap * 0.7 + height * ((SCALE_ON_HOVER - 1) / 2)
  console.log("⚡🚨: gridGap", gridGap)
  const buttonsToDisplay = [
    { idx: 0, iconButton: <SeeInARoomButton />, text: "See in a room" },
    { idx: 1, iconButton: <ZoomButton />, text: "View full-screen" },
    { idx: 2, iconButton: <CommentsButton />, text: "Make an offer" },
  ]
  const transitions = useTransition(
    buttonsToDisplay,
    item => item.text + title,
    {
      from: ({ idx }) => getInitialTransform(idx, buttonsToDisplay.length),
      enter: ({ idx }) => getInitialTransform(idx, buttonsToDisplay.length),
      update: ({ idx }) => {
        const x = getX(idx, buttonsToDisplay.length)
        const y = isSelected ? -popupHeight : 0
        const scale = isSelected ? 1 : 0.2
        return {
          transform: `translate3d(${
            isSelected ? x : -4 * x
          }px,-${y}px,0) scale(${scale})`,
          opacity: 1,
        }
      },
      leave: ({ idx }) => getInitialTransform(idx, buttonsToDisplay.length),
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
