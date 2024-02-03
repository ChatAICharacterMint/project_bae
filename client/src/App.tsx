import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes';

import Layout from '@/layouts';
import '@/styles/index.scss';

export default function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  );
}