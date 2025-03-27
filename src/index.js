import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/Authprovider';

// Function to add AdSense script to the head
function addAdSenseScript() {
  const script = document.createElement('script');
  script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7459200310134436";
  script.async = true;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
}

function addScriptsToHead() {
  const script1 = document.createElement('script');
  script1.src = "https://cdn.amplitude.com/libs/analytics-browser-2.7.4-min.js.gz";
  script1.async = true;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.src = "https://cdn.amplitude.com/libs/plugin-session-replay-browser-1.4.1-min.js.gz";
  script2.async = true;
  document.head.appendChild(script2);

  const script3 = document.createElement('script');
  script3.src = "https://cdn.amplitude.com/libs/plugin-autocapture-browser-0.9.0-min.js.gz";
  script3.async = true;
  document.head.appendChild(script3);

  const inlineScript = document.createElement('script');
  inlineScript.innerHTML = `
    window.amplitude.add(window.sessionReplay.plugin({sampleRate: 1})).promise.then(function() {
      window.amplitude.add(window.amplitudeAutocapturePlugin.plugin());
      window.amplitude.init('6b210a83fe67b572ef721d79136b7482');
    });
  `;
  document.head.appendChild(inlineScript);
};

// Conditionally load AdSense script in production environment
if (process.env.NODE_ENV === 'production') {
  addAdSenseScript();
}
// addScriptsToHead();

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

