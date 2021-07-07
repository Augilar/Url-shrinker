const express = require('express');
const mongoose = require('mongoose');
const liliput = require('./models/liliput');

const app = express();
const port = 8080;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false })); // done so that it can parse urls correctly

app.get('/', async (req, res) => {
    console.log("request recieved");
    const data = await liliput.find(); // await waits for the process to complete before moving forward (i.e assigning to data)
    res.render('index', {data});
});

app.post('/shrink', async (req, res) => { // async keyword has to be written before the function arg to make use of await and other async functionality
    // whatever is to be done

    const askedUrl = req.body.fullURL;
    console.log("The following URL is requested :", askedUrl);

    var test = new liliput({
        full: askedUrl
    });

    await test.save();
    
    res.redirect('/');

});

app.get('/:shortid', async (req, res) => {
    const short = req.params.shortid;

    // find the full website from db
    const obj = await liliput.findOne({
        short: short
    });

    // if null then return 404
    if (obj == null){
        res.sendStatus(404);
    }

    // if found then add 1 to clicks
    obj.clicks++;
    await obj.save();
    //console.log(obj);

    // redirect to full website
    res.redirect(obj.full);
} )

mongoose.connect("mongodb://localhost:27017/urlShortner", {
    useNewUrlParser: true,  // these are added as per warning given by mongoose of some packages being deprecated
	useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
    // we want the connection with the database be made before the connection to the server
    app.listen(8080, () => {
        console.log("listening at port: 8080");
    });
});



