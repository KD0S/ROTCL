import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/Authprovider';

// Function to add AdSense script to the head
function addAdSenseScript() {
 /* const script = document.createElement('script');
  script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7459200310134436";
  script.async = true;
  script.crossOrigin = "anonymous";*/
  //const title = document.createElement('title')
  document.title = "Your Production Title";
  //document.head.appendChild(title);
}

// Conditionally load AdSense script in production environment
if (process.env.NODE_ENV === 'production') {
  addAdSenseScript();
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
   <BrowserRouter>
      <AuthProvider>
        <Routes>  
          <Route path="/*" element={<App />}></Route>
        </Routes>
      </AuthProvider>
   </BrowserRouter>
  // </React.StrictMode>
);

