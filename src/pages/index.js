import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import SplashPageCover, {
  SplashPageWrapperStyles,
} from "../components/SplashPageCover"
import { animated, useSpring } from "react-spring"
import { Portal } from "@material-ui/core"
import SecondPage from "../components/SecondPage"
import { globalHistory } from "@reach/router"
import { useMount } from "../utils/customHooks"

if (process.env.NODE_ENV !== "production") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render")
  whyDidYouRender(React)
}

const toggleOverflowHidden = isHidden => {
  const html = document.querySelector("html")
  if (isHidden) {
    html.classList.add("overflowHidden")
  } else {
    html.classList.remove("overflowHidden")
  }
}

export const useSpringTransitionLink = transitionStatus =>
  useSpring(
    ["entering", "entered"].includes(transitionStatus)
      ? {
          opacity: 1,
        }
      : ["exiting", "exited"].includes(transitionStatus)
      ? {
          opacity: 0,
        }
      : { opacity: 1 }
  )

export default ({ transitionStatus, entry, exit }) => {
  const { location } = globalHistory

  const isComingFromInsideTheSite = Boolean(
    location && location.state && location.state.isInternal
  )
  const [isSplashPageClicked, setIsSplashPageClicked] = useState(
    isComingFromInsideTheSite
  )

  // bugfix: when reload on same page, nav disappears
  useMount(() => {
    // first mount (e.g. page reload) can't have been from inside
    if (location && location.state) {
      location.state.isInternal = false
    }
  })

  useEffect(() => {
    if (location && location.state && location.state.shouldReload) {
      location.state.shouldReload = false
      setIsSplashPageClicked(false)
    }
  }, [location])

  useEffect(() => {
    if (!isComingFromInsideTheSite) {
      toggleOverflowHidden(true)
    }
    return () => {
      toggleOverflowHidden(false)
    }
  }, [isComingFromInsideTheSite])

  const springSplashPage = useSpring({
    opacity: !isSplashPageClicked ? 1 : 0,
    transform: `translateY(${!isSplashPageClicked ? 0 : -64}px)`,
    onRest: () => {
      // set pathname to /gallery so we don't have to go through the splash page again
      if (isSplashPageClicked) {
        toggleOverflowHidden(false)
      }
    },
  })

  const handleClick = () => {
    setIsSplashPageClicked(true)
  }

  const springTransitionLink = useSpringTransitionLink(transitionStatus)

  return (
    <Layout isSplashPageClicked={isSplashPageClicked}>
      <SEO title="Home" />
      <animated.div style={springTransitionLink}>
        <SecondPage />
      </animated.div>
      <Portal>
        <SplashPageWrapperStyles
          onClick={handleClick}
          isClicked={isSplashPageClicked}
        >
          <animated.div
            className="animatedWrapper splashPage"
            style={springSplashPage}
          >
            <SplashPageCover />
          </animated.div>
        </SplashPageWrapperStyles>
      </Portal>
    </Layout>
  )
}
