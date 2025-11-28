import express  from 'express';
import dotenv  from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import penyakitRoutes from './routes/penyakitRoutes.js'
import gejalaRoutes from './routes/gejalaRoutes.js'; 
import ruleRoutes from './routes/ruleRoutes.js';
import diagnoseRoutes from './routes/diagnoseRoutes.js';    

dotenv.config({ path: './.env' }); // Pastikan path .env benar

connectDB();


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running for Expert System Ibu Hamil');
});

// DEFINISI ROUTE API
app.use('/api/users', userRoutes);
app.use('/api/penyakit', penyakitRoutes); 
app.use('/api/gejala', gejalaRoutes);
app.use('/api/rule', ruleRoutes);
app.use('/api/diagnose', diagnoseRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));