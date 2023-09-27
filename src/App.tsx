import { ConstantRepository, ProductionRepository } from "@Repo/index";
import router from "@Routes/app_routes";
import Aos from "aos";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";

function App() {
  /// Constant repository
  const constantRepo = new ConstantRepository();

  /// Production repository
  const productionRepo = new ProductionRepository();

  /// Get langauges & production
  const getConstants = async () => {
    constantRepo.getLanguages();
    productionRepo.getProduction();
  };

  /// Initialize Applicaiton
  useEffect(() => {
    Aos.init();
    getConstants();
  }, []);

  return (
    <>
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </>
  );
}

export default App;
