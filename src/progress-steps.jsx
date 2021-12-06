import React from 'react'

export const ProgressSteps = ({ stepNum }) => {
  const steps = {
    1: 'Povedzte nám o vás',
    2: 'S čím pomôžeme?',
    3: 'Dodatočné informácie'
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
