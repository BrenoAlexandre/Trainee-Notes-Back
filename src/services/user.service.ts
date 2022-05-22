import { omit } from 'lodash';
import bcrypt from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import config from '../config/config';
import UsersRepository from '../database/repositories/users.repository';

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const repository = getCustomRepository(UsersRepository);
  const user = await repository.findOne({ where: { email } });

  if (!user) {
    return false;
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) return false;

  return omit(user, 'password');
}

///

export async function createUser(userData: {
  name: string;
  email: string;
  password: string;
}) {
  const { name, email, password } = userData;
  const repository = getCustomRepository(UsersRepository);
  const emailExists = await repository.findOne({ where: { email } });

  if (emailExists) {
    throw new Error('Email has already been registered');
  }

  const salt = await bcrypt.genSalt(config.saltWorkFactor);

  const hash = await bcrypt.hash(password, salt);

  const user = repository.create({ name, email, password: hash });
  await repository.save(user);

  return omit(user, 'password');
}

///

export async function findUser({ email }: { email: string }) {
  const repository = getCustomRepository(UsersRepository);
  return omit(await repository.findOne({ where: { email } }), 'password');
}
