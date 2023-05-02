import MainLayout from '@/src/components/layout/main-layout'
import '@/styles/globals.css'
import '@/styles/general.sass'


import * as config from '../firebase/config';
import { AuthContextProvider } from '@/context/AuthContext';

export default function App({ Component, pageProps }) {

  return (
    <>
    <AuthContextProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </AuthContextProvider>
  </>
  ); 
}