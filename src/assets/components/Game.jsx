import './Game.css'

const Game = ({
    verifyLetter,
    pickedWord,
    pickedCategory,
    letters,
    guessedLetters,
    wrongLetters,
    gueses,
    score
  }) => {

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a Palavra:
        <span>{pickedCategory}</span>
      </h3>
        <p>Você ainda tem {gueses} tentativa(s)</p>
      <div className="wordContainer">
        {letters.map((letter,i)=>(
          guessedLetters.includes(letter) ? (
            <span key ={i} className="letter">{letter}</span>
          ):(
            
        <span key ={i} className="blankSquare"></span>
          )

        ))}
      </div>
      <div className="letterContainer">
        <p>Tente Advinhar uma letra da palavra:</p>
        <form>
          <input type="text" name='Letter' maxLength='1' required />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLetterContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter,i)=>
          <span key={i} >{letter}, </span>
        )}
      </div>
    </div>
  )
}

export default Game
