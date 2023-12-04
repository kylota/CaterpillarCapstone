import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import Login from './components/loginComponent.js';
import SignUp from './components/signupComponent.js';
import Home from './components/homeComponent.js';
import Layout from './components/layoutComponent.js';
import Landing from './components/landingComponent.js'; // Import the landing page component
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
                    }
                />
                <Route path="/signup" element={<SignUp />} />
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <Layout>
                                <Home />
                            </Layout>
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/landing"
                    element={
                        <Layout>
                            <Landing />
                        </Layout>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <Layout>
                            <Login />
                        </Layout>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <Layout>
                            <SignUp />
                        </Layout>
                    }
                />
                <Route
                    path="/home"
                    element={
                        <Layout>
                            <Home />
                        </Layout>
                    }
                />
            </Routes>
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