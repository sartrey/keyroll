import { join } from 'node:path';
import { homedir } from 'node:os';
import { createHash } from 'node:crypto';
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';

const BLOBS_DIR = join(homedir(), '.keyroll', 'blobs');

/**
 * 确保 blobs 目录存在
 */
export function ensureBlobsDir(): void {
  if (!existsSync(BLOBS_DIR)) {
    mkdirSync(BLOBS_DIR, { recursive: true });
  }
}

/**
 * 计算文件的 SHA-256 完整性校验值（SRI 格式）
 * @param filePath - 文件路径
 * @returns SRI 格式的完整性校验值，如 'sha256-<base64hash>'
 */
export async function computeFileIntegrity(filePath: string): Promise<string> {
  const data = readFileSync(filePath);
  const hash = createHash('sha256').update(data).digest('base64');
  return `sha256-${hash}`;
}

/**
 * 将数据保存到 blobs 目录
 * @param fileData - 文件数据
 * @param integrity - SRI 格式的完整性校验值，用作文件名
 */
export function saveBlobToDisk(fileData: Buffer, integrity: string): void {
  ensureBlobsDir();
  const dest = join(BLOBS_DIR, integrity);
  writeFileSync(dest, fileData);
}

/**
 * 从文件路径读取数据并保存到 blobs 目录
 * @param filePath - 源文件路径
 * @returns { integrity: string } 完整性校验值
 */
export async function saveFileToBlobs(filePath: string): Promise<{ integrity: string; }> {
  const fileData = readFileSync(filePath);
  const integrity = await computeFileIntegrity(filePath);
  saveBlobToDisk(fileData, integrity);
  return { integrity };
}
