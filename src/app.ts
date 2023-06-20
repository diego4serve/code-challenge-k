// src/index.ts
import express from 'express';
import session from 'express-session';
import passport from './config/passport.config';
import path from 'path';
import router from './routes/index.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'secreto', // Cambia esto con una clave secreta segura para producción
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(router)

app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
