const express=require('express')
const mysql=require('mysql')
const ejs=require('ejs')
const bodyParser=require('body-parser')
PORT=8000;

// // initialisation du serveur
const app=express()
// //analyse de l'app
app.use(bodyParser.urlencoded({extended:false}))
// //analyse de l'app /json
app.use(bodyParser.json())
//Dire a express ou aller trouver nos vues
app.set('views')
//Dire a express d'utliser ejs comme moteur de template
app.set('view engine', 'ejs')

const connexion=mysql.createConnection({
    host:'localhost',
    user:'phpmyadmin',
    database:'kda_test',
    password:'Ruthndovia@2020'
})

connexion.connect((err)=>{
    if(err){
        console.log('not connection')
        throw err
    }else{
        console.log('connexion etablie')
    }
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// //definir mes routes-- GET
app.get('/',function(req,res){
    res.render('home')
})
app.get('/api',(req,res)=>{
    res.render('news')
})

app.get('/api/users',(req,res)=>{
    connexion.query('select * from students', (error, resultat)=>{
        if(error) throw error
        return res.send(resultat)
    })
})
// //id 
app.get('/api/users/:id',(req,res)=>{
    connexion.query(`select * from students where id=${req.params.id}`, (error, resultat)=>{
        if(error) throw error
        return res.send(resultat)
       
    })
})
//Post
app.post('/api/users',(req,res)=>{
    connexion.query(`
    insert into students (nom,prenom) values ('${req.body.nom}','${req.body.prenom}')`, 
    (error, resultat)=>{
        if(error) throw error
        return res.send(resultat)
       
    })
})
//put
app.put('/api/users/:id',(req,res)=>{
    connexion.query(`update students set nom='${req.body.nom}', prenom='${req.body.prenom}' where id=${req.params.id}`,
    (error, resultat)=>{
        if(error) throw error
        return res.send(resultat)
       
    })
})
//delete
app.delete('/api/users/:id', (req,res)=>{
    connexion.query(`delete from students  where id=${req.params.id}`,
    (error, resultat)=>{
        if(error) throw error
        return res.send(resultat)
       
    })
})
// //Dire que l'app utilise le port declarer
app.listen(PORT,()=>{
    console.log('mon serveur ecoute sur le port '+PORT)
})