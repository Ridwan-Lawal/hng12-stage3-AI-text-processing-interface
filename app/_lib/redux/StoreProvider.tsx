"use client";

import { store, persistor } from "@/app/_lib/redux/store";
import Spinner from "@/app/_ui/Spinner";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="h-[80vh] flex items-center justify-center">
            <Spinner />
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
