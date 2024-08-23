import express from 'express';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute.js';
import trendingPopularContentRoutes from './routes/trendingPopularContentRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import premiumContentRoutes from './routes/premiumContentRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import genreRoutes from './routes/genreRoute.js';
import adminRoutes from './routes/adminRoute.js';




const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()) ; //Middleware to parse JSON req.body
app.use(cookieParser());

connectDB(); // Connect to the database

// Use admin routes 
app.use('/api/admin',  adminRoutes);

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

export default app;