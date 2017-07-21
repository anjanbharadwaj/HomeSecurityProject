
var request = require("request");
var MjpegConsumer = require("mjpeg-consumer");
var FileOnWrite = require("file-on-write");
var Limiter = require("write-limiter")


var writer = new FileOnWrite({
  path: './video',
  ext: '.jpg',
  filename: function(image) {
    return '<generic image name, since we will delete all images after they are taken';
  },
  transform: function(image) {
    return image.data;
  },
  sync: true
});

var limiter = new Limiter(10000);

var consumer = new MjpegConsumer();
var options = {
  url: "<url to the network camera>",

};


request(options).pipe(consumer).pipe(limiter).pipe(writer);
