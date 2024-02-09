import React, { useContext, Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import BaeList from "@/components/BaeList";
import Loading from "@/components/Loading";
import { AppContext } from '@/contexts';

const CreateBae = React.lazy(() => import("./CreateBae"))

const MyBae: React.FC = () => {
    const context = useContext(AppContext);

    return (
        <div className="w-full flex">
            <div className="w-[320px] h-screen flex flex-col gap-4 pl-4 pr-6 pt-8">
                <div className="flex items-center justify-between">
                    <span className="text-[32px] font-semibold">
                        My BAE
                    </span>
                    <div className="">
                        0 BAE
                    </div>
                </div>
                <BaeList list={context.config.state.characters} drafts={[]} />
            </div>
            <div className="flex-grow h-screen">
                <Routes>
                    <Route path="/" element={<></>}/>
                    <Route path="/create" element={
                        <Suspense fallback={<Loading />}>
                            <CreateBae />
                        </Suspense>
                    }/>
                </Routes>
            </div>
        </div>
    )
}

export default MyBae;