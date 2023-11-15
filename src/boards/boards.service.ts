import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { BoardsRepository } from './boards.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    private boardsRepository: BoardsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto) {
    const user = await this.usersRepository.findUserById(createBoardDto.userId);
    const { email } = user;

    return this.boardsRepository.create({ ...createBoardDto, email });
  }

  getAllBoards() {
    return this.boardsRepository.getAllBoards();
  }
}
