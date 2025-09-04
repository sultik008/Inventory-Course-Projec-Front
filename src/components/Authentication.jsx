import { Route, BrowserRouter, Routes } from "react-router-dom";
import Registration from "./Registration";
import LogIn from "./Login";
import { GoogleOAuthProvider } from '@react-oauth/google';

function Auth() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/main" element={<Main/>}/>
    //   </Routes>
    // </BrowserRouter>
    <GoogleOAuthProvider clientId="284659052801-umvj9ni6vebdlpfe7b4ccku41grgj8h3.apps.googleusercontent.com">
      <LogIn></LogIn>
      <Registration></Registration>
    </GoogleOAuthProvider>
  );
}

export default Auth;
