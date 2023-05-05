const app = require('./lib/app.js');
const mongoose = require('mongoose');

const userSchema =  require('./lib/schemas/User.js');
const utente = mongoose.model('User', userSchema);

const port= process.env.PORT || 8080;


//app.locals.db = mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})

const username = '2LM';
mongoose.connect('mongodb+srv://2LM:passwordditest@trentinofind.x1ubooa.mongodb.net/?retryWrites=true&w=majority')
.then ( () => {    
    console.log("Connected to Database");

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
    
    /*
    const User = mongoose.model('User', userSchema);
    User.findOne({ 'firstname': 'Marco' }, null, function(err, person) {
        if (err) return handleError(err);
        console.log('%s is a %s.', User.firstname, User.lastname);
      });
    */
    // find each person with a last name matching 'Ghost'
    try{
        const query = utente.find({'firstname': 'marco'});
        query.select('firstname');
        query.exec(function(err, UtenteSchema) {
        if (err) return handleError(err);
            console.log('result: %s %s.', utente.firstname, utente.lastname);
        });
    }catch(err){
        console.error(err);
    }
   
});        

