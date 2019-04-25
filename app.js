const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000

app.use (session({
    secret : 'commonHeroes',
    cookie: {}
}))

const {Provider} = require('./models')
const ProviderRouter = require('./routes/providerRoute')
const registerRouter = require("./routes/registerRoute")
const LoginRouter = require('./routes/loginRoute')
const profileRouter = require('./routes/profileRoute')

app.use (express.urlencoded({extended : false}))




app.get('/', function(req, res){
    if(!req.session.userId){
        res.redirect("/login/")
    }
    else{
        console.log (req.session)
        Provider.findAll()
            .then(function(read){
                res.render('home.ejs',{
                    dataProviders : read
                })
            })
            .catch(function(err){
                console.log(err);
                
                res.send(err)
            })
    }
})

app.use("/provider", ProviderRouter)
app.use ("/register", registerRouter)
app.use('/login', LoginRouter)
app.use ("/profile", profileRouter)


app.listen(port, () => console.log(`running port ${port}`))