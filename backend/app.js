const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const users = require('./users.json');
const recipes = require('./recipes.json');
const cors = require('cors')

const TWO_HOURS = 1000 * 60 * 60 * 2;
const {
    PORT = 3000,
    NODE_ENV = 'development',
    SESSION_NAME = 'sid',
    SESSION_SECRET = 'secret123', // TODO: change to sensible value
    SESSION_LIFETIME = TWO_HOURS,
} = process.env;

const IN_PROD = NODE_ENV === 'production';

// TODO: DB
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(session({
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: SESSION_LIFETIME,
        sameSite: true,
        secure: IN_PROD,
        httpOnly: true,
    },
}));

const checkAuth = (req, res, next) => {
    if (!req.session.userId) {
        res.status(401).send('Unauthorized!');
    } else {
        next();
    }
};

app.get('/recipes', (req, res) => {
    res.send(recipes);
});

app.post('/add-recipe', (req, res) => {
    const { name, difficulty, ingredients, time, description, img_url, author } = req.body;

    const newRecipe = {
        id: recipes.length + 1,
        name,
        difficulty,
        time,
        description,
        ingredients,
        img_url,
        author,
    }
    recipes.push(newRecipe);
    fs.writeFileSync('./recipes.json', JSON.stringify(recipes));
    res.send(`Recipe ${name} added succesfully`);

})

app.post('/register', (req, res) => {
    const { login, password } = req.body;
    if (login && password) { // TODO: validate
        const exists = users.some(
            user => (user.login === login || user.password === password),
        );
        if (exists) {
            res.status(500).send('This user is already registered');
        } else {
            const newUser = {
                id: users.length + 1,
                login,
                password, // TODO: hash
            };
            users.push(newUser);
            fs.writeFileSync('./users.json', JSON.stringify(users));
        }
    }
    res.send(`User ${login} has been created successfully`);
});

app.post('/login', (req, res) => {
    const { login, password } = req.body;

    if (login && password) {
        const currentUser = users.find(
            user => user.login === login && user.password === password, // TODO: hash
        );
        if (currentUser) {
            req.session.userId = currentUser.id;
            res.send(`Login succesful for user ${login}`);
        } else {
            res.status(500).send('Unsuccesful login :(');
        }
    }
});

app.post('/logout', checkAuth, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return req.redirect('/');
        }
        res.clearCookie(SESSION_NAME);
        res.send('Logout succesful');
    });
});


app.listen({ port: PORT }, () => {
    console.log(`🚀  Server ready at port ${PORT}`);
});
