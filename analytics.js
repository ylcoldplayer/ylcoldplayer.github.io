// Visitor counting.
//
// Sends a pageview to GoatCounter (https://www.goatcounter.com). Nothing is
// rendered on the page; the numbers are private to the account holder and are
// read from the dashboard at https://<CODE>.goatcounter.com.
//
// GoatCounter sets no cookies and does not store visitor IP addresses, so this
// needs no consent banner in most jurisdictions.
//
// SETUP (one time):
//   1. Sign up at https://www.goatcounter.com/signup and pick a code
//      (the subdomain, e.g. "ylchen" -> https://ylchen.goatcounter.com).
//   2. Replace the value of CODE below with it.
//   3. Nothing else: every page already loads this file.
//
// Until step 2 is done this file does nothing at all.

(function () {
    'use strict';

    // ---- configuration -----------------------------------------------------

    var CODE = 'YOUR_GOATCOUNTER_CODE';

    // ---- guards ------------------------------------------------------------

    // Hosts whose traffic should never be counted: local development, private
    // network addresses, and pages opened straight off disk.
    function isLocal(hostname, protocol) {
        return protocol === 'file:' ||
            hostname === '' ||
            hostname === 'localhost' ||
            hostname === '[::1]' ||
            hostname === '::1' ||
            /^127\./.test(hostname) ||
            /^0\.0\.0\.0$/.test(hostname) ||
            /^10\./.test(hostname) ||
            /^192\.168\./.test(hostname) ||
            /^172\.(1[6-9]|2[0-9]|3[01])\./.test(hostname) ||
            /\.local$/.test(hostname);
    }

    // Whether a pageview should be sent at all.
    function shouldCount(code, hostname, protocol, dnt) {
        if (!code || code === 'YOUR_GOATCOUNTER_CODE') return false;
        if (isLocal(hostname, protocol)) return false;
        if (dnt === '1' || dnt === 'yes') return false;
        return true;
    }

    // Exported for the test in test/analytics.test.js; harmless in a browser.
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { isLocal: isLocal, shouldCount: shouldCount };
        return;
    }

    // ---- send --------------------------------------------------------------

    var dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;

    if (!shouldCount(CODE, location.hostname, location.protocol, dnt)) {
        if (CODE === 'YOUR_GOATCOUNTER_CODE') {
            console.info('[analytics] disabled: set CODE in analytics.js to start counting visitors.');
        }
        return;
    }

    window.goatcounter = { endpoint: 'https://' + CODE + '.goatcounter.com/count' };

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://gc.zgo.at/count.js';
    document.head.appendChild(s);
})();
