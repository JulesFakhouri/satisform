import { Textarea } from '@material-tailwind/react'
import type { z } from 'zod'
import type { zodForm } from '../../interface'
import { classNameDisabledForm } from '../../utils'

interface Props {
  formItem: Omit<z.infer<typeof zodForm>, 'id'>
  setValue?: (value: string) => void
  disabled?: boolean
}

const FormTextArea = (props: Props): JSX.Element => {
  if (props.formItem.form.type !== 'textarea')
    throw new Error('Form type is not textarea')
  return (
    <div
      className={
        classNameDisabledForm(props.disabled) + ' w-full flex flex-col gap-2'
      }
    >
      <p>{props.formItem.label}</p>
      <Textarea
        required={props.formItem.form.required}
        disabled={props.disabled}
        onInput={(e) => {
          props.setValue?.(e.currentTarget.value)
        }}
      />
    </div>
  )
}

export default FormTextArea
