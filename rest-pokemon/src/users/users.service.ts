import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePasswords } from 'src/utils/comparePasswords';
import { toUserDto } from 'src/utils/mappers';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { username, password } = userDto;

    //Is user in the db?
    const userInDb = await this.userRepo.findOne({
      where: { username },
    });

    if (userInDb) {
      throw new HttpException('User exists ', HttpStatus.BAD_REQUEST);
    }

    const user: User = await this.userRepo.create({
      username,
      password,
    });

    await this.userRepo.save(user);

    return toUserDto(user);
  }

  async findOne(options?: object) {
    const user = await this.userRepo.findOne(options);
    return toUserDto(user);
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepo.findOne({
      where: { username },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return toUserDto(user);
  }

  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.findOne({
      where: { username },
    });
  }
}
