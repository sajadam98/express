const express = require("express");
const path = require("path");
var cors = require('cors')
const logger = require('./middleware/logger.js');
const router = require('./routes/api/members');
const app = express();
const exphbs = require('express-handlebars');
const members = require('./Members');

app.use(cors())
//init middleware
app.use(logger);

//Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine' , 'handlebars');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//Homepage Route
app.get('/' , (req , res)=>{
    res.render('index' , {
        title: 'Member App',
        members
    });
})

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//Members Api Routes
app.use('/api/users' , router);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));
