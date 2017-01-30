// Below is a fast app loading script
// The script async & lazy-loads webcomponents-lite polyfill
// then checks for Polymer element
// then removes #splash div to reveal application UI in #app
(function() {

  // Wait for async loading of elements.html bundle
  var onWebComponentsLoaded = function() {
    var mainElementLink = document.querySelector('#main-element-import');
    if (mainElementLink.import && mainElementLink.import.readyState === 'complete') {
      onMainElementLoaded();
    } else {
      mainElementLink.addEventListener('load', onMainElementLoaded);
    }
  };

  // Remove #splash div and 'loading' class from body
  var onMainElementLoaded = function() {
    // Fade splash screen, then remove
    var splashEl = document.getElementById('splash');
    splashEl.parentNode.removeChild(splashEl);
  };

  var onFileUploadLoaded = function() {
    counter = 0;
    console.log('windows event listener');
    var optionsArray = [
          {
            "message": "Drag and drop files here, or click the button below.",
            "multiple": false,
            "disabled": false,
            "accept": ""
          },
          {
            "message": "Drag and drop files here, or click the button below.",
            "multiple": true,
            "disabled": false,
            "accept": ".txt,text/html,application/json"
          },
          {
            "message": "Any message can be displayed here",
            "multiple": true,
            "disabled": false,
            "accept": ".txt,text/html,application/json"
          }
        ];

      document.addEventListener('px-file-upload-files-changed', function(evt) {
        counter++;
        for(var i=1; i<=optionsArray.length; i++) {
          console.log('The px-file-upload-files-changed event has fired ' + counter + ' time(s)');
        }
      });
  }

  // load webcomponents polyfills
  if ('registerElement' in document && 'import' in document.createElement('link') && 'content' in
    document.createElement('template')) {
    // browser has web components, no need to load webcomponents polyfill
    onWebComponentsLoaded();
    onFileUploadLoaded();
  } else {
    // polyfill web components
    var polyfill = document.createElement('script');
    polyfill.async = true;
    polyfill.src = '../../bower_components/webcomponentsjs/webcomponents-lite.min.js';
    polyfill.onload = onWebComponentsLoaded;
    document.head.appendChild(polyfill);
  }

}());
