import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Loading from "@/pages/Loading";
import NotFoundPage from '@/pages/NotFound';
import Character from "@/pages/Character";
import Settings from "@/pages/Settings";

/** Router */
export function Router() {
    return useRoutes([
        {
            path: "/",
            element: 
            <Suspense fallback={<Loading />}>
                <Character />
            </Suspense>,
        },
        {
            path: "/settings",
            element: 
            <Suspense fallback={<Loading />}>
                <Settings />
            </Suspense>,
        },
        {
            path: '*',
            element: 
            <Suspense fallback={<Loading />}>
                <NotFoundPage />
            </Suspense>,
        }
    ]);
}
