import React from "react";
import routes from "./router";
import { useRoutes } from "react-router-dom";
import { AppWrapper } from "./style";
import Header from "./views/header";
import Footer from "./views/footer";

function App() {
  const router = useRoutes(routes);
  const path = router?.props.match.route.path !== "/main";

  return (
    <AppWrapper>
      {path? <Header/>: null }
      {useRoutes(routes)}
      {path? <Footer/>: null }
   
    </AppWrapper>
  );
}

export default App;
