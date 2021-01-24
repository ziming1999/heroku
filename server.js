let express = require('express');
let app = express();

let db;
let mongoClient = require('mongodb').MongoClient;
mongoClient.connect('mongodb+srv://ziming99:coolsinxx2@cluster0.e9nwn.mongodb.net/',(err,client)=>{
    db = client.db('webstore');
})
app.use(express.json());

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","*");
    next();
});
app.param('collectionName',(req,res,next,collectionName)=>{
    req.collection = db.collection(collectionName);
    return next();
})

app.get('/',(req,res,next)=>{
    res.send("testing");
})

app.post('/collection/:collectionName',(res,req,next)=>{
    req.collecton.insert(req.body,(e,results)=>{
        if (e) return next (e);
        res.send(results.ops)
    })
})
app.get('/collection/:collectionName',(req,res,next)=>{
    req.collection.find({}).toArray((e,results)=>{
        if(e)return next(e);
        res.send(results);
    })
})



const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Express server is running at localhost:3000"); 
})