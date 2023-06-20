// userService.ts

import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';
import { validate } from 'class-validator';

export const registerUser = async (username: string, password: string): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);
  const existingUser = await userRepository.findOneBy({ username });

  if (existingUser) {
    throw new Error('El correo electrónico ya está registrado.');
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User();
  newUser.username = username;
  newUser.password = hashedPassword;
  const errors = await validate(newUser);

  if (errors.length > 0) {
    throw new Error('Correo electrónico inválido.');
  }

  await userRepository.save(newUser);

  return 'Usuario registrado exitosamente.';
};


export const authService = {
  registerUser
}