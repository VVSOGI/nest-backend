import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EditorService } from './editor.service';

@Controller('editor')
export class EditorController {
  constructor(private readonly editorService: EditorService) {}

  @Get()
  getEditor(@Query('editorId') editorId: string) {
    return this.editorService.getEditor(editorId);
  }

  @Post('save')
  saveBody(@Body() contents: string) {
    return this.editorService.saveBody(contents);
  }
}
