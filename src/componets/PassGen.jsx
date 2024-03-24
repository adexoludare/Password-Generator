import { useState, useCallback, useEffect, useRef } from 'react'
import './PassGen.css'



function PassGen() {
    const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [symbAllowed, setSymbAlloed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) str = str + "0123456789"
    if (symbAllowed) str = str + "!@#$%^&*()_+"

    for (let i = 1; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1))
    }
    setPassword(pass)
  },
  [length, numAllowed, symbAllowed]

  )

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  useEffect(() => {generatePassword()}, [length, numAllowed, symbAllowed])
  

  return (
    <div className='outerContainer'>
      <h2>Password Generator</h2>
      <div className='ux'>
        <input 
        type="text" 
        value={password}
        className='inputBox'
        placeholder='password'
        readOnly
        ref={passwordRef}/>
        <button onClick={copyPassword}>copy</button>
      </div>
      <div className='innerContainer'>
        <div className='otherInput'>
          <input 
          type="range"
          min={6}
          max={20}
          value={length}
          className='consorPointer'
          onChange={(e) => setLength(e.target.value)}
          name=''
          id='txtPassword'/>
          <label htmlFor="length">Length:{length}</label>
        </div>
        <div className='otherInput'>
          <input 
          type='checkbox'
          defaultValue={numAllowed}
          onChange={() => setNumAllowed((prev) => !prev)}
          name=''
          className='checkbox'
          id=''/>
          <label htmlFor="number">Numbers:{numAllowed}</label>
        </div>
        <div className='otherInput'>
          <input 
          type='checkbox'
          defaultValue={symbAllowed}
          onChange={() => setSymbAlloed((prev) => !prev)}
          name=''
          className='checkbox'
          id=''/>
          <label htmlFor="symbol">Symbols:{numAllowed}</label>
        </div>
      </div>
    </div>
  )
}

export default PassGen