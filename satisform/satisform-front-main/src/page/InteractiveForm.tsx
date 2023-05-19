import { Alert, Button } from '@material-tailwind/react'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import type { z } from 'zod'
import FormCheckBox from '../components/form/FormCheckBox'
import FormRadio from '../components/form/FormRadio'
import FormText from '../components/form/FormText'
import FormTextArea from '../components/form/FormTextArea'
import { zodFormsItem } from '../interface'
import { axiosBack } from '../utils'

const idsFinishAtom = atomWithStorage<string[]>('idsFinishAtom', [])

const InteractiveForm = (): JSX.Element => {
  const [idsFinish, setIdsFinish] = useAtom(idsFinishAtom)
  const [finish, setFinish] = useState(false)
  const params = useParams<{ id?: string }>()
  const responses = useRef<string[]>([])

  const [formsItem, setFormsItem] = useState<
    z.infer<typeof zodFormsItem> | undefined | null
  >(undefined)

  useEffect(() => {
    if (formsItem !== undefined) return
    if (params.id === undefined) return
    void (async () => {
      try {
        const formsItemRes = await axiosBack.get(`/user/${params.id ?? ''}`)
        const formItemsParse = zodFormsItem.safeParse(formsItemRes.data)
        if (!formItemsParse.success) {
          console.error(formItemsParse.error.message)
          return
        }
        setFormsItem(formItemsParse.data)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [formsItem, params])

  useEffect(() => {
    if (formsItem === undefined || formsItem === null) return
    if (params.id === undefined) return
    if (idsFinish.includes(params.id)) {
      setFinish(true)
    }
  }, [formsItem, idsFinish, params])

  const onClickValider = useCallback(() => {
    void (async () => {
      try {
        if (formsItem === undefined || formsItem === null) return
        if (params.id === undefined) return
        if (
          formsItem.forms.some(
            (form, i) =>
              (form.form.type === 'text' || form.form.type === 'textarea') &&
              form.form.required &&
              (responses.current[i] === undefined ||
                responses.current[i] === '')
          )
        ) {
          alert('Veuillez remplir tous les champs obligatoires')
          return
        }
        await axiosBack.post('/user/' + params.id, {
          responses: responses.current,
        })
        setIdsFinish([...idsFinish, params.id])
        setFinish(true)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [formsItem, idsFinish, params, setIdsFinish])

  if (params.id === undefined || formsItem === null) {
    return (
      <Alert color="red">
        La ressource demandée n&apos;existe pas ou a été supprimée
      </Alert>
    )
  }

  if (formsItem === undefined) {
    return <Alert color="blue-gray">Chargement...</Alert>
  }

  return (
    <>
      {finish ? (
        <div className="w-[350px] h-full flex justify-center items-center mx-auto">
          <Alert color="blue-gray">Vous avez rempli ce formulaire</Alert>
        </div>
      ) : (
        <form
          className="w-[350px] mx-auto flex flex-col gap-y-8"
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <p className="text-xl font-semibold">{formsItem.title}</p>
          <div className="flex flex-col gap-y-8">
            {formsItem.forms.map((formItem, index) => (
              <Fragment key={index}>
                {formItem.form.type === 'text' && (
                  <FormText
                    formItem={formItem}
                    setValue={(value) => {
                      responses.current[index] = value
                    }}
                  />
                )}
                {formItem.form.type === 'textarea' && (
                  <FormTextArea
                    formItem={formItem}
                    setValue={(value) => {
                      responses.current[index] = value
                    }}
                  />
                )}
                {formItem.form.type === 'radio' && (
                  <FormRadio
                    formItem={formItem}
                    setValue={(value) => {
                      responses.current[index] = value
                    }}
                  />
                )}
                {formItem.form.type === 'checkbox' && (
                  <FormCheckBox
                    formItem={formItem}
                    setValue={(value) => {
                      responses.current[index] = value
                    }}
                  />
                )}
              </Fragment>
            ))}
          </div>
          <Button type="submit" onClick={onClickValider}>
            Valider le formulaire
          </Button>
        </form>
      )}
    </>
  )
}

export default InteractiveForm
