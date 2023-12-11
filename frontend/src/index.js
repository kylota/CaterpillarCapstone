import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import Login from './components/loginComponent.js';
import SignUp from './components/signupComponent.js';
import Home from './components/homeComponent.js';
import Layout from './components/layoutComponent.js';
import Landing from './components/landingComponent.js';
import TreeDiagram from './components/digraphComponent.js';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated') === 'true'
    );

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLogin = () => {
        localStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
    };

    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            isAuthenticated ? <Navigate to="/home" replace /> : <Login onLogin={handleLogin} />
                        }
                    />
                    <Route path="/signup"
                        element={
                            <SignUp />
                        }
                    />
                    <Route path="/"
                        element={
                            isAuthenticated ? (
                                <Home onLogout={handleLogout} />
                            ) : (
                                <Navigate to="/landing" replace />
                            )
                        }
                    />
                    <Route path="/home"
                        element={
                            isAuthenticated ? (
                                <Home onLogout={handleLogout} />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                    <Route path="/landing"
                        element={
                            <Landing />
                        }
                    />
                    <Route path="/login"
                        element={
                            <Login />
                        }
                    />
                    <Route path="/signup"
                        element={
                            <SignUp />
                        }
                    />
                    <Route path="/tree/:employeeID"
                        element={
                            isAuthenticated ? (
                                <TreeDiagram />
                            ) : (
                                <Navigate to="/login" replace /> // Redirect to the login page if not authenticated
                            )
                        }
                    />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

export default App;