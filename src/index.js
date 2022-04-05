import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { StateMachineProvider, createStore } from 'little-state-machine'
import { Step1 } from './steps/Step1'
import { Step2 } from './steps/Step2'
import { Step3 } from './steps/Step3'
import './App.scss'
import { Success } from './steps/Success'

createStore({
  data: {}
})
export const getCurrentDate = () => {
  let date = new Date()
  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getDate() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes()
  )
}

function App() {
  const [userIp, setUserIp] = useState('')
  const [step, setStep] = useState(1)
  useEffect(() => {
    fetch('https://geolocation-db.com/json/')
      .then(res => res.json())
      .then(res => setUserIp(res?.IPv4))
  }, [])

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = values => {
    setStep(4)
    axios
      .post(
        'https://v1.nocodeapi.com/cyberx6/google_sheets/uMqvJhdbHyvFiGXi/addRows?tabId=Raw Leads',
        [
          {
            'E-mail': values.data.email,
            meno: values.data.firstName,
            telefon: values.data.phone,
            budget: values.data.budget,
            created_time: getCurrentDate(),
            web: values.data.website,
            'sluzby-zaujem': values.data.services.join(', '),
            ip_address: userIp,
            url_field: window.location.href,
            platform: 'web',
            Message: values.data.description
          }
        ]
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
        {step === 1 && <Step1 onNext={handleNext} />}
        {step === 2 && <Step2 onBack={handleBack} onNext={handleNext} />}
        {step === 3 && <Step3 onBack={handleBack} onNext={handleSubmit} />}
        {step === 4 && <Success onNext={() => setStep(1)} />}
      </div>
    </StateMachineProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
