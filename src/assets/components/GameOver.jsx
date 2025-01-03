import './GameOver.css'

const GameOver = ({retry}) => {
  return (
    <div>
      <h1 className='fim'>GameOver</h1>
      <button onClick={retry}>Recomeçar</button>
    </div>
  )
}

export default GameOver
