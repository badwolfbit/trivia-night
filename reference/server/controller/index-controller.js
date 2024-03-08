const path = require('path');

// compression bundle
exports.compressJS = (req,res,next) => {
  req.url = req.url + ".gz";
  res.set("Content-Encoding", "gzip");
  next();
}

// other endpoints for react-routers
exports.endpoints = (req,res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'), (err) => {
    if(err){
      res.status(500).send(err);
    }
 })
}