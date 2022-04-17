import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import SplashPageCover, {
  SplashPageWrapperStyles,
} from "../components/SplashPageCover"
import { animated, useSpring } from "react-spring"
import { Portal } from "@material-ui/core"
import { globalHistory } from "@reach/router"
import { useMount } from "../utils/customHooks"
import loadable from "@loadable/component"

const LoadableAnimatedSecondPage = loadable(() =>
  import("../components/AnimatedSecondPage")
)

const Pages = ({ transitionStatus }) => {
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
  const [ready, setReady] = useState(false)
  useMount(() => {
    setTimeout(() => {
      setReady(true)
    })
  }, 1)

  return (
    <Layout isSplashPageClicked={isSplashPageClicked}>
      <SEO title="Home" />
      {ready && (
        <LoadableAnimatedSecondPage transitionStatus={transitionStatus} />
      )}
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
export default Pages

const toggleOverflowHidden = (isHidden) => {
  const html = document.querySelector("html")
  if (isHidden) {
    html.classList.add("overflowHidden")
  } else {
    html.classList.remove("overflowHidden")
  }
}
