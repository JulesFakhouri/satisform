import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import InteractiveForm from './page/InteractiveForm'
import SuperAdmin from './page/SuperAdmin'
import SuperAdminLogin from './page/SuperAdminLogin'

const Router = (): JSX.Element => (
  <div className="w-screen h-screen container mx-auto py-8 px-4">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/super-admin" element={<SuperAdmin />} />
      <Route path="/super-admin/login" element={<SuperAdminLogin />} />
      <Route path="/view/:id" element={<InteractiveForm />} />
    </Routes>
  </div>
)

export default Router
