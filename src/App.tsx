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
  Network
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-blue-100">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Database className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg tracking-tight">Ready-Core Vis</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <a href="#background" className="hover:text-blue-600 transition-colors">배경</a>
            <a href="#data" className="hover:text-blue-600 transition-colors">데이터 분석</a>
            <a href="#framework" className="hover:text-blue-600 transition-colors">분석 프레임워크</a>
            <a href="#future" className="hover:text-blue-600 transition-colors">미래 전망</a>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
            보고서 다운로드
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-50 to-transparent blur-3xl -z-10 rounded-full opacity-70"></div>
        
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 font-medium text-sm mb-8 border border-blue-100">
            <Sparkles className="w-4 h-4" />
            <span>AI 시대 생존 가이드 보고서</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            AI 시대에서 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              내 밥그릇 지키기
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            <strong className="text-slate-900 font-semibold">"역사는 반복된다. 직업의 역사 또한 그러하다."</strong><br />
            AI 기술의 급속한 발전 속에서 불안을 느끼는 2030 '레디코어(Ready-Core)' 세대를 위해, 대한민국 정부 수립 이후의 직업 변천 데이터를 분석하여 미래를 설계할 수 있는 인사이트를 제공합니다.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-full text-base font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              데이터 탐색하기
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="w-full sm:w-auto bg-white text-slate-700 px-8 py-3.5 rounded-full text-base font-medium hover:bg-slate-50 transition-all border border-slate-200 shadow-sm">
              요약본 보기
            </button>
          </div>

          {/* Hero Dashboard Placeholder */}
          <div className="relative mx-auto w-full max-w-5xl rounded-3xl border border-slate-200/60 bg-white/50 backdrop-blur-xl shadow-2xl overflow-hidden p-2 sm:p-4">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 via-transparent to-indigo-50/50 opacity-50"></div>
            <div className="relative bg-white rounded-2xl border border-slate-100 shadow-sm p-8 min-h-[400px] flex flex-col items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
              <BarChart3 className="w-16 h-16 text-slate-200 mb-4" />
              <h3 className="text-xl font-semibold text-slate-400">Main Summary Visualization Area</h3>
              <p className="text-slate-400 mt-2 text-sm">추후 주요 경제/고용 요약 그래프 삽입 위치</p>
            </div>
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section id="background" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-wider text-sm uppercase">Background</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">프로젝트 배경</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                <BrainCircuit className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">현상</h3>
              <p className="text-slate-600 leading-relaxed">
                AI 기술의 비약적 발전과 고용 시장의 불확실성이 그 어느 때보다 증대되고 있는 시점입니다.
              </p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">타겟</h3>
              <p className="text-slate-600 leading-relaxed">
                실패를 최소화하기 위해 선제적으로 치밀하게 준비하고 대응하는 2030 '레디코어' 세대.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">목표</h3>
              <p className="text-slate-600 leading-relaxed">
                1~4차 산업혁명기 한국의 직업 변천 데이터를 통해 패턴을 도출하고 5차 산업혁명 핵심 역량을 정의합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Timeline Section */}
      <section id="data" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium text-sm mb-4">
              <Clock className="w-4 h-4" />
              <span>1948 - 2025</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">연도별 주요 산업 및 직업 변화</h2>
            <p className="text-slate-500 max-w-2xl">
              정부 수립 이후 현재까지 대한민국 산업 구조와 고용 통계 데이터를 기반으로 한 시계열 분석입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* 1960s */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900">1960-1979</h3>
                  <p className="text-blue-600 font-medium mt-1">경공업 → 중화학공업</p>
                </div>
                <div className="bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold text-slate-600">
                  경제개발 5개년
                </div>
              </div>
              <p className="text-slate-600 mb-6">농림어업 취업자가 급감하고, 제조업 근로자가 급증하던 1차, 2차 산업 체질 개선기.</p>
              
              {/* Chart Placeholder */}
              <div className="w-full bg-slate-50 rounded-2xl h-40 border border-slate-100 flex flex-col items-center justify-center">
                <LineChart className="text-slate-300 w-8 h-8 mb-2" />
                <span className="text-xs text-slate-400 font-medium">산업별 인구 이동 지표 영역</span>
              </div>
            </div>

            {/* 1980s */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900">1980-1999</h3>
                  <p className="text-blue-600 font-medium mt-1">중화학공업, IT 태동</p>
                </div>
                <div className="bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold text-slate-600">
                  IMF 외환위기
                </div>
              </div>
              <p className="text-slate-600 mb-6">생산직 자동화 진전, 서비스업 팽창, 그리고 대규모 실업과 직종 전환이 발생한 격동기.</p>
              
              <div className="w-full bg-slate-50 rounded-2xl h-40 border border-slate-100 flex flex-col items-center justify-center">
                <BarChart3 className="text-slate-300 w-8 h-8 mb-2" />
                <span className="text-xs text-slate-400 font-medium">실업률 및 서비스업 팽창 지표 영역</span>
              </div>
            </div>

            {/* 2000s */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900">2000-2019</h3>
                  <p className="text-blue-600 font-medium mt-1">IT, 서비스, 플랫폼 경제</p>
                </div>
                <div className="bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold text-slate-600">
                  디지털화 / 스마트폰
                </div>
              </div>
              <p className="text-slate-600 mb-6">고용 없는 성장 시대 진입, 디지털 관련 신규 직종(개발자, 기획자 등)이 폭발적으로 증가.</p>
              
              <div className="w-full bg-slate-50 rounded-2xl h-40 border border-slate-100 flex flex-col items-center justify-center">
                <PieChart className="text-slate-300 w-8 h-8 mb-2" />
                <span className="text-xs text-slate-400 font-medium">IT 직군 폭발적 성장 지표 영역</span>
              </div>
            </div>

            {/* 2020s */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow ring-2 ring-blue-500/20">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900">2020-현재</h3>
                  <p className="text-blue-600 font-medium mt-1">플랫폼, AI, 바이오</p>
                </div>
                <div className="bg-blue-100 px-3 py-1 rounded-full text-xs font-semibold text-blue-700">
                  팬데믹 / AI 전환
                </div>
              </div>
              <p className="text-slate-600 mb-6">비대면 서비스 확산, AI 관련 채용 수요 급증 및 단순 사무직의 가파른 감소세.</p>
              
              <div className="w-full bg-blue-50/50 rounded-2xl h-40 border border-blue-100 border-dashed flex flex-col items-center justify-center">
                <TrendingUp className="text-blue-300 w-8 h-8 mb-2" />
                <span className="text-xs text-blue-400 font-medium">AI 채용 수요 vs 단순 사무직 감소 비교 지표</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Framework (Bento Box) */}
      <section id="framework" className="py-24 bg-slate-900 text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-indigo-400 font-semibold tracking-wider text-sm uppercase">Analysis Framework</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">직업의 생태계 변화 패턴</h2>
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
              <h3 className="text-2xl font-bold mb-2">소멸 직업</h3>
              <p className="text-sm font-medium text-red-400 mb-6">Disappeared</p>
              
              <div className="flex-grow">
                <h4 className="text-sm font-semibold text-slate-300 mb-2">쇠퇴 원인</h4>
                <p className="text-slate-400 text-sm mb-6">기계적 자동화, 기업의 비용 절감, 기술적 완벽한 대체</p>
                
                <h4 className="text-sm font-semibold text-slate-300 mb-2">대표 예시</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-sm text-slate-300">버스 안내양</span>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-sm text-slate-300">전화 교환원</span>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-sm text-slate-300">단순 데이터 입력원</span>
                </div>
              </div>

              {/* Data Viz Placeholder */}
              <div className="mt-8 h-32 rounded-xl bg-slate-900/50 border border-slate-700 border-dashed flex flex-col items-center justify-center text-slate-500">
                 <span className="text-xs">소멸 곡선 그래프 영역</span>
              </div>
            </div>

            {/* Created */}
            <div className="md:col-span-1 bg-slate-800 rounded-3xl p-8 border border-slate-700 flex flex-col">
               <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">생성 직업</h3>
              <p className="text-sm font-medium text-emerald-400 mb-6">Created</p>
              
              <div className="flex-grow">
                <h4 className="text-sm font-semibold text-slate-300 mb-2">등장 배경</h4>
                <p className="text-slate-400 text-sm mb-6">새로운 기술 인프라 구축의 필요성, 인간의 삶의 질 향상 요구</p>
                
                <h4 className="text-sm font-semibold text-slate-300 mb-2">대표 예시</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-sm text-slate-300">웹 디자이너</span>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-sm text-slate-300">데이터 사이언티스트</span>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-sm text-slate-300">콘텐츠 크리에이터</span>
                </div>
              </div>

              {/* Data Viz Placeholder */}
              <div className="mt-8 h-32 rounded-xl bg-slate-900/50 border border-slate-700 border-dashed flex flex-col items-center justify-center text-slate-500">
                 <span className="text-xs">신생 직업 성장 그래프 영역</span>
              </div>
            </div>

            {/* Survival */}
            <div className="md:col-span-1 bg-gradient-to-br from-indigo-900/50 to-blue-900/50 rounded-3xl p-8 border border-indigo-500/30 flex flex-col sm:col-span-2 md:col-span-1">
               <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6">
                <BrainCircuit className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">이동 패턴</h3>
              <p className="text-sm font-medium text-indigo-400 mb-6">Survival Skills</p>
              
              <div className="flex-grow flex flex-col justify-center">
                <p className="text-slate-300 leading-relaxed mb-6">
                  수많은 직업이 명멸하는 가운데 끝까지 살아남은 역량들이 존재합니다. 이는 기술이 범접하기 힘든 인간 고유의 영역입니다.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                    <span className="font-medium text-sm">비판적 사고 (Critical Thinking)</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                    <span className="font-medium text-sm">공감 능력 (Empathy)</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                    <span className="font-medium text-sm">복합 문제 해결력 (Complex Problem Solving)</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                    <span className="font-medium text-sm">창의적 편집 능력 (Creative Editing)</span>
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
            <span className="text-blue-600 font-semibold tracking-wider text-sm uppercase">Future Outlook</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">5차 산업혁명 유망 분야</h2>
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
              <h3 className="text-lg font-bold text-slate-900 mb-3">인간 중심 서비스</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                AI가 흉내 낼 수 없는 깊은 정서적 교감 및 맞춤형 케어 영역. 심리 상담, 고도화된 헬스케어 등이 포함됩니다.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:-translate-y-1 transition-transform group">
               <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors">
                <Network className="w-7 h-7 text-indigo-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">AI 오케스트레이션</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                단일 AI가 아닌, 여러 개의 AI 툴을 복합적으로 조율하고 활용하여 새로운 형태의 가치를 창출하는 설계자 역할.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:-translate-y-1 transition-transform group">
               <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                <ShieldCheck className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">윤리 및 보안</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                기하급수적인 기술 발전에 필연적으로 따르는 사회적 부작용, 데이터 침해를 규제하고 관리하는 거버넌스 전문가.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:-translate-y-1 transition-transform group">
               <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-100 transition-colors">
                <Leaf className="w-7 h-7 text-cyan-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">지속 가능 디자인</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                극심해지는 자원 고갈 및 환경 이슈에 선제적으로 대응하는 친환경 인프라 및 시스템 설계 영역.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA / Conclusion */}
      <section className="py-32 px-6 relative overflow-hidden bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <Sparkles className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
             불안은 정보의 부재에서 옵니다.<br/>
             과거의 데이터는 말해줍니다.
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed">
            기술은 직업을 완전히 없애기만 하는 것이 아니라,<br className="hidden md:block"/>
            인간이 더 가치 있고 창조적인 일에 집중할 수 있도록 <strong>'이동'</strong>시킵니다.
          </p>
          
          <div className="bg-slate-900 text-white rounded-3xl p-10 md:p-14 shadow-2xl">
            <h3 className="text-2xl md:text-4xl font-bold mb-6">"당신의 다음 스텝은 어디입니까?"</h3>
             <button className="bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 hover:text-blue-600 transition-all">
              나의 강점 매핑하기
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
          <p className="text-sm text-slate-500">
            &copy; 2026 데이터 시각화 프로젝트 - AI 시대 생존 가이드. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
