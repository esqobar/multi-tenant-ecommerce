import {Route, Routes} from "react-router";
import AuthLayouts from "@/layouts/AuthLayouts.tsx";
import LoginPage from "@/pages/auths/LoginPage.tsx";
import {ForgotPasswordPage} from "@/pages/auths/ForgotPasswordPage.tsx";
import {VerifyForgotOtpPage} from "@/pages/auths/VerifyForgotOtpPage.tsx";
import {ResetPasswordPage} from "@/pages/auths/ResetPasswordPage.tsx";
import {DashboardLayouts} from "@/layouts/DashboardLayouts.tsx";
import {DashboardPage} from "@/pages/dashboards/DashboardPage.tsx";
import {ProtectedRoute} from "@/components/ProtectedRoute.tsx";
import {SellersPage} from "@/pages/dashboards/sellers/SellersPage.tsx";
import {CommissionPayoutPage} from "@/pages/dashboards/commission-payouts/CommissionPayoutPage.tsx";
import {ProfileDetailsPage} from "@/pages/accounts/ProfileDetailsPage.tsx";

export default function Routers() {
    return (
        <Routes>

            {/****Auth Section */}
            <Route path="auth" element={<AuthLayouts />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="forgot-password" element={<ForgotPasswordPage />} />
                <Route path="forgot-password/otp" element={<VerifyForgotOtpPage />} />
                <Route path="reset-password" element={<ResetPasswordPage />} />
                {/*<Route path="2fa" element={<Verify2AaOTP />} />*/}
            </Route>

            {/***Dashboard*/}
            <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<DashboardLayouts />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="sellers" element={<SellersPage />} />
                    <Route path="commission-payouts" element={<CommissionPayoutPage />} />
                    <Route path="my-account" element={<ProfileDetailsPage />} />

                </Route>
            </Route>


        </Routes>
    )
}