import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Loading from "@/components/Loading";
import NotFound from '@/pages/NotFound';
import Chat from "@/pages/Chat";
import Profile from "@/pages/Profile";

/** Router */
export function Router() {
    return useRoutes([
        {
            path: "/",
            element: 
            <Suspense fallback={<Loading />}>
                <Chat />
            </Suspense>,
        },
        {
            path: "/settings",
            element: 
            <Suspense fallback={<Loading />}>
                <Profile />
            </Suspense>,
        },
        {
            path: '*',
            element: <NotFound />
        }
    ]);
}
