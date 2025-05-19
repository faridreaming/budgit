import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

const themes = {
  dark: 'synthwave',
  light: 'fantasy',
}

export default function ToggleTheme() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('isDark') === 'true'
  })

  const toggleTheme = () => {
    setIsDark((prev) => !prev)
  }

  useEffect(() => {
    localStorage.setItem('isDark', isDark)
    document.documentElement.setAttribute('data-theme', isDark ? themes.dark : themes.light)
  }, [isDark])

  return (
    <label className="swap swap-rotate absolute top-4 right-4">
      <input type="checkbox" className="theme-controller" checked={isDark} onChange={toggleTheme} />
      <Sun className="swap-on h-6 w-6" />
      <Moon className="swap-off h-6 w-6" />
    </label>
  )
}
