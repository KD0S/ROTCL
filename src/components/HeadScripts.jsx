import React from 'react';
import { Helmet } from 'react-helmet';

const HeadScripts = () => (
  <Helmet>
    <script src="https://cdn.amplitude.com/libs/analytics-browser-2.7.4-min.js.gz"></script>
    <script src="https://cdn.amplitude.com/libs/plugin-session-replay-browser-1.4.1-min.js.gz"></script>
    <script src="https://cdn.amplitude.com/libs/plugin-autocapture-browser-0.9.0-min.js.gz"></script>
    <script>
      {`
        window.amplitude.add(window.sessionReplay.plugin({sampleRate: 1})).promise.then(function() {
          window.amplitude.add(window.amplitudeAutocapturePlugin.plugin());
          window.amplitude.init('6b210a83fe67b572ef721d79136b7482');
        });
      `}
    </script>
  </Helmet>
);

export default HeadScripts;