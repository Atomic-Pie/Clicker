import { 
    addCookies, 
    sliderFollowCursorUnlocked, 
    horizontalAtLeft, 
    verticalAtTop, 
    setHorizontalAtLeft, 
    setVerticalAtTop, 
    getFinalMultiplierForAction
  } from './main.js'
  
  export function enableKnobDragging(knob, direction) {
    let isDragging = false
  
    knob.addEventListener("mousedown", (e) => {
      const sliderElem = knob.parentElement
      if (sliderElem.classList.contains("locked")) return
      if (!sliderFollowCursorUnlocked) {
        isDragging = true
        e.preventDefault()
      }
    })
  
    document.addEventListener("mousemove", (e) => {
      const sliderElem = knob.parentElement
      if (sliderElem.classList.contains("locked")) return
  
      // If sliderFollowCursorUnlocked is false, we only move if isDragging is true.
      // If sliderFollowCursorUnlocked is true, we move regardless of isDragging.
      if (!sliderFollowCursorUnlocked && !isDragging) return
  
      const sliderBounds = sliderElem.getBoundingClientRect()
  
      if (direction === "horizontal") {
        const x = Math.max(0, Math.min(e.clientX - sliderBounds.left, sliderBounds.width))
        knob.style.left = `${x}px`
  
        if (x === sliderBounds.width && horizontalAtLeft) {
          const finalMultiplier = getFinalMultiplierForAction("horizontalSlider")
          addCookies(finalMultiplier)
          setHorizontalAtLeft(false)
        }
        if (x === 0 && !horizontalAtLeft) {
          const finalMultiplier = getFinalMultiplierForAction("horizontalSlider")
          addCookies(finalMultiplier)
          setHorizontalAtLeft(true)
        }
      } else if (direction === "vertical") {
        const y = Math.max(0, Math.min(e.clientY - sliderBounds.top, sliderBounds.height))
        knob.style.top = `${y}px`
  
        if (y === sliderBounds.height && verticalAtTop) {
          const finalMultiplier = getFinalMultiplierForAction("verticalSlider")
          addCookies(finalMultiplier)
          setVerticalAtTop(false)
        }
        if (y === 0 && !verticalAtTop) {
          const finalMultiplier = getFinalMultiplierForAction("verticalSlider")
          addCookies(finalMultiplier)
          setVerticalAtTop(true)
        }
      }
    })
  
    document.addEventListener("mouseup", () => {
      isDragging = false
    })
  }
  