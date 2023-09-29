import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css"
import { ThirdwebProvider } from '@thirdweb-dev/react'
import {  FantomTestnet } from "@thirdweb-dev/chains";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={FantomTestnet} clientId='f1e827afd30ae0821f7b9e0b6475cb51'>
    <App />

    </ThirdwebProvider>
  </React.StrictMode>,
)
