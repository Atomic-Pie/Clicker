import {
    cookies, addCookies, updateScore, manualMultiplier, sliderFollowCursorUnlocked, cookieMultiplier,
    horizontalSliderMultiplier, verticalSliderMultiplier, highlightUnlocked, highlightMultiplier,
    setManualMultiplier, setCookieMultiplier, setHorizontalSliderMultiplier, setVerticalSliderMultiplier,
    setSliderFollowCursorUnlocked, setHighlightUnlocked, setHighlightMultiplier,
    rotaryUnlocked, toggleUnlocked
  } from './main.js';
  import { buyAutoClicker, upgradeAutoClickerMultiplier } from './autoClickers.js'
  import { rotateHighlight } from './highlight.js'
  
  let horizontalSliderUnlocked = false
  let verticalSliderUnlocked = false
  
  let autoClickerCost = 10
  let clickerMultiplierCost = 30
  let cookieMultiplierCost = 40
  let horizontalMultiplierCost = 60
  let verticalMultiplierCost = 70
  let multiplierCost = 50
  let highlightUnlockCost = 100
  let sliderFollowCursorCost = 80
  let highlightMultiplierUpgradeCost = 200
  let rotaryDialCost = 80
  let toggleSwitchCost = 100
  
  const autoClickerButton = document.getElementById("autoClicker")
  const clickerMultiplierButton = document.getElementById("clickerMultiplier")
  const cookieMultiplierButton = document.getElementById("cookieMultiplierUpgrade")
  const horizontalMultiplierButton = document.getElementById("horizontalMultiplierUpgrade")
  const verticalMultiplierButton = document.getElementById("verticalMultiplierUpgrade")
  const multiplierButton = document.getElementById("multiplier")
  const unlockHighlightButton = document.getElementById("unlockHighlight")
  const buyHorizontalSliderButton = document.getElementById("buyHorizontalSlider")
  const buyVerticalSliderButton = document.getElementById("buyVerticalSlider")
  const sliderFollowCursorButton = document.getElementById("sliderFollowCursorUpgrade")
  const buyRotaryDialButton = document.getElementById("buyRotaryDial")
  const buyToggleSwitchButton = document.getElementById("buyToggleSwitch")
  
  const highlightMultiplierUpgradeButton = document.createElement("button")
  highlightMultiplierUpgradeButton.id = "highlightMultiplierUpgrade"
  highlightMultiplierUpgradeButton.classList.add("shop-item")
  highlightMultiplierUpgradeButton.textContent = `Highlight Multiplier x2 (Cost: ${highlightMultiplierUpgradeCost})`
  const upgradesSection = document.querySelector(".shop .shop-section:last-child")
  upgradesSection.appendChild(highlightMultiplierUpgradeButton)
  highlightMultiplierUpgradeButton.style.display = "none"
  
  autoClickerButton.addEventListener("click", () => {
    if (cookies >= autoClickerCost) {
      addCookies(-autoClickerCost)
      buyAutoClicker()
      autoClickerCost = Math.ceil(autoClickerCost * 1.2)
      const count = parseInt(document.getElementById("autoClickerCount").textContent.split(":")[1]) + 1
      document.getElementById("autoClickerCount").textContent = `Owned: ${count}`
    }
  })
  
  buyRotaryDialButton.addEventListener("click", () => {
    if (cookies >= rotaryDialCost && !rotaryUnlocked) {
      addCookies(-rotaryDialCost)
      rotaryUnlocked = true;
      document.getElementById("rotaryDial").classList.remove("locked");
    }
  })
  
  buyToggleSwitchButton.addEventListener("click", () => {
    if (cookies >= toggleSwitchCost && !toggleUnlocked) {
      addCookies(-toggleSwitchCost)
      toggleUnlocked = true
      document.getElementById("toggleSwitch").classList.remove("locked")
    }
  })

  clickerMultiplierButton.addEventListener("click", () => {
    if (cookies >= clickerMultiplierCost) {
      addCookies(-clickerMultiplierCost)
      upgradeAutoClickerMultiplier()
      clickerMultiplierCost = Math.ceil(clickerMultiplierCost * 1.5)
      const countElem = document.getElementById("clickerMultiplierCount")
      const owned = parseInt(countElem.textContent.split(":")[1]) + 1
      countElem.textContent = `Owned: ${owned}`
    }
  })
  
  multiplierButton.addEventListener("click", () => {
    if (cookies >= multiplierCost) {
      addCookies(-multiplierCost)
      setManualMultiplier(manualMultiplier * 2)
      multiplierCost = Math.ceil(multiplierCost * 1.5)
      const countElem = document.getElementById("multiplierCount")
      const owned = parseInt(countElem.textContent.split(":")[1]) + 1
      countElem.textContent = `Owned: ${owned}`
    }
  })
  
  cookieMultiplierButton.addEventListener("click", () => {
    if (cookies >= cookieMultiplierCost) {
      addCookies(-cookieMultiplierCost)
      setCookieMultiplier(cookieMultiplier * 2)
      cookieMultiplierCost = Math.ceil(cookieMultiplierCost * 1.5)
      document.getElementById("cookieMultiplierCount").textContent = `Owned: ${Math.log2(cookieMultiplier * 2)}`
    }
  })
  
  horizontalMultiplierButton.addEventListener("click", () => {
    if (cookies >= horizontalMultiplierCost) {
      addCookies(-horizontalMultiplierCost)
      setHorizontalSliderMultiplier(horizontalSliderMultiplier * 2)
      horizontalMultiplierCost = Math.ceil(horizontalMultiplierCost * 1.5)
      document.getElementById("horizontalMultiplierCount").textContent = `Owned: ${Math.log2(horizontalSliderMultiplier * 2)}`
    }
  })
  
  verticalMultiplierButton.addEventListener("click", () => {
    if (cookies >= verticalMultiplierCost) {
      addCookies(-verticalMultiplierCost)
      setVerticalSliderMultiplier(verticalSliderMultiplier * 2)
      verticalMultiplierCost = Math.ceil(verticalMultiplierCost * 1.5)
      document.getElementById("verticalMultiplierCount").textContent = `Owned: ${Math.log2(verticalSliderMultiplier * 2)}`
    }
  })
  
  unlockHighlightButton.addEventListener("click", () => {
    if (cookies >= highlightUnlockCost && !highlightUnlocked) {
      addCookies(-highlightUnlockCost)
      setHighlightUnlocked(true)
      rotateHighlight()
      highlightMultiplierUpgradeButton.style.display = "block"
    }
  })
  
  highlightMultiplierUpgradeButton.addEventListener("click", () => {
    if (highlightUnlocked && cookies >= highlightMultiplierUpgradeCost) {
      addCookies(-highlightMultiplierUpgradeCost)
      setHighlightMultiplier(highlightMultiplier * 2)
      highlightMultiplierUpgradeCost = Math.ceil(highlightMultiplierUpgradeCost * 1.5)
      highlightMultiplierUpgradeButton.textContent = `Highlight Multiplier x2 (Cost: ${highlightMultiplierUpgradeCost})`
    }
  })
  
  buyHorizontalSliderButton.addEventListener("click", () => {
    if (cookies >= 30 && !horizontalSliderUnlocked) {
      addCookies(-30)
      horizontalSliderUnlocked = true
      document.getElementById("horizontalSlider").classList.remove("locked")
    }
  })
  
  buyVerticalSliderButton.addEventListener("click", () => {
    if (cookies >= 50 && !verticalSliderUnlocked) {
      addCookies(-50)
      verticalSliderUnlocked = true
      document.getElementById("verticalSlider").classList.remove("locked")
    }
  })
  
  sliderFollowCursorButton.addEventListener("click", () => {
    if (cookies >= sliderFollowCursorCost && !sliderFollowCursorUnlocked) {
      addCookies(-sliderFollowCursorCost)
      setSliderFollowCursorUnlocked(true)
      sliderFollowCursorButton.disabled = true
    }
  })
  
  export function updateShop() {
    autoClickerButton.disabled = (cookies < autoClickerCost)
    clickerMultiplierButton.disabled = (cookies < clickerMultiplierCost)
    cookieMultiplierButton.disabled = (cookies < cookieMultiplierCost)
    horizontalMultiplierButton.disabled = (cookies < horizontalMultiplierCost)
    verticalMultiplierButton.disabled = (cookies < verticalMultiplierCost)
    multiplierButton.disabled = (cookies < multiplierCost)
    unlockHighlightButton.disabled = (cookies < highlightUnlockCost || highlightUnlocked)
    buyHorizontalSliderButton.disabled = (cookies < 30 || horizontalSliderUnlocked)
    buyVerticalSliderButton.disabled = (cookies < 50 || verticalSliderUnlocked)
    sliderFollowCursorButton.disabled = (cookies < sliderFollowCursorCost || sliderFollowCursorUnlocked)
    highlightMultiplierUpgradeButton.disabled = (!highlightUnlocked || cookies < highlightMultiplierUpgradeCost)
    buyRotaryDialButton.disabled = (cookies < rotaryDialCost || rotaryUnlocked)
    buyToggleSwitchButton.disabled = (cookies < toggleSwitchCost || toggleUnlocked)

    buyRotaryDialButton.textContent = `Buy Rotary Dial (Cost: ${rotaryDialCost})`
    buyToggleSwitchButton.textContent = `Buy Toggle Switch (Cost: ${toggleSwitchCost})`
    autoClickerButton.textContent = `Auto Clicker (Cost: ${autoClickerCost})`
    clickerMultiplierButton.textContent = `Clicker Multiplier x2 (Cost: ${clickerMultiplierCost})`
    cookieMultiplierButton.textContent = `Cookie Multiplier x2 (Cost: ${cookieMultiplierCost})`
    horizontalMultiplierButton.textContent = `Horizontal Slider Multiplier x2 (Cost: ${horizontalMultiplierCost})`
    verticalMultiplierButton.textContent = `Vertical Slider Multiplier x2 (Cost: ${verticalMultiplierCost})`
    multiplierButton.textContent = `Manual Multiplier x2 (Cost: ${multiplierCost})`
    unlockHighlightButton.textContent = `Unlock Highlight (Cost: ${highlightUnlockCost})`
    buyHorizontalSliderButton.textContent = `Buy Horizontal Slider (Cost: 30)`
    buyVerticalSliderButton.textContent = `Buy Vertical Slider (Cost: 50)`
    sliderFollowCursorButton.textContent = `Slider Follows Cursor (Cost: ${sliderFollowCursorCost})`
  }
  
  