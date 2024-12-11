import { addCookies, getFinalMultiplierForAction, toggleState, toggleCycles } from './main.js'

export function enableToggleSwitch(toggle) {
  toggle.addEventListener("click", () => {
    if (toggle.classList.contains("locked")) return
    const knob = toggle.querySelector(".toggle-knob")
    let currentState = toggleState
    currentState = !currentState
    if (currentState) {
      knob.style.left = "32px"
    } else {
      knob.style.left = "2.5px"
    }
    // Each full cycle (on→off→on) grants cookies
    // Track cycles: if we are now ON and we were OFF previously, increment a half-cycle
    // Let's say a full cycle is OFF→ON→OFF→ON (two state changes)
    // To simplify: every time we return to ON (true) after being OFF, we award cookies
    if (currentState === true) {
      const finalMultiplier = getFinalMultiplierForAction("toggle")
      addCookies(finalMultiplier)
    }
  })
}
