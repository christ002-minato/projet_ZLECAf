import { createBrowserRouter } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ProductsPage } from "./pages/ProductsPage";
import { RegisterPage } from "./pages/RegisterPage";
import { SuppliersPage } from "./pages/SuppliersPage";
import { SupplierProfilePage } from "./pages/SupplierProfilePage";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-black mb-4">404</h1>
        <p className="text-muted-foreground text-lg mb-6">Page non trouvée</p>
        <a href="/" className="text-primary hover:underline font-semibold">
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout><HomePage /></MainLayout>,
  },
  {
    path: "/products",
    element: <MainLayout><ProductsPage /></MainLayout>,
  },
  {
    path: "/products/:id",
    element: <MainLayout><ProductDetailPage /></MainLayout>,
  },
  {
    path: "/suppliers",
    element: <MainLayout><SuppliersPage /></MainLayout>,
  },
  {
    path: "/suppliers/:id",
    element: <MainLayout><SupplierProfilePage /></MainLayout>,
  },
  {
    path: "/register",
    element: <MainLayout><RegisterPage /></MainLayout>,
  },
  {
    path: "/login",
    element: <MainLayout><LoginPage /></MainLayout>,
  },
  {
    path: "*",
    element: <MainLayout><NotFoundPage /></MainLayout>,
  },
]);
