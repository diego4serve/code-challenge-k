declare global { namespace Express { interface User { id: number } } }

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../data-source';

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository
      .createQueryBuilder()
      .where('username = :username', { username })
      .getOne();

    if (!user) {
      return done(null, false, { message: 'Nombre de usuario incorrecto.' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: 'Contraseña incorrecta.' });
    }

    return done(null, user);
  } catch (error){
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id:number , done) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({id})
    done(null, user);
  } catch (error) {
    done (error)
  }
});

export default passport;