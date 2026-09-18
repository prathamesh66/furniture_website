const bcrypt = require("bcrypt");
const { userModel } = require("../../model/authUserModel");
const saltRounds = 10;
let jwt = require("jsonwebtoken");
const { transporter } = require("../../config/helper");

let register = async (req, res) => {

    let reqObj = {...req.body}



    //store hash in your password in db

    let hash = bcrypt.hashSync(req.body.password, saltRounds);

    reqObj['password'] = hash

    // console.log(reqObj);


    try {
          let user = userModel(reqObj)
    
          let userRes = await user.save()

          let token = jwt.sign({ id: userRes._id }, process.env.TOKENKEY);

    
          res.send({
            _status: true,
            _message: "user Created",
            token,
            userRes,
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



let login = async (req,res) => {

  let {email, password} = req.body

  let checkEmail = await userModel.findOne({email})

  // console.log(checkEmail)

  if(checkEmail) {
    let dbPassword = checkEmail.password;

    if(bcrypt.compareSync(password, dbPassword)) {

      // Token Create

      let token = jwt.sign({id: checkEmail._id} , process.env.TOKENKEY);
  
      // console.log(token)

       res.send({
         _status: true,
         token,
         _message: "Login Successfully",
       });

    }
    else {
      res.send({
        _status: false,
        _message: "Invalid Password",
      });
    }
  }

  else {
    res.send({
      _status: false,
      _message: "Invalid Email ID"
    })
  }
}


// let changePassword = async (req,res) => {

//   let {oldPassword, newPassword, confirmPassword, userID} = req.body

//   // console.log(req.body)

//   let checkId = await userModel.findOne({_id: userID})

//   if(checkId) {

//     let dbPassword = checkId.password

//     if(bcrypt.compareSync(oldPassword, dbPassword)) {

//       if(newPassword==confirmPassword) {

//         let hash = bcrypt.hashSync(newPassword, saltRounds);

//         let updatePassword = await userModel.updateOne(
//           {
//             _id: userID
//           },
//           {
//             $set: {
//               password: hash
//             }
//           }
//         )

//         res.send({
//           _status: true,
//           _message: "Password Change",
//         });

//       }

//       else {
//          res.send({
//            _status: false,
//            _message: "New Password & Confirm Password Not Matched",
//          });
//       }

//     }

//     else {
//        res.send({
//          _status: false,
//          _message: "Invalid Old Password",
//        });
//     }

//   }

//   else {
//     res.send({
//       _status: false,
//       _message: "Send User Data"
//     })
//   }



//   // this work is the use repeatedly so we deifine this in the middleware and add in the route

//   // console.log(req.body)

//   // req.headers this is get the token 

//   // console.log(req.headers.authorization.split(" ")[1])


//   // so decrept the token then it is give the id

//   // let token = req.headers.authorization.split(" ")[1];

//   // let decoded = jwt.verify(token, process.env.TOKENKEY);

//   // console.log(decoded);   so this gives the id from this we get the data 


// }

let changePassword = async (req, res) => {
  let { oldPassword, newPassword, confirmPassword } = req.body;

  let userID = req.userID;

  let checkId = await userModel.findOne({
    _id: userID,
  });

  if (checkId) {
    let dbPassword = checkId.password;

    if (bcrypt.compareSync(oldPassword, dbPassword)) {
      if (newPassword == confirmPassword) {
        let hash = bcrypt.hashSync(newPassword, saltRounds);

        await userModel.updateOne(
          {
            _id: userID,
          },
          {
            $set: {
              password: hash,
            },
          },
        );

        res.send({
          _status: true,
          _message: "Password Change",
        });
      } else {
        res.send({
          _status: false,
          _message: "New Password & Confirm Password Not Matched",
        });
      }
    } else {
      res.send({
        _status: false,
        _message: "Invalid Old Password",
      });
    }
  } else {
    res.send({
      _status: false,
      _message: "Send User Data",
    });
  }
};

let forgotPassword = async (req,res) => {

  let {email} = req.body

  let checkEmail = await userModel.findOne({email})

  if(checkEmail) {

    // mail -> Reset Password Link

    await transporter.sendMail({
      from: '"Online Shop (Furniture)" <prathamdeshmukh81@gmail.com>', // sender address
      to: email, // list of recipients
      subject: "Forgot Password Mail", // subject line
      // text: "Hello world?", // plain text body
      // html: `
      //     <h1>Reset Your Password</h1>
      //     <p>Click the link below to reset your password.</p>
      //     <a href="http://localhost:3000/reset-password/${checkEmail._id}">Reset Password</a>
      //   `, // html body



      html: `
  <div style="
    margin: 0;
    padding: 40px 20px;
    background-color: #f5f5f5;
    font-family: Arial, Helvetica, sans-serif;
  ">
    
    <div style="
      max-width: 600px;
      margin: auto;
      background-color: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    ">

      <!-- Header -->
      <div style="
        background-color: #c99471;
        padding: 25px;
        text-align: center;
      ">
        <h1 style="
          margin: 0;
          color: #ffffff;
          font-size: 26px;
        ">
          Furniture Website
        </h1>
      </div>

      <!-- Content -->
      <div style="padding: 40px 35px;">

        <h2 style="
          margin-top: 0;
          color: #222222;
          font-size: 24px;
        ">
          Reset Your Password
        </h2>

        <p style="
          color: #555555;
          font-size: 16px;
          line-height: 1.6;
        ">
          We received a request to reset the password for your account.
          Click the button below to create a new password.
        </p>

        <!-- Button -->
        <div style="
          text-align: center;
          margin: 30px 0;
        ">
          <a
            href="http://localhost:3000/reset-password/${checkEmail._id}"
            style="
              display: inline-block;
              padding: 14px 30px;
              background-color: #c99471;
              color: #ffffff;
              text-decoration: none;
              border-radius: 6px;
              font-size: 16px;
              font-weight: bold;
            "
          >
            Reset Password
          </a>
        </div>

        <p style="
          color: #777777;
          font-size: 14px;
          line-height: 1.6;
        ">
          If you did not request a password reset, you can safely ignore
          this email. Your password will remain unchanged.
        </p>

        <p style="
          color: #777777;
          font-size: 14px;
          line-height: 1.6;
        ">
          For your security, please do not share this email or reset link
          with anyone.
        </p>

        <hr style="
          border: none;
          border-top: 1px solid #eeeeee;
          margin: 30px 0;
        ">

        <p style="
          margin: 0;
          color: #999999;
          font-size: 12px;
          text-align: center;
        ">
          This is an automated email. Please do not reply to this message.
        </p>

      </div>

      <!-- Footer -->
      <div style="
        background-color: #f8f8f8;
        padding: 20px;
        text-align: center;
      ">
        <p style="
          margin: 0;
          color: #999999;
          font-size: 12px;
        ">
          © 2026 Your Website. All rights reserved.
        </p>
      </div>

    </div>
  </div>
`,

    });

    // await userModel.updateOne(
    //   {
    //     _id: checkEmail._id
    //   },
    //   {
    //     $set : {
    //       reset_password_expires : Date.now() + 10000 //10 min
    //     }
    //   }
    // )

      res.send({
        _status: true,
        _message: "Reset Password Link Shared",
      });

  }

  else {

     res.send({
       _status: false,
       _message: "Invalid Email ID",
     });

  }

}



let resetPassword = async (req,res) => {

  let {id} = req.params

  let {newPassword, confirmPassword} = req.body

  let checkId = await userModel.findOne({_id: id})

  if(checkId) {

    if(newPassword==confirmPassword) {
      let hash = bcrypt.hashSync(newPassword, saltRounds)

      userModel.updateOne(
        {
          _id: id
        },
        {
          $set: {
            password: hash
          }
        }
      )
      .then((data)=> {
        res.send({
          _status: true,
          _message: "Password Reset Successfully",
        });
      })
      .catch((error)=> {
        res.send({
          _status: false,
          _message: "Error Found",
        });
      })

    }

    else {
      res.send({
        _status: false,
        _message: "New Password and Confirm Password Not Matched",
      });
    }
  }

  else {
      res.send({
        _status: false,
        _message: "Invalid User ID",
      });
   }

}


// let viewProfile = async (req, res) => {


//   let checkId = await userModel.findOne({ _id: req.body.userID });

//   if (checkId) {
//       //   let updateProfile = await userModel.updateOne(
//       //     {
//       //       _id: req.body.userID,
//       //     },
//       //     {
//       //       $set: req.body,
//       //     },
//       //   );

//       //  let userProfile = await userModel.findOne({ _id: req.body.userID });


//         res.send({
//           _status: true,
//           _message: "View Profile",
//           _userProfile: checkId,
//         });
//       }
//      else {
//        res.send({
//       _status: false,
//       _message: "No User Found",
//     });
//   }

//   // this work is the use repeatedly so we deifine this in the middleware and add in the route

//   // console.log(req.body)

//   // req.headers this is get the token

//   // console.log(req.headers.authorization.split(" ")[1])

//   // so decrept the token then it is give the id

//   // let token = req.headers.authorization.split(" ")[1];

//   // let decoded = jwt.verify(token, process.env.TOKENKEY);

//   // console.log(decoded);   so this gives the id from this we get the data
// };


let viewProfile = async (req, res) => {
  try {
    console.log("USER ID FROM TOKEN:", req.userID);

    let checkId = await userModel.findOne({
      _id: req.userID,
    });

    console.log("USER FOUND:", checkId);

    if (checkId) {
      res.send({
        _status: true,
        _message: "View Profile",
        _userProfile: checkId,
      });
    } else {
      res.send({
        _status: false,
        _message: "No User Found",
      });
    }
  } catch (error) {
    console.log("VIEW PROFILE ERROR:", error);

    res.send({
      _status: false,
      _message: "Something Went Wrong",
    });
  }
};

let updateProfile = async (req,res) => {

  let {name,address,mobile_number, gender ,userID} = req.body

  let image=''

  if(req.file) {
     image = req.file.filename
  }

  let updateData = await userModel
    .updateOne(
      {
        _id: userID,
      },
      {
        $set: {
          name: name,
          address: address,
          image: image,
          mobile_number: mobile_number,
          gender: gender,
        },
      },
    )
    .then((data) => {
      res.send({
        _status: true,
        _message: "Profile Update Successfully",
        // updateData,
      });
    })
    .catch((error) => {
      console.log("UPDATE PROFILE ERROR:", error);

      res.send({
        _status: false,
        _message: error.message,
      });
    });

}

module.exports = {
  register,
  login,
  changePassword,
  forgotPassword,
  resetPassword,
  updateProfile,
  viewProfile,
};
