const User = require("../models/userModel");
const Product = require("../models/productModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
exports.homepage = (req, res, next) => {
  res.send("This is homepage...");
  // res.json({})
};



exports.signup = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email }).exec();
    if (user) {
      return res.status(501).json({ message: "user exists" });
    }
    const newUser = new User(req.body);
    user = await newUser.save();
    res.json(user);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};


exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).exec();
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const token = jwt.sign({ id: user.id }, "secretkey");
    const datas = { user, token }
    res.cookie("accessToken", token, {
      maxAge: 999900000,
      httpOnly: true,
    })
      .status(200)
      .json(datas);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

exports.signout = (req, res, next) => {
  const token = req.query.token;
  res.clearCookie("token");
  res.status(200).json({ message: "logged out sexsexfully" });
};



// exports.product_create = async (req, res) => {
//     const token = req.body.token
//     console.log(token)
//     if (!token) return res.status(401).json("Not logged in!");
//     jwt.verify(token, "secretkey", async (err, userInfo) => {
//       if (err) return res.status(403).json("Token is not valid!");
//       console.log("object")
//       const product = new Product({
//         unique_no: req.body.unique_no,
//         pieces: req.body.pieces,
//         city: req.body.city,
//         status: req.body.status
//       });
//     //   const savedProduct = await product.save();
//     //     res.status(200).json(savedProduct);
//       try {
//         let pro = await Product.find({ unique_no: req.body.unique_no }).exec();
//         const products = pro[0];
//         if (products) {
//           if (products.unique_no == product.unique_no) {
//             if (products.status == product.status) {
//               console.log("product code no doesn't vaild");
//              return res.status(401).json("product code no doesn't vaild!");
//             } else {
//               console.log("created");
//               console.log(product,products)
//               const savedProduct = await Product.create({ unique_no: req.body.unique_no,
//                 pieces: req.body.pieces,
//                 city: req.body.city,
//                 status: req.body.status}).then((e)=>{
// console.log(e)
//                 }).catch(err=>console.log(err))
//               console.log(savedProduct, "jjjjjjjjjjj")
//               res.status(200).json(savedProduct);
//             }
//           }
//         }
//         if (!products) {
//             console.log("k");
//           const savedProduct = await product.save();
//          return res.status(200).json(savedProduct);
//         }

//         // const savedProduct = await product.save();
//         // res.status(200).json(savedProduct);
//     console.log("object")

//       } catch (error) {
//         res.status(400).send(error);
//       }
//     });
//   };


exports.product_create = async (req, res) => {
  const token = req.body.token
  console.log(token)
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    console.log("object")
    const product = new Product({
      unique_no: req.body.unique_no,
      pieces: req.body.pieces,
      city: req.body.city,
      status: req.body.status
    });
    let testAccount = await nodemailer.createTestAccount();
    const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      auth: {
          user: "abhi78394@gmail.com",
          pass: "Abhishek@8889754996",
      },
  });

    let info = {
      from: '"Fred Foo 👻" <abhi78394@gmail.com>', // sender address
      to: "ap3611624gmail.com, abhibaghel798@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    }
    transport.sendMail(info, async (err, info) => {
      const savedProduct = await product.save();
      console.log(info)
      res.status(200).json({
        message: "Email sent! check inbox/spam",
        product: savedProduct,
      });
    })
  })
}



exports.getAllProducts = async (req, res, next) => {
  const token = req.query.token;
  if (!token) return res.status(401).json("Not logged in!")
  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const products = await Product.find().exec();
    res.status(200).json({ message: "all blogs", products });
  })
}

