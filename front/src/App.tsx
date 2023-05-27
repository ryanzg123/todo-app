import './styles/App.css';
import Layout from './layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/dashboard';

let router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Dashboard />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
