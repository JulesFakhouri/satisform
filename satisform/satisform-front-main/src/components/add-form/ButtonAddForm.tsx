import { Button, ButtonGroup } from '@material-tailwind/react'
import { useAtom } from 'jotai'
import { machineFormAtom } from '../../state'

const ButtonsAddForm = (): JSX.Element => {
  const [, send] = useAtom(machineFormAtom)
  return (
    <ButtonGroup>
      <Button
        onClick={() => {
          send('SELECT_FORM_TEXT')
        }}
      >
        Text
      </Button>
      <Button
        onClick={() => {
          send('SELECT_FORM_TEXTAREA')
        }}
      >
        Area
      </Button>
      <Button
        onClick={() => {
          send('SELECT_FORM_RADIO')
        }}
      >
        Radio
      </Button>
      <Button
        onClick={() => {
          send('SELECT_FORM_CHECKBOX')
        }}
      >
        Check
      </Button>
    </ButtonGroup>
  )
}

export default ButtonsAddForm
