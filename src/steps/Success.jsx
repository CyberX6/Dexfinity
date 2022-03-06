import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../lotties/success.json'
import { H1 } from '../components/headings/H1'
import { H2 } from '../components/headings/H2'

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

export const Success = ({ onNext }) => {
  const handleClick = () => {
    onNext()
  }

  return (
    <div className="success">
      <Lottie options={defaultOptions} height={150} width={150} />
      <h1
        style={{ fontSize: '5rem', padding: '0 5px' }}
        className="custom-h1-sm"
      >
        Úspešne odoslané!
      </h1>
      <H2 text="Už len moment a náš špecialista sa vám venuje. " />
      <button onClick={handleClick} className="custom-button secondary">
        Späť na formulár
      </button>
    </div>
  )
}
