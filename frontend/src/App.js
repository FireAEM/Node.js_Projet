import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importation des pages
import HomePage from './pages/HomePage/HomePage';
import PatientRegisterPage from './pages/PatientRegisterPage/PatientRegisterPage';
import SoignantRegisterPage from './pages/SoignantRegisterPage/SoignantRegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider, AuthContext } from './context/AuthContext';

const AppRoutes = () => {
    const { user } = useContext(AuthContext);
    let userType = "";

    if (user) {
        switch (user.id_role) {
            case 1:
                userType = "administration";
                break;
            case 2:
                userType = "soignant";
                break;
            case 3:
                userType = "patient";
                break;
            default:
                userType = "patient";
        }
    }

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
                path="/register/patient"
                element={user ? <Navigate to={`/dashboard/${userType}`} /> : <PatientRegisterPage />}
            />
            <Route
                path="/register/soignant"
                element={user ? <Navigate to={`/dashboard/${userType}`} /> : <SoignantRegisterPage />}
            />
            <Route path="/login" element={user ? <Navigate to={`/dashboard/${userType}`} /> : <LoginPage />} />
            <Route
                path="/dashboard/*"
                element={user ? <Dashboard type={userType} user={user} /> : <Navigate to="/login" />}
            />
        </Routes>
    );
};
  
const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
};

export default App;



// import React from 'react';
// import Header from './components/Header/Header';
// import HeroSection from './components/HeroSection/HeroSection';
// import AdvantageSection from './components/AdvantagesSection/AdvantagesSection';
// import ContactSection from './components/ContactSection/ContactSection';
// import FooterSection from './components/FooterSection/FooterSection';


// const App = () => {
//     return (
//         <div>
//             <Header />
//             <main>
//                 <HeroSection />
//                 <AdvantageSection />
//                 <ContactSection />
//             </main>
//             <FooterSection />
//         </div>
//     );
// };

// export default App;



// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
