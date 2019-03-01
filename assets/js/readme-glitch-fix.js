const fs = require('fs');
require('dotenv').config();

var glitchReadMeText = "### Hello and welcome to the Vimeo A-Frame component examples 👋🏼 \n Have a look at our [Getting Started guide](https://github.com/vimeo/aframe-vimeo-component/wiki/Getting-Started-%F0%9F%9A%80), or check out the [full documentation in Github](https://github.com/vimeo/aframe-vimeo-component). \n For questions and support, [open a Github issue](https://github.com/vimeo/aframe-vimeo-component/issues/new)";

if (process.env.ENV === 'Glitch') {
  console.log('[Ops] Changing the README in Glitch to point to Github documentation');

  // Change the README to the Glitch one
  fs.writeFile('./README.md', glitchReadMeText, 'utf8', function (err) {
     if (err) return console.log(err); 
  });  
}