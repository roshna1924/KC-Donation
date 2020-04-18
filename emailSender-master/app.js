const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const details = require("./details.json");
const bodyparser = require('body-parser');
const User = require("./User");
const Quest = require("./History");
const FoodData = require("./FoodData");
const History = require("./History");

const db = mongoose.connect('mongodb://localhost:27017/userData', function (err, response) {
      if(err)
        console.log("Error in mongodb connection");
      console.log("Mongodb connection added");
});

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});

// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to AI Chatbot <br></h1>"
  );
});

app.get("/getFoodData", (req, res) => {
  // console.log("Get request for all Food Items");
  FoodData.find({})
    .exec(function (err, fooddatas) {
      if(err) {
        console.log("Error in receiving Food Items");
      } else {
        res.json(fooddatas);
      }
    })
});

app.get("/getUserHistory/:username/:previousState", (req, res) => {
  // console.log("Get request for all Food Item History: "+JSON.stringify(req.params.username));

  if (req.params.previousState ==='donar')
    History.find({donarName: req.params.username})
      .exec(function (err, fooddatas) {
        if(err) {
          console.log("Error in receiving Food Item History");
        } else {
          res.json(fooddatas);
        }
      })
  else
    History.find({requesterName: req.params.username})
      .exec(function (err, fooddatas) {
        if(err) {
          console.log("Error in receiving Food Item History");
        } else {
          res.json(fooddatas);
        }
      })

});

app.delete("/deleteFood/:id", (req, res) => {
  // FoodData.deleteOne({_id: req.params.id}, function (err, deletedfood) {
  FoodData.findByIdAndDelete(req.params.id, function (err, deletedfood) {
    if(err) {
      res.send({success: false, message: "Failed to delete a food item"});
    } else {
      res.send({success: true, message: "Successfully deleted a food item"});
    }
  })
})

app.patch("/upDateHistory", (req, res) => {
  console.log("request came in update history - body : " + JSON.stringify(req.body.headers));
  mongoose.set('useFindAndModify', false);
  // FoodData.deleteOne({_id: req.params.id}, function (err, updatehistory) {
  History.findOneAndUpdate({referenceId: req.body.headers.Id}, {requesterName: req.body.headers.name, requesterCompDate: req.body.headers.date}, function (err, updatehistory) {
    if(err) {
      res.send({success: false, message: "Failed to update a food item"});
    } else {
      res.send({success: true, message: "Successfully updated a food item"});
    }
  })
})

app.post("/sendmail", (req, res) => {
  // console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

app.post('/registration', (req, res) => {
    // console.log(req.body);
    const userType = req.body.userType;
    const registerUsername = req.body.registerUsername;
    const registerEmail = req.body.registerEmail;
    const registerPassword = req.body.registerPassword;

    const user = new User();
    user.userType = userType;
    user.registerUsername = registerUsername;
    user.registerEmail = registerEmail;
    user.registerPassword = registerPassword;

    user.save((err, result) => {
      if(err) {
        console.log("There is a error while adding in db");
        res.send({success: false, message: "Failed to add user"});
      } else {
        console.log("successfuly saved");
        res.send({success: true, message: "Successfuly added new user"});
      }
    })

});

app.post('/submitFood', (req, res) => {
  // console.log(req.body);
  const foodName = req.body.foodname;
  const foodAddress = req.body.address;
  const foodExpiry = req.body.expdate;
  const foodWeight = req.body.foodweight;
  const foodPrice = req.body.foodprice;

  const foodData = new FoodData();
  foodData.foodName = foodName;
  foodData.foodAddress = foodAddress;
  foodData.foodExpiry = foodExpiry;
  foodData.foodWeight = foodWeight;
  foodData.foodPrice = foodPrice;

  foodData.save((err, result) => {
    if(err) {
      console.log("There is a error while adding in db");
      res.send({success: false, message: "Failed to add a food item"});
    } else {
      console.log("successfully saved");
      console.log("reference ID : " + result._id);
        res.send({success: true, message: "Successfully added a new food Item", referenceID:result._id});
    }
  })
});

app.post('/addHistory', (req, res) => {
  console.log('body: ' + JSON.stringify(req.body) + ' headers : ' + JSON.stringify(req.headers.referenceid));
  const foodName = req.body.foodname;
  const foodAddress = req.body.address;
  const foodExpiry = req.body.expdate;
  const foodWeight = req.body.foodweight;
  const foodPrice = req.body.foodprice;
  const donarName = req.body.username;
  const addedDate = req.body.addeddate;
  const referenceID = req.headers.referenceid;

  // Table to maintain history of Donars and Requesters
  const  history = new History();
  history.donarName = donarName;
  history.donarAddedDate = addedDate;
  history.foodName = foodName;
  history.foodAddress = foodAddress;
  history.foodExpiry = foodExpiry;
  history.foodWeight = foodWeight;
  history.foodPrice = foodPrice;
  history.requesterName = "";
  history.requesterCompDate = "";
  history.referenceId = referenceID;
  history.save((err, result) => {
    if(err) {
      console.log("error in adding history");
      res.send({success: false, message: "Failed to add a data in history"});
    } else {
      // console.log("reference ID : " + result.objectId);
      res.send({success: true, message: "Successfully added a new data in history"});
    }
  })
});

app.post('/loginpage', async (req, res) => {
  // console.log("Body: " + req.body);
  const username = req.body.username;
  const password = req.body.password;
  console.log("app.js " + username, password);
  const resp = await User.findOne({registerUsername:username, registerPassword:password});
  // console.log(resp);
  if(!resp) {
    console.log("incoreect details");
    res.json({
      success: false,
      message: "Incorrect user details",
      status: 500
    })
    // res.send({success: "Incorrect user details", status: 500});
  } else {
    console.log("loggin you in: " + resp.userType);
    res.json({
      success: true,
      message: "Successfuly verified the user",
      status: 200,
      userType: resp.userType
    })
    // res.send({success: "Successfuly verified the user", status: 200, userType: resp.userType});
  }
});

app.post('/questName', (req, res) => {
  // console.log("req: " + req);
  console.log("req Body: " + req.body);
  const questName = req.body.questName;
  console.log('question is: ' + questName);
  const quest = new Quest();
  quest.questName = questName;

  quest.save((err, result) => {
    if (err) {
      console.log("There is a error while adding in db");
      res.send({success: false, message: "Failed to add question"});
    } else {
      console.log("successfuly saved");
      res.send({success: true, message: "Successfuly added new question"});
    }
  })

});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  console.log("request came in sendMail 1");
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptions = {
    from: '"Roshna"<example.gimail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Wellcome to AI Chatbot", // Subject line
    html: `<h1>Hi ${user.email}</h1><br>
    <h4>Thank you for joining us</h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

// main().catch(console.error);
