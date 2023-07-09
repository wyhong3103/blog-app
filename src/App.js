import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./page/Home";
import { Blog } from "./page/Blog";
import { Create } from "./page/Create";
import { Login } from "./page/Login";
import { Register } from "./page/Register";

export const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route 
                    path='/'
                    element={<Home/>}
                />
                <Route 
                    path='/login'
                    element={<Login/>}
                />
                <Route 
                    path='/signup'
                    element={<Register/>}
                />
                <Route 
                    path='/blog/:id'
                    element={<Blog/>}
                />
                <Route 
                    path='/create'
                    element={<Create/>}
                />
            </Routes>
        </BrowserRouter>
    )
};