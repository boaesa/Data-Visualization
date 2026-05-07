import React from 'react';
import { 
  BarChart3, 
  BrainCircuit, 
  Briefcase, 
  ChevronRight, 
  Clock, 
  Database, 
  LineChart, 
  PieChart, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Leaf,
  Network,
  RefreshCw,
  Target,
  Lightbulb
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import IndustryTimeline from './components/IndustryTimeline';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-blue-100">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-center">
          <div className="hidden md:flex items-center gap-8 text-[16px] font-medium text-slate-500">
            <a href="#background" className="hover:text-blue-600 transition-colors">배경</a>
            <a href="#framework" className="hover:text-blue-600 transition-colors">분석 프레임워크</a>
            <a href="#future" className="hover:text-blue-600 transition-colors">미래 전망</a>
            <a href="#competency" className="hover:text-blue-600 transition-colors">역량 변화</a>
            <a href="#mbti-test" className="hover:text-blue-600 transition-colors">직업 MBTI 테스트</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-50 to-transparent blur-3xl -z-10 rounded-full opacity-70"></div>
        
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 font-medium text-[16px] mb-8 border border-blue-100">
            <span>AI 시대 생존 가이드 보고서</span>
          </div>
          
          <h1 className="text-[44px] md:text-[64px] font-bold tracking-tight text-slate-900 mb-11 leading-[1.25]">
            AI 시대에서 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              내 밥그릇 지키기
            </span>
          </h1>
          
          <div className="max-w-2xl mx-auto text-[16px] md:text-[20px] text-slate-600 mb-20 leading-relaxed">
            <p className="mb-[10px] text-slate-900 font-semibold">
              "역사는 반복된다. 직업의 역사 또한 그러하다."
            </p>
            <p>
              AI 기술의 급속한 발전 속에서 불안을 느끼는 2030 '레디코어(Ready-Core)' 세대를 위해, 대한민국 정부 수립 이후의 직업 변천 데이터를 분석하여 미래를 설계할 수 있는 인사이트를 제공합니다.
            </p>
          </div>

          {/* Hero Dashboard Placeholder */}
          <div className="relative mx-auto w-full max-w-6xl">
             <div className="relative border border-slate-100 shadow-sm md:p-4 flex flex-col items-center justify-center">
              <div className="w-full mb-6">
                <IndustryTimeline />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section id="background" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-wider text-[16px] uppercase">Background</span>
            <h2 className="text-[28px] md:text-[32px] font-bold mt-2 leading-[1.25]">프로젝트 배경</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                <BrainCircuit className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-[20px] font-bold mb-3 leading-[1.25]">현상</h3>
              <p className="text-slate-600 leading-relaxed">
                AI 기술의 비약적 발전과 고용 시장의 불확실성이 그 어느 때보다 증대되고 있는 시점입니다.
              </p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-[20px] font-bold mb-3 leading-[1.25]">타겟</h3>
              <p className="text-slate-600 leading-relaxed">
                실패를 최소화하기 위해 선제적으로 치밀하게 준비하고 대응하는 2030 '레디코어' 세대.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-[#0D92F4]" />
              </div>
              <h3 className="text-[20px] font-bold mb-3 leading-[1.25]">목표</h3>
              <p className="text-slate-600 leading-relaxed">
                1~4차 산업혁명기 한국의 직업 변천 데이터를 통해 패턴을 도출하고 5차 산업혁명 핵심 역량을 정의합니다.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Analysis Framework (Bento Box) */}
      <section id="framework" className="py-24 bg-slate-900 text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-indigo-400 font-semibold tracking-wider text-[16px] uppercase">Analysis Framework</span>
            <h2 className="text-[28px] md:text-[32px] font-bold mt-2 mb-4 leading-[1.25]">직업의 생태계 변화 패턴</h2>
            <p className="text-slate-400 max-w-2xl">
              데이터를 통해 도출한 산업혁명 단계별 직업의 생성, 소멸 그리고 이동 패턴입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Disappeared */}
            <div className="md:col-span-1 bg-slate-800 rounded-3xl p-8 border border-slate-700 flex flex-col">
              <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-[20px] font-bold mb-2 leading-[1.25]">소멸 직업</h3>
              <p className="text-[16px] font-medium text-red-400 mb-6">Disappeared</p>
              
              <div className="flex-grow">
                <h4 className="text-[16px] font-semibold text-slate-300 mb-2">쇠퇴 원인</h4>
                <p className="text-slate-400 text-[16px] mb-6">기계적 자동화, 기업의 비용 절감, 기술적 완벽한 대체</p>
                
                <h4 className="text-[16px] font-semibold text-slate-300 mb-2">대표 예시</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-[16px] text-slate-300">버스 안내양</span>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-[16px] text-slate-300">전화 교환원</span>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-[16px] text-slate-300">단순 데이터 입력원</span>
                </div>
              </div>

              {/* Data Viz Placeholder */}
              <div className="mt-8 h-32 rounded-xl bg-slate-900/50 border border-slate-700 border-dashed flex flex-col items-center justify-center text-slate-500">
                 <span className="text-[12px]">소멸 곡선 그래프 영역</span>
              </div>
            </div>

            {/* Created */}
            <div className="md:col-span-1 bg-slate-800 rounded-3xl p-8 border border-slate-700 flex flex-col">
               <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-[20px] font-bold mb-2 leading-[1.25]">생성 직업</h3>
              <p className="text-[16px] font-medium text-emerald-400 mb-6">Created</p>
              
              <div className="flex-grow">
                <h4 className="text-[16px] font-semibold text-slate-300 mb-2">등장 배경</h4>
                <p className="text-slate-400 text-[16px] mb-6">새로운 기술 인프라 구축의 필요성, 인간의 삶의 질 향상 요구</p>
                
                <h4 className="text-[16px] font-semibold text-slate-300 mb-2">대표 예시</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-[16px] text-slate-300">웹 디자이너</span>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-[16px] text-slate-300">데이터 사이언티스트</span>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-[16px] text-slate-300">콘텐츠 크리에이터</span>
                </div>
              </div>

              {/* Data Viz Placeholder */}
              <div className="mt-8 h-32 rounded-xl bg-slate-900/50 border border-slate-700 border-dashed flex flex-col items-center justify-center text-slate-500">
                 <span className="text-[12px]">신생 직업 성장 그래프 영역</span>
              </div>
            </div>

            {/* Survival */}
            <div className="md:col-span-1 bg-gradient-to-br from-indigo-900/50 to-blue-900/50 rounded-3xl p-8 border border-indigo-500/30 flex flex-col sm:col-span-2 md:col-span-1">
               <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6">
                <BrainCircuit className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-[20px] font-bold mb-2 leading-[1.25]">이동 패턴</h3>
              <p className="text-[16px] font-medium text-indigo-400 mb-6">Survival Skills</p>
              
              <div className="flex-grow flex flex-col justify-center">
                <p className="text-[13px] text-slate-300 leading-relaxed mb-6">
                  수많은 직업이 사라지는 가운데 여전히 굳건한 역량이 있습니다. 이는 기술이 범접하기 어려운 인간 고유의 영역입니다.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                    <span className="font-medium text-[16px]">비판적 사고 (Critical Thinking)</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                    <span className="font-medium text-[16px]">공감 능력 (Empathy)</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                    <span className="font-medium text-[16px]">복합 문제 해결력 (Complex Problem Solving)</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                    <span className="font-medium text-[16px]">창의적 편집 능력 (Creative Editing)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Future Outlook */}
      <section id="future" className="py-24 px-6 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-wider text-[16px] uppercase">Future Outlook</span>
            <h2 className="text-[28px] md:text-[32px] font-bold mt-2 leading-[1.25]">5차 산업혁명 유망 분야</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              과거 데이터의 반복되는 패턴을 기반으로 예측한 미래 유망 분야 및 직업군입니다.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:-translate-y-1 transition-transform group">
              <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-rose-100 transition-colors">
                <Users className="w-7 h-7 text-rose-500" />
              </div>
              <h3 className="text-[16px] font-bold text-slate-900 mb-3 leading-[1.25]">인간 중심 서비스</h3>
              <p className="text-[16px] text-slate-600 leading-relaxed">
                AI가 흉내 낼 수 없는 깊은 정서적 교감 및 맞춤형 케어 영역. 심리 상담, 고도화된 헬스케어 등이 포함됩니다.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:-translate-y-1 transition-transform group">
               <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors">
                <Network className="w-7 h-7 text-indigo-500" />
              </div>
              <h3 className="text-[16px] font-bold text-slate-900 mb-3 leading-[1.25]">AI 오케스트레이션</h3>
              <p className="text-[16px] text-slate-600 leading-relaxed">
                단일 AI가 아닌, 여러 개의 AI 툴을 복합적으로 조율하고 활용하여 새로운 형태의 가치를 창출하는 설계자 역할.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:-translate-y-1 transition-transform group">
               <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                <ShieldCheck className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="text-[16px] font-bold text-slate-900 mb-3 leading-[1.25]">윤리 및 보안</h3>
              <p className="text-[16px] text-slate-600 leading-relaxed">
                기하급수적인 기술 발전에 필연적으로 따르는 사회적 부작용, 데이터 침해를 규제하고 관리하는 거버넌스 전문가.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:-translate-y-1 transition-transform group">
               <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-100 transition-colors">
                <Leaf className="w-7 h-7 text-cyan-600" />
              </div>
              <h3 className="text-[16px] font-bold text-slate-900 mb-3 leading-[1.25]">지속 가능 디자인</h3>
              <p className="text-[16px] text-slate-600 leading-relaxed">
                극심해지는 자원 고갈 및 환경 이슈에 선제적으로 대응하는 친환경 인프라 및 시스템 설계 영역.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Competency Shift */}
      <section id="competency" className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-wider text-[16px] uppercase">Competency Shift</span>
            <h2 className="text-[28px] md:text-[32px] font-bold mt-2 leading-[1.25]">역량 변화</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              미래 산업 환경에 맞춰 변화하는 역량 체계와 우리가 준비해야 할 핵심 역량을 분석합니다.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            
            {/* Card 1 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-[18px] md:text-[20px] font-bold text-slate-900 leading-[1.25]">AI 시대, NCS 역량 체계의 대전환: 10 → 7</h3>
              </div>
              <p className="text-[15px] text-slate-600 leading-relaxed mb-6">
                기존의 직업기초능력 10개 영역이 미래 산업 변화에 맞춰 7개 영역으로 슬림화되고 전문화되었습니다. 이는 단순 지식 보유보다 실무 적용과 디지털 적응력을 강조하는 방향입니다.
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[14px] text-slate-500">정보능력</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 mx-2" />
                    <span className="text-[14px] font-bold text-blue-600">디지털능력</span>
                  </div>
                  <p className="text-[13px] text-slate-600">컴퓨터 활용을 넘어 AI 활용과 윤리로 확장</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[14px] text-slate-500">자기개발 + 자원관리</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 mx-2" />
                    <span className="text-[14px] font-bold text-blue-600">자기관리능력</span>
                  </div>
                  <p className="text-[13px] text-slate-600">변화하는 환경에서의 적응학습 강조</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[14px] text-slate-500">문제해결능력</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 mx-2" />
                    <span className="text-[14px] font-bold text-blue-600">문제해결능력</span>
                  </div>
                  <p className="text-[13px] text-slate-600">논리를 넘어선 합리적 의사결정 추가</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 opacity-60">
                   <div className="flex items-center justify-between mb-2">
                    <span className="text-[14px] text-slate-500">기술·조직이해능력</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 mx-2" />
                    <span className="text-[14px] font-bold text-slate-500">(삭제/통합)</span>
                  </div>
                  <p className="text-[13px] text-slate-600">실무 중심의 슬림화 및 현장성 강화</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-[18px] md:text-[20px] font-bold text-slate-900 leading-[1.25]">미래 성장을 결정짓는 5가지 핵심 신규 역량</h3>
              </div>
              <p className="text-[15px] text-slate-600 leading-relaxed mb-6">
                AI와 공존하는 업무 환경에서 새롭게 정의된 5가지 필수 세부능력입니다.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></div>
                  <div>
                    <span className="font-bold text-[15px] text-slate-800">인공지능(AI) 활용능력:</span>
                    <span className="text-[15px] text-slate-600 ml-1">AI 도구를 업무 프로세스에 능숙하게 적용하여 생산성을 높이는 역량.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></div>
                  <div>
                    <span className="font-bold text-[15px] text-slate-800">디지털 책임의식:</span>
                    <span className="text-[15px] text-slate-600 ml-1">디지털 윤리, 보안, 개인정보 보호를 실천하는 직무 윤리.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></div>
                  <div>
                    <span className="font-bold text-[15px] text-slate-800">적응학습능력:</span>
                    <span className="text-[15px] text-slate-600 ml-1">불확실한 미래 환경에서 지속적으로 새로운 지식을 습득하고 적응하는 평생학습 역량.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></div>
                  <div>
                    <span className="font-bold text-[15px] text-slate-800">의사결정능력:</span>
                    <span className="text-[15px] text-slate-600 ml-1">복잡한 상황 데이터 속에서 최선의 대안을 판단하고 결정하는 실무 리더십.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></div>
                  <div>
                    <span className="font-bold text-[15px] text-slate-800">산업안전보건의식:</span>
                    <span className="text-[15px] text-slate-600 ml-1">현장의 안전과 보건을 최우선으로 실천하는 책임 의식.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
               <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-[18px] md:text-[20px] font-bold text-slate-900 leading-[1.25]">산업별 역량 수요 및 훈련 현황 분석</h3>
              </div>
              <p className="text-[15px] text-slate-600 leading-relaxed mb-6">
                현재 국내 훈련 과정 설계 현황(총 10,225개)을 분석한 결과, 미래 산업군으로의 이동이 뚜렷하게 나타나고 있습니다.
              </p>
              
              <div className="mb-6">
                <h4 className="text-[15px] font-bold text-slate-800 mb-3">1. 주요 분야별 필수 역량 Top 3</h4>
                <div className="space-y-2 text-[14px]">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-medium text-slate-700">정보통신</span>
                    <span className="text-slate-500">문제해결능력 &gt; 정보능력 &gt; 기술능력</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-medium text-slate-700">금융·보험</span>
                    <span className="text-slate-500">수리능력 &gt; 정보능력 &gt; 직업윤리</span>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <span className="font-medium text-slate-700">문화·예술</span>
                    <span className="text-slate-500">의사소통능력 &gt; 창의·혁신 &gt; 자기개발능력</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-[15px] font-bold text-slate-800 mb-3">2. 교육훈련 설계 집중도 (과정 수 기준)</h4>
                <div className="space-y-2 text-[14px]">
                  <div className="flex items-center gap-3">
                    <div className="w-[100px] font-medium text-slate-700 shrink-0">경영·회계·사무</div>
                    <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[24.3%]"></div>
                    </div>
                    <div className="text-slate-500 w-12 text-right">24.3%</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-[100px] font-medium text-slate-700 shrink-0">기계</div>
                     <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-slate-400 h-full w-[10.8%]"></div>
                    </div>
                    <div className="text-slate-500 w-12 text-right">10.8%</div>
                  </div>
                   <div className="flex items-center gap-3">
                    <div className="w-[100px] font-medium text-slate-700 shrink-0">정보통신</div>
                     <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[9.6%]"></div>
                    </div>
                    <div className="text-slate-500 w-12 text-right">9.6%</div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-xl text-[14px] text-emerald-800 border border-emerald-100">
                <strong>[인사이트]</strong> 훈련 과정은 여전히 경영·회계 등 전통적 사무직군에 집중되어 있으나(24.3%), 실무 현장에서는 정보통신 및 디지털 역량에 대한 요구가 급증하고 있습니다. 특히 <strong>화학·바이오(0.2%)</strong>와 같은 전문 신산업 분야의 인력 양성 확대가 시급한 과제로 나타납니다.
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-[18px] md:text-[20px] font-bold text-slate-900 leading-[1.25]">AI 시대에 우리가 집중해야 할 역량 유형</h3>
              </div>
              <p className="text-[15px] text-slate-600 leading-relaxed mb-6">
                업무 성격에 따라 미래 역량은 크게 4가지 유형으로 분류됩니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="font-bold text-[15px] text-slate-800 mb-2">디지털·분석형</div>
                  <p className="text-[13px] text-slate-600 mb-2">데이터 분석, 정보능력, AI 활용</p>
                  <p className="text-[12px] text-purple-600 font-semibold">(IT, 금융 분야 필수)</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="font-bold text-[15px] text-slate-800 mb-2">대인·소통형</div>
                  <p className="text-[13px] text-slate-600 mb-2">의사소통능력, 대인관계능력, 글로벌 역량</p>
                  <p className="text-[12px] text-purple-600 font-semibold">(서비스, 의료 분야 필수)</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="font-bold text-[15px] text-slate-800 mb-2">관리·전략형</div>
                  <p className="text-[13px] text-slate-600 mb-2">의사결정, 기획·전략수립, 프로젝트 관리</p>
                  <p className="text-[12px] text-purple-600 font-semibold">(사업관리, 경영 분야 필수)</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-[0_0_0_2px_rgba(147,51,234,0.2)]">
                  <div className="font-bold text-[15px] text-slate-800 mb-2">자기주도형</div>
                  <p className="text-[13px] text-slate-600 mb-2">적응학습능력, 자기관리능력, 창의·혁신</p>
                  <p className="text-[12px] text-purple-600 font-semibold">(전 분야 공통 미래 역량)</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA / Conclusion */}
      <section id="mbti-test" className="py-32 px-6 relative overflow-hidden bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <Sparkles className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-[24px] md:text-[40px] font-bold text-slate-900 mb-8 leading-[1.25]">
             불안은 정보의 부재에서 옵니다.<br/>
             과거의 데이터는 말해줍니다.
          </h2>
          <div className="text-[16px] md:text-[20px] text-slate-600 mb-12 leading-relaxed">
            <p className="mb-2">직업은 사라지지 않습니다.</p>
            <p>산업 변화에 맞춰 <strong>재구성됩니다.</strong></p>
          </div>
          
          <div className="bg-white rounded-3xl p-10 md:p-14 shadow-2xl border border-slate-100">
            <h3 className="text-[20px] md:text-[32px] font-bold mb-6 leading-[1.25] text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-800">"여러분의 다음 스텝은 어디인가요?"</h3>
             <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-[12px] font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              나의 새 밥그릇 알아보기
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 mb-4 md:mb-0">
            <Database className="w-5 h-5 text-blue-600" />
            <span className="font-semibold">Ready-Core Vis</span>
          </div>
          <p className="text-[16px] text-slate-500">
            &copy; 2026 데이터 시각화 프로젝트 - AI 시대 생존 가이드. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
