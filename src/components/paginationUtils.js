export function doTheThing(setCurrentPageIdx) {
  document
    .querySelectorAll(".MuiMobileStepper-dot")
    .forEach((stepper, idx) =>
      stepper.removeEventListener("click", () => setCurrentPageIdx(idx))
    )
}
