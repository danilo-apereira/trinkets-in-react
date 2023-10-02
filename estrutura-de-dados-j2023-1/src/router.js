import { Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Estrutura from './pages/estrutura';

const Router = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />

            <Route exact path="/estrutura" element={<Estrutura />} />
        </Routes>
    );
}

export default Router;
