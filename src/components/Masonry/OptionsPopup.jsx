import React, { useState, useEffect } from "react"
import { useTransition, animated } from "react-spring"
import styled from "styled-components/macro"

const OptionsPopupStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
`

const POPUP_HEIGHT = 50

export default ({ isSelected }) => {
  const buttonsToDisplay = [
    { text: "see in a room" },
    { text: "make an offer" },
  ]
  const [buttons, setButtons] = useState([])

  useEffect(() => {
    setButtons(buttonsToDisplay)
    return () => setButtons([])
  })

  const transitions = useTransition(buttons, item => item.text, {
    from: { transform: `translate3d(0,0px,0)` },
    enter: {
      transform: `translate3d(0,0px,0)`,
    },
    update: {
      transform: `translate3d(0,-${POPUP_HEIGHT}px,0)`,
    },
    leave: { transform: `translate3d(0,0px,0)` },
  })

  return (
    <OptionsPopupStyles>
      {transitions.map(({ item, props, key }) => (
        <animated.div className="animationWrapper" key={key} style={props}>
          {item.text}
        </animated.div>
      ))}
    </OptionsPopupStyles>
  )
}
