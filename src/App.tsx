import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { routeType } from "./types";
import { BrowserRouter, Routes } from "react-router-dom";
import APP_ROUTES from "./routes/routes";
import { Header } from "./components";
import { BackTop } from "antd";

function App() {
  const style: React.CSSProperties = {
    height: 40,
    width: 40,
    lineHeight: "40px",
    borderRadius: "50%",
    backgroundColor: "black",
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  };
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          {APP_ROUTES.map((route: routeType, index: number) => (
            <Route key={index} path={route.path} element={route.component}>
              {route.children &&
                route.children.map(
                  (childRoute: routeType, indexChild: number) => (
                    <Route
                      key={indexChild}
                      path={childRoute.path}
                      element={childRoute.component}
                    />
                  )
                )}
            </Route>
          ))}
        </Routes>
        <BackTop>
          <div style={style}>Up</div>
        </BackTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
