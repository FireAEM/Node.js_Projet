import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importation des pages
import HomePage from './pages/HomePage/HomePage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
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
