import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/ecommerce',{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
});

// app.get('/api/products/', (req, res) => {
//     res.send(data.products)
// })

// app.get('/api/products/:id', (req, res) => {
//     const product = data.products.find( x => x._id === req.params.id);
//     if(product)
//         res.send(product);
//     else{
//         res.status(404).send({message : 'Product Not found'}); 
//     }
// });

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.get('/', (req, res) => {
    res.send('Server is ready')
})

app.use((err, req, res, next) => {
    res.status(500).send({message : err.message});
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Running at ${port}`)
})