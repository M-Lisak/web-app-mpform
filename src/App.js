import React, { useEffect, useState } from 'react'
import './App.css'
import { useTelegram } from './hooks/useTelegram.js'

function App() {
  const { tg } = useTelegram()
  const [ login, setLogin ] = useState('')
  const [ password, setPassword ] = useState('')

  useEffect(() => {
    tg.ready()
    tg.expand()
    tg.disableVerticalSwipes()
    // tg.enableClosingConfirmation()
  }, [tg])

  const signIn = () => {
    console.log('sign in')
  }
  
  return (
    <div className="App">
      <button onClick={signIn}>Войти</button>
    </div>
  )
}

export default App
