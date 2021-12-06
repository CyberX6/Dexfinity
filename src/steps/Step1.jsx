import { Link, useNavigate } from 'react-router-dom'
import { ProgressSteps } from '../progress-steps'
import { useForm } from 'react-hook-form'
import { useStateMachine } from 'little-state-machine'
import updateAction from '../updateAction'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup
  .object({
    firstName: yup.string().required(),
    email: yup.string().email().required(),
    website: yup.string().url().required(),
    phone: yup.number().required(),
    budget: yup.number().required()
  })
  .required()

export const Step1 = () => {
  let navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const { actions, state } = useStateMachine({ updateAction })
  const onSubmit = data => {
    actions.updateAction(data)
    navigate('/step2')
  }

  return (
    <>
      <ProgressSteps stepNum={1} />
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div
          className={`input-group required ${errors.firstName ? 'error' : ''}`}
        >
          <label htmlFor="name">Meno a priezvisko</label>
          <input
            type="text"
            id="name"
            {...register('firstName')}
            defaultValue={state.data.firstName}
            placeholder="John Doe"
          />
          {errors.firstName === 'required' && (
            <span className="error-message">This field is required</span>
          )}
        </div>
        <div className={`input-group required ${errors.email ? 'error' : ''}`}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            defaultValue={state.data.email}
            placeholder="your.adress@mail.com"
          />
          {errors.email?.type === 'required' && (
            <span className="error-message">This field is required</span>
          )}
        </div>
        <div className={`input-group required ${errors.phone ? 'error' : ''}`}>
          <label htmlFor="phone">Telefónne číslo</label>
          <input
            type="tel"
            id="phone"
            {...register('phone')}
            defaultValue={state.data.phone}
            placeholder="+421 123 345 678"
          />
          {errors.phone?.type === 'required' && (
            <span className="error-message">This field is required</span>
          )}
        </div>
        <div
          className={`input-group required ${errors.website ? 'error' : ''}`}
        >
          <label htmlFor="website">Odkaz na váš web</label>
          <input
            type="text"
            id="website"
            {...register('website')}
            defaultValue={state.data.website}
            placeholder="https://yourwebsite.com"
          />
          {errors.website?.type === 'required' && (
            <span className="error-message">This field is required</span>
          )}
        </div>
        <div className={`input-group required ${errors.budget ? 'error' : ''}`}>
          <label htmlFor="budget">Orientačný mesačný rozpočet</label>
          <select
            {...register('budget')}
            defaultValue={state.data.budget}
            name="budget"
            id="budget"
          >
            <option value="">Select an option</option>
            <option value="500">500$</option>
            <option value="1000">1000$</option>
            <option value="1500">1500$</option>
          </select>
          {errors.budget?.type === 'required' && (
            <span className="error-message">This field is required</span>
          )}
        </div>
        <div className="button-container">
          <button style={{ visibility: 'hidden' }} className="secondary">
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
