import { Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'

const Home = (): JSX.Element => (
  <div className="w-full h-screen flex flex-col gap-y-8 gap-x-4 justify-center items-center">
    <p className="text-4xl font-bold text-center">Satisform</p>
    <div className="w-[300px] flex flex-col gap-y-4">
      <Link to="/super-admin/login">
        <Button className="w-full">Super Administrateur</Button>
      </Link>
    </div>
  </div>
)

export default Home
