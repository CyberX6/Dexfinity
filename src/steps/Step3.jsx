import emailjs from '@emailjs/browser'
import { useRef } from 'react'
import { getCurrentDate } from '../index'
import { ProgressSteps } from '../progress-steps'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useStateMachine } from 'little-state-machine'
import updateAction, { clearAction } from '../updateAction'

const schema = yup
  .object({
    description: yup.string()
  })
  .required()

export const Step3 = ({ onBack, onNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const { actions, state } = useStateMachine({
    clearAction,
    updateAction
  })

  const {
    data: { firstName, email, phone, website }
  } = state

  const formRef = useRef()
  const onSubmit = data => {
    emailjs
      .sendForm(
        'service_9vxcxnt',
        'template_adwoj6s',
        formRef.current,
        'user_szolbZ1s6HtszgBTaUZYs'
      )
      .then(
        r => {
          console.log('SUCCESS!', r.status, r.text)
        },
        err => {
          console.log('FAILED...', err)
        }
      )
      .finally(() => {
        actions.updateAction(data)
        onNext(state)
        actions.clearAction()
      })
  }

  return (
    <>
      <ProgressSteps stepNum={3} />
      <form
        ref={formRef}
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
        className="form-container"
      >
        <div className="textarea error">
          <label htmlFor="description">Vaša správa a doplňujúce podklady</label>
          <textarea
            className="custom-textarea"
            name="description"
            {...register('description')}
            defaultValue={state.data?.description}
            id="description"
            cols="30"
            rows="8"
            placeholder="Ďalšie detaily o vašom svetovom e-commerce projekte"
          />
          {errors.description && (
            <span className="error-message">{errors.description.message}</span>
          )}
        </div>
        <div className="file-input">
          <input
            type="file"
            {...register('file')}
            name="file"
            placeholder="Nie je vybratý žiadný súbor"
          />
        </div>
        <div className="button-container">
          <button onClick={() => onBack()} className="custom-button secondary">
            Späť
          </button>
          <button className="custom-button primary">Odoslať</button>
        </div>
        <input type="hidden" name="client_name" value={firstName} />
        <input type="hidden" name="client_email" value={email} />
        <input type="hidden" name="client_phone" value={phone} />
        <input type="hidden" name="website" value={website} />
        <input type="hidden" name="url_field" value={window.location.href} />
        <input type="hidden" name="created_time" value={getCurrentDate()} />
      </form>
    </>
  )
}
