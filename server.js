const App = require('./utils/app.js');
const routers = require(`./routers/index`);
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://Aleigo:792035@cluster0.gtgpeus.mongodb.net/?retryWrites=true&w=majority';

// Create App instance with a specific port
app = new App(8888);

// Use routers in our App instance
app.use(routers.todoRouter);
app.use(routers.userRouter);

// Connect to mongoDB and then listen
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then((result) => app.listen())
    .catch((err) => console.log(err));
