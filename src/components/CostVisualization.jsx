import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, MessageSquare, Bot, Mic } from 'lucide-react';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Default parameters
const DEFAULT_PARAMS = {
  modulesPerCourse: 5,
  lessonsPerModule: 4,
  articlesPerLesson: 3,
  conversationsPerLesson: 3,
  turnsPerConversation: 4,
  systemPromptTokens: 800,
  wordsPerArticle: 2500,
  tokensPerWord: 1.3,
  userMessageWords: 200,
  aiResponseTokens: 400,
  cacheWritePerMTok: 6.0,
  cacheReadPerMTok: 0.3,
  outputPerMTok: 15.0,
  baseInputPerMTok: 3.0,
  whisperPerMinute: 0.006,
  voiceInputFraction: 0.5,
  speakingWordsPerMinute: 150,
};

const COLORS = {
  lessonContent: '#3b82f6',
  studentMessages: '#f59e0b',
  aiResponses: '#22c55e',
  voiceInput: '#a855f7',
};

function calculateCosts(params) {
  const articleTokens = Math.floor(params.wordsPerArticle * params.tokensPerWord);
  const totalArticleTokens = articleTokens * params.articlesPerLesson;
  const staticPrefixTokens = params.systemPromptTokens + totalArticleTokens;
  const userMessageTokens = Math.floor(params.userMessageWords * params.tokensPerWord);

  const tokensToUSD = (tokens, pricePerMTok) => (tokens / 1_000_000) * pricePerMTok;

  // Track costs separately
  let lessonContentCost = 0;  // Articles, video transcripts, system prompt
  let studentMessagesCost = 0; // User messages
  let outputCost = 0;

  for (let conv = 1; conv <= params.conversationsPerLesson; conv++) {
    let prefixTokens = staticPrefixTokens;

    for (let turn = 1; turn <= params.turnsPerConversation; turn++) {
      if (turn === 1) {
        if (conv === 1) {
          // First turn of first conversation: write everything
          lessonContentCost += tokensToUSD(staticPrefixTokens, params.cacheWritePerMTok);
          studentMessagesCost += tokensToUSD(userMessageTokens, params.cacheWritePerMTok);
        } else {
          // First turn of later conversations: read static, write user message
          lessonContentCost += tokensToUSD(staticPrefixTokens, params.cacheReadPerMTok);
          studentMessagesCost += tokensToUSD(userMessageTokens, params.cacheWritePerMTok);
        }
      } else {
        // Later turns: read prefix (includes static + history), write new message
        // Attribute the static portion to lesson content, rest to student messages
        const historyTokens = prefixTokens - staticPrefixTokens;
        lessonContentCost += tokensToUSD(staticPrefixTokens, params.cacheReadPerMTok);
        studentMessagesCost += tokensToUSD(historyTokens, params.cacheReadPerMTok);
        studentMessagesCost += tokensToUSD(userMessageTokens + params.aiResponseTokens, params.cacheWritePerMTok);
      }

      prefixTokens += params.aiResponseTokens + userMessageTokens;
      outputCost += tokensToUSD(params.aiResponseTokens, params.outputPerMTok);
    }
  }

  // Whisper cost
  const totalUserMessages = params.conversationsPerLesson * params.turnsPerConversation;
  const voiceMessages = totalUserMessages * params.voiceInputFraction;
  const minutesPerMessage = params.userMessageWords / params.speakingWordsPerMinute;
  const whisperCost = voiceMessages * minutesPerMessage * params.whisperPerMinute;

  const lessonTotal = lessonContentCost + studentMessagesCost + outputCost + whisperCost;

  // Scale calculations
  const lessonsPerCourse = params.modulesPerCourse * params.lessonsPerModule;

  return {
    lesson: {
      lessonContent: lessonContentCost,
      studentMessages: studentMessagesCost,
      aiResponses: outputCost,
      voiceInput: whisperCost,
      total: lessonTotal,
    },
    course: {
      total: lessonTotal * lessonsPerCourse,
    },
    params: {
      lessonsPerCourse,
      totalArticleTokens,
      conversationsPerLesson: params.conversationsPerLesson,
      turnsPerConversation: params.turnsPerConversation,
    },
  };
}

function formatCurrency(value) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export default function CostVisualization() {
  const [params, setParams] = useState(DEFAULT_PARAMS);
  const costs = useMemo(() => calculateCosts(params), [params]);

  const breakdownData = [
    { name: 'Lesson content', value: costs.lesson.lessonContent, color: COLORS.lessonContent },
    { name: 'Student messages', value: costs.lesson.studentMessages, color: COLORS.studentMessages },
    { name: 'AI tutor responses', value: costs.lesson.aiResponses, color: COLORS.aiResponses },
    { name: 'Voice transcription', value: costs.lesson.voiceInput, color: COLORS.voiceInput },
  ];

  const updateParam = (key, value) => {
    setParams(prev => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Back link */}
        <div className="sticky top-0 z-50 bg-gradient-to-br from-slate-50 to-slate-100 py-3 -mx-8 px-8 mb-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to One-Pager
          </Link>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Marginal Cost Calculator
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Students chat with an AI tutor about the course content. Here's what that costs.
          </p>
          <div className="mt-4">
            <Link
              to="/team-costs"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
            >
              Fixed Cost Breakdown →
            </Link>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">Per Lesson</p>
            <p className="text-4xl font-bold text-slate-800">{formatCurrency(costs.lesson.total)}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">Per Course</p>
            <p className="text-4xl font-bold text-slate-800">{formatCurrency(costs.course.total)}</p>
            <p className="text-xs text-slate-400 mt-1">{costs.params.lessonsPerCourse} lessons</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">1,000 Students</p>
            <p className="text-4xl font-bold text-slate-800">${Math.round(costs.course.total * 1000).toLocaleString('en-US')}</p>
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Where do the costs come from?</h2>
          <p className="text-slate-600 mb-6">
            Students chat with an AI tutor about the course content. Each conversation has context (the lesson material and chat history) plus the AI's responses.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex gap-3">
              <div className="p-2 bg-blue-100 rounded-lg h-fit">
                <BookOpen size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800">Lesson content</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Articles and video transcripts the AI reads to understand the material.
                </p>
                <p className="text-sm font-medium text-blue-600 mt-2">{formatCurrency(costs.lesson.lessonContent)}/lesson</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="p-2 bg-amber-100 rounded-lg h-fit">
                <MessageSquare size={20} className="text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800">Student messages</h3>
                <p className="text-sm text-slate-600 mt-1">
                  What students type or say, plus the conversation history.
                </p>
                <p className="text-sm font-medium text-amber-600 mt-2">{formatCurrency(costs.lesson.studentMessages)}/lesson</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="p-2 bg-green-100 rounded-lg h-fit">
                <Bot size={20} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800">AI tutor responses</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Personalized explanations, answers, and guidance.
                </p>
                <p className="text-sm font-medium text-green-600 mt-2">{formatCurrency(costs.lesson.aiResponses)}/lesson</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="p-2 bg-purple-100 rounded-lg h-fit">
                <Mic size={20} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800">Voice transcription</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Transcribing ~{Math.round(params.voiceInputFraction * 100)}% of messages from speech.
                </p>
                <p className="text-sm font-medium text-purple-600 mt-2">{formatCurrency(costs.lesson.voiceInput)}/lesson</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cost breakdown pie */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8 max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 text-center">Cost Breakdown (Per Lesson)</h2>
          <div className="relative">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={breakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {breakdownData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-800">{formatCurrency(costs.lesson.total)}</p>
                <p className="text-xs text-slate-500">total</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-2 flex-wrap">
            {breakdownData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-slate-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What's in a lesson */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">What's in a lesson?</h2>
          <p className="text-slate-600 mb-4 text-center">A lesson is about one hour of work.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-slate-800">{params.articlesPerLesson}</p>
              <p className="text-sm text-slate-500">articles to read</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-800">{costs.params.conversationsPerLesson}</p>
              <p className="text-sm text-slate-500">AI conversations</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-800">{costs.params.turnsPerConversation}</p>
              <p className="text-sm text-slate-500">turns per conversation</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-800">{costs.params.conversationsPerLesson * costs.params.turnsPerConversation}</p>
              <p className="text-sm text-slate-500">total AI responses</p>
            </div>
          </div>
        </div>

        {/* Adjust parameters (collapsed by default for donors) */}
        <details className="bg-white rounded-xl shadow-sm border border-slate-200">
          <summary className="p-6 cursor-pointer text-lg font-semibold text-slate-800">
            Adjust Parameters (Advanced)
          </summary>
          <div className="px-6 pb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: 'modulesPerCourse', label: 'Modules/Course' },
                { key: 'lessonsPerModule', label: 'Lessons/Module' },
                { key: 'conversationsPerLesson', label: 'Conversations/Lesson' },
                { key: 'turnsPerConversation', label: 'Turns/Conversation' },
                { key: 'wordsPerArticle', label: 'Words/Article' },
                { key: 'aiResponseTokens', label: 'AI Response Length' },
                { key: 'userMessageWords', label: 'Student Message Length' },
                { key: 'voiceInputFraction', label: 'Voice Input %', step: 0.1 },
              ].map(({ key, label, step = 1 }) => (
                <div key={key}>
                  <label className="block text-sm text-slate-600 mb-1">{label}</label>
                  <input
                    type="number"
                    step={step}
                    value={params[key]}
                    onChange={(e) => updateParam(key, e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </details>

        <p className="text-center text-slate-400 text-sm mt-8">
          Calculated costs are based on: Claude Sonnet 4.5 with prompt caching • Whisper API for voice
          <br />
          Traditional software costs (hosting, database) are minimal compared to AI costs.
        </p>
      </div>
    </div>
  );
}
