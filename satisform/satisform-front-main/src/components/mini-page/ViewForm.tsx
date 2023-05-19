import { IconButton, Input } from '@material-tailwind/react'
import { useAtom } from 'jotai'
import { useCallback, useState } from 'react'
import { FaPlus, FaSignOutAlt } from 'react-icons/fa'
import { machineFormAtom } from '../../state'
import FormsItem from '../form/FormsItem'
import { useNavigate } from 'react-router'

const ViewForm = (): JSX.Element => {
  const navigate = useNavigate()
  const [state, send] = useAtom(machineFormAtom)
  const [search, setSearch] = useState('')
  const { forms, responses } = state.context
  const onClickAdd = useCallback((): void => {
    send('SELECT_ADD_FORMS')
  }, [send])
  const onClickSignOut = useCallback((): void => {
    window.localStorage.removeItem('accessToken')
    navigate('/')
  }, [navigate])
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">Satisform</p>
        <div className="w-[300px]">
          <Input
            label="Search"
            value={search}
            onInput={(e) => {
              setSearch(e.currentTarget.value)
            }}
          />
        </div>
        <div className="flex gap-x-2">
          <IconButton onClick={onClickAdd}>
            <FaPlus className="text-lg" />
          </IconButton>
          <IconButton onClick={onClickSignOut}>
            <FaSignOutAlt className="text-lg" />
          </IconButton>
        </div>
      </div>
      <div>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b text-center border-blue-gray-100 bg-blue-gray-50 p-4">
                Nom
              </th>
              <th className="border-b text-center border-blue-gray-100 bg-blue-gray-50 p-4">
                Email
              </th>
              <th className="border-b text-center border-blue-gray-100 bg-blue-gray-50 p-4">
                Date de création
              </th>
              <th className="border-b text-center border-blue-gray-100 bg-blue-gray-50 p-4">
                Questions
              </th>
              <th className="border-b text-center border-blue-gray-100 bg-blue-gray-50 p-4">
                Réponses
              </th>
              <th className="border-b text-center border-blue-gray-100 bg-blue-gray-50 p-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(forms)
              .filter(
                (id) =>
                  new RegExp(search, 'i').test(forms[id].title) ||
                  new RegExp(search, 'i').test(forms[id].mail)
              )
              .map((id) => (
                <FormsItem
                  id={id}
                  formsItem={forms[id]}
                  key={id}
                  responses={responses[id]}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewForm
