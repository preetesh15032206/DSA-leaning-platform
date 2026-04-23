import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
// @ts-ignore
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-java';
import 'prismjs/themes/prism-tomorrow.css';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  Cell 
} from 'recharts';
import Markdown from 'react-markdown';
import { 
  LayoutDashboard, 
  Layers, 
  Code2, 
  Timer, 
  BarChart3, 
  Settings, 
  Search as SearchIcon, 
  Bell, 
  Flame,
  Zap,
  Target,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  TrendingDown,
  Trophy,
  History,
  Terminal,
  Play,
  RotateCcw,
  Pause,
  ArrowRight,
  Binary,
  BrainCircuit,
  Network,
  TreePine,
  ChevronRight,
  Plus,
  LogOut,
  LogIn,
  Calendar,
  PieChart,
  ArrowDownRight,
  ArrowUpRight,
  Sparkles,
  Brain
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TOPICS, USER_STATS, PROBLEMS, Topic, Problem } from './constants';
import { cn } from './lib/utils';
import { auth, signInWithGoogle, logout, db, handleFirestoreError } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { generateRecoveryPlan, simulateExecution } from './services/geminiService';
import { 
  collection, 
  query, 
  onSnapshot, 
  doc, 
  setDoc, 
  deleteDoc,
  Timestamp,
  getDocFromServer
} from 'firebase/firestore';

// --- Components ---

const Sidebar = ({ 
  activeTab, 
  setActiveTab,
  solvedToday,
  dailyGoal
}: { 
  activeTab: string, 
  setActiveTab: (t: string) => void,
  solvedToday: number,
  dailyGoal: number
}) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'topics', icon: Layers, label: 'Topics' },
    { id: 'problems', icon: Code2, label: 'Problems' },
    { id: 'editor', icon: Terminal, label: 'Editor' },
    { id: 'timer', icon: Timer, label: 'Timer' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  ];

  const progressToday = dailyGoal > 0 ? Math.min(100, (solvedToday / dailyGoal) * 100) : 100;

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container flex flex-col py-8 border-r border-white/5 z-50">
      <div className="px-8 mb-12 flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-lg shadow-primary/20" />
        <span className="text-xl font-bold tracking-tight text-on-surface uppercase">Nexus</span>
      </div>
      
      <div className="flex-1 space-y-1 px-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 transition-all duration-300 rounded-xl group relative overflow-hidden",
              activeTab === item.id 
                ? "bg-white/5 text-on-surface font-medium" 
                : "text-on-surface-variant hover:text-neutral-300"
            )}
          >
            <item.icon size={20} className={cn("relative z-10", activeTab === item.id && "fill-white/20")} />
            <span className="relative z-10 font-bold text-sm tracking-wide uppercase">{item.label}</span>
            {activeTab === item.id && (
              <motion.div 
                layoutId="active-nav"
                className="absolute inset-0 bg-white/10"
              />
            )}
          </button>
        ))}
      </div>

      <div className="mt-auto px-6">
        <div className={cn(
          "p-4 rounded-2xl border transition-all duration-500",
          solvedToday >= dailyGoal && dailyGoal > 0 
            ? "bg-primary/10 border-primary/20 shadow-lg shadow-primary/5" 
            : "bg-surface-container-high/40 border-white/5"
        )}>
          <div className="flex justify-between items-center mb-2">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Daily Goal</p>
            {solvedToday >= dailyGoal && dailyGoal > 0 && (
              <span className="text-[8px] font-black bg-primary text-white px-2 py-0.5 rounded-full animate-bounce">ACHIEVED</span>
            )}
          </div>
          <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-700 shadow-[0_0_8px_#3B82F6]",
                solvedToday >= dailyGoal && dailyGoal > 0 ? "bg-green-400" : "bg-primary"
              )}
              style={{ width: `${progressToday}%` }} 
            />
          </div>
          <p className="text-xs text-on-surface-variant mt-2 font-bold tracking-tight">
            {solvedToday}/{dailyGoal} <span className="opacity-50">{solvedToday >= dailyGoal ? 'Goal Met!' : 'Problems'}</span>
          </p>
        </div>
      </div>
    </aside>
  );
};

const Header = ({ title, searchTerm, setSearchTerm, user }: { title: string, searchTerm: string, setSearchTerm: (s: string) => void, user: User | null }) => (
  <header className="fixed top-0 right-0 left-64 h-24 bg-background/80 backdrop-blur-md z-40 px-12 flex justify-between items-center border-b border-white/5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-lg shadow-primary/20" />
        <span className="text-xl font-bold tracking-tight text-on-surface uppercase tracking-widest">{title}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-on-surface-variant">
            <SearchIcon className="w-4 h-4" />
          </div>
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search topics or problems..."
            className="bg-surface-container-high border-none rounded-full py-2 pl-10 pr-4 text-sm w-80 focus:ring-1 focus:ring-primary transition-all outline-none"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface text-xs font-bold"
            >
              CLEAR
            </button>
          )}
        </div>
        <button className="h-10 w-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors relative">
          <Bell size={18} className="text-on-surface-variant" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border border-background" />
        </button>
        {user ? (
          <div className="flex items-center gap-3 bg-surface-container-high p-1 pr-4 rounded-full border border-white/5">
            <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden">
              <img src={user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"} className="w-full h-full object-cover" alt="Profile" />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-bold leading-none">{user.displayName}</p>
              <button onClick={logout} className="text-[10px] text-primary uppercase font-bold hover:underline flex items-center gap-1 mt-0.5">
                <LogOut size={10} /> Logout
              </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={signInWithGoogle}
            className="px-6 py-2 bg-primary text-white text-xs font-bold rounded-full hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <LogIn size={14} /> SIGN IN
          </button>
        )}
      </div>
    </header>
);

// --- Pages ---

const Dashboard = ({ 
  completedCount, 
  setActiveTab, 
  streak, 
  efficiency 
}: { 
  completedCount: number, 
  setActiveTab: (t: string) => void,
  streak: number,
  efficiency: number
}) => {
  const mastery = PROBLEMS.length > 0 ? (completedCount / PROBLEMS.length * 100).toFixed(1) : "0.0";
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-surface-container-low rounded-3xl p-1 border border-white/5 group">
        <div className="flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-6">
            <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-error/10 text-error">
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className="text-on-surface font-semibold text-lg">Daily Mastery Check</h3>
              <p className="text-on-surface-variant text-sm">You have solved {completedCount} problems so far. Keep going!</p>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('problems')}
            className="px-6 py-2.5 bg-error text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity"
          >
            KEEP LEARNING
          </button>
        </div>
      </div>

      <div className="bento-grid">
        <div className="col-span-8 bg-surface-container-low rounded-3xl p-10 relative overflow-hidden border border-white/5">
          <div className="relative z-10">
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-4">Learning Mastery</p>
            <h2 className="text-6xl font-bold text-on-surface tracking-tight mb-8">
              {mastery}<span className="text-primary text-3xl">%</span>
            </h2>
            <div className="grid grid-cols-4 gap-8">
              <div>
                <p className="text-[10px] uppercase font-bold text-on-surface-variant mb-1">Total Solved</p>
                <p className="text-2xl font-bold text-on-surface">{completedCount}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-on-surface-variant mb-1">Efficiency</p>
                <p className="text-2xl font-bold text-tertiary">{efficiency}%</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-on-surface-variant mb-1">Target</p>
                <p className="text-2xl font-bold text-primary">{PROBLEMS.length}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-on-surface-variant mb-1">Rank</p>
                <p className="text-2xl font-bold text-on-surface">Pioneer</p>
              </div>
            </div>
            <div className="mt-10 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${mastery}%` }} />
            </div>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('timer')}
          className="col-span-4 bg-[#111] rounded-3xl p-10 flex flex-col justify-between items-center text-center border border-white/5 shadow-xl cursor-pointer hover:bg-neutral-900 transition-colors"
        >
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all",
            streak > 0 ? "bg-gradient-to-br from-orange-500 to-red-600 shadow-orange-500/20" : "bg-neutral-800"
          )}>
            <Flame size={32} className={cn(streak > 0 && "animate-pulse")} />
          </div>
          <div>
            <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest mb-1">Current Streak</p>
            <h3 className="text-4xl font-bold text-on-surface">{streak} Days</h3>
          </div>
          <p className="text-primary text-[10px] font-bold uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
            {streak > 0 ? "Momentum High" : "Start your streak"}
          </p>
        </div>

        <div className="col-span-12 bg-surface-container-low rounded-3xl p-8 flex items-center gap-8 border border-white/5">
          <div className="h-20 w-20 shrink-0 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary border border-secondary/20">
            <Zap size={40} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] bg-white/5 text-on-surface border border-white/10 px-3 py-1 rounded-full font-bold uppercase tracking-widest">Smart Review</span>
            </div>
            <h4 className="text-xl font-bold text-on-surface mb-1">Review Backtracking</h4>
            <p className="text-on-surface-variant text-sm max-w-xl">
              Focus on N-Queens and state-space tree optimization techniques.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('problems')}
              className="bg-on-surface text-background font-bold py-3 px-8 rounded-2xl hover:bg-neutral-200 transition-all text-sm"
            >
              START SESSION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Topics = ({ 
  setActiveTab, 
  completedProblems,
  setFilter
}: { 
  setActiveTab: (t: string) => void,
  completedProblems: Record<string, boolean>,
  setFilter: (f: string) => void
}) => {
  const categories = Array.from(new Set(PROBLEMS.map(p => p.category)));
  
  return (
    <div className="space-y-12 animate-fade-in">
      <div className="flex flex-col">
        <h2 className="text-5xl font-black text-on-surface tracking-tighter leading-tight">Master your core.</h2>
        <p className="text-on-surface-variant mt-4 text-xl max-w-2xl leading-relaxed">
          Our curriculum is balanced based on current MAANG interview trends and algorithmic complexity distributions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TOPICS.map((topic) => {
          const catProblems = PROBLEMS.filter(p => p.category === topic.title || (topic.id === 'stack-queue' && p.category === 'Stack & Queue') || (topic.id === 'linked-list' && p.category === 'Linked List') || (topic.id === 'sliding-window' && p.category === 'Sliding Window') || (topic.id === 'two-pointers' && p.category === 'Two Pointers') || (topic.id === 'binary-search' && p.category === 'Binary Search'));
          const total = catProblems.length;
          const solved = catProblems.filter(p => completedProblems[p.id]).length;
          const progress = total > 0 ? Math.round((solved / total) * 100) : 0;

          return (
            <motion.div 
              key={topic.id}
              whileHover={{ y: -5 }}
              className={cn(
                "group relative bg-[#111] rounded-3xl p-1 border border-white/5 transition-all duration-500 overflow-hidden",
                topic.id === 'dp' && "lg:col-span-2"
              )}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-neutral-900 rounded-xl border border-white/5 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                    <topic.icon size={24} />
                  </div>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded border border-primary/20">
                    {topic.difficulty}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-on-surface mb-2">{topic.title}</h3>
                <p className="text-sm text-on-surface-variant mb-8 line-clamp-2">
                  {topic.description}
                </p>
                
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Progress</span>
                    <span className="text-xs font-mono text-on-surface">{progress}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full transition-all duration-1000" 
                      style={{ width: `${progress}%` }} 
                    />
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-8 bg-neutral-900/90 backdrop-blur-sm border-t border-white/5 flex gap-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <button 
                  onClick={() => {
                    setFilter('All');
                    setActiveTab('problems');
                  }}
                  className="flex-1 py-3 bg-on-surface text-background font-bold rounded-xl text-xs tracking-widest uppercase hover:bg-neutral-200 transition-colors"
                >
                  START
                </button>
                <button className="p-3 bg-white/5 text-on-surface border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const Problems = ({ 
  user, 
  completedProblems, 
  onToggle,
  filter,
  setFilter
}: { 
  user: User, 
  completedProblems: Record<string, boolean>,
  onToggle: (id: string, completed: boolean) => void,
  filter: string,
  setFilter: (f: string) => void
}) => {
  const categories = Array.from(new Set(PROBLEMS.map(p => p.category)));

  const filteredProblems = PROBLEMS.filter(p => {
    if (filter === 'All') return true;
    return p.difficulty === filter;
  });

  return (
    <div className="space-y-12 animate-fade-in flex flex-col min-h-[60vh]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-5xl font-black text-white tracking-tighter">Practice Set</h2>
          <p className="text-on-surface-variant mt-2 text-lg">Curated lists to level up your technical bar.</p>
        </div>
        <div className="flex bg-surface-container-high p-1.5 rounded-2xl gap-2 border border-white/5">
          {['All', 'Easy', 'Medium', 'Hard'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-8 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300",
                filter === f ? "bg-white text-background shadow-lg shadow-white/10" : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-12">
        {categories.map(category => {
          const catProblems = filteredProblems.filter(p => p.category === category);
          if (catProblems.length === 0) return null;

          return (
            <section key={category} className="space-y-6">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-black text-on-surface tracking-tight">{category}</h3>
                <div className="h-px grow bg-white/5" />
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  {catProblems.filter(p => completedProblems[p.id]).length} / {catProblems.length} SOLVED
                </span>
              </div>

              <div className="bg-[#111] rounded-3xl border border-white/5 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                      <th className="px-8 py-4 w-20">Status</th>
                      <th className="px-4 py-4 w-16 text-center">S.No</th>
                      <th className="px-8 py-4">Problem Title</th>
                      <th className="px-8 py-4 text-right">Difficulty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {catProblems.map((problem) => (
                      <tr 
                        key={problem.id} 
                        className="group hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-8 py-4">
                          <button
                            onClick={() => onToggle(problem.id, !completedProblems[problem.id])}
                            className={cn(
                              "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300",
                              completedProblems[problem.id] 
                                ? "bg-primary border-primary text-white scale-110" 
                                : "border-white/10 text-transparent hover:border-primary/50 group-hover:bg-white/5"
                            )}
                          >
                            <CheckCircle2 size={14} className={cn("transition-opacity", completedProblems[problem.id] ? "opacity-100" : "opacity-0")} />
                          </button>
                        </td>
                        <td className="px-4 py-4 text-center font-mono text-sm text-neutral-500">
                          {problem.serial}
                        </td>
                        <td className="px-8 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-on-surface text-lg group-hover:text-primary transition-colors cursor-pointer">
                              {problem.title}
                            </span>
                            <div className="flex gap-2 mt-1">
                              {problem.topics.map(t => (
                                <span key={t} className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant/60">{t}</span>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-4 text-right">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                            problem.difficulty === 'Easy' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                            problem.difficulty === 'Medium' ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                            "bg-red-500/10 text-red-500 border-red-500/20"
                          )}>
                            {problem.difficulty}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

const Analytics = ({ 
  completedCount, 
  completedProblems,
  schedule,
  onUpdateSchedule
}: { 
  completedCount: number, 
  completedProblems: Record<string, { completed: boolean, updatedAt?: Timestamp }>,
  schedule: { startDate: string, endDate: string },
  onUpdateSchedule: (start: string, end: string) => void
}) => {
  const [tempDates, setTempDates] = useState({
    start: schedule.startDate,
    end: schedule.endDate
  });
  const [aiInsights, setAiInsights] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [userQuery, setUserQuery] = useState("");

  useEffect(() => {
    setTempDates({
      start: schedule.startDate,
      end: schedule.endDate
    });
  }, [schedule]);

  const today = new Date();
  const start = new Date(schedule.startDate);
  const end = new Date(schedule.endDate);
  
  const isInvalidRange = start > end;
  
  const totalDays = isInvalidRange ? 1 : Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  const daysPassed = Math.max(1, Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  const daysRemaining = Math.max(0, Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  
  const totalProblemsCount = PROBLEMS.length;
  const problemsRemaining = totalProblemsCount - completedCount;
  
  const originalRate = totalProblemsCount / totalDays;
  const requiredRate = isInvalidRange ? 0 : (daysRemaining > 0 ? problemsRemaining / daysRemaining : problemsRemaining);
  
  const expectedSolved = isInvalidRange ? 0 : Math.min(totalProblemsCount, Math.floor(originalRate * daysPassed));
  const backlog = expectedSolved - completedCount;
  const isBehind = backlog > 0;
  const isAhead = backlog < 0;

  // Forecast Feature
  const currentVelocity = completedCount / daysPassed;
  const estDaysLeft = currentVelocity > 0 ? Math.ceil(problemsRemaining / currentVelocity) : Infinity;
  const estEndDate = new Date(today);
  if (estDaysLeft !== Infinity) estEndDate.setDate(today.getDate() + estDaysLeft);

  const topicMastery = [
    { label: 'Arrays', color: '#8b5cf6', category: 'Arrays' },
    { label: 'Binary Search', color: '#6366f1', category: 'Binary Search' },
    { label: 'Linked List', color: '#ec4899', category: 'Linked List' },
    { label: 'Dynamic Programming', color: '#f59e0b', category: 'Dynamic Programming' },
    { label: 'Graphs', color: '#ef4444', category: 'Graphs' },
  ].map(topic => {
    const total = PROBLEMS.filter(p => p.category === topic.category).length;
    const solved = PROBLEMS.filter(p => p.category === topic.category && completedProblems[p.id]).length;
    const percentage = total > 0 ? (solved / total * 100).toFixed(0) : "0";
    return { ...topic, solved, total, percentage: parseInt(percentage) };
  });

  // Simulated Pacing Chart Data
  const pacingData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      name: d.toLocaleDateString('en-US', { weekday: 'short' }),
      target: Math.floor(originalRate * (daysPassed - (6 - i))),
      actual: Math.max(0, completedCount - Math.floor(Math.random() * 5 * (6 - i)))
    };
  });

  const fetchAIInsights = async (customQuery?: string) => {
    if (isInvalidRange) return;
    setIsAiLoading(true);
    try {
      const insights = await generateRecoveryPlan({
        completedCount,
        totalProblems: totalProblemsCount,
        daysRemaining,
        requiredRate,
        backlog: Math.max(0, backlog),
        isBehind,
        isAhead,
        topicMastery: topicMastery.map(t => ({ label: t.label, value: `${t.percentage}%` }))
      }, customQuery);
      setAiInsights(insights);
    } catch (error) {
      console.error("AI Insight Error:", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    fetchAIInsights();
  }, [completedCount, schedule, isInvalidRange]);

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Top Impact Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Solve Velocity', value: currentVelocity.toFixed(1), unit: 'P/day', icon: Zap, color: 'text-primary' },
          { label: 'System Pacing', value: requiredRate.toFixed(1), unit: 'Required', icon: Target, color: 'text-secondary' },
          { label: 'Total Solved', value: completedCount, unit: 'Problems', icon: CheckCircle2, color: 'text-green-500' },
          { label: 'Net Backlog', value: Math.abs(backlog), unit: isBehind ? 'Behind' : 'Ahead', icon: History, color: isBehind ? 'text-error' : 'text-primary' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="bg-surface-container-low p-6 rounded-3xl border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
               <stat.icon size={80} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className={cn("text-3xl font-black tracking-tight", stat.color)}>{stat.value}</span>
              <span className="text-[10px] font-bold text-neutral-600 uppercase">{stat.unit}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Col: Roadmap & Control */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Chart Box */}
          <div className="bg-surface-container-low p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group min-h-[450px]">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-3xl font-black tracking-tighter text-on-surface">Pacing Trajectory</h3>
                <p className="text-on-surface-variant text-sm font-medium">Visualizing your execution vs mathematical roadmap.</p>
              </div>
              <div className="flex bg-neutral-900 p-1.5 rounded-xl border border-white/5 shadow-inner">
                <span className="px-3 py-1.5 text-[10px] font-bold text-on-surface uppercase flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_var(--color-secondary)]" /> Actual
                </span>
                <span className="px-3 py-1.5 text-[10px] font-bold text-on-surface uppercase flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" /> Target
                </span>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pacingData}>
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c026d3" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#c026d3" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#737373', fontSize: 10, fontWeight: 700 }}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
                    itemStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
                  />
                  <Area type="monotone" dataKey="target" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorTarget)" strokeWidth={2} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 0 }} />
                  <Area type="monotone" dataKey="actual" stroke="#c026d3" fillOpacity={1} fill="url(#colorActual)" strokeWidth={3} dot={{ r: 5, fill: '#c026d3', strokeWidth: 2, stroke: '#0d0d0d' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 1. Target Management Section */}
            <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-on-surface mb-2">Project Calibration</h3>
                <p className="text-xs text-on-surface-variant mb-6">Modify your timeline to force a system-wide recalculation.</p>
                <div className="space-y-4">
                  <div className={cn("bg-background/60 p-4 rounded-2xl border transition-all", isInvalidRange ? "border-error/50" : "border-white/5")}>
                    <p className="text-[9px] uppercase font-bold text-neutral-500 mb-1">Target Deadline</p>
                    <input 
                      type="date"
                      value={tempDates.end}
                      onChange={(e) => setTempDates({ ...tempDates, end: e.target.value })}
                      className="bg-transparent text-primary font-black outline-none border-none text-lg w-full"
                    />
                  </div>
                  <button 
                    onClick={() => onUpdateSchedule(tempDates.start, tempDates.end)}
                    className="w-full py-4 bg-on-surface text-background font-black rounded-2xl text-[10px] tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all shadow-xl"
                  >
                    SYNC ENGINE
                  </button>
                </div>
              </div>
            </div>

            {/* 2. New Feature: Predictive Forecast */}
            <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-700">
                <Flame size={120} className="text-primary" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-on-surface mb-2">Completion Forecast</h3>
                <p className="text-xs text-on-surface-variant mb-6">Estimated date based on your actual solve velocity.</p>
                
                <div className="flex flex-col items-center justify-center py-6 bg-white/5 rounded-3xl border border-white/5 mb-4">
                  <span className={cn(
                    "text-3xl font-black tabular-nums transition-colors",
                    estDaysLeft === Infinity ? "text-neutral-700" : isBehind ? "text-error" : "text-primary"
                  )}>
                    {estDaysLeft === Infinity ? 'CALC...' : estEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-1">
                    {estDaysLeft === Infinity ? 'Waiting for Data' : `${estDaysLeft} Days to Finish`}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4">
                   <div className={cn("w-2 h-2 rounded-full animate-pulse", isBehind ? "bg-error" : "bg-primary")} />
                   <p className="text-[10px] font-bold text-on-surface-variant uppercase underline decoration-primary/50 underline-offset-4">
                      {isBehind ? "High Criticality" : "Linear Trajectory"}
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Priority Management */}
        <div className="lg:col-span-4 space-y-8">
           {/* Schedule Status */}
           <div className={cn(
              "p-8 rounded-[2.5rem] border transition-all duration-500 relative overflow-hidden group h-fit",
              isBehind ? "bg-red-950/20 border-red-500/20 shadow-lg shadow-red-500/5" : isAhead ? "bg-green-950/20 border-green-500/20 shadow-lg shadow-green-500/5" : "bg-primary-950/20 border-primary/20 shadow-lg shadow-primary/5"
            )}>
              <div className="flex items-center gap-4 mb-6">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl",
                  isBehind ? "bg-red-500 text-white" : isAhead ? "bg-green-500 text-white" : "bg-primary text-white"
                )}>
                  {isBehind ? <ArrowDownRight size={24} /> : isAhead ? <ArrowUpRight size={24} /> : <Zap size={24} />}
                </div>
                <div>
                  <h4 className="text-xl font-bold tracking-tight text-on-surface">System Status</h4>
                  <p className={cn("text-[10px] font-black uppercase tracking-widest", isBehind ? "text-red-400" : "text-primary")}>
                    {isBehind ? 'Action Required' : isAhead ? 'Safety Buffer' : 'Linear Sync'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-3xl font-black tracking-tighter leading-none text-on-surface">
                  {isBehind ? `${Math.abs(backlog)} Problems Behind` : isAhead ? `${Math.abs(backlog)} Ahead of Plan` : 'Perfectly Sync'}
                </h4>
                <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                  {isBehind 
                    ? "Your execution pipeline is congested. Gemini suggests offloading Easy problems to clear the backlog." 
                    : isAhead 
                      ? "You've decoupled from the roadmap velocity. Optimal time to tackle 'Hard' difficulty modules." 
                      : "Balanced execution detected. No tactical shifts required at this moment."}
                </p>
              </div>
            </div>

            {/* Topic Distribution */}
            <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-white/5 shadow-xl">
               <h3 className="text-lg font-bold mb-6 text-on-surface">Mastery Distribution</h3>
               <div className="space-y-6">
                  {topicMastery.map((topic, i) => (
                    <motion.div 
                      key={topic.label} 
                      className="space-y-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-neutral-500">{topic.label}</span>
                        <span className="text-on-surface">{topic.percentage}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${topic.percentage}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full rounded-full shadow-[0_0_10px_currentColor]" 
                          style={{ backgroundColor: topic.color, color: topic.color }} 
                        />
                      </div>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>
        </div>

      {/* 4. Large AI Intelligent Command Hub */}
      <div className="bg-surface-container-low rounded-[3rem] border border-white/5 relative overflow-hidden flex flex-col lg:flex-row shadow-2xl min-h-[500px]">
        <div className="lg:w-1/3 p-12 bg-white/[0.02] border-r border-white/5 flex flex-col justify-between">
          <div>
            <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mb-8 shadow-inner">
              <Sparkles size={32} />
            </div>
            <h4 className="text-4xl font-black tracking-tighter text-on-surface mb-4">Intelligence Hub</h4>
            <p className="text-on-surface-variant leading-relaxed text-sm">
              Your personal neural strategist. Analyzing your performance patterns to deliver optimized recovery and acceleration vectors.
            </p>
          </div>

          <div className="space-y-6 pt-12">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5 shadow-lg shadow-primary/20">
                  <div className="w-full h-full bg-surface-container rounded-full flex items-center justify-center">
                     <Brain size={20} className="text-primary" />
                  </div>
               </div>
               <div>
                 <p className="text-xs font-black text-on-surface">Nexus Core AI</p>
                 <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">V 1.4.2 Active</p>
               </div>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[8px] font-black uppercase tracking-widest border border-green-500/20">Synced</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest border border-primary/20">Real-time</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-12 flex flex-col">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Latest Tactical Analysis</p>
            </div>

            {isAiLoading ? (
              <div className="space-y-6">
                <div className="h-4 w-full bg-white/5 rounded-full animate-pulse" />
                <div className="h-4 w-5/6 bg-white/5 rounded-full animate-pulse" />
                <div className="h-4 w-4/6 bg-white/5 rounded-full animate-pulse" />
                <div className="h-20 w-full bg-white/5 rounded-3xl animate-pulse mt-12" />
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="prose prose-invert prose-lg max-w-none text-on-surface-variant font-medium leading-relaxed custom-markdown-expanded"
              >
                <Markdown>{aiInsights}</Markdown>
              </motion.div>
            )}
          </div>
          
          <div className="mt-12 group">
            <div className="relative">
              <input 
                type="text" 
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && userQuery.trim()) {
                    fetchAIInsights(userQuery);
                    setUserQuery("");
                  }
                }}
                placeholder="Ask your AI Coach for a specific strategy (e.g., 'How to master DP in 5 days?')" 
                className="w-full bg-background border border-white/5 rounded-[2rem] px-8 py-5 text-sm font-medium outline-none focus:border-primary/50 transition-all focus:ring-4 focus:ring-primary/5 placeholder:text-neutral-600 pr-32"
              />
              <button 
                onClick={() => {
                  if (userQuery.trim()) {
                    fetchAIInsights(userQuery);
                    setUserQuery("");
                  }
                }}
                disabled={isAiLoading}
                className="absolute right-3 top-3 bottom-3 px-6 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                {isAiLoading ? 'THINKING...' : 'ASK NEXUS'}
              </button>
            </div>
            <p className="mt-4 text-[10px] text-neutral-600 font-bold uppercase tracking-wider text-center">
              Nexus uses your real-time analytics to formulate specialized responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimerPage = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [preset, setPreset] = useState('Classic Pomo');

  const presets = [
    { name: 'Deep Focus', time: 50, break: '10m', icon: Zap },
    { name: 'Classic Pomo', time: 25, break: '5m', icon: Timer },
    { name: 'Quick Sprint', time: 15, break: '2m', icon: Flame },
  ];

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    const p = presets.find(pr => pr.name === preset);
    setTimeLeft((p?.time || 25) * 60);
  };

  const handlePresetChange = (name: string, time: number) => {
    setPreset(name);
    setTimeLeft(time * 60);
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = timeLeft / ((presets.find(p => p.name === preset)?.time || 25) * 60);

  return (
    <div className="space-y-10 animate-fade-in flex flex-col items-center py-12">
      <div className="text-center max-w-2xl mb-8">
        <h2 className="text-6xl font-black tracking-tight text-white mb-4">Focus Flow</h2>
        <p className="text-on-surface-variant text-xl font-medium">Optimize your cognitive latency with dedicated micro-sessions.</p>
      </div>

      <div className="bento-grid w-full max-w-6xl">
        <div className="col-span-8 bg-[#111] rounded-[3rem] p-16 flex flex-col items-center justify-center relative border border-white/5">
          <div className="relative w-[360px] h-[360px] flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
               <circle cx="100" cy="100" r="90" fill="none" stroke="#ffffff05" strokeWidth="4" />
               <motion.circle 
                  cx="100" cy="100" r="90" fill="none" 
                  stroke="url(#timerGradient)" strokeWidth="6" strokeLinecap="round"
                  initial={{ pathLength: 1 }}
                  animate={{ pathLength: progress }}
                  transition={{ duration: 0.5 }}
               />
               <defs>
                 <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stopColor="#8b5cf6" />
                   <stop offset="100%" stopColor="#c026d3" />
                 </linearGradient>
               </defs>
            </svg>
            <div className="absolute text-center">
              <span className="text-7xl font-bold text-on-surface tabular-nums tracking-tighter">{formatTime(timeLeft)}</span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-4">Focus Phase</p>
            </div>
          </div>

          <div className="mt-16 flex items-center gap-8">
            <button 
              onClick={resetTimer}
              className="w-14 h-14 rounded-full border border-white/10 text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all flex items-center justify-center"
            >
              <RotateCcw size={24} />
            </button>
            <button 
              onClick={toggleTimer}
              className="px-12 py-5 rounded-2xl bg-on-surface text-background font-bold flex items-center gap-4 hover:bg-neutral-200 transition-all group"
            >
              {isActive ? <Pause size={20} className="fill-background" /> : <Play size={20} className="fill-background" />}
              <span className="tracking-widest uppercase text-xs">{isActive ? 'PAUSE' : 'START'}</span>
            </button>
            <button className="w-14 h-14 rounded-full border border-white/10 text-on-surface-variant">
              <AlertCircle size={24} className="opacity-20" />
            </button>
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container-high rounded-3xl p-10 border border-white/5 grow">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-black">Presets</h3>
              <Target size={20} className="text-secondary" />
            </div>
            <div className="space-y-4">
              {presets.map((p) => (
                <button 
                  key={p.name}
                  onClick={() => handlePresetChange(p.name, p.time)}
                  className={cn(
                    "w-full flex items-center justify-between p-6 rounded-2xl transition-all border group",
                    preset === p.name 
                      ? "bg-primary/10 border-primary/40 text-primary shadow-inner" 
                      : "bg-background/40 border-transparent hover:border-white/10 text-slate-500 hover:text-white"
                  )}
                >
                  <div className="text-left">
                    <p className="font-black text-lg">{p.name}</p>
                    <p className="text-[10px] uppercase font-black tracking-widest mt-1 opacity-60">{p.time}m work • {p.break} break</p>
                  </div>
                  <p.icon size={24} className={cn("transition-transform group-hover:scale-110", preset === p.name ? "text-primary" : "text-slate-600")} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
;

const DEFAULT_SNIPPETS: Record<string, string> = {
  python: `def two_sum(nums, target):
    prev_map = {} # val : index
    for i, n in enumerate(nums):
        diff = target - n
        if diff in prev_map:
            return [prev_map[diff], i]
        prev_map[n] = i
    return []

# Test Case
print(two_sum([2, 7, 11, 15], 9))`,
  cpp: `#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> prevMap;
    for (int i = 0; i < nums.size(); i++) {
        int diff = target - nums[i];
        if (prevMap.find(diff) != prevMap.end()) {
            return {prevMap[diff], i};
        }
        prevMap[nums[i]] = i;
    }
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    vector<int> result = twoSum(nums, target);
    if (!result.empty())
        cout << "[" << result[0] << ", " << result[1] << "]" << endl;
    return 0;
}`,
  c: `#include <stdio.h>
#include <stdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    *returnSize = 2;
    int* result = (int*)malloc(2 * sizeof(int));
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                result[0] = i;
                result[1] = j;
                return result;
            }
        }
    }
    return NULL;
}

int main() {
    int nums[] = {2, 7, 11, 15};
    int returnSize;
    int* result = twoSum(nums, 4, 9, &returnSize);
    if (result) {
        printf("[%d, %d]\\n", result[0], result[1]);
        free(result);
    }
    return 0;
}`,
  java: `import java.util.*;

public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> prevMap = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int diff = target - nums[i];
            if (prevMap.containsKey(diff)) {
                return new int[] { prevMap.get(diff), i };
            }
            prevMap.put(nums[i], i);
        }
        return new int[] {};
    }

    public static void main(String[] args) {
        int[] result = twoSum(new int[] { 2, 7, 11, 15 }, 9);
        System.out.println(Arrays.toString(result));
    }
}`
};

const CodeEditor = () => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(DEFAULT_SNIPPETS.python);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({ runtime: '0ms', memory: '0KB' });

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Nexus Intelligence Engine: Compiling and simulating execution...');
    
    try {
      const result = await simulateExecution(code, language);
      
      if (result.stderr) {
        setOutput(result.stderr);
      } else {
        setOutput(result.stdout || 'Execution finished with no output.');
        // Optionally show the Nexus hint as a bonus if output exists
        if (result.nexusHint) {
          setOutput(prev => prev + '\n\n---\nNEXUS TACTICAL HINT:\n' + result.nexusHint);
        }
      }
      
      setStats({
        runtime: result.runtime,
        memory: result.memory
      });
    } catch (error) {
      setOutput('Failed to connect to Nexus Intelligence Engine.');
      console.error(error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setCode(DEFAULT_SNIPPETS[newLang]);
    setOutput('');
  };

  return (
    <div className="flex flex-col lg:flex-row h-[750px] bg-surface-container rounded-3xl overflow-hidden border border-white/5 animate-fade-in shadow-2xl relative z-10">
      {/* Editor Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="px-6 py-4 bg-surface-container-high border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {['python', 'cpp', 'c', 'java'].map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all",
                  language === lang 
                    ? "bg-primary border-primary text-white" 
                    : "bg-neutral-900 border-white/5 text-on-surface-variant hover:text-on-surface"
                )}
              >
                <Binary size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {lang === 'cpp' ? 'C++' : lang.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors cursor-help"><Settings size={18} /></button>
          </div>
        </div>
        
        <div className="flex-1 bg-[#0a0a0a] p-0 font-mono text-sm overflow-auto text-on-surface/90">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) => highlight(code, languages[language === 'python' ? 'python' : language === 'cpp' ? 'cpp' : language === 'c' ? 'c' : 'java'], language)}
            padding={32}
            className="min-h-full outline-none"
            style={{
              fontFamily: '"JetBrains Mono", "Fira Code", monospace',
              fontSize: 14,
            }}
          />
        </div>
      </div>

      {/* Sidebar/Result */}
      <div className="w-full lg:w-[450px] bg-surface-container-high border-l border-white/5 flex flex-col">
        <div className="flex items-center px-8 pt-4 border-b border-white/5 gap-8">
          <button className="pb-4 border-b-2 border-primary text-primary font-bold text-xs uppercase tracking-widest">Console</button>
          <button className="pb-4 border-b-2 border-transparent text-on-surface-variant font-bold text-xs uppercase tracking-widest opacity-50 cursor-not-allowed">Test Cases</button>
        </div>
        
        <div className="flex-1 p-8 overflow-auto space-y-8 bg-[#0a0a0a]">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-4">Standard Output</p>
            <div className={cn(
              "p-6 rounded-2xl font-mono text-xs border bg-black/40 min-h-[200px] whitespace-pre-wrap leading-relaxed",
              output.includes('Error') || output.includes('Failed') ? "text-error border-error/20" : "text-secondary border-secondary/20"
            )}>
              {output || 'Click RUN to execute your logic...'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
              <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 mb-1">Runtime</p>
              <p className="text-xl font-bold text-on-surface">{stats.runtime}</p>
            </div>
            <div className="text-right bg-white/5 p-6 rounded-2xl border border-white/5">
              <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 mb-1">Memory</p>
              <p className="text-xl font-bold text-on-surface">{stats.memory}</p>
            </div>
          </div>
        </div>

        <div className="p-8 bg-surface-container flex gap-4 border-t border-white/5">
          <button 
            onClick={runCode}
            disabled={isRunning}
            className={cn(
              "flex-1 py-4 bg-neutral-900 border border-white/5 text-on-surface font-bold rounded-xl text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-3",
              isRunning ? "opacity-50" : "hover:bg-white/5 active:scale-95"
            )}
          >
            {isRunning ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Play size={16} />}
            {isRunning ? 'RUNNING' : 'RUN'}
          </button>
          <button 
            disabled={isRunning}
            className="flex-[1.5] py-4 bg-on-surface text-background font-bold rounded-xl text-xs tracking-widest uppercase hover:bg-neutral-200 transition-all active:scale-95 disabled:opacity-50"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

const SearchResults = ({ searchTerm, setActiveTab }: { searchTerm: string, setActiveTab: (t: string) => void }) => {
  const filteredTopics = TOPICS.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredProblems = PROBLEMS.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalResults = filteredTopics.length + filteredProblems.length;

  return (
    <div className="animate-fade-in space-y-12 pb-20">
      <div>
        <h2 className="text-3xl font-bold text-on-surface mb-2">Search results for "{searchTerm}"</h2>
        <p className="text-on-surface-variant text-sm">Found {totalResults} matches across modules and datasets.</p>
      </div>

      {filteredTopics.length > 0 && (
        <section>
          <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-6">Learning Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map(topic => (
              <div key={topic.id} className="bg-surface-container-low p-6 rounded-3xl border border-white/5 group hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center text-primary">
                    <topic.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">{topic.title}</h4>
                    <span className="text-[10px] font-bold text-primary uppercase">{topic.difficulty}</span>
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant line-clamp-2 mb-4">{topic.description}</p>
                <button 
                  onClick={() => setActiveTab('topics')}
                  className="text-[10px] font-bold text-on-surface uppercase tracking-widest hover:text-primary transition-colors"
                >
                  VIEW TOPIC
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {filteredProblems.length > 0 && (
        <section>
          <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-6">Problems</h3>
          <div className="space-y-3">
            {filteredProblems.map(problem => (
              <div key={problem.id} className="bg-surface-container-low p-4 rounded-2xl border border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    problem.difficulty === 'Easy' ? "bg-green-500" : problem.difficulty === 'Medium' ? "bg-yellow-500" : "bg-red-500"
                  )} />
                  <h4 className="font-bold text-on-surface">{problem.title}</h4>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    {problem.topics.map(t => (
                      <span key={t} className="text-[10px] bg-white/5 text-on-surface-variant px-2 py-0.5 rounded-full border border-white/5">{t}</span>
                    ))}
                  </div>
                  <button 
                    onClick={() => setActiveTab('editor')}
                    className="p-2 text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <Play size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {totalResults === 0 && (
        <div className="text-center py-20">
          <SearchIcon size={64} className="text-on-surface-variant/20 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-on-surface mb-2">No results found</h3>
          <p className="text-on-surface-variant">We couldn't find anything matching your search terms.</p>
        </div>
      )}
    </div>
  );
};

// --- App Shell ---


export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [schedule, setSchedule] = useState<{ startDate: string, endDate: string }>({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [completedProblems, setCompletedProblems] = useState<Record<string, { completed: boolean, updatedAt?: Timestamp }>>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // --- Real Stats Calculation ---
  const calculateStreak = () => {
    const dates = Object.values(completedProblems)
      .map(p => p.updatedAt?.toDate())
      .filter((d): d is Date => !!d)
      .map(d => d.toLocaleDateString())
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
    if (dates.length === 0) return 0;
    
    const uniqueDates = Array.from(new Set(dates));
    const today = new Date().toLocaleDateString();
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();
    
    // If haven't solved something today or yesterday, streak is broken
    if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) return 0;
    
    let streak = 0;
    let curr = new Date(uniqueDates[0]);
    
    for (const dateStr of uniqueDates) {
      const d = new Date(dateStr);
      const diff = Math.abs(curr.getTime() - d.getTime());
      const dayDiff = Math.ceil(diff / (1000 * 3600 * 24));
      
      if (dayDiff <= 1) {
        streak++;
        curr = d;
      } else {
        break;
      }
    }
    return streak;
  };

  const getEfficiency = () => {
    if (Object.keys(completedProblems).length === 0) return 0;
    // Mocking efficiency based on problem count for now, or just setting a high starting point
    return 85 + Math.min(10, Object.keys(completedProblems).length);
  };

  const handleLogin = async () => {
    setAuthError(null);
    setIsLoggingIn(true);
    try {
      await signInWithGoogle();
    } catch (error: any) {
      console.error("Login Error:", error);
      let message = "Failed to sign in. Please try again.";
      if (error.code === 'auth/popup-blocked') {
        message = "Popup was blocked. Please allow popups or open the app in a new tab.";
      } else if (error.code === 'auth/unauthorized-domain') {
        message = "This domain is not authorized. Please check your Firebase Console settings.";
      } else if (error.message) {
        message = error.message;
      }
      setAuthError(message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setCompletedProblems({});
      return;
    }

    const q = query(collection(db, 'users', user.uid, 'completedProblems'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const completed: Record<string, { completed: boolean, updatedAt?: Timestamp }> = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        completed[doc.id] = { 
          completed: true, 
          updatedAt: data.updatedAt 
        };
      });
      setCompletedProblems(completed);
    }, (error) => {
      console.error("Error fetching completed problems", error);
    });

    // Fetch schedule
    const scheduleRef = doc(db, 'users', user.uid, 'settings', 'schedule');
    const unsubscribeSchedule = onSnapshot(scheduleRef, (doc) => {
      if (doc.exists()) {
        setSchedule(doc.data() as { startDate: string, endDate: string });
      }
    });

    // Test connection as per guidelines
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if(error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    };
    testConnection();

    return () => {
      unsubscribe();
      unsubscribeSchedule();
    };
  }, [user]);

  const toggleProblem = async (problemId: string, completed: boolean) => {
    if (!user) return;
    
    const problemRef = doc(db, 'users', user.uid, 'completedProblems', problemId);
    try {
      if (completed) {
        await setDoc(problemRef, { completed: true, updatedAt: Timestamp.now() });
      } else {
        await deleteDoc(problemRef);
      }
    } catch (error) {
      handleFirestoreError(error, 'write', problemRef.path);
    }
  };

  const calculateDailyGoal = () => {
    const today = new Date();
    const end = new Date(schedule.endDate);
    const problemsRemaining = PROBLEMS.length - Object.keys(completedProblems).length;
    const daysRemaining = Math.max(0, Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
    
    if (daysRemaining <= 0) return problemsRemaining;
    return Math.ceil(problemsRemaining / daysRemaining);
  };

  const calculateSolvedToday = () => {
    const todayStr = new Date().toDateString();
    return Object.values(completedProblems).filter(p => {
      if (!p.updatedAt) return false;
      return p.updatedAt.toDate().toDateString() === todayStr;
    }).length;
  };

  const updateSchedule = async (start: string, end: string) => {
    if (!user) return;
    const scheduleRef = doc(db, 'users', user.uid, 'settings', 'schedule');
    try {
      await setDoc(scheduleRef, { startDate: start, endDate: end });
    } catch (error) {
      handleFirestoreError(error, 'write', scheduleRef.path);
    }
  };

  const getTitle = () => {
    if (searchTerm) return 'Search Results';
    switch (activeTab) {
      case 'dashboard': return 'Project Overview';
      case 'topics': return 'Learning Matrix';
      case 'problems': return 'Practice Hub';
      case 'editor': return 'Runtime Logic';
      case 'timer': return 'Deep Focus';
      case 'analytics': return 'Performance Core';
      default: return 'Nexus Algorithm';
    }
  };

  const renderContent = () => {
    if (searchTerm) return <SearchResults searchTerm={searchTerm} setActiveTab={setActiveTab} />;
    
    const completedCount = Object.keys(completedProblems).length;

    switch (activeTab) {
      case 'dashboard': return (
        <Dashboard 
          completedCount={completedCount} 
          setActiveTab={setActiveTab} 
          streak={calculateStreak()}
          efficiency={getEfficiency()}
        />
      );
      case 'topics': return <Topics setActiveTab={setActiveTab} completedProblems={completedProblems as any} setFilter={setFilter} />;
      case 'problems': return <Problems user={user!} completedProblems={completedProblems as any} onToggle={toggleProblem} filter={filter} setFilter={setFilter} />;
      case 'editor': return <CodeEditor />;
      case 'timer': return <TimerPage />;
      case 'analytics': return (
        <Analytics 
          completedCount={completedCount} 
          completedProblems={completedProblems} 
          schedule={schedule}
          onUpdateSchedule={updateSchedule}
        />
      );
      default: return (
        <Dashboard 
          completedCount={completedCount} 
          setActiveTab={setActiveTab} 
          streak={calculateStreak()}
          efficiency={getEfficiency()}
        />
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest animate-pulse">Initializing Nexus...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-surface-container p-12 rounded-3xl border border-white/5 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white shadow-lg mx-auto mb-8 shadow-primary/20">
            <Binary size={48} />
          </div>
          <h1 className="text-3xl font-bold text-on-surface mb-3 tracking-tight">KINETIC</h1>
          <p className="text-on-surface-variant mb-10 leading-relaxed font-medium">
            The next generation of algorithmic mastery. Secure your workspace to continue.
          </p>
          
          {authError && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-2xl text-error text-xs font-bold flex items-center gap-3">
              <AlertCircle size={16} />
              <p className="flex-1 text-left">{authError}</p>
            </div>
          )}

          <button 
            onClick={handleLogin}
            disabled={isLoggingIn}
            className={cn(
              "w-full py-4 bg-on-surface text-background font-bold rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95",
              isLoggingIn ? "opacity-70 cursor-not-allowed" : "hover:bg-neutral-200"
            )}
          >
            {isLoggingIn ? (
              <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
            ) : (
              <LogIn size={20} />
            )}
            {isLoggingIn ? "CONNECTING..." : "SIGN IN WITH GOOGLE"}
          </button>

          {authError && authError.includes("new tab") && (
            <button 
              onClick={() => window.open(window.location.href, '_blank')}
              className="mt-4 text-[10px] font-bold text-primary uppercase tracking-widest hover:underline"
            >
              Open in New Tab
            </button>
          )}

          <p className="text-[10px] text-on-surface-variant mt-8 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <Zap size={12} className="text-primary" /> Powered by Nexus Algorithm
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        solvedToday={calculateSolvedToday()}
        dailyGoal={calculateDailyGoal()}
      />
      <Header title={getTitle()} searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />
      <main className="ml-64 pt-32 pb-16 px-12 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Floating Action Button */}
      <button 
        onClick={() => setActiveTab('problems')}
        className="fixed bottom-10 right-10 w-16 h-16 rounded-2xl bg-on-surface text-background shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group border border-white/10"
      >
        <Plus size={32} strokeWidth={3} className="transition-transform group-hover:rotate-90" />
        <span className="absolute right-full mr-6 px-4 py-2 bg-neutral-900 text-on-surface text-[10px] font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 whitespace-nowrap pointer-events-none shadow-2xl border border-white/5 uppercase tracking-widest">
          Quick Solve
        </span>
      </button>
    </div>
  );
}
