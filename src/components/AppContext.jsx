"use client";

const { SessionProvider } = require("next-auth/react");

export default ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
