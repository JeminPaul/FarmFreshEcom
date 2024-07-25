const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()


const app=express()
app.use(cors())
app.use(express.json({limit:"10mb"}))



const PORT=process.env.PORT||5001


//MONGODB CONNECTION
console.log(process.env.MONGODB_URL);
mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("connect to database"))
.catch((err)=>console.log(err))

//SCHEMA
 const userSchema=mongoose.Schema({
    FirstName: String,
    LastName: String,
    Email: {
        type:String,
        unique:true
    },
    password: String,
    confirmpassword: String,
    image:String
 })

 //MODEL

 const usermodel=mongoose.model("user",userSchema)



//API

app.get("/",(req,res)=>{
    res.send("server is running")
})

// app.post("/Signup",async(req,res)=>{
//     console.log(req.body);
//     const {Email}=req.body
//     usermodel.findOne({Email:Email},(err,result)=>{
//         console.log(result);
//         console.log(err);
//         if(result){
//             res.send({message:"email id is already register"})
//         }else{
//             const data=usermodel(req.body)
//             const save=data.save()
//             res.send({message:"Signup successfully"})
//         }
//     })
// })

//SIGN-UP

app.post("/Signup", async (req, res) => {
    console.log(req.body);
    const { Email } = req.body;
  
    try {
      const existingUser = await usermodel.findOne({ Email: Email });
      if (existingUser) {
        return res.send({ message: "Email ID is already registered",alert:false });
      } else {
        const newUser = new usermodel(req.body);
        await newUser.save();
        res.send({ message: "Signup successfully",alert:true });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Server error" });
    }
  });


  //API_LOGIN

  // app.post("/Login",(req,res)=>{
  //   console.log(req.body);
  //   const {Email}=req.body
  // const user= usermodel.findOne({Email:Email},(err,result)=>{
  //     if(result){
  //       const datasend={
  //         _id:result._id,
  //         FirstName: result.FirstName,
  //         LastName: result.LastName,
  //         Email: result.Email,
  //         image:result.image
  //       }
  //       console.log(datasend);
  //       res.send({message:"Login Succesfully",alert:true})
  //     }else{

  //     }
  //   })
  // })

  app.post("/Login", (req, res) => {
    console.log(req.body);
    const { Email } = req.body;
  
    usermodel.findOne({ Email: Email })
      .then(result => {
        if (result) {
          const datasend = {
            _id: result._id,
            FirstName: result.FirstName,
            LastName: result.LastName,
            Email: result.Email,
            image: result.image
          };
          console.log(datasend);
          res.send({ message: "Login Successfully", alert: true,data:datasend });
        } else {
          // Handle case when user is not found
          res.status(404).send({ message: "User not found", alert: true});
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({ message: "Server Error", alert: true });
      });
  });
  

// product section
const schemaproduct=mongoose.Schema({
  name: String,
  category:String,
  image:String,
  price: String,
  description:String,
});
const productModel=mongoose.model("product",schemaproduct)

//save product api
app.post("/uploadproduct",async(req,res)=>{
  console.log(req.body);
  const data = await productModel(req.body)
 const datasave=await data.save()


  res.send({message:"upload succesfully"})

})

app.get("/product",async(req,res)=>{
  const data= await productModel.find({})
  res.send(JSON.stringify(data))

})
  
  
  


app.listen(PORT,()=>{
    console.log("server is running at port:"+PORT);
})