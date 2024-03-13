import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { access, mkdir, writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';

@Injectable()
export class FileService {
  async uploadFile(file: Express.Multer.File) {
    const [mimetype, type] = file.mimetype.split('/');

    const fileName = randomUUID() + '.' + type;
    const uploadFolder = join(__dirname, '..', '..', '../static');
    const isDir = await this.exists(uploadFolder);
    if (!isDir) await mkdir(uploadFolder, { recursive: true });

    const dirMimetypePath = join(uploadFolder, '/' + mimetype);
    const isDirMimeType = await this.exists(dirMimetypePath);

    if (!isDirMimeType) await mkdir(dirMimetypePath, { recursive: true });

    await writeFile(join(dirMimetypePath, fileName), file.buffer);
    return mimetype + '/' + fileName;
  }

  async deleteFile(filename: string) {
    try {
      const [dir, file] = filename.split('/');
      const path = join(__dirname, '..', '..', '../static', `/${dir}`, file);
      await unlink(path);
    } catch (e) {
      console.error(e);
    }
  }

  async convertToWebp(file: Buffer) {
    return await sharp(file).webp().toBuffer();
  }

  private async exists(path: string) {
    try {
      await access(path);
      return true;
    } catch (e) {
      return false;
    }
  }
}
