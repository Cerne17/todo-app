import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(
        `User with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    const updatedUser = await this.findUserById(id);
    return updatedUser;
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}
