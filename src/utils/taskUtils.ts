/**
 * Shared task utilities — used by DutyChecklist, Dashboard, and ResetCountdown.
 */

import { INITIAL_TASKS } from '../constants/tasks';
import { getPrevReset } from './resets';

export interface TaskProgress {
  done: number;
  total: number;
}

export function getProgress(completed: Record<string, string | null>, category: 'daily' | 'weekly'): TaskProgress {
  const tasks = INITIAL_TASKS.filter(t => t.category === category);
  const done  = tasks.filter(t => !!completed[t.id]).length;
  return { done, total: tasks.length };
}

/**
 * Drop completions that happened before the most recent reset for that task,
 * so the checklist clears itself after daily / weekly reset.
 */
export function pruneExpired(
  completed: Record<string, string | null>,
  now: Date = new Date(),
): Record<string, string | null> {
  const next: Record<string, string | null> = {};
  for (const [id, ts] of Object.entries(completed)) {
    if (!ts) continue;
    const task = INITIAL_TASKS.find(t => t.id === id);
    if (!task) continue;
    const boundary = getPrevReset(task.reset ?? task.category, now);
    const done = new Date(ts).getTime();
    if (!Number.isNaN(done) && done >= boundary.getTime()) next[id] = ts;
  }
  return next;
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
