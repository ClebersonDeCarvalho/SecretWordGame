//Css
import './App.css'

//React
import { useCallback,useEffect, useState } from 'react'

//Data
import {wordsList} from './assets/data/words'

//Components
import StartScreen from './assets/components/StartScreen'
import Game from './assets/components/Game'
import GameOver from './assets/components/GameOver'


const stages = [
  {id:1,name:'start'},
  {id:2,name:'game'},
  {id:3,name:'end'}
]

function App() {
  
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  //Start Secret World game
  const startGame = ()=>{
    setGameStage(stages[1].name)
  }

  //process the letters input
  const verifyLetter = ()=>{
    setGameStage(stages[2].name)
  }

  //restart the game
  const retry = ()=>{
    setGameStage(stages[0].name)
  }

  return (
    <>
      <div className='App'>
        {/*Se game state for start ele mostra a tela startScreen */}
        {gameStage === 'start' && <StartScreen startGame={startGame}/>}
        {gameStage === 'game' && <Game verifyLetter={verifyLetter}/>} 
        {gameStage === 'end' && <GameOver retry={retry}/>} 
      </div>
      
    </>
  )
}

export default App
