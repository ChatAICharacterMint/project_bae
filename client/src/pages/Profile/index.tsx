import React, {Suspense} from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from "@/components/Loading";

const Account = React.lazy(() => import("./Account"))
const Membership = React.lazy(() => import("./Membership"))
const Wallet = React.lazy(() => import("./Wallet"))
const InviteToEarn = React.lazy(() => import("./InviteToEarn"))

const Profile: React.FC = () => {

  return (
    <div className="w-full flex">
      <div className="w-[320px] h-screen flex flex-col gap-4 pl-4 pr-6 pt-8">
          <div className="flex items-center justify-between">
              <span className="text-[32px] font-semibold">
                  Profile
              </span>
          </div>
      </div>
      <div className="flex-grow h-screen">
        <Routes>
            <Route path="/" element={
                <Suspense fallback={<Loading />}>
                    <Account />
                </Suspense>
            }/>
            <Route path="/membership" element={
                <Suspense fallback={<Loading />}>
                    <Membership />
                </Suspense>
            }/>
            <Route path="/wallet" element={
                <Suspense fallback={<Loading />}>
                    <Wallet />
                </Suspense>
            }/>
            <Route path="/invite" element={
                <Suspense fallback={<Loading />}>
                    <InviteToEarn />
                </Suspense>
            }/>
        </Routes>
      </div>
    </div>
  )
};

export default Profile;
 