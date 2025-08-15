const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/book-route');
const bookIssueRoutes = require('./routes/book-issue-route');
const mongoose = require('mongoose');


app.use(cors());
app.use(express.json());
mongoose.connect(
  "mongodb+srv://abhishek218kumar:abhishek%40218@cluster0.hbpr4b5.mongodb.net/Library-DB?retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB Connected to Atlas"))
.catch((err) => console.error("MongoDB connection error:", err));

app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/book-issue', bookIssueRoutes);

app.listen(8080, ()=>{
    console.log('Library server is running on port 8080');
})