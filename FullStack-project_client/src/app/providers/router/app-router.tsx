import { Route, Routes } from "react-router";
import { AppLayout } from "../../layouts/app-layout";
import { AuthLayout } from "../../layouts/auth-layout";
import { BrowserRouter } from "react-router";
import { NotFoundPage } from "@/pages/errors/not-found-page";
import { LoginPage } from "@/pages/auth/login-page";
import {
  RedirectIfAuthed,
  RequireAuth,
  RequireRole,
  RootRedirect,
} from "./guards";
import { UsersPage } from "@/pages/admin-panel";
import { PaymentsPage } from "@/pages/payments/payments-page";
import { ReportsPage } from "@/pages/reports/reports-page";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route element={<RedirectIfAuthed />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Route>

        <Route element={<RequireAuth />}>
          <Route element={<AppLayout />}>
            <Route element={<RequireRole roles={["ADMIN"]} />}>
              <Route path="/admin-panel" element={<UsersPage />} />
            </Route>
            <Route element={<RequireRole roles={["ADMIN", "PAYMENT"]} />}>
              <Route path="/payments" element={<PaymentsPage />} />
            </Route>
            <Route element={<RequireRole roles={["ADMIN", "REPORTS"]} />}>
              <Route path="/reports" element={<ReportsPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
