import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const DATAFILES_DIR = 'datafiles';

export class BaseRepository<T extends object> {
    protected readonly fileName: string
    protected data: T[];

    get filePath() {
        return path.join(process.cwd(), DATAFILES_DIR, this.fileName);
    }

    async initialize() {
        if (this.data) {
            return;
        }
        const data = await fs.readFile(this.filePath);
        this.data = JSON.parse(data.toString()) as T[];
    }

    async findAll() {
        await this.initialize();
        return this.data;
    }
}