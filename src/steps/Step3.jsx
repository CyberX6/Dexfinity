import { ProgressSteps } from '../progress-steps'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useStateMachine } from 'little-state-machine'
import updateAction from '../updateAction'

const schema = yup
  .object({
    description: yup.string().required('Description is required')
  })
  .required()

export const Step3 = () => {
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
    alert(JSON.stringify(state, null, 2))
  }

  return (
    <>
      <ProgressSteps stepNum={3} />
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="textarea required error">
          <label htmlFor="description">Vaša správa a doplňujúce podklady</label>
          <textarea
            name="description"
            {...register('description')}
            defaultValue={state.data.description}
            id="description"
            cols="30"
            rows="8"
            placeholder="Hello, I have a wonderful bizňis for u."
          />
          {errors.description && (
            <span className="error-message">{errors.description.message}</span>
          )}
        </div>
        <div className="file-input">
          <input type="file" placeholder="Nie je vybratý žiadný súbor" />
        </div>
        <div className="button-container">
          <button onClick={() => navigate('/step2')} className="secondary">
            Späť
          </button>
          <button className="primary">Ďalej</button>
        </div>
      </form>
    </>
  )
}
