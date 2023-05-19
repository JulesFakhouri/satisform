import axios from 'axios'
import { useEffect, useState } from 'react'
import type { AxiosInstance } from 'axios'
import { useNavigate } from 'react-router'

export const axiosBack = axios.create({
  baseURL: import.meta.env.VITE_BACK_URL,
})

export const axiosBackAuth = (): AxiosInstance =>
  axios.create({
    baseURL: import.meta.env.VITE_BACK_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken') ?? ''}`,
    },
  })

export const useVerifySuperAdmin = (): boolean => {
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    void (async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken')
        if (accessToken === null) {
          navigate('/super-admin/login')
        }
        await axiosBackAuth().get('/super-admin/verify')
        setIsLogin(true)
      } catch (err) {
        console.error(err)
        navigate('/super-admin/login')
      }
    })()
  }, [navigate])
  return isLogin
}

export const classNameDisabledForm = (disabled?: boolean): string =>
  `${
    disabled !== undefined && disabled
      ? 'border border-dashed px-4 py-2 rounded text-gray-400'
      : ''
  }`

export const responseToCsv = (responses: string[][]): string => {
  const csv = responses.map((response) => response.join(',')).join('\n')
  return csv
}
