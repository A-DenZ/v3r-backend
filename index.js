import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'
import responseRoutes from './routes/response.routes.js'
import shareRoutes from './routes/share.routes.js'

dotenv.config();


const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());

app.use(cors());


app.use('/user' , userRoutes);
app.use('/response', responseRoutes);
app.use('/share', shareRoutes);


app.use((err , req , res , next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});



app.listen(PORT, () => { 

    console.log('app listening on port 8080!');

});