export function setButtonText(
  btn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    //set loading text
    btn.textContent = loadingText;
  } else {
    //set default text
    btn.textContent = defaultText;
  }
}