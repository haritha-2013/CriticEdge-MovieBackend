import express from 'express';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';



import userRoute from './routes/userRoute.js';
import trendingPopularContentRoutes from './routes/trendingPopularContentRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import premiumContentRoutes from './routes/premiumContentRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import genreRoutes from './routes/genreRoute.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import authenticate from './middlewares/authMiddleware.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()) ; //Middleware to parse JSON req.body
connectDB(); // Connect to the database

// Use admin routes 
app.use('/api/admin', authenticate, adminRoutes);

// Use auth routes
app.use('/api/auth', authenticate, authRoutes);

// Use the user routes
app.use('/api/users', userRoute);

//Use the trendingPopularContent routes
app.use('/api/content', trendingPopularContentRoutes);

// Use the rewiew routes
app.use('/api/reviews', reviewRoutes );


// Use the rating routes
app.use('/api/ratings', ratingRoutes);

// Use the premiumContent routes
app.use('/api/premium', premiumContentRoutes);

// Use the movie routes
app.use('/api/movies', movieRoutes);

// USe the genre routes
app.use('/api/genres', genreRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});