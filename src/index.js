import axios from 'axios'
import React, { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
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
const getCurrentDate = () => {
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
        'https://v1.nocodeapi.com/cyberx6/google_sheets/eoxmLzUPBeYuYtcZ/addRows?tabId=Leads All Raw Data',
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
        // emailjs.send(
        //   'service_g0ui1jk',
        //   'template_vbv7cki',
        //   { to_email: values.data.email },
        //   'user_w85TR2DC5ffYGaExLFUCH'
        // )
        // emailjs.send(
        //   'service_g0ui1jk',
        //   'template_eeajazh',
        //   {
        //     client_name: values.data.firstName,
        //     client_email: values.data.email,
        //     client_phone: values.data.phone,
        //     website: values.data.website,
        //     url_field: window.location.href,
        //     created_time: getCurrentDate()
        //   },
        //   'user_w85TR2DC5ffYGaExLFUCH'
        // )
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <StateMachineProvider>
      <div className="container">
        {/*  <H1 text=\"Pripravení na rast?\" />*/}
        {/*  <H2*/}
        {/*    text=\"Vykročte smerom k zahraničnej expanzii vášho biznisu.*/}
        {/*<strong>Na účet Dexfinity a bez záväzkov.</strong>\"*/}
        {/*  />*/}
        {step === 1 && <Step1 onNext={handleNext} />}
        {step === 2 && <Step2 onBack={handleBack} onNext={handleNext} />}
        {step === 3 && <Step3 onBack={handleBack} onNext={handleSubmit} />}
        {step === 4 && <Success onNext={() => setStep(1)} />}
      </div>
    </StateMachineProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
