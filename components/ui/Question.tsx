'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Question as QuestionType, 
  QuestionResult,
  MultipleChoiceQuestion,
  DragDropQuestion,
  ShortAnswerQuestion,
  DragDropItem
} from '@/utils/questionTypes';
import { 
  CheckCircle, 
  XCircle, 
  Star, 
  Rocket, 
  Zap, 
  Clock,
  Target,
  Award
} from 'lucide-react';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (result: QuestionResult) => void;
  questionNumber: number;
  totalQuestions: number;
}

/**
 * Universal Question component that handles multiple question types
 * Features animations, immediate feedback, and XP rewards
 */
export const Question: React.FC<QuestionProps> = ({
  question,
  onAnswer,
  questionNumber,
  totalQuestions
}) => {
  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [startTime] = useState(Date.now());
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dropMatches, setDropMatches] = useState<Record<string, string>>({});

  // Handle answer submission
  const handleSubmit = () => {
    if (userAnswer === null || isAnswered) return;

    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    let correct = false;

    // Check answer based on question type
    switch (question.type) {
      case 'multiple-choice':
        correct = userAnswer === (question as MultipleChoiceQuestion).correctAnswer;
        break;
      case 'short-answer':
        const shortQ = question as ShortAnswerQuestion;
        const normalizedAnswer = String(userAnswer).toLowerCase().trim();
        correct = shortQ.correctAnswers.some(ans => 
          ans.toLowerCase().trim() === normalizedAnswer
        );
        break;
      case 'drag-drop':
        const dragQ = question as DragDropQuestion;
        correct = dragQ.items.every(item => 
          dropMatches[item.id] === item.correctTargetId
        );
        break;
    }

    setIsCorrect(correct);
    setIsAnswered(true);
    setShowFeedback(true);

    // Create result
    const result: QuestionResult = {
      questionId: question.id,
      isCorrect: correct,
      userAnswer: question.type === 'drag-drop' ? dropMatches : userAnswer,
      xpEarned: correct ? question.xpReward : 0,
      timeSpent
    };

    // Delay calling onAnswer to show animation
    setTimeout(() => {
      onAnswer(result);
    }, 2500);
  };

  // Auto-submit for drag-drop when all items are matched
  useEffect(() => {
    if (question.type === 'drag-drop') {
      const dragQ = question as DragDropQuestion;
      const allMatched = dragQ.items.every(item => dropMatches[item.id]);
      if (allMatched && !isAnswered) {
        setUserAnswer(dropMatches);
        setTimeout(handleSubmit, 500);
      }
    }
  }, [dropMatches, question, isAnswered]);

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData('text/plain', itemId);
    setDraggedItem(itemId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    
    if (itemId && !isAnswered) {
      setDropMatches(prev => ({
        ...prev,
        [itemId]: targetId
      }));
    }
    setDraggedItem(null);
  };

  const getDifficultyColor = () => {
    switch (question.difficulty) {
      case 'easy': return 'text-green-400 bg-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getSubjectIcon = () => {
    switch (question.subject) {
      case 'science': return '🔬';
      case 'technology': return '💻';
      case 'engineering': return '⚙️';
      case 'mathematics': return '🔢';
      default: return '📚';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Question Header */}
      <motion.div
        className="bg-space-navy/50 backdrop-blur-sm border border-purple/30 rounded-t-2xl p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getSubjectIcon()}</span>
            <div>
              <p className="text-sm text-galaxy-gray">
                Question {questionNumber} of {totalQuestions}
              </p>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor()}`}>
                  {question.difficulty}
                </span>
                <div className="flex items-center space-x-1 text-cosmic-yellow">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm font-medium">+{question.xpReward} XP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-32">
            <div className="flex justify-between text-xs text-galaxy-gray mb-1">
              <span>Progress</span>
              <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-neon-green h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-star-white mb-4">
          {question.prompt}
        </h2>
      </motion.div>

      {/* Question Content */}
      <motion.div
        className="bg-space-deep-blue/50 border-x border-purple/30 p-6 min-h-[300px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Multiple Choice */}
        {question.type === 'multiple-choice' && (
          <div className="space-y-3">
            {(question as MultipleChoiceQuestion).options.map((option, index) => (
              <motion.button
                key={index}
                className={`
                  w-full p-4 rounded-xl border-2 transition-all duration-300 text-left
                  ${userAnswer === index 
                    ? 'border-cosmic-yellow bg-cosmic-yellow/20 text-cosmic-yellow' 
                    : 'border-purple/30 bg-space-navy/30 text-star-white hover:border-cosmic-yellow/50 hover:bg-cosmic-yellow/10'
                  }
                  ${isAnswered ? 'pointer-events-none' : ''}
                `}
                onClick={() => !isAnswered && setUserAnswer(index)}
                whileHover={!isAnswered ? { scale: 1.02 } : {}}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
                disabled={isAnswered}
              >
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${userAnswer === index ? 'border-cosmic-yellow bg-cosmic-yellow' : 'border-gray-400'}
                  `}>
                    {userAnswer === index && (
                      <div className="w-3 h-3 rounded-full bg-space-deep-blue" />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {/* Short Answer */}
        {question.type === 'short-answer' && (
          <div className="space-y-4">
            <motion.input
              type={question.answerType === 'number' ? 'number' : 'text'}
              placeholder={question.placeholder || 'Type your answer...'}
              value={userAnswer || ''}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={isAnswered}
              className="w-full p-4 bg-space-navy/50 border border-purple/30 rounded-xl text-star-white placeholder-galaxy-gray focus:border-cosmic-yellow focus:outline-none transition-colors"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            />
          </div>
        )}

        {/* Drag and Drop */}
        {question.type === 'drag-drop' && (
          <div className="space-y-6">
            {/* Draggable Items */}
            <div>
              <h3 className="text-lg font-semibold text-star-white mb-3">Drag these items:</h3>
              <div className="flex flex-wrap gap-3">
                {(question as DragDropQuestion).items.map((item) => (
                  <motion.div
                    key={item.id}
                    draggable={!isAnswered && !dropMatches[item.id]}
                    onDragStart={(e: any) => handleDragStart(e, item.id)}
                    className={`
                      px-4 py-3 rounded-xl border-2 cursor-move transition-all duration-300
                      ${dropMatches[item.id] 
                        ? 'border-neon-green bg-neon-green/20 text-neon-green opacity-50' 
                        : 'border-cosmic-yellow bg-cosmic-yellow/20 text-cosmic-yellow hover:scale-105'
                      }
                      ${draggedItem === item.id ? 'scale-110 rotate-3' : ''}
                      ${isAnswered ? 'cursor-not-allowed' : ''}
                    `}
                    whileHover={!isAnswered && !dropMatches[item.id] ? { scale: 1.05 } : {}}
                    whileDrag={{ scale: 1.1, rotate: 5 }}
                  >
                    {item.content}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Drop Targets */}
            <div>
              <h3 className="text-lg font-semibold text-star-white mb-3">Drop them here:</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(question as DragDropQuestion).targets.map((target) => {
                  const matchedItem = Object.entries(dropMatches).find(([_, targetId]) => targetId === target.id);
                  const itemContent = matchedItem ? 
                    (question as DragDropQuestion).items.find(item => item.id === matchedItem[0])?.content : null;

                  return (
                    <motion.div
                      key={target.id}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, target.id)}
                      className={`
                        p-4 rounded-xl border-2 border-dashed min-h-[100px] transition-all duration-300
                        ${itemContent 
                          ? 'border-neon-green bg-neon-green/10' 
                          : 'border-purple/50 bg-space-navy/30 hover:border-cosmic-yellow/50'
                        }
                      `}
                      whileHover={!itemContent ? { scale: 1.02 } : {}}
                    >
                      <div className="text-center">
                        <p className="font-medium text-star-white mb-1">{target.content}</p>
                        {target.description && (
                          <p className="text-sm text-galaxy-gray">{target.description}</p>
                        )}
                        {itemContent && (
                          <motion.div
                            className="mt-2 p-2 bg-neon-green/20 rounded-lg"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <span className="text-neon-green font-medium">{itemContent}</span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Submit Button */}
      <motion.div
        className="bg-space-navy/50 backdrop-blur-sm border border-purple/30 rounded-b-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {!isAnswered && (
          <motion.button
            onClick={handleSubmit}
            disabled={userAnswer === null || userAnswer === '' || (question.type === 'drag-drop' && Object.keys(dropMatches).length === 0)}
            className="w-full py-3 px-6 bg-gradient-to-r from-cosmic-yellow to-neon-green text-space-deep-blue font-bold rounded-xl hover:from-neon-green hover:to-cosmic-yellow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit Answer
          </motion.button>
        )}
      </motion.div>

      {/* Feedback Animation & Results */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-space-navy border border-purple/30 rounded-2xl p-8 max-w-md w-full mx-4 text-center"
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Success Animation */}
              {isCorrect ? (
                <div>
                  <motion.div
                    className="mb-6"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 1 }}
                  >
                    <Rocket className="h-16 w-16 text-neon-green mx-auto" />
                  </motion.div>
                  
                  <motion.h3
                    className="text-2xl font-bold text-neon-green mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Correct! 🚀
                  </motion.h3>
                  
                  <motion.div
                    className="flex items-center justify-center space-x-2 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Award className="h-5 w-5 text-cosmic-yellow" />
                    <span className="text-cosmic-yellow font-bold">+{question.xpReward} XP</span>
                  </motion.div>

                  {/* Floating Stars */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-cosmic-yellow text-xl"
                      style={{
                        left: `${30 + i * 10}%`,
                        top: `${20 + i * 15}%`,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.2, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        delay: 0.8 + i * 0.1,
                        ease: "easeInOut"
                      }}
                    >
                      ⭐
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div>
                  <motion.div
                    className="mb-6"
                    animate={{ 
                      x: [-10, 10, -10, 10, 0],
                      rotate: [-5, 5, -5, 5, 0]
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <XCircle className="h-16 w-16 text-red-400 mx-auto" />
                  </motion.div>
                  
                  <motion.h3
                    className="text-2xl font-bold text-red-400 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Not quite! 💫
                  </motion.h3>
                  
                  <motion.p
                    className="text-galaxy-gray"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Don't worry, keep exploring!
                  </motion.p>
                </div>
              )}

              {/* Explanation */}
              {question.explanation && (
                <motion.div
                  className="mt-4 p-4 bg-space-deep-blue/50 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <p className="text-sm text-galaxy-gray">{question.explanation}</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
