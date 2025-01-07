import './GameOver.css'

<<<<<<< HEAD
const GameOver = ({retry}) => {
  return (
    <div>
      <h1 className='fim'>GameOver</h1>
=======
const GameOver = ({retry,score}) => {
  return (
    <div>
      <h1 className='fim'>GameOver</h1>
      <h2>
        Sua pontuação foi: <span>{score}</span>
      </h2>
>>>>>>> 7bff240 (Finalizando tela de GameOver)
      <button onClick={retry}>Recomeçar</button>
    </div>
  )
}

export default GameOver
