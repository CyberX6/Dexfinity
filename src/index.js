import axios from 'axios'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { StateMachineProvider, createStore } from 'little-state-machine'
import { Step1 } from './steps/Step1'
import { Step2 } from './steps/Step2'
import { Step3 } from './steps/Step3'
import { H1 } from './components/headings/H1'
import { H2 } from './components/headings/H2'
import './App.scss'
import { Success } from './steps/Success'

createStore({
  data: {}
})

function App() {
  const [step, setStep] = useState(1)

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = values => {
    axios
      .post(
        'https://sheet.best/api/sheets/288d9f33-2104-4b40-8e56-9f8705e64eb4',
        {
          ...values.data,
          name: values.data.firstName,
          services: values.data.services.join(', ')
        }
      )
      .then(() => {
        setStep(4)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <StateMachineProvider>
      <div className="container">
        <H1 text="Pripravení na rast?" />
        <H2
          text="Vykročte smerom k zahraničnej expanzii vášho biznisu.
      <strong>Na účet Dexfinity a bez záväzkov.</strong>"
        />
        {step === 1 && <Step1 onNext={handleNext} />}
        {step === 2 && <Step2 onBack={handleBack} onNext={handleNext} />}
        {step === 3 && <Step3 onBack={handleBack} onNext={handleSubmit} />}
        {step === 4 && <Success onNext={() => setStep(1)} />}
      </div>
    </StateMachineProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
