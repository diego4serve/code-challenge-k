import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { plainToClass } from 'class-transformer';
import { User } from '../entity/User';

const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Se necesita tanto el usuario como la contraseña.' });

  try {
    await authService.registerUser(username, password);
    return res.redirect('/scraps');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error Inesperado';
    return res.render('home', { message})
  }
};

const showRegister = (req: Request, res: Response) => {
  return res.render('register');
}

const showLogin = (req: Request, res: Response) => {
  if (req.isAuthenticated()) return res.redirect('/');
  res.render('login');
}

const login = (req: Request, res: Response) => {
  res.redirect('/scraps');
}

const logout = (req: Request, res: Response) => {
  req.logout((error) => {
    if (error) return res.render('home', { message: 'No se pudo cerrar sesion'})
  });
  res.render('home', { message: 'Cierre de sesión exitoso.' });
}

const profile = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    const user = plainToClass(User, req.user)
    res.json({ user });
  } else {
    res.render('login');
  }
}

export const authController = {
  register,
  login,
  logout,
  profile,
  showLogin,
  showRegister
}