import 'regenerator-runtime/runtime'
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import Loading from '@/components/Loading';
import { AppContextProvider } from '@/contexts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AppContextProvider>
    <Suspense fallback={<Loading />} >
      <App />
    </Suspense>
  </AppContextProvider>
);