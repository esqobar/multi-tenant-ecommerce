import { useAppDispatch, useAppSelector } from '@/hooks/use-store'

import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router'
import {fetchMe} from "@/store/auths/authSlice.ts";

export const ProtectedRoute = () => {
    const user = useAppSelector(state => state?.auth)
    const dispatch = useAppDispatch()


    useEffect(()=>{
        dispatch(fetchMe())
    },[])

    if (user.status === 'pending') {
        return (
            <p>Loading...</p>
        )
    }

    const isAuthenticated = Boolean(user.accessToken)
    return isAuthenticated ? <Outlet /> : <Navigate to='/auth/login' replace />
}


