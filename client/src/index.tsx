import 'regenerator-runtime/runtime'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import Loading from '@/pages/Loading';
import { AppContextProvider } from '@/contexts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AppContextProvider>
    <React.Suspense fallback={<Loading />} >
      <App />
    </React.Suspense>
  </AppContextProvider>
);