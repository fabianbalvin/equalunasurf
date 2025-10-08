import React, { useState } from 'react';
import type { QuizQuestion } from '../types';

interface QuizComponentProps {
  questions: QuizQuestion[];
}

const QuizComponent: React.FC<QuizComponentProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswerIndex === currentQuestion.correctAnswerIndex;

  const handleAnswerClick = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswerIndex(index);
    setIsAnswered(true);
    if (index === currentQuestion.correctAnswerIndex) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerIndex(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswerIndex(null);
        setIsAnswered(false);
        setScore(0);
        setShowResults(false);
    }


  if (showResults) {
    return (
      <div className="text-center bg-emerald-50 p-8 rounded-lg">
        <h3 className="text-2xl font-bold text-emerald-700">Quiz Completo!</h3>
        <p className="text-lg my-4 text-slate-600">
          Você acertou {score} de {questions.length} perguntas.
        </p>
        <div className="w-full bg-gray-200 rounded-full h-4 my-4">
            <div className="bg-emerald-500 h-4 rounded-full" style={{ width: `${(score / questions.length) * 100}%` }}></div>
        </div>
        <button
          onClick={handleRestart}
          className="mt-4 px-6 py-2 bg-sky-500 text-white font-semibold rounded-lg shadow hover:bg-sky-600 transition-all transform hover:scale-105"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-slate-50 rounded-lg">
      <p className="text-sm text-slate-500 mb-2">Pergunta {currentQuestionIndex + 1} de {questions.length}</p>
      <h4 className="text-lg font-semibold mb-6 text-slate-800">{currentQuestion.question}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(index)}
            disabled={isAnswered}
            className={`p-4 rounded-lg border-2 text-left transition-all duration-200 transform ${
              isAnswered && index === currentQuestion.correctAnswerIndex
                ? 'bg-emerald-100 border-emerald-400 text-emerald-800'
                : isAnswered && index === selectedAnswerIndex
                ? 'bg-rose-100 border-rose-400 text-rose-800'
                : 'bg-white border-slate-300 hover:bg-sky-50 hover:border-sky-400 hover:scale-[1.03]'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {isAnswered && (
        <div className="mt-6 text-center">
            <p className={`font-bold text-lg ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                {isCorrect ? 'Resposta Certa!' : 'Quase lá!'}
            </p>
          <button
            onClick={handleNextQuestion}
            className="mt-4 px-8 py-3 bg-sky-500 text-white font-bold rounded-lg shadow-md hover:bg-sky-600 transition-transform transform hover:scale-105"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultados'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;