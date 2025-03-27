import React, { useEffect, useState } from 'react'
import './App.css'
import { useTelegram } from './hooks/useTelegram.js'

function App() {
  const { tg, user, queryId } = useTelegram()
  const [ login, setLogin ] = useState('')
  const [ password, setPassword ] = useState('')

  useEffect(() => {
    tg.ready()
    tg.expand()
    tg.disableVerticalSwipes()
    // tg.enableClosingConfirmation()
  }, [tg])

  console.log('tg', tg)

  const signIn = async () => {
    //отправить запрос на бэк, если вернётся success, значит всё збс
    console.log('sign in', login, password)

    //regTg запрос с параметрами phone, password, chatId

    fetch('http://45.131.99.100:5014/api/regTg',{
      method: 'POST',
      credentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({phone: login, password,/*  chatId:  */})
    })
    
  }
  
  return (
    <div className="App">
      <input
          onChange={e => setLogin(e.target.value)}
          value={login}
          type="text"
          placeholder="Номер телефона/почта"
      />
      <input
          onChange={e => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Пароль"
      />
      <span>{queryId}</span>
      <span>{user?.id}</span>
      <span>{user?.first_name}</span>
      <span>{user?.last_name}</span>
      <span>{user?.username}</span>
      {<span>errors?</span>}
      <button onClick={signIn}>Войти</button>
    </div>
  )
}

export default App
