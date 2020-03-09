import React from "react"
import Layout from "../components/Layout"
import styled from "styled-components"
import MasonryGrid from "../components/Masonry/MasonryGrid"
import { useImagesQuery } from "../utils/queries"
// import { SaatchiButton } from "../components/ButtonsDrawer"
import { useMediaQuery } from "@material-ui/core"
import { BREAKPOINTS } from "../utils/constants"
import { useSpringTransitionLink } from "../pages"
import { animated } from "react-spring"

const CollectionStyles = styled.div`
  padding: 15px 24px;
  @media (min-width: 960px) {
    padding: 15px 48px;
  }
  .description {
    padding-right: 70px;
    margin-bottom: -40px;
    h1 {
      font-size: 24px;
      font-weight: normal;
      font-family: "Carme", sans-serif;
    }
  }
  .masonryWrapper {
    padding-bottom: 140px;
    margin-top: ${props => (props.isGridLayout ? 38 : 64)}px;
  }
`

// const DescriptionAndInfo = ({ isMobileOrLarger, title }) => (
//   <div className="description">
//     <div
//       style={{
//         display: "flex",
//         flexDirection: isMobileOrLarger ? "row" : "column",
//         alignItems: "baseline",
//       }}
//     >
//       <h1
//         style={{
//           flexGrow: 1,
//           ...(isMobileOrLarger
//             ? {}
//             : {
//                 marginBottom: "0.5em",
//               }),
//         }}
//       >
//         {title}
//       </h1>
//       {saatchiLink ? (
//         <SaatchiButton
//           saatchiLink={saatchiLink}
//           style={{
//             transform: "scale(0.8)",
//             transformOrigin: `top ${isMobileOrLarger ? "right" : "left"}`,
//             ...(isMobileOrLarger
//               ? {}
//               : {
//                   marginBottom: "0.5em",
//                 }),
//           }}
//         />
//       ) : null}
//     </div>
//     <div
//       className="collectionInfo"
//       dangerouslySetInnerHTML={{
//         __html: props.moreInfo,
//       }}
//     />
//   </div>
// )

export default function Template({ pageContext, transitionStatus }) {
  const { images /* , title, moreInfo, saatchiLink */ } = pageContext
  const { imagesDataArr, imagesDataArrMobile } = useImagesQuery()
  const imageTitlesArr = images.map(img => img.Image)
  const isMobileOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.MOBILE}px)`)

  const imagesDataArrForCollection = (isMobileOrLarger
    ? imagesDataArr
    : imagesDataArrMobile
  ).filter(image => imageTitlesArr.includes(image.title))
  // const isMobileOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.MOBILE}px)`)

  const springTransitionLink = useSpringTransitionLink(transitionStatus)
  const isGridLayout = useMediaQuery(`(min-width: ${BREAKPOINTS.MOBILELG}px)`)

  return (
    <Layout>
      <animated.div style={springTransitionLink}>
        <CollectionStyles isGridLayout={isGridLayout}>
          {/* <DescriptionAndInfo
            title={title}
            moreInfo={moreInfo}
            saatchiLink={saatchiLink}
            isMobileOrLarger={isMobileOrLarger}
          /> */}
          <div className="masonryWrapper">
            <MasonryGrid imagesDataArr={imagesDataArrForCollection} />
          </div>
        </CollectionStyles>
      </animated.div>
    </Layout>
  )
}
