import { addCookies, getFinalMultiplierForAction } from './main.js'

let isDragging = false
let startAngle = 0
let currentAngle = 0
let lastFullRotation = 0

export function enableRotaryDial(dial) {
  dial.addEventListener("mousedown", (e) => {
    if (dial.parentElement.classList.contains("locked")) return
    isDragging = true
    const rect = dial.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX)
    e.preventDefault()
  })

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return
    const rect = dial.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)
    const deltaAngle = angle - startAngle
    currentAngle += deltaAngle
    startAngle = angle
    dial.style.transform = `rotate(${currentAngle}rad)`

    if (Math.abs(currentAngle - lastFullRotation) >= 2 * Math.PI) {
      lastFullRotation = currentAngle
      const finalMultiplier = getFinalMultiplierForAction("rotary")
      addCookies(finalMultiplier)
    }
  })

  document.addEventListener("mouseup", () => {
    isDragging = false
  })
}
