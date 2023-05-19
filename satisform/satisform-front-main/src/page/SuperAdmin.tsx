import { Alert } from '@material-tailwind/react'
import { useAtom } from 'jotai'
import AddForm from '../components/mini-page/AddForm'
import ViewForm from '../components/mini-page/ViewForm'
import { machineFormAtom } from '../state'
import { useVerifySuperAdmin } from '../utils'

const SuperAdmin = (): JSX.Element => {
  const isLogin = useVerifySuperAdmin()
  const [state] = useAtom(machineFormAtom)

  return (
    <>
      {isLogin && (
        <div className="w-full">
          {state.matches({ ready: 'idle' }) && <ViewForm />}
          {state.matches({ ready: 'adding' }) && <AddForm />}
          {state.matches('error') && (
            <div className="flex justify-center items-center">
              <Alert color="red" className="w-[350px]">
                Erreur: Veuillez recharger la page
              </Alert>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default SuperAdmin
