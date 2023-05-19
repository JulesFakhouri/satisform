import { Checkbox } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import type { z } from 'zod'
import type { zodForm } from '../../interface'
import { classNameDisabledForm } from '../../utils'

interface Props {
  formItem: Omit<z.infer<typeof zodForm>, 'id'>
  disabled?: boolean
  setValue?: (value: string) => void
}

const FormCheckBox = (props: Props): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState<number[]>([])
  useEffect(() => {
    if (props.formItem.form.type !== 'checkbox') {
      return
    }
    props.setValue?.(
      selectedIndex
        .map((index) => {
          if (props.formItem.form.type === 'checkbox') {
            return props.formItem.form.options[index]
          }
          return ''
        })
        .join(' | ')
    )
  })
  if (props.formItem.form.type !== 'checkbox')
    throw new Error('Form type is not checkbox')
  return (
    <div className={classNameDisabledForm(props.disabled) + ' w-full'}>
      <p>{props.formItem.label}</p>
      {props.formItem.form.options.map((option, index) => (
        <Checkbox
          key={index}
          label={option}
          checked={selectedIndex.findIndex((value) => value === index) !== -1}
          onChange={() => {
            setSelectedIndex((prev) => {
              const index = prev.findIndex((value) => value === index)
              if (index === -1) return [...prev, index]
              return prev.filter((_, i) => i !== index)
            })
          }}
          disabled={props.disabled}
        />
      ))}
    </div>
  )
}

export default FormCheckBox
