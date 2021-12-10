import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
  return (
    <BrowserRouter>
      <StateMachineProvider>
        <div className="container">
          <H1 text="Pripravení na rast?" />
          <H2
            text="Vykročte smerom k zahraničnej expanzii vášho biznisu.
      <strong>Na účet Dexfinity a bez záväzkov.</strong>"
          />
          <Routes>
            <Route exact path="/" element={<Step1 />} />
            <Route path="/step1" element={<Step1 />} />
            <Route path="/step2" element={<Step2 />} />
            <Route path="/step3" element={<Step3 />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </div>
      </StateMachineProvider>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
