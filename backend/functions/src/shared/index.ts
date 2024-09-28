import { CloudHTTPv2 } from './decorators';
import { Ctx } from './types';
import { Logger } from './logger';
import { OutputServerEventStream } from './output-stream';
import { RPCReflect } from './rpc-reflect';
import { injectable } from 'tsyringe';
import * as fs from 'fs';
import * as path from 'path';

@injectable()
export class AsyncContext {
    private storage: Map<string, any> = new Map();
    set(key: string, value: any) {
        this.storage.set(key, value);
    }

    get(key: string): any {
        return this.storage.get(key);
    }
}

export class InsufficientBalanceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InsufficientBalanceError';
    }
}

export function Param(name: string, options?: any): ParameterDecorator {
    return (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
        // Implementation details would go here
    };
}

@injectable()
export class FirebaseStorageBucketControl {
    private localStorageDir: string;

    constructor() {
        this.localStorageDir = path.join('/app', 'local-storage');
        if (!fs.existsSync(this.localStorageDir)) {
            fs.mkdirSync(this.localStorageDir, { recursive: true });
        }
    }

    async uploadFile(filePath: string, destination: string): Promise<string> {
        const destPath = path.join(this.localStorageDir, destination);
        await fs.promises.copyFile(filePath, destPath);
        return `file://${destPath}`;
    }

    async downloadFile(filePath: string, destination: string): Promise<void> {
        const sourcePath = path.join(this.localStorageDir, filePath);
        await fs.promises.copyFile(sourcePath, destination);
    }

    async deleteFile(filePath: string): Promise<void> {
        const fullPath = path.join(this.localStorageDir, filePath);
        await fs.promises.unlink(fullPath);
    }

    async fileExists(filePath: string): Promise<boolean> {
        const fullPath = path.join(this.localStorageDir, filePath);
        return fs.existsSync(fullPath);
    }

    async saveFile(filePath: string, content: Buffer, options?: any): Promise<void> {
        const fullPath = path.join(this.localStorageDir, filePath);
        await fs.promises.writeFile(fullPath, content);
    }

    async signDownloadUrl(filePath: string, expirationTime: number): Promise<string> {
        const fullPath = path.join(this.localStorageDir, filePath);
        return `file://${fullPath}`;
    }
}

export {
    CloudHTTPv2,
    Ctx,
    Logger,
    OutputServerEventStream,
    RPCReflect,
};

export const loadModulesDynamically = (path: string) => {
    // Simplified implementation
    console.log(`Loading modules from ${path}`);
};

export const registry = {
    exportAll: () => ({}),
    exportGrouped: () => ({}),
    allHandsOnDeck: async () => {},
};
