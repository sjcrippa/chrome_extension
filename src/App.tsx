import reactLogo from './assets/react.svg'
// eslint-disable-next-line import/no-absolute-path
import viteLogo from '/vite.svg'
import './App.css'
import { useState } from 'react'

export default function App() {
  const [colour, setColour] = useState('')

  const onclick = async () => {
    const [tab] = await chrome.tabs.query({ active: true })
    chrome.scripting.executeScript<string[], unknown>({
      target: { tabId: tab.id! },
      args: [colour],
      func: (colour) => {
        document.body.style.backgroundColor = colour
      }
    })
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>My Extension</h1>
      <div className="card">
        <input
          type="color"
          value={colour}
          className='input'
          onChange={(e) => { setColour(e.currentTarget.value) }} />
        <button className='btn' onClick={() => { onclick() }}>
          Click to change background.
        </button>
      </div>
    </>
  )
}
