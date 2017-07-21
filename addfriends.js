var base64Img = require('base64-img');
var Kairos = require('kairos-api');
var client = new Kairos('<API Key>', '<API Secret>');

base64Img.base64('<Folder of images of friends>', function(err, data) {
//console.log(data)

var params = {
  image: data,
  subject_id: '<name of subject',
  gallery_name: 'friends',
};
client.enroll(params).then(function(result) {
  var aaa = JSON.stringify(result);
  console.log(aaa);
});

})
