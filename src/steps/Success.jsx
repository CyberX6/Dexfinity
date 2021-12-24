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
      <H1 text="Úspešne odoslané!" />
      <H2 text="Už len moment a náš špecialista sa vám venuje. " />
      <button onClick={handleClick} className="secondary">
        Späť na formulár
      </button>
    </div>
  )
}
