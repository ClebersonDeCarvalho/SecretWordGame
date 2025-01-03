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

  console.log(words)

  return (
    <>
      <div className='App'>
        {/*Se game state for start ele mostra a tela startScreen */}
        {gameStage === 'start' && <StartScreen/>}
        {gameStage === 'game' && <Game/>} 
        {gameStage === 'end' && <GameOver/>} 
      </div>
      
    </>
  )
}

export default App
