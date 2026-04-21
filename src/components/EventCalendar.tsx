import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Plus, Trash2, Clock, Tag, Edit2, Check, X, ChevronDown, Bird, ExternalLink } from 'lucide-react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { zhTW } from 'date-fns/locale';

import { fetchOfficialEvents, OfficialEvent } from '../services/eventService';

registerLocale('zh-TW', zhTW);

export type EventType = 'raid' | 'fc' | 'other' | 'official';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: EventType;
  desc: string;
  url?: string;
}

const typeConfig: Record<EventType, { label: string; color: string; bg: string }> = {
  raid: { label: '團練', color: 'text-rose-500', bg: 'bg-rose-500/10' },
  fc: { label: 'FC聚會', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  other: { label: '其他', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  official: { label: '官方活動', color: 'text-[#00B0FF]', bg: 'bg-[#00B0FF]/10' },
};

interface EventCalendarProps {
  events: CalendarEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
}

export default function EventCalendar({ events, setEvents }: EventCalendarProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editEvent, setEditEvent] = useState<CalendarEvent | null>(null);
  const [newEvent, setNewEvent] = useState({ title: '', date: new Date(), type: 'raid' as EventType, desc: '' });
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isEditTypeOpen, setIsEditTypeOpen] = useState(false);
  const [officialEvents, setOfficialEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchOfficialEvents();
      const mapped: CalendarEvent[] = data.map((e: OfficialEvent) => ({
        id: e.eventid,
        title: e.title,
        date: e.date || new Date().toISOString(),
        type: 'official',
        desc: '官方舉辦的活動',
        url: e.url
      }));
      setOfficialEvents(mapped);
    };

    loadEvents();
  }, []);

  const allEvents = [...events, ...officialEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const addEvent = () => {
    if (!newEvent.title) return;
    setEvents(prev => [...prev, { ...newEvent, date: newEvent.date.toISOString(), id: Date.now().toString() }].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setNewEvent({ title: '', date: new Date(), type: 'raid', desc: '' });
    setIsAdding(false);
  };

  const startEdit = (event: CalendarEvent) => {
    setEditingId(event.id);
    setEditEvent({ ...event });
  };

  const saveEdit = () => {
    if (!editEvent) return;
    setEvents(prev => prev.map(e => e.id === editEvent.id ? editEvent : e).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setEditingId(null);
    setEditEvent(null);
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const TypeDropdown = ({ value, onChange, isOpen, setIsOpen }: { value: EventType, onChange: (t: EventType) => void, isOpen: boolean, setIsOpen: (o: boolean) => void }) => (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Tag size={16} className={typeConfig[value].color} />
          {typeConfig[value].label}
        </div>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-xl z-20 overflow-hidden">
          {(['raid', 'fc', 'other'] as EventType[]).map(type => (
            <button
              key={type}
              onClick={() => { onChange(type); setIsOpen(false); }}
              className={`w-full flex items-center gap-2 p-3 hover:bg-white/5 ${value === type ? 'text-[#D39E47]' : 'text-white'}`}
            >
              <Tag size={16} className={typeConfig[type].color} />
              {typeConfig[type].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#D39E47]">
            <img src="/tools/EventCalendar.png" alt="" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
            <span className="text-xs font-bold uppercase tracking-widest">Event Calendar</span>
          </div>
          <h1 className="text-3xl font-bold text-white">活動行事曆</h1>
          <p className="text-[#9e9e9e] text-sm max-w-md">管理 FC 或固定團的活動排程，新增、編輯或刪除活動，並在首頁快速查看接下來的行程。</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-[#D39E47] text-black px-4 py-3 rounded-xl font-bold hover:bg-[#b88a3d] transition-colors self-start"
        >
          <Plus size={20} />
          新增活動
        </button>
      </header>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 space-y-4"
          >
            <input 
              type="text" placeholder="活動名稱" value={newEvent.title}
              onChange={e => setNewEvent({...newEvent, title: e.target.value})}
              className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white placeholder-white/20"
            />
            <div className="react-datepicker-wrapper w-full">
              <DatePicker
                selected={newEvent.date}
                onChange={(date: Date | null) => setNewEvent({...newEvent, date: date || new Date()})}
                showTimeSelect
                dateFormat="yyyy/MM/dd HH:mm"
                locale="zh-TW"
                placeholderText="選擇日期與時間"
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-[#D39E47] focus:ring-1 focus:ring-[#D39E47] transition-colors"
                calendarClassName="bg-[#1a1a1a] border border-white/10 text-white"
              />
            </div>
            <TypeDropdown 
              value={newEvent.type} 
              onChange={(t) => setNewEvent({...newEvent, type: t})} 
              isOpen={isTypeOpen} 
              setIsOpen={setIsTypeOpen} 
            />
            <textarea 
              placeholder="活動說明" value={newEvent.desc}
              onChange={e => setNewEvent({...newEvent, desc: e.target.value})}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white placeholder-white/20 focus:border-[#D39E47] focus:ring-1 focus:ring-[#D39E47] transition-colors"
            />
            <button 
              onClick={addEvent} 
              className="w-full bg-[#D39E47] text-black py-3 rounded-xl font-bold hover:bg-[#b88a3d] transition-colors"
            >
              確認新增
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4">
        {allEvents.length === 0 ? (
          <div className="text-center py-12 text-[#9e9e9e]">目前沒有排定的活動。</div>
        ) : (
          allEvents.map(event => (
            <motion.div key={event.id} className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-white/10 transition-colors">
              {editingId === event.id ? (
                <div className="w-full space-y-3">
                  <input 
                    type="text" value={editEvent?.title}
                    onChange={e => setEditEvent(prev => prev ? {...prev, title: e.target.value} : null)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-white"
                  />
                  <div className="react-datepicker-wrapper w-full">
                    <DatePicker
                      selected={editEvent?.date ? new Date(editEvent.date) : new Date()}
                      onChange={(date: Date | null) => setEditEvent(prev => prev ? {...prev, date: date?.toISOString() || new Date().toISOString()} : null)}
                      showTimeSelect
                      dateFormat="yyyy/MM/dd HH:mm"
                      locale="zh-TW"
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-white"
                      calendarClassName="bg-[#1a1a1a] border border-white/10 text-white"
                    />
                  </div>
                  <TypeDropdown 
                    value={editEvent?.type || 'raid'} 
                    onChange={(t) => setEditEvent(prev => prev ? {...prev, type: t as EventType} : null)} 
                    isOpen={isEditTypeOpen} 
                    setIsOpen={setIsEditTypeOpen} 
                  />
                  <textarea 
                    value={editEvent?.desc}
                    onChange={e => setEditEvent(prev => prev ? {...prev, desc: e.target.value} : null)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-white"
                  />
                  <div className="flex gap-2">
                    <button onClick={saveEdit} className="p-2 bg-emerald-500/20 text-emerald-500 rounded-lg"><Check size={18} /></button>
                    <button onClick={() => setEditingId(null)} className="p-2 bg-rose-500/20 text-rose-500 rounded-lg"><X size={18} /></button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${typeConfig[event.type].bg} ${typeConfig[event.type].color}`}>
                      {event.type === 'official' ? <Bird size={20} /> : <Tag size={20} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white">{event.title}</h4>
                        {event.type === 'official' && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-[#00B0FF]/20 text-[#00B0FF] rounded font-bold">OFFICIAL</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#9e9e9e] font-mono">
                        <Clock size={12} />
                        {new Date(event.date).toLocaleString('zh-TW', { 
                          month: '2-digit', 
                          day: '2-digit', 
                          hour: '2-digit', 
                          minute: '2-digit',
                          hour12: true 
                        })}
                      </div>
                      <p className="text-sm text-[#9e9e9e] mt-1">{event.desc}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {event.type === 'official' ? (
                      event.url && (
                        <a 
                          href={event.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 text-[#00B0FF] hover:bg-[#00B0FF]/10 rounded-lg transition-colors"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )
                    ) : (
                      <>
                        <button onClick={() => startEdit(event)} className="p-2 text-[#D39E47] hover:bg-[#D39E47]/10 rounded-lg transition-colors">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => deleteEvent(event.id)} className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
