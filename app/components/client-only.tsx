"use client";
/**
 * Hack to work around next.js hydration
 * @see https://github.com/uidotdev/usehooks/issues/218
 */
import React from "react";

type ClientOnlyProps = {
  height?: number;
  children: React.ReactNode;
};

const ClientOnly: React.FC<ClientOnlyProps> = ({ height, children }) => {
  const isClient = typeof window !== "undefined";

  if (!isClient) {
    if (height) {
      return <div style={{ height: `${height}px` }} />;
    }

    return null;
  }

  // Render children if on client side, otherwise return null
  return isClient ? <>{children}</> : null;
};

export default ClientOnly;
