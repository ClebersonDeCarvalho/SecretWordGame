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

  const [pickedWord, setpickedWord] = useState("")
  const [pickedCategory, setpickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters,setWrongLetters] = useState([])
  const [gueses,setGuesses] = useState(3)
  const [score,setScore] = useState(0)

  //Set the picked word and category
  const pickWordAndCategory = ()=>{

    //pick a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random()*Object.keys(categories).length)]

    console.log(category)

    //pick a random word
    const word = words[category][Math.floor(Math.random()*words[category].length)]

    console.log(word)

    return{word, category}
  }

  //Start Secret World game
  const startGame = ()=>{

    //Start Secret World
    //picked word and category
    const {word,category} = pickWordAndCategory()

    //create an array of letters
    let wordLetters = word.split("")

    //Normalizing uppercase letters to lowercase
    wordLetters= wordLetters.map((letter)=>letter.toLowerCase())

    console.log(word,category)
    console.log(wordLetters)

    //Fill states
    setpickedWord(word)
    setpickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }

  //process the letters input
  const verifyLetter = (letter)=>{
    const normalizedLetter = letter.toLowerCase()

    //Check if letter is already ben utilized
    if(guessedLetters.includes(normalizedLetter)||wrongLetters.includes(normalizedLetter)){
      return;
    }

    //push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters)=>[
         ...actualGuessedLetters,
          normalizedLetter
      ])

    } else{

      setWrongLetters((actualWrongLetters)=>[
         ...actualWrongLetters,
          normalizedLetter
      ])
    }
  }

  console.log(guessedLetters)
  console.log(wrongLetters)

  //restart the game
  const retry = ()=>{
    setGameStage(stages[0].name)
  }

  return (
    <>
      <div className='App'>
        {/*Se game state for start ele mostra a tela startScreen */}
        {gameStage === 'start' && <StartScreen startGame={startGame}/>}
        {gameStage === 'game' && (
          <Game 
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          gueses={gueses}
          score={score}
          />)} 
        {gameStage === 'end' && <GameOver retry={retry}/>} 
      </div>
      
    </>
  )
}

export default App
