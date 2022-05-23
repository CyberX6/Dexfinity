import React from 'react'
import { useTranslation } from 'react-i18next'

export const ProgressSteps = ({ stepNum }) => {
  const { t } = useTranslation()
  const steps = {
    1: t('aboutYou'),
    2: t('ourHelp'),
    3: t('additionalInfo')
  }

  const stepsArray = Object.keys(steps)

  return (
    <section className="steps">
      {stepsArray.map(step => (
        <React.Fragment key={step}>
          <div
            className={`step ${stepNum === +step ? 'active' : ''} ${
              stepNum > +step ? 'completed' : ''
            }`}
          >
            <div className="step-number">{step}</div>
            <p className="step-title">{steps[step]}</p>
          </div>
          {step < stepsArray.length && <div className="progress-line" />}
        </React.Fragment>
      ))}
    </section>
  )
}
