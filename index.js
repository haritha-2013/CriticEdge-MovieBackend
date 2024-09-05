import express from 'express';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import reviewRoutes from './routes/reviewRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import premiumContentRoutes from './routes/premiumContentRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import genreRoutes from './routes/genreRoute.js';
import adminRoutes from './routes/adminRoute.js';
import castRoutes from './routes/castRoutes.js';






const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
  origin: 'http://critic-edge-movie-front-end-7utv.vercel.app',
  credentials: true,
}));
app.use(express.json()) ; //Middleware to parse JSON req.body
app.use(cookieParser());

connectDB(); // Connect to the database

// Use admin routes 
app.use('/api/admin',  adminRoutes);

// Use the user routes
app.use('/api/users', userRoute);


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

// Use the cast routes
app.use('/api/cast', castRoutes);




app.all("*", (req, res, next) => {
  res.status(404).json({ message: "end point does not exist" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;