/**
 * Shared task utilities — used by DutyChecklist, Dashboard, and ResetCountdown.
 */

import { INITIAL_TASKS } from '../constants/tasks';

export interface TaskProgress {
  done: number;
  total: number;
}

export function getProgress(completed: Record<string, string | null>, category: 'daily' | 'weekly'): TaskProgress {
  const tasks = INITIAL_TASKS.filter(t => t.category === category);
  const done  = tasks.filter(t => !!completed[t.id]).length;
  return { done, total: tasks.length };
}

export function formatTimestamp(isoString: string | null): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleString([], {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}
