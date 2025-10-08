import React from 'react';
import type { Lesson, LessonType } from '../types';
import Card from './Card';
import QuizComponent from './QuizComponent';
import BookIcon from './icons/BookIcon';
import GameIcon from './icons/GameIcon';
import LightbulbIcon from './icons/LightbulbIcon';
import TargetIcon from './icons/TargetIcon';

interface LessonContentProps {
  weekTitle: string;
  lessons: Lesson[];
  activeDay: number;
  onSelectDay: (day: number) => void;
  lesson: Lesson;
}

const lessonTypeIcons: Record<LessonType, React.ReactNode> = {
    concept: <LightbulbIcon className="h-6 w-6" />,
    history: <BookIcon className="h-6 w-6" />,
    game: <GameIcon className="h-6 w-6" />,
    quiz: <GameIcon className="h-6 w-6" />,
    interactive: <TargetIcon className="h-6 w-6" />,
    problem: <TargetIcon className="h-6 w-6" />,
    review: <LightbulbIcon className="h-6 w-6" />,
};

const lessonTypeColors: Record<LessonType, string> = {
    concept: 'text-sky-500',
    history: 'text-amber-500',
    game: 'text-emerald-500',
    quiz: 'text-emerald-500',
    interactive: 'text-indigo-500',
    problem: 'text-rose-500',
    review: 'text-teal-500',
};

const LessonContent: React.FC<LessonContentProps> = ({ weekTitle, lessons, activeDay, onSelectDay, lesson }) => {
  return (
    <div>
        <div className="mb-6">
            <h2 className="text-3xl font-bold text-slate-800">{weekTitle}</h2>
            <p className="text-slate-500">Dia {activeDay} de 5</p>
        </div>
      <div className="flex border-b border-slate-200 mb-6">
        {lessons.map((l) => (
          <button
            key={l.day}
            onClick={() => onSelectDay(l.day)}
            className={`px-4 py-2 text-sm font-semibold transition-all duration-200 transform hover:-translate-y-0.5 ${
              activeDay === l.day
                ? 'border-b-2 border-sky-500 text-sky-600'
                : 'text-slate-500 hover:text-sky-500 border-b-2 border-transparent'
            }`}
          >
            Dia {l.day}
          </button>
        ))}
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-4">
            <span className={lessonTypeColors[lesson.type]}>{lessonTypeIcons[lesson.type]}</span>
            <h3 className={`text-2xl font-bold ${lessonTypeColors[lesson.type]}`}>{lesson.title}</h3>
        </div>
        <div className="prose max-w-none prose-p:text-slate-600 prose-li:text-slate-600">
            {lesson.type === 'quiz' && lesson.quiz ? (
                <QuizComponent questions={lesson.quiz} />
            ) : (
                lesson.content
            )}
        </div>
      </Card>
    </div>
  );
};

export default LessonContent;