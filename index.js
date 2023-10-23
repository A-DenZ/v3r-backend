import express from 'express';
import { getUser } from './controllers/user.js'
import cors from 'cors'
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import { dateFilter, defaultInputFilter, driverLicenseFilter, numberFilter } from './utilities/regexp/regexp.js';

dotenv.config();


const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());


app.use('/user' , userRoutes)


app.use((err , req , res , next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

if(defaultInputFilter.test("wawddawdwdad"))
{
    console.log("oui")
}
else{
    console.log("non")
}


app.listen(PORT, () => { 

    console.log('app listening on port 8080!');

});