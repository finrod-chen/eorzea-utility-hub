import React, { useRef } from 'react';
import { Download, Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { createBackup, restoreBackup, validateBackup, BackupError } from '../utils/backup';

export default function DataBackup() {
  const { t } = useTranslation();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const backup = createBackup();
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eorzea-utility-hub-backup-${backup.exportedAt.slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(t('backup.exported', { count: Object.keys(backup.data).length }));
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const backup = validateBackup(JSON.parse(await file.text()));
      const when = new Date(backup.exportedAt).toLocaleString();
      if (!window.confirm(t('backup.confirm', { date: when }))) return;
      restoreBackup(backup);
      toast.success(t('backup.imported'));
      setTimeout(() => window.location.reload(), 600);
    } catch (err) {
      const key = err instanceof BackupError ? err.message : 'backup.errors.invalid';
      toast.error(t(key));
    }
  };

  const btn = 'flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl bg-[var(--color-bg)] hover:bg-[var(--color-border)] text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors';

  return (
    <div className="flex gap-2">
      <button onClick={handleExport} className={btn} title={t('backup.exportHint')}>
        <Download size={13} /> {t('backup.export')}
      </button>
      <button onClick={() => fileRef.current?.click()} className={btn} title={t('backup.importHint')}>
        <Upload size={13} /> {t('backup.import')}
      </button>
      <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={handleFile} />
    </div>
  );
}
