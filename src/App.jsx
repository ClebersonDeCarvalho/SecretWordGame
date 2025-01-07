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

const guessesQty = 3

function App() {
  
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setpickedWord] = useState("")
  const [pickedCategory, setpickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters,setWrongLetters] = useState([])
  const [guesses,setGuesses] = useState(3)
  const [score,setScore] = useState(0)

  //Set the picked word and category
  const pickWordAndCategory = useCallback(()=>{

    //pick a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random()*Object.keys(categories).length)]

    //pick a random word
    const word = words[category][Math.floor(Math.random()*words[category].length)]

    return{word, category}
    
  },[words])

  //Start Secret World game
  const startGame = useCallback(()=>{

    clearLetterStates()
    //Start Secret World
    //picked word and category
    const {word,category} = pickWordAndCategory()

    //create an array of letters
    let wordLetters = word.split("")

    //Normalizing uppercase letters to lowercase
    wordLetters= wordLetters.map((letter)=>letter.toLowerCase())

    //Fill states
    setpickedWord(word)
    setpickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  },[pickWordAndCategory])

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

      setGuesses((actualGuesses)=> actualGuesses-1)
    }
  }

  const clearLetterStates=()=>{
    setGuessedLetters([])
    setWrongLetters([])
  }

  //check if guesses ended
  useEffect(()=>{
    if(guesses <= 0){
      //reset all game

      clearLetterStates()

      setGameStage(stages[2].name)
    }

  },[guesses]); 
  
  //check win conditions

  useEffect(()=>{

    const uniqueLetters=[...new Set(letters)]
    
    //win conditions
    if(guessedLetters.length===uniqueLetters.length){
      //add score
      setScore((actualScore)=>actualScore+=100)

      //reset game, new word
      startGame();
    }

  },[guessedLetters,letters,startGame]);

  //restart the game
  const retry = ()=>{
    setScore(0)
    setGuesses(guessesQty)
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
          guesses={guesses}
          score={score}
          />)} 
        {gameStage === 'end' && <GameOver retry={retry} score={score}/>} 
      </div>
      
    </>
  )
}

export default App
