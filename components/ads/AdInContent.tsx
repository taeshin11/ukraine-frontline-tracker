'use client'
import { useEffect, useRef } from 'react'

export default function AdInContent() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current || ref.current.dataset.loaded) return
    ref.current.dataset.loaded = '1'
    const s = document.createElement('script')
    s.src = 'https://pl29155468.profitablecpmratenetwork.com/0db4c8fd27747ce7d4863e86f193f301/invoke.js'
    s.async = true
    s.setAttribute('data-cfasync', 'false')
    ref.current.appendChild(s)
  }, [])
  return (
    <div className="w-full my-4">
      <div id="container-0db4c8fd27747ce7d4863e86f193f301" ref={ref} />
    </div>
  )
}
