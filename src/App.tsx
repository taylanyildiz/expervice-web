import { ConstantRepository, ProductionRepository } from "@Repo/index";
import router from "@Routes/app_routes";
import Aos from "aos";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import DialogProvider from "@Utils/hooks/dialog_hook";

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
    <SnackbarProvider>
      <DialogProvider>
        <RouterProvider router={router} />
      </DialogProvider>
    </SnackbarProvider>
  );
}

export default App;
