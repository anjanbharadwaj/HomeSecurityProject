var base64Img = require('base64-img');
var chokidar = require('chokidar');
const fs = require('fs-extra');
var Kairos = require('kairos-api');
var client = new Kairos('<API Key>', '<API Secret>');
var twilio = require('twilio');
var accountSid = ''; // Your Account SID from www.twilio.com/console
var authToken = '';   // Your Auth Token from www.twilio.com/console

var client1 = new twilio(accountSid, authToken);
var cloudinary = require('cloudinary');


cloudinary.config({
  cloud_name: '<cloud name found on cloudinary portal>',
  api_key: '<api key found on cloudinary>',
  api_secret: '<api secret found on cloudinary>'
});
var watcher = chokidar.watch('directory where images are being posted on watchman.js, in this case it is in the video directory in this HomeSecurityProject directory', {ignored: /[\/\\]\./, persistent: true});

watcher
  .on('add', function(path)
  {

    base64Img.base64(path, function(err, data) {

    var params = {
      image: data,
      gallery_name: 'friends',
    };
    client.recognize(params).then(function(result) {
      var aaa = JSON.stringify(result);
      console.log(aaa);
      if(aaa.indexOf("success")==-1 && aaa.indexOf("failure")!=-1){
        console.log("Stranger Alert");
        cloudinary.uploader.upload(path, function(result) {


          console.log(result)
          var xy = "Stranger spotted! View the stranger's picture at: "
          xy += result.url
          client1.messages.create({
              body: xy,
              to: '<Number to text, with a + at the beginning>',  // Text this number
              from: 'Number sending the text, with a + at the beginning'//, // From a valid Twilio number
          })
          .then((message) => console.log(message.sid));
          fs.remove(path, err => {
            if (err) return console.error(err)

            console.log('success!')

          })
        });

    }else{
      fs.remove(path, err => {
        if (err) return console.error(err)

        console.log('success!')
      })
    }
    console.log("Nope");
    }).catch(function(err) { console.log(err);});
  })

  })
  .on('addDir', function(path) {console.log('Directory', path, 'has been added');})
  .on('change', function(path) {console.log('File', path, 'has been changed');})
  .on('unlink', function(path) {console.log('File', path, 'has been removed');})
  .on('unlinkDir', function(path) {console.log('Directory', path, 'has been removed');})
  .on('error', function(error) {console.error('Error happened', error);})
