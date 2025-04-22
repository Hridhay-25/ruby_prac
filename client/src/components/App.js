import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./AuthForm";
import Home from "../routes/Home";
import Update from "../routes/Update";
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthForm />}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/update" element={<Update/>}/>
            </Routes>
        </BrowserRouter>
    );
}
export default App;