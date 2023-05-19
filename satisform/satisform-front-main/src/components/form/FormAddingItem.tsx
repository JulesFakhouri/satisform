import { IconButton } from '@material-tailwind/react'
import { useAtom } from 'jotai'
import { Fragment } from 'react'
import { FaArrowDown, FaArrowUp, FaTrashAlt } from 'react-icons/fa'
import type { z } from 'zod'
import type { zodForm } from '../../interface'
import { machineFormAtom } from '../../state'
import FormCheckBox from './FormCheckBox'
import FormRadio from './FormRadio'
import FormText from './FormText'
import FormTextArea from './FormTextArea'

interface Props {
  formItem: Omit<z.infer<typeof zodForm>, 'id'>
  index: number
  indexMax: number
}

const FormAddingItem = (props: Props): JSX.Element => {
  const [, send] = useAtom(machineFormAtom)

  return (
    <div className="flex items-center gap-x-4">
      <Fragment>
        {props.formItem.form.type === 'text' && (
          <FormText formItem={props.formItem} disabled />
        )}
        {props.formItem.form.type === 'textarea' && (
          <FormTextArea formItem={props.formItem} disabled />
        )}
        {props.formItem.form.type === 'radio' && (
          <FormRadio formItem={props.formItem} disabled />
        )}
        {props.formItem.form.type === 'checkbox' && (
          <FormCheckBox formItem={props.formItem} disabled />
        )}
      </Fragment>
      <div className="flex flex-col gap-y-1">
        <IconButton
          className="ml-auto w-6 h-6"
          color="red"
          onClick={() => {
            send({ type: 'DELETE_ADD_FORM', index: props.index })
          }}
        >
          <FaTrashAlt />
        </IconButton>
        <IconButton
          className="ml-auto w-6 h-6"
          color="blue-gray"
          onClick={() => {
            if (props.index === 0) return
            send({
              type: 'REORDER_ADD_FORM',
              activeIndex: props.index,
              overIndex: props.index - 1,
            })
          }}
        >
          <FaArrowUp />
        </IconButton>
        <IconButton
          className="ml-auto w-6 h-6"
          color="blue-gray"
          onClick={() => {
            if (props.index === props.indexMax) return
            send({
              type: 'REORDER_ADD_FORM',
              activeIndex: props.index,
              overIndex: props.index + 1,
            })
          }}
        >
          <FaArrowDown />
        </IconButton>
      </div>
    </div>
  )
}

export default FormAddingItem
