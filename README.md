# HomeSecurityProject
Terms of Use:
This project was created by Anjan Bharadwaj. Feel free to use it, but I request that you don't remove the commented out sections in the code (where I explain my contributions)
APIs Used:
Kairos, Twilio, Cloudinary
NPM Packages used:
base64Img, request, MjpegConsumer, FileOnWrite, Limiter, Chokidar/FS
Background:
I created this project because I had an extra network camera (for example, the ones that come in commercial home security packages) lying around my house going to waste. This application runs on a Node.js server and allows a user to make use of their cameras efficiently. 

How to Use:
To make use of the project, first download the project to your computer (or, as I've tested it out, on your Raspberry Pi, where it makes a great practical solution). Then, upload pictures of your friends/trusted acquaintances to the "friends" folder. Next, make sure to download all necessary NPM packages, create all necessary accounts (Kairos, Twilio, Cloudinary), and input the API Keys/Secrets. Finally, adjust the code if necessary. 
When using, first run the addfriends.js program to add whichever friend(s) you want to your personal gallery. Then, run the listener.js program and then the watchman.js program. Make sure your camera is in a place with good lighting (if possible) and a clear view of any subjects in front of it. 
Pictures are taken by the camera every 5 seconds (this is customizable, and you can even make it motion based, although this may cause short bursts of pictures as the motion detection is quite sensitive). If any faces are detected, the facial recognition algorithms will check if they belong to any of your friends. If not, the picture of the suspect will be uploaded to your personal Cloudinary image bin, and you will receive a text alerting you that a stranger was spotted, along with their image. Finally, the images are deleted (at any given time, there is at most 1 picture in the 'video' directory, thus reducing clutter on your computer).

More information about how the code works, how to use the project, etc will be added in the days to come!

Enjoy!
