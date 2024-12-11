export let highlightedElement = null

export function rotateHighlight() {
  const elements = ["cookie", "horizontalSlider", "verticalSlider"]
  let index = elements.indexOf(highlightedElement)
  if (index === -1) index = 0
  if (highlightedElement) document.getElementById(highlightedElement)?.classList.remove("highlight")
  highlightedElement = elements[(index + 1) % elements.length]
  document.getElementById(highlightedElement)?.classList.add("highlight")
  setTimeout(rotateHighlight, 20000)
}
