import React from 'react'
import { useTranslation } from 'react-i18next'
import Lottie from 'react-lottie'
import animationData from '../lotties/success.json'
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
  const { t } = useTranslation()
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
        {t('sentSuccess')}!
      </h1>
      <H2 text={t('willGetToYou')} />
      <button
        onClick={handleClick}
        className="custom-button success-btn secondary"
      >
        {t('backToForm')}
      </button>
    </div>
  )
}
