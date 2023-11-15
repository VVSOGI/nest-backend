import { Injectable } from '@nestjs/common';
import { EditorRepository } from './editor.repository';

@Injectable()
export class EditorService {
  constructor(private readonly editorRepository: EditorRepository) {}

  saveBody(contents: string) {
    return this.editorRepository.create(contents);
  }

  getEditor(id: string) {
    return this.editorRepository.findById(id);
  }
}
