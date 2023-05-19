import { IconButton, Input, Textarea } from '@material-tailwind/react'
import { useAtom } from 'jotai'
import { useCallback, useState } from 'react'
import { MdAdd, MdRemove } from 'react-icons/md'
import { machineFormAtom } from '../../state'
import Modal from '../common/Modal'

const ModalAddRadio = (): JSX.Element => {
  const [, send] = useAtom(machineFormAtom)
  const [label, setLabel] = useState('')
  const [currentOption, setCurrentOption] = useState('')
  const [options, setOptions] = useState<string[]>([])
  const onClickAnnuler = useCallback(() => {
    send('CANCEL_ADD_FORM')
  }, [send])
  const onClickValider = useCallback(() => {
    if (label === '') return
    if (options.length < 2) return
    send({
      type: 'ADD_FORM_RADIO',
      form: {
        label,
        form: {
          type: 'radio',
          options,
        },
      },
    })
  }, [label, send, options])
  return (
    <Modal
      title="Ajouter un choix unique"
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
      <div className="flex flex-col gap-y-4 pt-4">
        <p className="font-semibold">Les choix</p>
        <div className="flex flex-col gap-y-4">
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-x-2">
              <p>{option}</p>
              <IconButton
                className="ml-auto w-8 h-8"
                color="red"
                onClick={() => {
                  setOptions(options.filter((_, i) => i !== index))
                }}
              >
                <MdRemove className="text-2xl" />
              </IconButton>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-x-4">
          <Input
            label="Choix"
            value={currentOption}
            autoFocus={options.length > 0}
            onInput={(e) => {
              setCurrentOption(e.currentTarget.value)
            }}
          />
          <IconButton
            onClick={() => {
              if (currentOption === '') return
              setOptions([...options, currentOption])
              setCurrentOption('')
            }}
            className="w-8 h-8 flex-shrink-0"
          >
            <MdAdd className="text-2xl" />
          </IconButton>
        </div>
      </div>
    </Modal>
  )
}

export default ModalAddRadio
