const express = require('express')
const{Pool}=require("pg")
const app=express();
const port =3000;
const pool=new Pool();
require("dotenv").config();
const cors=require("cors")
app.use(cors())
app.use(express.json());
app.get("/",(req,res)=>{
  //  res.send("hello from my api");
    pool.query("select * from furniture")
    .then(data=> res.json(data.rows))
    .catch(e=>res.sendStatus(500).send("some thing went wrong"))
        
    })
    app.get('/furniture/:id',(req,res)=>{
        const {id}=req.params
        pool.query("select * from furniture where id = $1",[id])
        .then(data=>res.json(data.rows))
        .catch(e=>res.sendStatus(500).send("some thing wrong"))
    })
    app.put("/furniture/:id",(req,res)=>{
        const {id}=req.params
        const {
            name,
            type,
            status ,
            description
            }=req.body;
        pool.query("update furniture set name=$1,type=$2,status=$3,description=$4 where id=$5 returning *",[name,
            type,
            status ,
            description,id]).then((data)=>res.json(data.rows)).catch((e)=>res.sendStatus(500).send(e))
    })
    app.delete('/furniture/:id',(req,res)=>{
        const {id}=req.params;
        pool.query("delete from furniture where id=$1",[id]).then((data)=>res.json(data.rows)).catch((e)=>res.sendStatus(500).send(e))
    })
    app.post("/furniture",(req,res)=>{
        const {
        name,
        type,
        status ,
        description,
        picture}=req.body;
        pool.query("insert into furniture(name,type,status,description) values($1,$2,$3,$4)returning *",[
            name,
            type,
            status,
            description
            ]).then((data)=>res.json(data.rows)).catch((e)=>res.sendStatus(500).send("some thing went wrong"))
    })

app.listen(port,()=>{
    console.log(`you are listing from http://localhost:${port}`)
})