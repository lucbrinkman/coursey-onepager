import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, MessageSquare, Bot, Mic } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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
  aiResponses: '#22c55e',
  voiceInput: '#a855f7',
};

function calculateCosts(params) {
  const articleTokens = Math.floor(params.wordsPerArticle * params.tokensPerWord);
  const totalArticleTokens = articleTokens * params.articlesPerLesson;
  const staticPrefixTokens = params.systemPromptTokens + totalArticleTokens;
  const userMessageTokens = Math.floor(params.userMessageWords * params.tokensPerWord);

  const tokensToUSD = (tokens, pricePerMTok) => (tokens / 1_000_000) * pricePerMTok;

  // Calculate costs in a simplified way
  let inputCost = 0;
  let outputCost = 0;

  for (let conv = 1; conv <= params.conversationsPerLesson; conv++) {
    let prefixTokens = staticPrefixTokens;

    for (let turn = 1; turn <= params.turnsPerConversation; turn++) {
      let cacheRead, cacheWrite;

      if (turn === 1) {
        if (conv === 1) {
          cacheWrite = staticPrefixTokens + userMessageTokens;
          cacheRead = 0;
        } else {
          cacheRead = staticPrefixTokens;
          cacheWrite = userMessageTokens;
        }
      } else {
        cacheRead = prefixTokens;
        cacheWrite = params.aiResponseTokens + userMessageTokens;
      }

      prefixTokens += params.aiResponseTokens + userMessageTokens;

      inputCost += tokensToUSD(cacheRead, params.cacheReadPerMTok);
      inputCost += tokensToUSD(cacheWrite, params.cacheWritePerMTok);
      outputCost += tokensToUSD(params.aiResponseTokens, params.outputPerMTok);
    }
  }

  // Whisper cost
  const totalUserMessages = params.conversationsPerLesson * params.turnsPerConversation;
  const voiceMessages = totalUserMessages * params.voiceInputFraction;
  const minutesPerMessage = params.userMessageWords / params.speakingWordsPerMinute;
  const whisperCost = voiceMessages * minutesPerMessage * params.whisperPerMinute;

  const lessonTotal = inputCost + outputCost + whisperCost;

  // Scale calculations
  const lessonsPerCourse = params.modulesPerCourse * params.lessonsPerModule;

  return {
    lesson: {
      lessonContent: inputCost,
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
  return `$${value.toFixed(2)}`;
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
      <p className="font-medium text-gray-900 mb-2">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} style={{ color: entry.color }} className="text-sm">
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
}

export default function CostVisualization() {
  const [params, setParams] = useState(DEFAULT_PARAMS);
  const costs = useMemo(() => calculateCosts(params), [params]);

  const breakdownData = [
    { name: 'Reading lesson content', value: costs.lesson.lessonContent, color: COLORS.lessonContent },
    { name: 'AI tutor responses', value: costs.lesson.aiResponses, color: COLORS.aiResponses },
    { name: 'Voice transcription', value: costs.lesson.voiceInput, color: COLORS.voiceInput },
  ];

  const scaleData = [
    { name: '1 student', cost: costs.course.total },
    { name: '100 students', cost: costs.course.total * 100 },
    { name: '1,000 students', cost: costs.course.total * 1000 },
    { name: '10,000 students', cost: costs.course.total * 10000 },
  ];

  const updateParam = (key, value) => {
    setParams(prev => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to One-Pager
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Cost Per Student
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Each student has 1-on-1 conversations with an AI tutor. Here's what that costs.
          </p>
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
            <p className="text-4xl font-bold text-green-600">{formatCurrency(costs.course.total * 1000)}</p>
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Where do the costs come from?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-3">
              <div className="p-2 bg-blue-100 rounded-lg h-fit">
                <BookOpen size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800">Reading lesson content</h3>
                <p className="text-sm text-slate-600 mt-1">
                  The AI reads the lesson articles to understand the material before tutoring the student.
                </p>
                <p className="text-sm font-medium text-blue-600 mt-2">{formatCurrency(costs.lesson.lessonContent)}/lesson</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="p-2 bg-green-100 rounded-lg h-fit">
                <Bot size={20} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800">AI tutor responses</h3>
                <p className="text-sm text-slate-600 mt-1">
                  The AI generates personalized responses, explanations, and follow-up questions.
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
                  Students can speak instead of type. We transcribe ~{Math.round(params.voiceInputFraction * 100)}% of messages.
                </p>
                <p className="text-sm font-medium text-purple-600 mt-2">{formatCurrency(costs.lesson.voiceInput)}/lesson</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Cost breakdown pie */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Cost Breakdown (Per Lesson)</h2>
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
            <div className="flex justify-center gap-4 mt-2 flex-wrap">
              {breakdownData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-slate-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scale */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Cost at Scale (Per Course)</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={scaleData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tickFormatter={(v) => v >= 1000 ? `$${(v/1000).toFixed(0)}k` : `$${v.toFixed(0)}`} tick={{ fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="cost" name="Total Cost" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-slate-500 mt-2 text-center">
              Linear scaling: {costs.params.lessonsPerCourse} lessons × {formatCurrency(costs.lesson.total)}/lesson
            </p>
          </div>
        </div>

        {/* What's in a lesson */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">What's in a lesson?</h2>
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
          Using Claude 3.5 Sonnet with prompt caching • Whisper API for voice
        </p>
      </div>
    </div>
  );
}
