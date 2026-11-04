/**
 * Export / import of everything the app keeps in localStorage,
 * so users can move their progress between browsers or devices.
 */

export const BACKUP_APP_ID = 'eorzea-utility-hub';
export const BACKUP_VERSION = 1;

/** Keys that are caches or per-browser consent and should never be exported. */
const EXCLUDED_KEYS = new Set(['ff14-official-events-cache', 'ff14-consent']);
const EXTRA_KEYS = ['i18nextLng'];

export interface BackupFile {
  app: typeof BACKUP_APP_ID;
  version: number;
  exportedAt: string;
  data: Record<string, string>;
}

export function isBackupKey(key: string): boolean {
  return (key.startsWith('ff14-') && !EXCLUDED_KEYS.has(key)) || EXTRA_KEYS.includes(key);
}

export function createBackup(storage: Storage = localStorage, now: Date = new Date()): BackupFile {
  const data: Record<string, string> = {};
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (key && isBackupKey(key)) {
      const value = storage.getItem(key);
      if (value !== null) data[key] = value;
    }
  }
  return { app: BACKUP_APP_ID, version: BACKUP_VERSION, exportedAt: now.toISOString(), data };
}

export class BackupError extends Error {}

/** Validates a parsed backup file. Throws BackupError with an i18n key as message. */
export function validateBackup(parsed: unknown): BackupFile {
  if (!parsed || typeof parsed !== 'object') throw new BackupError('backup.errors.invalid');
  const b = parsed as Partial<BackupFile>;
  if (b.app !== BACKUP_APP_ID) throw new BackupError('backup.errors.wrongApp');
  if (typeof b.version !== 'number' || b.version > BACKUP_VERSION) throw new BackupError('backup.errors.version');
  if (!b.data || typeof b.data !== 'object') throw new BackupError('backup.errors.invalid');
  for (const [k, v] of Object.entries(b.data)) {
    if (!isBackupKey(k) || typeof v !== 'string') throw new BackupError('backup.errors.invalid');
  }
  return b as BackupFile;
}

/**
 * Replaces the app's stored data with the backup's contents.
 * Keys absent from the backup are removed so the result mirrors the backup exactly.
 * Returns the number of keys written.
 */
export function restoreBackup(backup: BackupFile, storage: Storage = localStorage): number {
  const existing: string[] = [];
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (key && isBackupKey(key)) existing.push(key);
  }
  existing.forEach(k => { if (!(k in backup.data)) storage.removeItem(k); });
  Object.entries(backup.data).forEach(([k, v]) => storage.setItem(k, v));
  return Object.keys(backup.data).length;
}
