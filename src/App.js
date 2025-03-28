import React, { useEffect, useState } from 'react'
import './App.css'
import { useTelegram } from './hooks/useTelegram.js'

function App() {
  const { tg, user } = useTelegram()
  const [ login, setLogin ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ data, setData ] = useState(0)

  useEffect(() => {
    tg.ready()
    tg.expand()
    tg.disableVerticalSwipes()
    // tg.enableClosingConfirmation()
  }, [tg])


  const signIn = async () => {
    //отправить запрос на бэк, если вернётся success, значит всё збс
    console.log('sign in', login, password)

    //regTg запрос с параметрами phone, password, chatId

    fetch('https://45.131.99.100:5014/api/regTg',{
      method: 'POST',
      credentials: 'include',//возможно что-то другое здесь должно быть
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({phone: login, password, chatId: user?.id })
    }).then(res => {
      console.log('res', res)
      setData(1)
    })
    .catch(e => {
      console.error('fetch eRroR', e)
      setData(2)
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
      {<span>errors?</span>}
      <span>{data}</span>
      <button onClick={signIn}>Войти</button>
    </div>
  )
}

export default App
