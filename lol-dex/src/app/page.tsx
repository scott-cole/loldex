'use client'

import Image from "next/image";
import { Data } from "@/components/Data";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { championsAPI } from "./api/apiSlice";

export default function Home() {
  return (
    <Provider store={store}>
      <ApiProvider api={championsAPI}>
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <Image
              className="dark:invert"
              src="/lol.svg"
              alt="Lol Logo"
              width={180}
              height={38}
              priority
            />
            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <Data />
            </div>
          </main>
        </div>
      </ApiProvider>
    </Provider>
  );
}
