import { addCookies, getFinalMultiplierForAction } from './main.js'

let autoClickers = 0
let autoClickerMultiplier = 1

export function buyAutoClicker() {
  autoClickers++
}

export function upgradeAutoClickerMultiplier() {
  autoClickerMultiplier *= 2
}

export function startAutoClickers() {
  setInterval(() => {
    const finalMultiplier = getFinalMultiplierForAction("autoClick")
    addCookies(autoClickers * autoClickerMultiplier * finalMultiplier)
  }, 1000)
}
