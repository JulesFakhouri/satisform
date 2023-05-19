import { Alert, Button, Input } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { z } from 'zod'
import { axiosBack, axiosBackAuth } from '../utils'

const SuperAdminLogin = (): JSX.Element => {
  const navigate = useNavigate()
  const [mail, setMail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    void (async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken')
        if (accessToken === null) {
          navigate('/super-admin/login')
        }
        await axiosBackAuth().get('/super-admin/verify')
        navigate('/super-admin')
      } catch (err) {
        console.error(err)
      }
    })()
  }, [navigate])

  const onClickLogin = async (): Promise<void> => {
    try {
      const res = await axiosBack.post('/login/super-admin', {
        mail,
        password,
      })
      const accessToken = z
        .object({
          accessToken: z.string(),
        })
        .parse(res.data)
      window.localStorage.setItem('accessToken', accessToken.accessToken)
      navigate('/super-admin')
    } catch (err) {
      console.error(err)
      setError(true)
    }
  }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-[300px] flex flex-col gap-y-8 ">
        <p className="text-2xl font-bold">Super Administrateur</p>
        {error && <Alert color="red">Erreur de connexion</Alert>}
        <div className="flex flex-col gap-y-4">
          <Input
            label="Mail"
            value={mail}
            onInput={(e) => {
              setMail(e.currentTarget.value)
            }}
          />
          <Input
            label="Mot de passe"
            type="password"
            value={password}
            onInput={(e) => {
              setPassword(e.currentTarget.value)
            }}
          />
          <Button
            className="w-full"
            onClick={() => {
              void onClickLogin()
            }}
          >
            Se connecter
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SuperAdminLogin
