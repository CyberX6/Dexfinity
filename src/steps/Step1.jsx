import PhoneInput from 'react-phone-input-international'
import { ProgressSteps } from '../progress-steps'
import { useForm } from 'react-hook-form'
import { useStateMachine } from 'little-state-machine'
import updateAction from '../updateAction'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect } from 'react'

const schema = yup
  .object({
    firstName: yup.string().required(),
    email: yup.string().email().required(),
    website: yup.string().required(),
    phone: yup.string().required().min(7),
    budget: yup.string().required()
  })
  .required()

export const Step1 = ({ onNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(schema)
  })

  const { actions, state } = useStateMachine({ updateAction })

  useEffect(() => {
    setValue('phone', state.data?.phone)
  }, [setValue, state.data?.phone])

  const onSubmit = data => {
    actions.updateAction(data)
    onNext()
  }

  return (
    <>
      <ProgressSteps stepNum={1} />
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div
          style={{ gridColumn: '1 / -1' }}
          className={`input-group required ${errors.firstName ? 'error' : ''}`}
        >
          <label htmlFor="name">Meno a priezvisko</label>
          <input
            type="text"
            id="name"
            {...register('firstName')}
            defaultValue={state.data?.firstName}
            placeholder="John Doe"
          />
          {errors.firstName === 'required' && (
            <span className="error-message">Toto pole je povinne</span>
          )}
        </div>
        <div className={`input-group required ${errors.email ? 'error' : ''}`}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            defaultValue={state.data?.email}
            placeholder="your.adress@mail.com"
          />
          {errors.email?.type === 'required' && (
            <span className="error-message">Toto pole je povinne</span>
          )}
        </div>
        <div className={`input-group required ${errors.phone ? 'error' : ''}`}>
          <label htmlFor="phone">Telefónne číslo</label>
          <PhoneInput
            country="sk"
            type="tel"
            className="phone-input"
            id="phone"
            name="phone"
            {...register('phone')}
            defaultValue={state.data?.phone}
            onChange={phone =>
              setValue('phone', phone, { shouldValidate: true })
            }
            value={state.data?.phone}
            placeholder="+421 123 345 678"
          />
          {errors.phone?.type === 'required' && (
            <span className="error-message">Toto pole je povinne</span>
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
            defaultValue={state.data?.website}
            placeholder="https://yourwebsite.com"
          />
          {errors.website?.type === 'required' && (
            <span className="error-message">Toto pole je povinne</span>
          )}
        </div>
        <div className={`input-group required ${errors.budget ? 'error' : ''}`}>
          <label htmlFor="budget">Orientačný mesačný rozpočet</label>
          <select
            {...register('budget')}
            defaultValue={state.data?.budget}
            name="budget"
            id="budget"
          >
            <option value="">Vyberte si možnosť</option>
            <option value="<500">do 500 €</option>
            <option value="500-1000">500€ - 1000€</option>
            <option value="1000-1500">1000€ - 1500€</option>
            <option value="1500-2000">1500€ - 2000€</option>
            <option value="2000<">viac ako 2000 €</option>
          </select>
          {errors.budget?.type === 'required' && (
            <span className="error-message">Toto pole je povinne</span>
          )}
        </div>
        <div className="button-container first-step">
          <button type="submit" className="custom-button primary next-button">
            Ďalej
          </button>
        </div>
      </form>
    </>
  )
}
