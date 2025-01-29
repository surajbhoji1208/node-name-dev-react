import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./component/Login"
import Profile from "./component/Profile"
import Body from "./component/Body"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./component/Feed"
import Connections from "./component/Connections"
import Requests from "./component/Requests"
import Premium from "./component/Premium"


function App() {

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/premium" element={<Premium />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
     
    </>
  )
}

export default App
