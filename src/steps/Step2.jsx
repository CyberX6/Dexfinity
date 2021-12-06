import { ProgressSteps } from '../progress-steps'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useStateMachine } from 'little-state-machine'
import updateAction from '../updateAction'
import * as yup from 'yup'

const schema = yup
  .object({
    service: yup.array()
  })
  .required()

export const Step2 = () => {
  let navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const watchService = watch('service')
  const { actions } = useStateMachine({ updateAction })

  const onSubmit = data => {
    actions.updateAction(data)
    navigate('/step3')
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

  return (
    <>
      <ProgressSteps stepNum={2} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>
            Vyberte, o čo máte záujem a nebojte sa označiť viac možností
          </legend>
          <div className="services-list">
            {servicesArray.map(service => (
              <div
                className={`checkbox ${
                  watchService && watchService.indexOf(service) > -1
                    ? 'checked'
                    : ''
                }`}
                key={service}
              >
                <input
                  type="checkbox"
                  name="service[]"
                  id={service}
                  value={service}
                  {...register('service')}
                />
                <label htmlFor={service}>{service}</label>
              </div>
            ))}
          </div>
        </fieldset>
        <div className="button-container">
          <button onClick={() => navigate('/step1')} className="secondary">
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
