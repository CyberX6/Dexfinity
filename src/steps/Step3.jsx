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

  const onSubmit = data => {
    actions.updateAction(data)
    onNext(state)
    actions.clearAction()
  }

  return (
    <>
      <ProgressSteps stepNum={3} />
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
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
      </form>
    </>
  )
}
