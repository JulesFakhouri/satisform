import { Button, Input } from '@material-tailwind/react'
import { useAtom } from 'jotai'
import { useCallback, useState } from 'react'
import { machineFormAtom } from '../../state'
import ButtonsAddForm from '../add-form/ButtonAddForm'
import ModalAddCheckbox from '../add-form/ModalAddCheckbox'
import ModalAddRadio from '../add-form/ModalAddRadio'
import ModalAddText from '../add-form/ModalAddText'
import ModalAddTextArea from '../add-form/ModalAddTextArea'
import FormAddingItem from '../form/FormAddingItem'

const AddForm = (): JSX.Element => {
  const [state, send] = useAtom(machineFormAtom)
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const { formsAdding } = state.context

  const onClickAddFormulaire = useCallback(() => {
    if (name === '' || mail === '') {
      return
    }
    send({
      type: 'ADD_FORMS_REQUEST',
      mail,
      name,
    })
  }, [mail, name, send])

  return (
    <div className="flex mx-auto flex-col gap-y-8 w-[350px]">
      <p className="text-xl font-bold text-center">
        Création d&apos;un formulaire
      </p>
      <Input
        label={'Nom du formulaire'}
        value={name}
        onInput={(e) => {
          setName(e.currentTarget.value)
        }}
      />
      <Input
        label={'Mail pour le formulaire'}
        value={mail}
        onInput={(e) => {
          setMail(e.currentTarget.value)
        }}
      />
      <hr />

      {formsAdding.map((formItem, index) => (
        <FormAddingItem
          key={index}
          formItem={formItem}
          index={index}
          indexMax={formsAdding.length - 1}
        />
      ))}

      {state.matches({
        ready: { adding: 'text' },
      }) && <ModalAddText />}

      {state.matches({
        ready: { adding: 'textarea' },
      }) && <ModalAddTextArea />}

      {state.matches({
        ready: { adding: 'radio' },
      }) && <ModalAddRadio />}

      {state.matches({
        ready: { adding: 'checkbox' },
      }) && <ModalAddCheckbox />}
      {state.matches({ ready: 'adding' }) && (
        <div className="flex justify-center">
          <ButtonsAddForm />
        </div>
      )}
      {formsAdding.length > 0 && (
        <Button onClick={onClickAddFormulaire}>Ajouter ce formulaire</Button>
      )}
    </div>
  )
}

export default AddForm
