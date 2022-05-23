import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ProgressSteps } from '../progress-steps'
import { useStateMachine } from 'little-state-machine'
import updateAction from '../updateAction'

export const Step2 = ({ onBack, onNext }) => {
  const { t } = useTranslation()
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
    t('marketingPerformance'),
    t('webUx'),
    t('onlineExport'),
    t('marketingAbroad'),
    t('seo'),
    t('magicHiring'),
    t('brandBuilding'),
    t('commissionCoop')
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
        <fieldset className="custom-fieldset">
          <legend className="custom-legend">{t('chooseServices')}</legend>
          <div className="services-list">{servicesList}</div>
        </fieldset>
        <div className="button-container">
          <button
            type="button"
            onClick={() => onBack()}
            className="custom-button secondary"
          >
            {t('back')}
          </button>
          <button type="submit" className="custom-button primary">
            {t('next')}
          </button>
        </div>
      </form>
    </>
  )
}
