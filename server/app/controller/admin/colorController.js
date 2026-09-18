
// 1. this is the first function create method 

const { colorModel } = require("../../model/colorModel");


// this is the add data api 

let createColor = async (req, res) => {

  let bodyData = req.body;

  try {
      let color = colorModel(bodyData)

      let colorRes = await color.save()

      res.send({
        _status: true,
        _message: "Color Created",
        colorRes,
      });
  }

  catch(dbError) {
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
      errors
    });
  }
};

// this is the view api

let viewColor = async (req, res) => {

  let filter = {
    isDeleted: false
  }


  if(req.body != undefined) {
    // console.log(req.body)
    // console.log(req.body.colorName)
    if (req.body.colorName != undefined && req.body.colorName != "") {
      filter.colorName = req.body.colorName;
    }
  }

  let total_records = await colorModel.find(filter).countDocuments();

  let limit = 5;
  let skip = 0;
  let page = 1;

  if (req.body != undefined) {
    if (req.body.page != undefined && req.body.page != "") {
      page = req.body.page;
      skip = (page - 1) * limit
    }
  }

  let paginate = {
    total_records: total_records,
    current_page: page,
    total_pages: Math.ceil(total_records / limit),
    limit
  };
  

  let colorData = await colorModel.find(filter)
    .limit(limit)
    .skip(skip)

    .sort({
      // colorOrder: "asc",
      _id: "desc",
    });

  res.send({
    _status: true,
    _message: "Color View",
    paginate,
    colorData
  });
};



// this is the updateColor api 

let updateColor = async (req, res) => {

  let { id } = req.params

  let bodyData = req.body


  try {
      let colorRes = await colorModel.updateOne(
        {
          _id: id,
        },
        {
          $set: bodyData,
        },
      );


      res.send({
        _status: true,
        _message: "Color Updated",
        colorRes, 
      });
  }

  catch(dbError) {
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

// this is the soft delete single data delete api

let deleteColor = async (req, res) => {

  let {id} = req.params

  let deleteData = await colorModel.updateOne(
    { _id: id },
    {
      $set: {
        isDeleted: true,
        deletedAt: Date.now()
      },
    },
  );

  res.send({
    _status: true,
    _message: "Color Deleted",
    deleteData,
  });
};

// this is the soft delete multi delete api 

let multiDeleteColor = async (req,res) => {
   let {ids} = req.body // {ids: [id1,id2]}

   let deleteData = await colorModel.updateMany(
    { _id: ids },
    {
      $set: {
        isDeleted: true,
        deletedAt: Date.now()
      },
    },
  );

  res.send({
    _status: true,
    _message: "Color Deleted",
    deleteData,
  });
}


// this is the colorStatus changed api create

let changeStatusColor = async (req, res) => {
  let { ids } = req.body; // {ids: [id1,id2]}

  let statusChange = await colorModel.updateMany(
    { _id: ids },
    [
     {
      $set : {
        colorStatus : {
          $not: "$colorStatus"
        }
         
     }
    }
    ],

    {
      updatePipeline: true
    }
  );

  res.send({
    _status: true,
    _message: "Color Status Changed",
    statusChange,
  });
};



// this is used for the single getDetails when i click on the edit 

let getDetails = async (req,res) => {

  let {id} = req.params

  let details = await colorModel.findOne({_id: id})

  res.send({
    _status: true,
    _message: "Color Details",
    details
  })

}



module.exports = {
  createColor,
  updateColor,
  deleteColor,
  viewColor,
  multiDeleteColor,
  changeStatusColor,
  getDetails
};




// 2. This is the 2nd method to create the function we not use this 


// let colorController = {

//   createColor: async (req, res) => {

//   // console.log(req.body)

// // in this we declare the field

//   // let obj = {
//   //   name: req.body.color_name,
//   //   code: req.body.code
//   // }

//   // console.log(obj)


//   // in this we not declare the field

//   let obj = req.body

//   // console.log(obj)

//   // one record save
//   await colorModel(obj).save()

//   .then((result)=> {

//      res.send({
//        _status: true,
//        _message: "Color Created",
//        _data: result,
//      });

//   })
//   .catch((error)=> {
//      res.send({
//        _status: false,
//        _message: "Something Went Wrong...",
//        _error: error,
//      });
//   })

   
//   },

//   viewColor: async (req, res) => {

//    let records = await colorModel.find()

//     res.send({
//       _status: true,
//       _message: "Color View",
//       records
//     });
//   },

//   updateColor: (req, res) => {
//     res.send({
//       _status: true,
//       _message: "Color Update",
//     });
//   },

//   deleteColor: (req, res) => {
//     res.send({
//       _status: true,
//       _message: "Color Delete",
//     });
//   },
// };

// module.exports = { colorController };