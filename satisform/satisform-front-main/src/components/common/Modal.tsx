import { Button } from '@material-tailwind/react'
import { Fragment } from 'react'

interface Props {
  children: React.ReactNode
  title: string
  onClickAnnuler: () => void
  onClickValider: () => void
}

const Modal = (props: Props): JSX.Element => (
  <Fragment>
    <div className="bg-black bg-opacity-50 z-10 w-screen h-screen fixed top-0 left-0" />
    <div className="fixed top-0 left-0 z-20 w-full h-screen flex justify-center items-center">
      <div className="w-[350px] bg-white px-4 py-8 rounded flex flex-col gap-y-8">
        <div className="font-bold">{props.title}</div>
        <div>{props.children}</div>
        <div className="flex gap-x-4">
          <Button
            className="ml-auto"
            color="blue-gray"
            onClick={props.onClickAnnuler}
          >
            Annuler
          </Button>
          <Button onClick={props.onClickValider}>Valider</Button>
        </div>
      </div>
    </div>
  </Fragment>
)

export default Modal
