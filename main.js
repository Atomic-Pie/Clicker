import { updateShop } from './shop.js'
import { enableKnobDragging } from './sliders.js'
import { highlightedElement } from './highlight.js'
import { startAutoClickers } from './autoClickers.js'
import { enableRotaryDial } from './rotary.js'
import { enableToggleSwitch } from './toggle.js'

export let cookies = 0
export let manualMultiplier = 1
export let cookieMultiplier = 1
export let horizontalSliderMultiplier = 1
export let verticalSliderMultiplier = 1
export let sliderFollowCursorUnlocked = false
export let highlightUnlocked = false
export let highlightMultiplier = 2
export let horizontalAtLeft = true
export let verticalAtTop = true


export let rotaryUnlocked = false
export let toggleUnlocked = false
export let rotaryRotations = 0
export let toggleState = false
export let toggleCycles = 0
export let rotaryMultiplier = 1
export let toggleMultiplier = 1

// Add setRotaryMultiplier and setToggleMultiplier if needed:
export function setRotaryMultiplier(val) { rotaryMultiplier = val }
export function setToggleMultiplier(val) { toggleMultiplier = val }


const scoreDisplay = document.getElementById("score")
const cookieButton = document.getElementById("cookie")

export function updateScore() {
  scoreDisplay.textContent = `Cookies: ${cookies}`
  updateShop()
}

export function addCookies(amount) {
  cookies += amount
  if (cookies < 0) cookies = 0
  updateScore()
}

export function setManualMultiplier(val) { manualMultiplier = val }
export function setCookieMultiplier(val) { cookieMultiplier = val }
export function setHorizontalSliderMultiplier(val) { horizontalSliderMultiplier = val }
export function setVerticalSliderMultiplier(val) { verticalSliderMultiplier = val }
export function setSliderFollowCursorUnlocked(val) { sliderFollowCursorUnlocked = val }
export function setHighlightUnlocked(val) { highlightUnlocked = val }
export function setHighlightMultiplier(val) { highlightMultiplier = val }
export function setHorizontalAtLeft(value) { horizontalAtLeft = value }
export function setVerticalAtTop(value) { verticalAtTop = value }

export function getFinalMultiplierForAction(elementType) {
    let finalMultiplier = 1
    if (elementType === "cookie" || elementType === "autoClick") finalMultiplier *= cookieMultiplier
    if (elementType === "horizontalSlider") finalMultiplier *= horizontalSliderMultiplier
    if (elementType === "verticalSlider") finalMultiplier *= verticalSliderMultiplier
    if (elementType === "rotary") finalMultiplier *= rotaryMultiplier
    if (elementType === "toggle") finalMultiplier *= toggleMultiplier
  
    if (highlightUnlocked) {
      if (highlightedElement === "cookie" && (elementType === "cookie" || elementType === "autoClick")) finalMultiplier *= highlightMultiplier
      if (highlightedElement === "horizontalSlider" && elementType === "horizontalSlider") finalMultiplier *= highlightMultiplier
      if (highlightedElement === "verticalSlider" && elementType === "verticalSlider") finalMultiplier *= highlightMultiplier
      if (highlightedElement === "rotaryDial" && elementType === "rotary") finalMultiplier *= highlightMultiplier
      if (highlightedElement === "toggleSwitch" && elementType === "toggle") finalMultiplier *= highlightMultiplier
    }
    return finalMultiplier
  }

cookieButton.addEventListener("click", () => {
  const finalMultiplier = getFinalMultiplierForAction("cookie")
  addCookies(manualMultiplier * finalMultiplier)
})

enableKnobDragging(document.querySelector("#horizontalSlider .knob"), "horizontal")
enableKnobDragging(document.querySelector("#verticalSlider .knob"), "vertical")
enableRotaryDial(document.querySelector(".rotary-knob"))
enableToggleSwitch(document.getElementById("toggleSwitch"))

updateScore()
startAutoClickers()
