import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

// export const UserProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const logIn = () => {
//     setIsLoggedIn(true);
//   };

//   const logOut = () => {
//     setIsLoggedIn(false);
//   };

//   return (
//     <UserContext.Provider value={{ isLoggedIn, logIn, logOut }}>
//       {children } 
//     </UserContext.Provider>
//   );
// };
