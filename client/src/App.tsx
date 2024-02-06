import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '@/layouts';
import Loading from "@/components/Loading";
import Home from "./pages/Home";
import NotFound from '@/pages/NotFound';

const Explore = React.lazy(() => import('@/pages/Explore'))
const Chat = React.lazy(() => import('@/pages/Chat'))
const MyBae = React.lazy(() => import('@/pages/MyBae'))
const Profile = React.lazy(() => import('@/pages/Profile'))

import '@/styles/index.scss';

export default function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/explore" element={
            <Suspense fallback={<Loading />}>
                <Explore />
            </Suspense>
          }/>
          <Route path="/chat" element={
            <Suspense fallback={<Loading />}>
                <Chat />
            </Suspense>
          }/>
          <Route path="/mybae" element={
            <Suspense fallback={<Loading />}>
                <MyBae />
            </Suspense>
          }/>
          <Route path="/profile" element={
            <Suspense fallback={<Loading />}>
                <Profile />
            </Suspense>
          } />
          <Route path="*" element={ <NotFound /> }/>
        </Routes>
      </Layout>
    </Router>
  );
}