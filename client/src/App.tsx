import React, {useMemo} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes';

// import { clusterApiUrl } from '@solana/web3.js';
// import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
// import {
//     // GlowWalletAdapter,
//     LedgerWalletAdapter,
//     PhantomWalletAdapter,
//     // SlopeWalletAdapter,
//     SolflareWalletAdapter,
//     // SolletExtensionWalletAdapter,
//     // SolletWalletAdapter,
//     TorusWalletAdapter,
// } from '@solana/wallet-adapter-wallets';
// import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
// import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
// import '@solana/wallet-adapter-react-ui/styles.css';

import MainLayout from '@/layouts/Main';
import '@/styles/index.scss';

export default function App() {

  // const solNetwork = WalletAdapterNetwork.Mainnet;
  // const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
  //   // initialise all the wallets you want to use
  // const wallets = useMemo(
  //     () => [
  //         new PhantomWalletAdapter(),
  //         // new GlowWalletAdapter(),
  //         // new SlopeWalletAdapter(),
  //         new SolflareWalletAdapter({ solNetwork }),
  //         new TorusWalletAdapter(),
  //         new LedgerWalletAdapter(),
  //         // new SolletExtensionWalletAdapter(),
  //         // new SolletWalletAdapter(),
  //     ],
  //     [solNetwork]
  // );

  return (
    // <ConnectionProvider endpoint={endpoint}>
    //   <WalletProvider wallets={wallets} autoConnect={true}>
    //     <WalletModalProvider>
          <BrowserRouter>
            <MainLayout>
              <Router />
            </MainLayout>
          </BrowserRouter>
    //     </WalletModalProvider>
    //   </WalletProvider>
    // </ConnectionProvider>
  );
}