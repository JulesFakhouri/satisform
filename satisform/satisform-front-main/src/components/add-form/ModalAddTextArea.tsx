import { Checkbox, Textarea } from '@material-tailwind/react'
import { useAtom } from 'jotai'
import { useCallback, useState } from 'react'
import { machineFormAtom } from '../../state'
import Modal from '../common/Modal'

const ModalAddTextArea = (): JSX.Element => {
  const [, send] = useAtom(machineFormAtom)
  const [label, setLabel] = useState('')
  const [required, setRequired] = useState(false)
  const onClickAnnuler = useCallback(() => {
    send('CANCEL_ADD_FORM')
  }, [send])
  const onClickValider = useCallback(() => {
    if (label === '') return
    send({
      type: 'ADD_FORM_TEXTAREA',
      form: {
        label,
        form: {
          required,
          type: 'textarea',
        },
      },
    })
  }, [send, label, required])
  return (
    <Modal
      title="Ajouter un champ texte étendu"
      onClickAnnuler={onClickAnnuler}
      onClickValider={onClickValider}
    >
      <Textarea
        label="Label"
        value={label}
        onInput={(e) => {
          setLabel(e.currentTarget.value)
        }}
        autoFocus
      />
      <Checkbox
        label="Requis"
        checked={required}
        onChange={(e) => {
          setRequired(e.currentTarget.checked)
        }}
      />
    </Modal>
  )
}

export default ModalAddTextArea
