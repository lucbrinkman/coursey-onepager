import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, MessageSquare, Bot, Mic } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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

// Parameter definitions with min/max for sliders
const PARAM_CONFIG = [
  { key: 'modulesPerCourse', label: 'Modules/Course', min: 1, max: 10, step: 1 },
  { key: 'lessonsPerModule', label: 'Lessons/Module', min: 1, max: 10, step: 1 },
  { key: 'conversationsPerLesson', label: 'Conversations/Lesson', min: 1, max: 10, step: 1 },
  { key: 'turnsPerConversation', label: 'Turns/Conversation', min: 1, max: 10, step: 1 },
  { key: 'wordsPerArticle', label: 'Words/Article', min: 500, max: 5000, step: 100 },
  { key: 'aiResponseTokens', label: 'AI Response Length', min: 100, max: 1000, step: 50 },
  { key: 'userMessageWords', label: 'Student Message Length', min: 50, max: 500, step: 25 },
  { key: 'voiceInputFraction', label: 'Voice Input %', min: 0, max: 1, step: 0.1, format: (v) => `${Math.round(v * 100)}%` },
];

export default function CostVisualization() {
  const [params, setParams] = useState(DEFAULT_PARAMS);
  const [paramsOpen, setParamsOpen] = useState(false);
  const costs = useMemo(() => calculateCosts(params), [params]);

  const lessonBreakdownData = [
    { name: 'AI reads lesson content', value: costs.lesson.lessonContent, color: COLORS.lessonContent },
    { name: 'AI reads student messages', value: costs.lesson.studentMessages, color: COLORS.studentMessages },
    { name: 'AI tutor responses', value: costs.lesson.aiResponses, color: COLORS.aiResponses },
    { name: 'Voice transcription', value: costs.lesson.voiceInput, color: COLORS.voiceInput },
  ];

  const courseBreakdownData = [
    { name: 'AI reads lesson content', value: costs.lesson.lessonContent * costs.params.lessonsPerCourse, color: COLORS.lessonContent },
    { name: 'AI reads student messages', value: costs.lesson.studentMessages * costs.params.lessonsPerCourse, color: COLORS.studentMessages },
    { name: 'AI tutor responses', value: costs.lesson.aiResponses * costs.params.lessonsPerCourse, color: COLORS.aiResponses },
    { name: 'Voice transcription', value: costs.lesson.voiceInput * costs.params.lessonsPerCourse, color: COLORS.voiceInput },
  ];

  const updateParam = (key, value) => {
    setParams(prev => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  const resetParams = () => {
    setParams(DEFAULT_PARAMS);
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
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">Per Lesson</p>
            <p className="text-4xl font-bold text-slate-800">{formatCurrency(costs.lesson.total)}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">Per Course</p>
            <p className="text-4xl font-bold text-slate-800">{formatCurrency(costs.course.total)}</p>
            <p className="text-xs text-slate-400 mt-1">{costs.params.lessonsPerCourse} lessons</p>
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
                <h3 className="font-medium text-slate-800">AI reads lesson content</h3>
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
                <h3 className="font-medium text-slate-800">AI reads student messages</h3>
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

        {/* Cost breakdown donuts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Per Course */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col justify-center">
            <h2 className="text-lg font-semibold text-slate-800 mb-6 text-center">Marginal Cost per Course Participant</h2>
            <div className="flex justify-center">
              <div className="flex gap-2">
                {/* Lessons label column - vertically centered to align with grid */}
                <div className="flex flex-col justify-center">
                  <div className="text-sm text-slate-500" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                    {params.lessonsPerModule} lessons + 1 group meeting
                  </div>
                </div>

                {/* Main content column - labels align with grid */}
                <div className="flex flex-col">
                  {/* Modules label on top */}
                  <div className="text-sm text-slate-500 mb-2 text-center">{params.modulesPerCourse} modules</div>

                  {/* Grid - lessons + group meeting row per module */}
                  <div className="flex flex-col gap-1.5">
                    {Array.from({ length: params.lessonsPerModule }).map((_, lessonIdx) => (
                      <div key={lessonIdx} className="flex gap-1.5">
                        {Array.from({ length: params.modulesPerCourse }).map((_, moduleIdx) => (
                          <div
                            key={moduleIdx}
                            className="w-12 h-12 bg-blue-500 rounded flex flex-col items-center justify-center p-0.5"
                          >
                            <span className="text-xs text-white font-medium">1h</span>
                            <span className="text-[11px] text-white font-light">{formatCurrency(costs.lesson.total)}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                    {/* Group meeting row */}
                    <div className="flex gap-1.5">
                      {Array.from({ length: params.modulesPerCourse }).map((_, moduleIdx) => (
                        <div
                          key={moduleIdx}
                          className="w-12 h-12 bg-slate-400 rounded flex flex-col items-center justify-center p-0.5"
                        >
                          <span className="text-xs text-white font-medium">2h</span>
                          <span className="text-[11px] text-white font-light">$0</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="mt-6 text-center">
                    <span className="text-3xl font-bold text-slate-800">{formatCurrency(costs.course.total)}</span>
                    <span className="text-slate-500 ml-2">total</span>
                  </div>
                </div>

                {/* Right spacer - matches lessons label width to center the whole thing */}
                <div className="flex flex-col justify-center">
                  <div className="text-sm invisible" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                    {params.lessonsPerModule} lessons + 1 group meeting
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Per Lesson */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 text-center">Marginal Cost per Lesson Session</h2>
            <div className="relative">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={lessonBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={85}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    isAnimationActive={false}
                    label={({ name, value, cx, cy, midAngle, outerRadius }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = outerRadius + 25;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      const textAnchor = x > cx ? 'start' : 'end';
                      // Split name into two lines for wrapping
                      const words = name.split(' ');
                      const line1 = words.slice(0, 2).join(' ');
                      const line2 = words.slice(2).join(' ');
                      return (
                        <text
                          x={x}
                          y={y}
                          textAnchor={textAnchor}
                          dominantBaseline="central"
                          className="text-xs fill-slate-600"
                        >
                          <tspan x={x} dy="-0.6em">{line1}</tspan>
                          {line2 && <tspan x={x} dy="1.2em">{line2}</tspan>}
                          <tspan x={x} dy="1.2em" className="font-medium">{formatCurrency(value)}</tspan>
                        </text>
                      );
                    }}
                    labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
                  >
                    {lessonBreakdownData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-800">{formatCurrency(costs.lesson.total)}</p>
                  <p className="text-xs text-slate-500">total</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What's in a lesson */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">A lesson is about one hour of learning, including:</h2>
          <p className="text-slate-600 mb-4 text-center"></p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-slate-800">{params.articlesPerLesson}</p>
              <p className="text-sm text-slate-500">Articles to read</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-800">{costs.params.conversationsPerLesson}</p>
              <p className="text-sm text-slate-500">AI Tutor conversations</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-800">{costs.params.turnsPerConversation}</p>
              <p className="text-sm text-slate-500">Turns per conversation</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-800">{costs.params.conversationsPerLesson * costs.params.turnsPerConversation}</p>
              <p className="text-sm text-slate-500">Total AI Tutor responses</p>
            </div>
          </div>
        </div>

        {/* Toggle button for parameters panel */}
        {!paramsOpen && (
          <button
            onClick={() => setParamsOpen(true)}
            className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-lg font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Adjust Parameters (Advanced)
          </button>
        )}

        <p className={`text-center text-slate-400 text-sm mt-8 ${paramsOpen ? 'mb-64' : ''}`}>
          Calculated costs are based on: Claude Sonnet 4.5 with prompt caching • Whisper API for voice
          <br />
          Traditional software costs (hosting, database) are minimal compared to AI costs.
        </p>
      </div>

      {/* Sticky bottom parameters panel */}
      {paramsOpen && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
          <div className="max-w-5xl mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Adjust Parameters</h3>
              <div className="flex gap-2">
                <button
                  onClick={resetParams}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Reset
                </button>
                <button
                  onClick={() => setParamsOpen(false)}
                  className="px-4 py-2 text-sm bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3">
              {PARAM_CONFIG.map(({ key, label, min, max, step, format }) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <label className="text-slate-600">{label}</label>
                    <span className="text-slate-800 font-medium">
                      {format ? format(params[key]) : params[key]}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={params[key]}
                    onChange={(e) => updateParam(key, e.target.value)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
