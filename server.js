require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const registerRouter = require('./routes/registerRoute');
const loginRouter = require('./routes/loginRoute');
const aboutRouter = require('./routes/aboutRoute');
const logoutRouter = require('./routes/logoutRoute');



const app = express();
const Port = process.env.PORT || 8000;


// Database Connection
mongoose.connect(process.env.DB_URL)
.then(()=>console.log('Database connected Successfully...'))
.catch( e =>console.log(e));


//Paths
const publicPath = path.join(__dirname,'/public');
const viewsPath = path.join(__dirname, '/templates/views');
const partialsPath = path.join(__dirname, '/templates/partials');


// App setting
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);



// Routes
app.get('/', (req, res)=>{
    res.render('home');
});
app.use(aboutRouter);
app.use(registerRouter);
app.use(loginRouter);
app.use(logoutRouter);





app.listen(Port, ()=>{
    console.log(`Server is listening on port ${Port}`);
});