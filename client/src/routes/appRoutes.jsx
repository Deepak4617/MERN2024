import { Routes, Route } from "react-router-dom";

import NavbarComponent from "../components/navbar";
import PageNotFound from "../components/pageNotFound";

import ProtectedRoute from "./protectedRoute";
import AdminRoute from "./adminRoute";

import * as Pages from "../pages";
import * as Admin from "../components/layouts";

const AppRoutes = () => {

  return (
    <>
      <NavbarComponent />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Pages.Login />} />
        <Route path="/register" element={<Pages.Register />} />

        {/* AUTHENTICATED USER ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Pages.Home />} />
          <Route path="/about" element={<Pages.About />} />
          <Route path="/contact" element={<Pages.Contact />} />
          <Route path="/service" element={<Pages.Service />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Admin.AdminLayout />}>
            <Route path="users" element={<Pages.AdminUser />} />
            <Route path="contacts" element={<Pages.AdminContact />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
