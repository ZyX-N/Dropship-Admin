import React, { useState } from "react";
import ProContext from "./createContext";

const ContextProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const contextValues = { sidebarOpen, setSidebarOpen };

  return (
    <ProContext.Provider value={contextValues}>{children}</ProContext.Provider>
  );
};

export default ContextProvider;
