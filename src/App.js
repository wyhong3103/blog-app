import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./page/Home";
import { Blog } from "./page/Blog";
import { Create } from "./page/Create";
import { Login } from "./page/Login";
import { Register } from "./page/Register";
import { ChakraProvider } from '@chakra-ui/react'

export const App = () => {
    return(
        <ChakraProvider>
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
                        path='/register'
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
        </ChakraProvider>
    )
};