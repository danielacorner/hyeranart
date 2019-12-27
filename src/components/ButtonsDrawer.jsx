import React from "react"
import { Drawer, Button } from "@material-ui/core"
import styled from "styled-components/macro"
import SALogo from "./Masonry/OptionsPopup/SALogo"
import OpenInNewIcon from "@material-ui/icons/OpenInNewRounded"
import ZoomIcon from "@material-ui/icons/ZoomIn"
import PaintingMetadata from "./Masonry/PaintingMetadata"

export const DRAWER_HEIGHT_PX = 128

const DrawerContentsStyles = styled.div`
  padding: 0.5em;
  height: ${DRAWER_HEIGHT_PX}px;
  position: relative;
  .buttonsWrapper {
    position: absolute;
    bottom: 8px;
    right: 8px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: white;
  }
  a {
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
  }
  button {
    text-transform: none;
  }
  .btnSaatchi {
    margin-left: 12px;
  }
  .MuiButton-endIcon {
    margin-left: 2px;
    margin-right: -8px;
  }
`

const OptionsButtons = ({ saatchiLink, fullPageLink }) => (
  <div className="buttonsWrapper">
    <a href={fullPageLink} target="_blank" rel="noopener noreferrer">
      <Button className="btnOpen" startIcon={<ZoomIcon />} variant="outlined">
        Open Image
      </Button>
    </a>
    <a href={saatchiLink} target="_blank" rel="noopener noreferrer">
      <Button
        className="btnSaatchi"
        startIcon={
          <div style={{ width: 24, height: 24, transform: "scale(1.5)" }}>
            <SALogo />
          </div>
        }
        endIcon={
          <div style={{ width: 24, height: 24, transform: "scale(0.7)" }}>
            <OpenInNewIcon />
          </div>
        }
        variant="outlined"
      >
        Saatchi Art
      </Button>
    </a>
  </div>
)

export default ({
  onBackdropClick,
  open,
  saatchiLink,
  fullPageLink,
  metadata,
}) => (
  <Drawer anchor="bottom" open={open} ModalProps={{ onBackdropClick }}>
    <DrawerContentsStyles>
      <PaintingMetadata isLarge={true} metadata={metadata} />
      <OptionsButtons saatchiLink={saatchiLink} fullPageLink={fullPageLink} />
    </DrawerContentsStyles>
  </Drawer>
)
