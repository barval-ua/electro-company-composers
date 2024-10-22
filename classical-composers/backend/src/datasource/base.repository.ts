import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const DATAFILES_DIR = 'datafiles';

export class BaseRepository<T extends object> {
    protected readonly fileName: string
    protected data: T[];

    get filePath() {
        return path.join(process.cwd(), DATAFILES_DIR, this.fileName);
    }

    private async fetchEntries() {
        if (!this.data) {
            const content = await fs.readFile(this.filePath);
            this.data = JSON.parse(content.toString()) as T[];
        }
        return this.data;
    }

    async findAll() {
        return this.fetchEntries();
    }
}