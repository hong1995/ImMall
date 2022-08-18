import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

// input-output dto 모두 있어야 함
@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userRepository: UserRepository
  ) {}

  async register(createUserDto: CreateUserDto): Promise<Boolean> {
    try {
      await this.userRepository.create(createUserDto);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<any> {
    try {
      const users = await this.userRepository.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getOne(id: number): Promise<User> {
    try {
      return this.userRepository.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async setOne(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user: User = await this.userRepository.findOne(id);
      const username = updateUserDto.username
        ? updateUserDto.username
        : user.username;
      const email = updateUserDto.email ? updateUserDto.email : user.email;
      const password = updateUserDto.password
        ? updateUserDto.password
        : user.password;

      const newUser: User = new User(id, username, email, password);
      await this.userRepository.update(newUser);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      this.userRepository.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
