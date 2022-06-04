import Head from "next/head"
import React, { ReactNode } from "react"
import { Navbar } from "./section/Navbar"

interface PageProps {
  children: ReactNode
}

export function Page({ children }: PageProps) {
  return (
    <div>
      <Head>
        <title>Crypto - Slot machine</title>
        <meta name="description" content="Crypto - Slot machine | HashRei" />
      </Head>
      <Navbar />
      {children}
    </div>
  )
}
