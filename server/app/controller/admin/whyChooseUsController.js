const { mySlug } = require("../../config/helper");
const { whyChooseUsModel } = require("../../model/whychooseusModel");


let createWhyChooseUs = async (req, res) => {
  let obj = { ...req.body };

  //this 2 line for the slug-> slug means the dynamic value created by using the WhyChooseUsTitle in the url

  let slug = mySlug(obj.WhyChooseUsTitle);

  obj["slug"] = slug;

  // and this code for the access the file  image related info in the req.file

  if (req.file) {
    if (req.file.filename) {
      obj["WhyChooseUsImage"] = req.file.filename;
    }
  }

  try {
    let whyChooseUs = whyChooseUsModel(obj);

    let whyChooseUsRes = await whyChooseUs.save();

    res.send({
      _status: true,
      _message: "WhyChooseUs Created",
      whyChooseUsRes,
    });
  } catch (dbError) {
    // console.log("this is teh error", dbError.errors);

    let errors = [];
    let obj = {};

    for (let errorkey in dbError.errors) {
      obj[errorkey] = dbError.errors[errorkey].message;
      errors.push(obj);
      obj = {};
    }

    res.send({
      _status: false,
      _message: "Error Found...",
      errors,
    });
  }
};


let viewWhyChooseUs = async (req, res) => {
  let filter = {
    isDeleted: false,
  };

  let whyChooseUsData = await whyChooseUsModel.find(filter);

  res.send({
    _status: true,
    _message: "WhyChooseUs View",
    path: process.env.WHYCHOOSEUS,
    whyChooseUsData,
  });
};


let updateWhyChooseUs = async (req, res) => {

  let {id} = req.params

  let obj = { ...req.body };

  //this 2 line for the slug-> slug means the dynamic value created by using the WhyChooseUsTitle in the url

  let slug = mySlug(obj.WhyChooseUsTitle);

  obj["slug"] = slug;

  // and this code for the access the file  image related info in the req.file

  if (req.file) {
    if (req.file.filename) {
      obj["WhyChooseUsImage"] = req.file.filename;
    }
  }

  try {
    let whyChooseUsRes = await whyChooseUsModel.updateOne(
      {
        _id: id,
      },
      {
        $set: obj,
      },
    );

    res.send({
      _status: true,
      _message: "WhyChooseUs Updated",
      whyChooseUsRes,
    });
  } catch (dbError) {
    // console.log("this is teh error", dbError.errors);

    let errors = [];
    let obj = {};

    for (let errorkey in dbError.errors) {
      obj[errorkey] = dbError.errors[errorkey].message;
      errors.push(obj);
      obj = {};
    }

    res.send({
      _status: false,
      _message: "Error Found...",
      errors,
    });
  }
};

let getDetails = async (req, res) => {
  let { id } = req.params;

  let details = await whyChooseUsModel.findOne({ _id: id });

  res.send({
    _status: true,
    _message: "WhyChooseUs Details",
    details,
  });
};

let deleteWhyChooseUs = async (req, res) => {
  let { id } = req.params;

  let deleteData = await whyChooseUsModel.updateOne(
    { _id: id },
    {
      $set: {
        isDeleted: true,
        deletedAt: Date.now(),
      },
    },
  );

  res.send({
    _status: true,
    _message: "WhyChooseUS Deleted",
    deleteData,
  });
};

// this is the soft delete multi delete api

let multiDeleteWhyChooseUs = async (req, res) => {
  let { ids } = req.body; // {ids: [id1,id2]}

  let deleteData = await whyChooseUsModel.updateMany(
    { _id: ids },
    {
      $set: {
        isDeleted: true,
        deletedAt: Date.now(),
      },
    },
  );

  res.send({
    _status: true,
    _message: "WhyChooseUs Deleted",
    deleteData,
  });
};



let changeStatusWhyChooseUs = async (req, res) => {

  let { ids } = req.body; // {ids: [id1,id2]}

  let statusChange = await whyChooseUsModel.updateMany(
    { _id: ids },
    [
      {
        $set: {
          whyChooseUsStatus: {
            $not: "$whyChooseUsStatus",
          },
        },
      },
    ],

    {
      updatePipeline: true,
    },
  );

  res.send({
    _status: true,
    _message: "WhyChooseUs Status Changed",
    statusChange,
  });
};




module.exports = {
  createWhyChooseUs,
  viewWhyChooseUs,
  updateWhyChooseUs,
  getDetails,
  deleteWhyChooseUs,
  multiDeleteWhyChooseUs,
  changeStatusWhyChooseUs,
};