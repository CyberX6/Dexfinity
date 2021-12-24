import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ProgressSteps } from '../progress-steps'
import { useStateMachine } from 'little-state-machine'
import updateAction from '../updateAction'

export const Step2 = ({ onBack, onNext }) => {
  const { register, handleSubmit, watch, setValue } = useForm()
  const { actions, state } = useStateMachine({ updateAction })

  useEffect(() => {
    setValue('services', state.data?.services)
  }, [setValue, state.data?.services])

  const watchService = watch('services')

  const onSubmit = data => {
    actions.updateAction(data)
    onNext()
  }

  const servicesArray = [
    'Výkonnostný marketing',
    'WEB & UX',
    'Online Export',
    'Marketing v zahraničí',
    'SEO',
    'Magic Hiring',
    'Budovanie značky',
    'Provízna spolupráca'
  ]

  const servicesList = servicesArray.map((service, i) => (
    <label
      className={`checkbox ${
        watchService && watchService.indexOf(service) > -1 ? 'checked' : ''
      }`}
      key={service}
    >
      <input
        type="checkbox"
        name={`services.${i}`}
        id={service}
        value={service}
        {...register('services')}
      />
      <label htmlFor={service}>{service}</label>
    </label>
  ))

  return (
    <>
      <ProgressSteps stepNum={2} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>
            Vyberte, o čo máte záujem a nebojte sa označiť viac možností
          </legend>
          <div className="services-list">{servicesList}</div>
        </fieldset>
        <div className="button-container">
          <button type="button" onClick={() => onBack()} className="secondary">
            Späť
          </button>
          <button type="submit" className="primary">
            Ďalej
          </button>
        </div>
      </form>
    </>
  )
}
