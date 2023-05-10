const app = require('./lib/app.js');
const db = require('./lib/database/dbms.js');
const port= process.env.PORT || 8080;

db.start;

const client = db.getClient();

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
}); 

// metodo del prof, non funzionante 
/*
const mongoose = require('mongoose');


// const user = mongoose.model('User', userSchema);

const user = mongoose.model('User', { 
    name: String,
    lastname:String,
    age: Number,
    passwordHash: String,
    email: String,
    phone: String,
    type: String
});

const port= process.env.PORT || 8080;


//app.locals.db = mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})

const username = '2LM';
mongoose.connect('mongodb+srv://2LM:passwordditest@trentinofind.x1ubooa.mongodb.net/TrentinoFind?retryWrites=true&w=majority')
.then ( () => {    
    console.log("Connected to Database");

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    }); 

    user.create({ 
        name: "Marco",
        lastname: "Marchettino",
        age: 35,
        passwordHash: "qwsdrfcvhujnbvf",
        email: "prova@gmail.com",
        phone: "3278956826",
        type: "giocatore",
    });

    const docs = user.find();
    console.log(docs);

    console.log("////////////////////");

    var query = user.find();
    query instanceof mongoose.Query;
    var docs2 = query;
    console.log(docs2);

    console.log("//////////////////////\t query");

    query = user.find({name:"Marco"});
    docs2 = query;
    console.log(docs2);
    
    console.log("//////////////////////\t query motodo2");

    user.find({ name: 'Marco' }, 'lastname', function(err, person) {
        if (err) return handleError(err);
        console.log('%s %s', user.name, user.lastname);
    });
    
    
});   

/*
user.find({firstname:'Marco'}, function(err, docs){
    if(err){
        console.log(err);
    }else{
        console.log("result: ", docs);
    }
    
});
*
const customerSchema = new mongoose.Schema({ name: String, age: Number, email: String });
const Customer = mongoose.model('Customer', customerSchema);
Customer.create({ name: 'A', age: 30, email: 'a@foo.bar' });
Customer.create({ name: 'B', age: 28, email: 'b@foo.bar' });
const docs = Customer.find();
*/