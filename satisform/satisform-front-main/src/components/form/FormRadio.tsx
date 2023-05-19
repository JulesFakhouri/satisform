import { Radio } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import type { z } from 'zod'
import type { zodForm } from '../../interface'
import { classNameDisabledForm } from '../../utils'

interface Props {
  formItem: Omit<z.infer<typeof zodForm>, 'id'>
  disabled?: boolean
  setValue?: (value: string) => void
}

const FormRadio = (props: Props): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (props.formItem.form.type !== 'radio') {
      return
    }
    props.setValue?.(props.formItem.form.options[selectedIndex])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.setValue, selectedIndex])

  if (props.formItem.form.type !== 'radio')
    throw new Error('Form type is not radio')
  return (
    <div
      className={
        classNameDisabledForm(props.disabled) + ' w-full flex flex-col gap-y-4'
      }
    >
      <p>{props.formItem.label}</p>
      <div className="flex flex-col">
        {props.formItem.form.options.map((option, index) => (
          <Radio
            key={index}
            label={option}
            checked={index === selectedIndex}
            onChange={() => {
              setSelectedIndex(index)
            }}
            disabled={props.disabled}
          />
        ))}
      </div>
    </div>
  )
}

export default FormRadio
