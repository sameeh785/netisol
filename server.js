
require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express")
const cors = require("cors");
//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify : false
  })
  .then(() => {
    console.log("DB CONNECTED");
  });
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cors());
app.get('/',  (req, res) => {
  console.log('sami')
  res.send('hello world')
})
app.use('/api', require('./routes/user'))
app.use('/api', require('./routes/auth'))
app.use('/api', require('./routes/employe'))
app.use('/api', require('./routes/category'))
app.use('/api', require('./routes/product'))


//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});



// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({extended : true}))
// mongoose
//   .connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: true,
//     useUnifiedTopology: true 
//   })
//   .then(() => console.log("DATABASE IS CONNECTED"))
//   .catch((err) => console.log(err));
// app.use(cors)
// app.get('/',  (req, res) => {
//   console.log('sami')
//   res.send('hello world')
// })
// app.use('/api', require('./routes/user'))
// app.use('/api', require('./routes/auth'))

// const port = process.env.PORT || 4000;
// app.listen(port,() =>{
//   console.log("APP IS LISTENING AT " + port)
// })