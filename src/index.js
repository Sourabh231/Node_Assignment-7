const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const studentArray = require('./InitialData');
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
//get the data
app.get('/api/student',(req,res)=>{
    res.json(studentArray);
});

//for we use get-id
app.get('/api/student/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const student = studentArray.find(s=>s.id===id);
    if(student){
        res.json(student);
    }
    else{
        res.status(404).send('Invalid student')
    }
})

app.post('/api/student',(req,res)=>{
    const {name,currentclass,division}=req.body;
    if(name && currentclass && division){
        const id=studentArray.length>0 ? studentArray[studentArray.length-1].id+1:1
        studentArray.push({id,name,currentclass,division});
        res.json({id});
    }
    else{
        res.status(404).send('Incomplete details')
    }
})

app.put('/api/student',(req,res)=>{
    const id=parseInt(req.params.id);
     const {name} = req.body;
     const student = studentArray.find(s=>s.id==id);
     if(student && name){
        student.name=name;
        res.json({message:'record updated'});
     }
     else{
        res.status(400).send('Invalid');
     }
});

app.delete('/api/student/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const student = studentArray.findIndex(s=>s.id===id);
    if(student!==1){
        studentArray.splice(student,1);
        res.json({message:'record deleted'});
    }
    else{
        res.status(400).send('Invalid');
    }
})
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   