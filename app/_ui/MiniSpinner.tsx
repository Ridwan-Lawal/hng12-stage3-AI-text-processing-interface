"use client";

import React from "react";
import { ColorRing } from "react-loader-spinner";

export default function MiniSpinner({ color }: { color: string }) {
  return (
    <div>
      <ColorRing
        visible={true}
        height="20"
        width="20"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={Array.from({ length: 5 }, (_, i) => i + 1).map(() => color)}
      />
    </div>
  );
}
