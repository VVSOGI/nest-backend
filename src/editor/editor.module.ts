import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditorController } from './editor.controller';
import { EditorRepository } from './editor.repository';
import { EditorService } from './editor.service';
import { Editor } from './entities/editor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Editor])],
  controllers: [EditorController],
  providers: [EditorService, EditorRepository],
})
export class EditorModule {}
