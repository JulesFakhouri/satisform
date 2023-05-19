import { Input } from '@material-tailwind/react'
import type { z } from 'zod'
import type { zodForm } from '../../interface'
import { classNameDisabledForm } from '../../utils'

interface Props {
  formItem: Omit<z.infer<typeof zodForm>, 'id'>
  setValue?: (value: string) => void
  disabled?: boolean
}

const FormText = (props: Props): JSX.Element => {
  if (props.formItem.form.type !== 'text')
    throw new Error('Form type is not text')
  return (
    <div
      className={
        classNameDisabledForm(props.disabled) + ' w-full flex flex-col gap-2'
      }
    >
      <p className="">{props.formItem.label}</p>
      <Input
        required={props.formItem.form.required}
        disabled={props.disabled}
        onInput={(e) => {
          props.setValue?.(e.currentTarget.value)
        }}
      />
    </div>
  )
}

export default FormText
