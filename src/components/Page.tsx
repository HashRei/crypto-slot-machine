import Head from "next/head";
import React, { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

export function Page({ children }: PageProps) {
  return (
    <div>
      <Head>
      <title>Web3 - Slot machine</title>
        <meta name="description" content="Web3 - Slot machine | Silvan Reigue" />
      </Head>
      {children}
    </div>
  );
}
