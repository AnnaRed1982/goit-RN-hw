import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);


