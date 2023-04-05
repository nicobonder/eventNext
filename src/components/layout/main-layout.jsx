import React from 'react'
import { Header } from '../header/header'
import { Footer } from '../footer/footer'

export default function MainLayout({ children }) {
  return (
    <div>
        <>
            <Header />
            <main>
              {children}
            </main>
            <Footer />
        </>
    </div>
  )
}
