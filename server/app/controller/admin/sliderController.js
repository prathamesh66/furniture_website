const { mySlug } = require("../../config/helper");
const { sliderModel } = require("../../model/sliderModel");



let createSlider = async (req, res) => {
  let obj = { ...req.body };

  //this 2 line for the slug-> slug means the dynamic value created by using the sliderTitle in the url

  let slug = mySlug(obj.sliderTitle);

  obj["slug"] = slug;

  // and this code for the access the file  image related info in the req.file

  if (req.file) {
    if (req.file.filename) {
      obj["sliderImage"] = req.file.filename;
    }
  }

  try {
    let slider = sliderModel(obj);

    let sliderRes = await slider.save();

    res.send({
      _status: true,
      _message: "Slider Created",
      sliderRes,
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


let viewSlider = async (req, res) => {
  let filter = {
    isDeleted: false,
  };

  let sliderData = await sliderModel.find(filter);

  res.send({
    _status: true,
    _message: "Slider View",
    path: process.env.CATEGORYPATH,
    sliderData,
  });
};

let updateSlider = async (req, res) => {

  let {id} = req.params

  let obj = { ...req.body };

  //this 2 line for the slug-> slug means the dynamic value created by using the sliderTitle in the url

  let slug = mySlug(obj.sliderTitle);

  obj["slug"] = slug;

  // and this code for the access the file  image related info in the req.file

  if (req.file) {
    if (req.file.filename) {
      obj["sliderImage"] = req.file.filename;
    }
  }

  try {
    let slider = sliderModel(obj);

    let sliderRes = await slider.save();

    res.send({
      _status: true,
      _message: "Slider Created",
      sliderRes,
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

  let details = await sliderModel.findOne({ _id: id });

  res.send({
    _status: true,
    _message: "Slider Details",
    details,
  });
};

let deleteSlider = async (req, res) => {
  let { id } = req.params;

  let deleteData = await sliderModel.updateOne(
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
    _message: "Slider Deleted",
    deleteData,
  });
};

// this is the soft delete multi delete api

let multiDeleteSlider = async (req, res) => {
  let { ids } = req.body; // {ids: [id1,id2]}

  let deleteData = await sliderModel.updateMany(
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
    _message: "Slider Deleted",
    deleteData,
  });
};

let changeStatusSlider = async (req, res) => {
  let { ids } = req.body; // {ids: [id1,id2]}

  let statusChange = await sliderModel.updateMany(
    { _id: ids },
    [
      {
        $set: {
          sliderStatus: {
            $not: "$sliderStatus",
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
    _message: "Slider Status Changed",
    statusChange,
  });
};


module.exports = {
  createSlider,
  viewSlider,
  updateSlider,
  getDetails,
  deleteSlider,
  multiDeleteSlider,
  changeStatusSlider,
};