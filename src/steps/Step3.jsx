import emailjs from '@emailjs/browser'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
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
        'service_3afv6sn',
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
        emailjs
          .send(
            'service_3afv6sn',
            'template_i4din87',
            { from_name: 'Dexfinity', reply_to: 'info@dexfinity.com' },
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
          <label htmlFor="description">{t('additionalDocs')}</label>
          <textarea
            className="custom-textarea"
            name="description"
            {...register('description')}
            defaultValue={state.data?.description}
            id="description"
            cols="30"
            rows="8"
            placeholder={t('description')}
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
            placeholder={t('noFileSelected')}
          />
        </div>
        <div className="button-container">
          <button onClick={() => onBack()} className="custom-button secondary">
            {t('back')}
          </button>
          <button className="custom-button primary">{t('submit')}</button>
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
