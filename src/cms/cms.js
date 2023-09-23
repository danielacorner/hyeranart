import CMS from "decap-cms-app"
import cloudinary from "netlify-cms-media-library-cloudinary"

import AboutPagePreview from "./preview-templates/AboutPagePreview"

CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate("aboutPage", AboutPagePreview)

export default CMS;