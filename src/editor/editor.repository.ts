import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Editor } from './entities/editor.entity';

@Injectable()
export class EditorRepository {
  constructor(
    @InjectRepository(Editor) private editorRepository: Repository<Editor>,
  ) {}

  async create(contents: string) {
    return await this.editorRepository.save({ contents });
  }

  findById(id: string) {
    return this.editorRepository.findBy({ id });
  }
}
