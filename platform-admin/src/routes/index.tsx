import {Route, Routes} from "react-router";
import AuthLayouts from "@/layouts/AuthLayouts.tsx";
import LoginPage from "@/pages/auths/LoginPage.tsx";
import {ForgotPasswordPage} from "@/pages/auths/ForgotPasswordPage.tsx";
import {VerifyForgotOtpPage} from "@/pages/auths/VerifyForgotOtpPage.tsx";
import {ResetPasswordPage} from "@/pages/auths/ResetPasswordPage.tsx";

export default function Routers() {
    return (
        <Routes>

            {/*Auth Section*/}
            <Route path='auth' element={<AuthLayouts />}>
                <Route path='login' element={<LoginPage />} />
                <Route path='forgot-password' element={<ForgotPasswordPage />} />
                <Route path='forgot-password/otp' element={<VerifyForgotOtpPage />} />
                <Route path='reset-password' element={<ResetPasswordPage />} />
            </Route>

            {/*Dashboard Section*/}
        </Routes>
    )
}