import { Routes, Route } from "react-router-dom";

//* Pages
import HomePage from "../pages/home.page";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />} />
        {/* <Route path="thanks" element={<ThanksPage />} /> */}
      </Route>
    </Routes>
  );
}

export default AppRoutes;
