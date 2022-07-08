const Test = require("../models/test");

exports.getCenters = (req, res) => {
  Test.find(function (err, test) {
    if (err) res.send(err);
    let testdata = test.reverse(); //reversed data here to perform uniformity as data is reversed in post API
    res.json(testdata);
  });
};

exports.getCenter = (req, res) => {
  let id = req.params.id;
  Test.findById(id, function (err, test) {
    if (err) res.send(err);

    res.json(test);
  });
};

exports.createCenter = (req, res) => {
  console.log("add center", req.body);
  //check if req.body is empty
  if (!Object.keys(req.body).length) {
    res.status(400).json({
      message: "Request body cannot be empty",
    });
  }
  // create mongoose method to create a new record into collection
  Test.create(
    {
      title: req.body.title,
      phone: req.body.phone,
    },
    function (err, center) {
      if (err) res.send(err);

      // get and return all the centers after newly created center record
      Test.find(function (err, centers) {
        if (err) res.send(err);
        let testData = centers.reverse(); //reversed the data so that changes can be viewed upon adding new user.
        res.json(testData);
      });
    }
  );
};

exports.updateCenter = (req, res) => {
  // create mongose method to update a existing record into collection
  let id = req.params.id;
  var data = {
    title: req.body.title,
    phone: req.body.phone,
  };
  Test.findByIdAndUpdate(id, data, function (err, center) {
    if (err) throw err;

    res.send("Center updated - " + center.title);
  });
};

exports.deleteCenter = (req, res) => {
  console.log(req.params.id);
  let id = req.params.id;
  Test.deleteOne(
    {
      _id: id,
    },
    function (err) {
      if (err) res.send(err);
      else res.send("Center deleted.");
    }
  );
};
