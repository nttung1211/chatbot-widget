
const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/chatbot-widget/runtime.js',
    './dist/chatbot-widget/polyfills.js',
    './dist/chatbot-widget/main.js'
  ];

  await fs.ensureDir('elements');
  await concat(files, 'elements/chatbot-widget.js');

}) ();