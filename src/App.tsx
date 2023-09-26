import { ConstantRepository } from "@Repo/index";
import router from "@Routes/app_routes"
import Aos from "aos";
import { useEffect } from "react"
import { RouterProvider } from "react-router-dom"


function App() {

  /// Constant repository
  const constantRepo = new ConstantRepository();

  /// Get langauges
  const getLanguages = async () => {
    constantRepo.getLanguages();
  }

  /// Initialize Applicaiton
  useEffect(() => {
    getLanguages();
    Aos.init();
  }, [])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
