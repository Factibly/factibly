import React, { createContext, useContext, useState, Dispatch, SetStateAction } from "react";
import { BaseAlertProps } from "../common/Alert";

type AlertContextType = [BaseAlertProps | null, Dispatch<SetStateAction<BaseAlertProps | null>>];

const AlertContext = createContext<AlertContextType>([null, () => {}]);

export const AlertContextProvider = ({ children }) => {
  const [alert, setAlert] = useState<BaseAlertProps | null>(null);

  return <AlertContext.Provider value={[alert, setAlert]}>{children}</AlertContext.Provider>;
};

export const useAlert = () => {
  return useContext(AlertContext);
};
