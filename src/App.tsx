import React from 'react';
import { 
  BarChart3, 
  BrainCircuit, 
  Briefcase, 
  ChevronRight,
  ChevronDown,
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
import Heatmap from './components/Heatmap';
import CAVETest from './components/CAVETest';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-blue-100">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-center">
          <div className="hidden md:flex items-center gap-8 text-[16px] font-medium text-slate-500">
            <a href="#background" className="hover:text-blue-600 transition-colors">배경</a>
            <a href="#competency-analysis" className="hover:text-blue-600 transition-colors">역량 분석</a>
            <a href="#industry-training" className="hover:text-blue-600 transition-colors">훈련 현황</a>
            <a href="#future" className="hover:text-blue-600 transition-colors">유망 분야</a>
            <a href="#timeline" className="hover:text-blue-600 transition-colors">일자리 타임라인</a>
            <a href="#mbti-test" className="text-blue-500 font-bold hover:text-blue-600 transition-colors">AI시대 나의 일자리 유형</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-50 to-transparent blur-3xl -z-10 rounded-full opacity-70"></div>
        
        <div className="w-full min-h-[calc(100vh-64px)] flex flex-col justify-center items-center px-6">
          <div className="max-w-5xl mx-auto text-center w-full">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 font-medium text-[14px] md:text-[15px] mb-12 border border-slate-200 shadow-sm">
              <span>AI 시대 생존 가이드 보고서</span>
            </div>
            
            <h1 className="text-[52px] sm:text-[72px] md:text-[100px] lg:text-[110px] font-black tracking-tighter text-slate-900 mb-0" style={{ lineHeight: 'calc(1.05em + 10px)' }}>
              AI 시대에서 <br />
              <span className="text-blue-600 tracking-tighter">
                내 밥그릇 지키기
              </span>
            </h1>
          </div>
        </div>

        <div className="w-full px-6 pb-40 pt-10">
          <div className="max-w-3xl mx-auto text-center text-[16px] md:text-[18px] text-slate-600 leading-[1.8]">
            <p className="mb-8 text-slate-900 font-bold text-[20px] md:text-[22px]">
              역사는 반복된다. 직업의 역사 또한 그러하다.
            </p>
            <p className="mb-6">
              AI 시대가 성큼 다가오면서 미래를 준비하는 2030세대의 불안도 함께 커지고 있습니다. <br className="hidden md:block"/>
              '내가 선택한 직업이 사라지면 어떡하지?', '나는 AI에게 대체될까?' 누구나 한 번쯤 이런 걱정을 해본 적 있을 것입니다.
            </p>
            <p>
              본 프로젝트는 그 막연한 불안에 조금이나마 답이 되고자 합니다. <br className="hidden md:block"/>
              대한민국의 산업 및 직업 데이터를 바탕으로 변화하는 세상을 함께 읽어봅니다.
            </p>
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
                하루가 다르게 발전하는 AI 기술은 일부 직무에서 인간을 대체하기 시작했고, 그로 인해 고용 시장의 불안정성과 불확실성이 이전 세대와는 전혀 다른 방식으로 나타나고 있습니다.
              </p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-[20px] font-bold mb-3 leading-[1.25]">타겟</h3>
              <p className="text-slate-600 leading-relaxed">
                불안한 상황 속에서도 실패를 최소화하기 위해 선제적으로, 치밀하게 준비하고 대응하는 2030 '레디코어' 세대.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-[#0D92F4]" />
              </div>
              <h3 className="text-[20px] font-bold mb-3 leading-[1.25]">목표</h3>
              <p className="text-slate-600 leading-relaxed">
                대한민국 정부 수립 이후, 1~4차 산업혁명을 거치며 변화해온 산업 및 직업 데이터를 활용해 변화의 패턴을 도출합니다. 이를 바탕으로 5차 산업혁명 시대의 흐름에 적용해, 새로운 시대에 필요한 핵심 역량을 정의합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION 1: NCS 역량 대전환 및 핵심 요약 --- */}
      <section id="competency-analysis" className="py-24 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-wider text-[16px] uppercase">Competency Shift</span>
            <h2 className="text-[28px] md:text-[36px] font-bold mt-2 leading-[1.25] text-slate-900">AI 시대 미래 역량 분석</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              생성형 AI 확산과 융복합 직무 확대에 대응하여 실무 중심으로 정교화된 역량 및 개편 사항을 살펴봅니다.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* 파트 1: 디지털 대전환 (10->7) */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm">
              <h3 className="text-[20px] font-bold text-slate-900 mb-6 flex items-center gap-3">
                <RefreshCw className="w-6 h-6 text-blue-600" />
                NCS 역량 체계의 디지털 대전환 (10 ➔ 7)
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                기존 10대 직업기초능력이 실무와 디지털에 최적화된 7대 직업공통능력으로 재편되었습니다. 아는 것보다 디지털 도구 활용 문제 해결력에 초점을 맞춥니다.
              </p>
              <div className="space-y-4">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-1 text-[15px]">디지털 능력의 전면화</h4>
                  <p className="text-slate-600 text-[14px]">기존 '정보능력'이 AI 활용과 디지털 책임을 포함하는 능력으로 확장.</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-1 text-[15px]">자기관리 역량의 통합</h4>
                  <p className="text-slate-600 text-[14px]">'자기개발'과 '자원관리'가 합쳐져 환경에 스스로 적응하는 자기관리능력화.</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-1 text-[15px]">의사결정의 실무화</h4>
                  <p className="text-slate-600 text-[14px]">'문제해결능력' 내에 데이터를 바탕으로 최선의 선택을 내리는 의사결정능력 신설.</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-1 text-[15px]">슬림화 및 효율화</h4>
                  <p className="text-slate-600 text-[14px]">이론 중심의 '기술능력', '조직이해능력'을 삭제하고 실무 공통으로 내재화.</p>
                </div>
              </div>
            </div>

            {/* 파트 2: 5대 핵심 역량 */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm flex flex-col">
              <h3 className="text-[20px] font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-emerald-600" />
                미래를 주도할 5대 핵심 역량
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                새로운 체계에서 가장 주목해야 할 5가지 세부 역량입니다.
              </p>
              <div className="flex-1 space-y-5">
                {[
                  {title: '인공지능(AI) 활용능력', desc: '도구 사용을 넘어, 업무 프로세스에 AI를 결합해 성과를 극대화하는 역량.'},
                  {title: '디지털 책임의식', desc: '데이터 보안, 개인정보 보호 및 AI 윤리를 준수하며 디지털 도구를 사용하는 책임감.'},
                  {title: '적응학습능력', desc: '기술 변화가 빨라짐에 따라 새로운 지식을 스스로 습득하고 직무에 적용하는 평생 학습.'},
                  {title: '의사결정능력', desc: '다양한 정보와 대안 중 논리적 근거를 바탕으로 합리적인 결론을 도출하는 능력.'},
                  {title: '산업안전보건의식', desc: '실무 현장에서 자신과 동료의 안전을 최우선으로 고려하는 필수 직업 윤리.'}
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">{idx+1}</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-[15px]">{item.title}</h4>
                      <p className="text-slate-600 text-[14px] leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* NCS 개편 요약 */}
          <div className="mb-4">
             <h3 className="text-[24px] font-bold text-slate-900 mb-6 text-center">2025-2026 NCS 능력단위 개편 핵심 요약</h3>
             <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-2xl border border-slate-200">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4"><Database className="w-5 h-5"/></div>
                  <h4 className="font-bold text-slate-900 mb-2">1. 전체 규모 및 구성</h4>
                  <ul className="text-slate-600 text-[14px] space-y-2 list-disc list-inside">
                    <li>총 13,296개 능력단위 (24개 대분류)</li>
                    <li>구조: 대(24) ➔ 중 ➔ 소 ➔ 세분류 ➔ 능력단위</li>
                    <li>난이도 및 숙련도에 따라 1~8수준 평정</li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-slate-200">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4"><ShieldCheck className="w-5 h-5"/></div>
                  <h4 className="font-bold text-slate-900 mb-2">2. 세부 구조 요소</h4>
                  <ul className="text-slate-600 text-[14px] space-y-2 list-disc list-inside">
                    <li>실제 교육·훈련 및 업무분장의 단위</li>
                    <li>수행준거 및 지식·기술·태도(K.S.A)로 구성</li>
                    <li>능력 성취 평가 지침/환경 명시</li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-slate-200">
                  <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4"><Sparkles className="w-5 h-5"/></div>
                  <h4 className="font-bold text-slate-900 mb-2">3. 신기술 분야 집중 편대</h4>
                  <ul className="text-slate-600 text-[14px] space-y-2 list-disc list-inside">
                     <li>신규 6개: 생성형 AI, AIoT 플랫폼 등</li>
                     <li>개선/보완 57개: 클라우드, 보안, 3D프린팅</li>
                  </ul>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION 2: 산업분류별 훈련 현황 --- */}
      <section id="industry-training" className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold tracking-wider text-[16px] uppercase">Industry Training Analysis</span>
            <h2 className="text-[28px] md:text-[36px] font-bold mt-2 leading-[1.25] text-slate-900">산업분류별 훈련 현황 분석</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              총 10,225개 과정 데이터를 바탕으로 분석한 교육 균형 상태와 전략적 공백(Gap)
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
               <h3 className="text-[20px] font-bold text-slate-900 mb-6 flex items-center gap-2">
                 <BarChart3 className="w-5 h-5 text-blue-600" />
                 산업별 교육 훈련 공급 집중도
               </h3>
               
               <div className="space-y-6">
                 {/* Top 5 */}
                 <div>
                   <h4 className="text-[15px] font-semibold text-slate-800 mb-3 ml-1 border-l-2 border-blue-500 pl-2">상위권 (Core Service & Tech)</h4>
                   <div className="space-y-3">
                     {[
                       {name: '경영·회계·사무', val: 2484, pct: '24.3%', desc: '압도적 1위, 모든 산업의 기초 인프라'},
                       {name: '기계', val: 1101, pct: '10.8%', desc: '제조 강국의 근간을 이루는 기술군'},
                       {name: '정보통신', val: 977, pct: '9.6%', desc: '디지털 전환을 주도하는 핵심 동력'},
                       {name: '문화·예술·디자인·방송', val: 807, pct: '7.9%', desc: '콘텐츠 산업 경쟁력 확보'},
                       {name: '음식서비스', val: 794, pct: '7.8%', desc: '생활 밀착형 서비스 수요'}
                     ].map(it => (
                       <div key={it.name} className="flex flex-col gap-1 p-3 bg-slate-50 rounded-xl">
                          <div className="flex justify-between text-[14px] font-medium text-slate-900">
                            <span>{it.name} <span className="text-slate-500 font-normal">({it.val}개)</span></span>
                            <span className="text-blue-600">{it.pct}</span>
                          </div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1">
                             <div className="bg-blue-500 h-full rounded-full" style={{width: it.pct}}></div>
                          </div>
                          <p className="text-[12px] text-slate-500 mt-1">{it.desc}</p>
                       </div>
                     ))}
                   </div>
                 </div>

                 {/* Middle */}
                 <div>
                   <h4 className="text-[15px] font-semibold text-slate-800 mb-3 ml-1 border-l-2 border-indigo-400 pl-2">중위권 (Life & Infrastructure)</h4>
                   <div className="flex flex-wrap gap-2">
                     <span className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-[13px] border border-slate-200">음식서비스 (7.8%)</span>
                     <span className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-[13px] border border-slate-200">건설 (7.1%)</span>
                     <span className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-[13px] border border-slate-200">전기·전자 (5.5%)</span>
                     <span className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-[13px] border border-slate-200">여행·스포츠 (4.9%)</span>
                     <span className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-[13px] border border-slate-200">인쇄·가구 (4.5%)</span>
                   </div>
                 </div>
               </div>
            </div>

            <div className="flex flex-col gap-6">
               {/* Critical Gap */}
               <div className="bg-[#FFF8F8] border border-red-100 rounded-3xl p-8">
                 <h3 className="text-[18px] font-bold text-red-700 mb-4 flex items-center gap-2">
                   <Target className="w-5 h-5 text-red-500" />
                   블루오션 사각지대 (Critical Gap)
                 </h3>
                 <p className="text-[14px] text-red-800/80 mb-6">
                   미래 수요가 폭발할 국가 핵심 기술 분야임에도 인프라가 극히 빈약한 초희소성 구역
                 </p>
                 <div className="space-y-4">
                   <div className="bg-white p-5 rounded-2xl border border-red-100 shadow-sm">
                     <div className="flex items-center justify-between mb-2">
                       <span className="font-bold text-slate-900 text-[16px]">보건·의료</span>
                       <span className="text-red-500 font-bold">0.5% (53개)</span>
                     </div>
                     <p className="text-[13px] text-slate-600">초고령화 사회로 접어들면서 돌봄·의료 수요는 폭발적으로 증가하고 있지만, 이를 뒷받침할 훈련 설계는 아직 매우 미흡한 상태입니다.</p>
                   </div>
                   <div className="bg-white p-5 rounded-2xl border border-red-100 shadow-sm">
                     <div className="flex items-center justify-between mb-2">
                       <span className="font-bold text-slate-900 text-[16px]">화학·바이오</span>
                       <span className="text-red-500 font-bold">0.2% (19개)</span>
                     </div>
                     <p className="text-[13px] text-slate-600">대한민국의 생존과 직결된 전략 산업임에도, 전문 기술 인력의 극심한 부족으로 직업 훈련 수준은 최하위권에 머물고 있습니다.</p>
                   </div>
                 </div>
               </div>

               {/* Insight */}
               <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8 flex-1">
                 <h3 className="text-[18px] font-bold text-indigo-900 mb-4 flex items-center gap-2">
                   <Lightbulb className="w-5 h-5 text-indigo-600" />
                   데이터로 읽는 취업 시장의 신호
                 </h3>
                 <ul className="space-y-4">
                   <li className="flex gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                     <p className="text-[14px] text-indigo-900/80 leading-relaxed">
                       <strong className="text-indigo-900">쏠림인가, 기회인가:</strong> 상위 3개 분야(경영·기계·IT)가 전체의 절반 가까이를 차지합니다. 다수를 따를지, 틈새를 공략할지 — 선택할 기회가 주어집니다.
                     </p>
                   </li>
                   <li className="flex gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                     <p className="text-[14px] text-indigo-900/80 leading-relaxed">
                       <strong className="text-indigo-900">아직 아무도 없는 땅:</strong> 보건·바이오는 전체 훈련 과정의 1%도 되지 않습니다. 먼저 들어간 사람이 가장 유리한 분야입니다.
                     </p>
                   </li>
                   <li className="flex gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                     <p className="text-[14px] text-indigo-900/80 leading-relaxed">
                       <strong className="text-indigo-900">IT는 이미 모든 곳에:</strong> 정보통신(9.6%)의 높은 비중은 IT업계만의 이야기가 아닙니다. 모든 산업이 디지털 인재를 원하고 있다는 신호입니다.
                     </p>
                   </li>
                 </ul>
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
                여러 AI 툴을 복합적으로 조율하고 활용하여 새로운 가치를 창출하는 설계자 역할이 요구됩니다.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:-translate-y-1 transition-transform group">
               <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                <ShieldCheck className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="text-[16px] font-bold text-slate-900 mb-3 leading-[1.25]">윤리 및 보안</h3>
              <p className="text-[16px] text-slate-600 leading-relaxed">
                기하급수적 기술 발전에 따른 사회적 부작용과 데이터 침해를 규제·관리하는 거버넌스 전문가가 필요합니다.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:-translate-y-1 transition-transform group">
               <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-100 transition-colors">
                <Leaf className="w-7 h-7 text-cyan-600" />
              </div>
              <h3 className="text-[16px] font-bold text-slate-900 mb-3 leading-[1.25]">지속 가능 디자인</h3>
              <p className="text-[16px] text-slate-600 leading-relaxed">
                자원 고갈 및 환경 문제에 선제적으로 대응하는 친환경 인프라·시스템 설계가 주목받고 있습니다.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Job List & Timeline Rendered via Heatmap */}
      <Heatmap />


      {/* Analysis Framework (Bento Box) */}
      <section id="framework" className="py-24 bg-slate-900 text-white px-6 hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-indigo-400 font-semibold tracking-wider text-[16px] uppercase">Analysis Framework</span>
            <h2 className="text-[28px] md:text-[32px] font-bold mt-2 mb-4 leading-[1.25]">직업의 생태계 변화 패턴</h2>
            <p className="text-slate-400 max-w-2xl">
              데이터를 통해 도출한 산업혁명 단계별 직업의 등장, 소멸 그리고 이동 패턴입니다.
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
              <h3 className="text-[20px] font-bold mb-2 leading-[1.25]">등장 직업</h3>
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

      {/* Competency Shift */}
      <section id="competency" className="py-24 px-6 bg-white border-t border-slate-100 hidden">
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

      {/* CAVE Test */}
      <section id="mbti-test" className="w-full m-0 p-0">
        <CAVETest />
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
