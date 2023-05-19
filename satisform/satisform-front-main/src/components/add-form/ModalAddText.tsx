import { Checkbox, Textarea } from '@material-tailwind/react'
import { useAtom } from 'jotai'
import { useCallback, useState } from 'react'
import { machineFormAtom } from '../../state'
import Modal from '../common/Modal'

const ModalAddText = (): JSX.Element => {
  const [, send] = useAtom(machineFormAtom)
  const [label, setLabel] = useState('')
  const [required, setRequired] = useState(false)
  const onClickAnnuler = useCallback(() => {
    send('CANCEL_ADD_FORM')
  }, [send])
  const onClickValider = useCallback(() => {
    if (label === '') return
    send({
      type: 'ADD_FORM_TEXT',
      form: {
        label,
        form: {
          required,
          type: 'text',
        },
      },
    })
  }, [send, label, required])
  return (
    <Modal
      title="Ajouter un champ texte simple"
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

export default ModalAddText
