import exp from "express"
import dot from "dotenv"
import mon from "mongoose"
import cors from "cors"

const app = exp()
dot.config();
app.use(exp.json())
app.use(cors())

const cschema = new mon.Schema({
    title:{type :String},description:String
})

const todocollection = mon.model('todo',cschema)

app.post('/todos',async (req,res) =>{
    const  data = {title:req.body.title,description:req.body.description}
    try {
        const entry = new todocollection(data);
        await entry.save()
        console.log("data is posted")
        res.status(200).json(data) 

    } catch (err) {
        console.log("post method is error",err )
        res.status(404).json( "post method is error", err)
    }
})

const middleware = (req, res, next) => {
    console.log("Middleware");
    const user = true;
    if (user) {
        next();
    } else {
        res.status(400).json("Invalid user")
    }
}

app.get('/todos',middleware,async (req,res) =>{
    
    try {
        const data = await todocollection.find({}).exec() ;
        console.log("data is geted")
        res.status(200).json(data)

    } catch (err) {
        console.log("get method is error",err )
        res.status(404).json( "get method is error", err)
    }
})

app.put('/todos/:id',async (req,res) =>{ 
    
    try {
        const data = await todocollection.findByIdAndUpdate(req.params.id, 
        req.body, {new:true});
        console.log("data is puted")
        res.status(200).json(data)

    } catch (err) {
        console.log("put method is error",err )
        res.status(404).json( "put method is error", err)
    }
})

app.delete('/todos/:id',async (req,res) =>{
    try {
        const entry = await todocollection.findByIdAndDelete(req.params.id);
        console.log("data is deleted")
        res.status(200).json(entry)

    } catch (err) {
        console.log("delete method is error",err )
        res.status(404).json( "delete method is error", err)
    }
})


const connect = async ()=>{
   try {
       await mon.connect(process.env.mongo)
       console.log("Db is connected");
   } catch (err) {
        console.log("Db is error" ,err);
   } 
}

app.listen(process.env.port,() =>{
    connect()
    console.log("server is running. . . .")
})