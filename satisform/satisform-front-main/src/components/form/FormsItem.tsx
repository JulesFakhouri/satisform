import { IconButton } from '@material-tailwind/react'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import { FaEye, FaFileCsv, FaTrashAlt } from 'react-icons/fa'
import type { z } from 'zod'
import type { zodFormsItem, zodResponse } from '../../interface'
import { machineFormAtom } from '../../state'
import { axiosBackAuth, responseToCsv } from '../../utils'
import { useNavigate } from 'react-router-dom'

interface Props {
  id: string
  formsItem: z.infer<typeof zodFormsItem>
  responses: Array<z.infer<typeof zodResponse>> | undefined
}

const FormsItem = (props: Props): JSX.Element => {
  const navigate = useNavigate()
  const [, send] = useAtom(machineFormAtom)
  return (
    <tr className="even:bg-blue-gray-50/50">
      <td className="p-4 text-center font-medium">{props.formsItem.title}</td>
      <td className="p-4 text-center">{props.formsItem.mail}</td>
      <td className="p-4 text-center">
        {dayjs(props.formsItem.date).format('DD/MM/YYYY HH:mm')}
      </td>
      <td className="p-4 text-center font-semibold">
        {props.formsItem.forms.length}
      </td>
      <td className="p-4 text-center font-semibold">
        {props.responses?.length ?? 0}
      </td>
      <td className="p-4 text-center flex gap-x-1">
        <IconButton
          className="w-8 h-8"
          onClick={() => {
            navigate(`/view/${props.id}`)
          }}
        >
          <FaEye className="text-lg" />
        </IconButton>
        <IconButton
          className="w-8 h-8"
          onClick={() => {
            const fileName = `${props.formsItem.title}.csv`
            const csv = responseToCsv(props.responses ?? [])
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
            const link = document.createElement('a')
            const url = URL.createObjectURL(blob)
            link.setAttribute('href', url)
            link.setAttribute('download', fileName)
            link.style.visibility = 'hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          }}
        >
          <FaFileCsv className="text-lg" />
        </IconButton>
        <IconButton
          color="red"
          className="w-8 h-8"
          onClick={() => {
            void (async () => {
              try {
                if (confirm('Voulez-vous vraiment supprimer ce formulaire ?')) {
                  await axiosBackAuth().delete(`super-admin/forms/${props.id}`)
                  send({
                    type: 'DELETE_FORMS',
                  })
                }
              } catch (e) {
                console.error(e)
              }
            })()
          }}
        >
          <FaTrashAlt className="text-lg" />
        </IconButton>
      </td>
    </tr>
  )
}

export default FormsItem
