import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import SplashPageCover, {
  splashPageStyles,
} from "../components/SplashPageCover"
import { animated, useSpring } from "react-spring"
import { Portal } from "@material-ui/core"
import SecondPage from "../components/SecondPage"
import { globalHistory } from "@reach/router"

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

export default () => {
  // console.log("⚡🚨: shouldReload", location.shouldReload)
  const { location } = globalHistory
  const isComingFromInsideTheSite = Boolean(
    location && location.state && location.state.isInternal
  )
  const [isSplashPageClicked, setIsSplashPageClicked] = useState(
    isComingFromInsideTheSite
  )

  useEffect(() => {
    if (location && location.state && location.state.shouldReload) {
      location.state.shouldReload = false
      setIsSplashPageClicked(false)
    }
  }, [location.state])

  useEffect(() => {
    if (!isComingFromInsideTheSite) {
      toggleOverflowHidden(true)
    }
    return () => {
      toggleOverflowHidden(false)
    }
  }, [isComingFromInsideTheSite])

  const springSplashPage = useSpring({
    opacity: isSplashPageClicked ? 0 : 1,
    transform: `translateY(${isSplashPageClicked ? -64 : 0}px)`,
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

  return (
    <Layout location={location}>
      <SEO title="Home" />
      <Portal>
        <animated.div
          onClick={handleClick}
          className="animatedWrapper splashPage"
          style={{
            ...splashPageStyles,
            ...springSplashPage,
            ...(isSplashPageClicked
              ? {
                  pointerEvents: "none",
                }
              : {}),
          }}
        >
          <SplashPageCover isClicked={isSplashPageClicked} />
        </animated.div>
      </Portal>
      <SecondPage />
    </Layout>
  )
}
