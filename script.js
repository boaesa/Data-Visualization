const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace Timeline Section with New Sections + Timeline
const newSections = `
      {/* --- NEW SECTION 1: NCS 역량 대전환 및 핵심 요약 --- */}
      <section id="competency-analysis" className="py-24 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-wider text-[14px] uppercase">Competency Shift</span>
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
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4"><Settings className="w-5 h-5"/></div>
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
            <span className="text-indigo-600 font-semibold tracking-wider text-[14px] uppercase">Industry Training Analysis</span>
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
                   <AlertTriangle className="w-5 h-5 text-red-500" />
                   전략적 인력 양성 공백 지역 (Critical Gap)
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
                     <p className="text-[13px] text-slate-600">초고령사회 진입에 따른 폭발적 돌봄/의료 수요 대비 훈련 설계가 지극히 미흡합니다.</p>
                   </div>
                   <div className="bg-white p-5 rounded-2xl border border-red-100 shadow-sm">
                     <div className="flex items-center justify-between mb-2">
                       <span className="font-bold text-slate-900 text-[16px]">화학·바이오</span>
                       <span className="text-red-500 font-bold">0.2% (19개)</span>
                     </div>
                     <p className="text-[13px] text-slate-600">국가 생존 직결 전략 산업이나 훈련 최하위권. 전문 기술자의 희소성이 압도적일 것입니다.</p>
                   </div>
                 </div>
               </div>

               {/* Insight */}
               <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8 flex-1">
                 <h3 className="text-[18px] font-bold text-indigo-900 mb-4 flex items-center gap-2">
                   <Lightbulb className="w-5 h-5 text-indigo-600" />
                   상태 데이터 인사이트
                 </h3>
                 <ul className="space-y-4">
                   <li className="flex gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                     <p className="text-[14px] text-indigo-900/80 leading-relaxed">
                       <strong className="text-indigo-900">훈련의 양극화:</strong> 상위 3개(경영, 기계, IT)가 44.7% 독식 중. 수요를 따라가느냐, 희소성을 노리느냐의 기로입니다.
                     </p>
                   </li>
                   <li className="flex gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                     <p className="text-[14px] text-indigo-900/80 leading-relaxed">
                       <strong className="text-indigo-900">블루오션 기회:</strong> 보건·바이오 분야는 과정이 1%도 되지 않는 사각지대입니다. 개척자에게 무한한 기회가 존재합니다.
                     </p>
                   </li>
                   <li className="flex gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                     <p className="text-[14px] text-indigo-900/80 leading-relaxed">
                       <strong className="text-indigo-900">디지털 전이의 본질:</strong> 정보통신(9.6%) 비중은 IT 자체 산업뿐만 아니라 전 산업군이 융합 필수재로 인식하고 있음을 보여줍니다.
                     </p>
                   </li>
                 </ul>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-white overflow-hidden w-full m-0 p-0 border-t border-slate-100">
        <Heatmap />
      </section>
`;

// 1. Replace Timeline Section
const timelineRegex = /\{\/\*\s*Timeline Section\s*\*\/\}\s*<section[\s\S]*?<\/section>/m;
code = code.replace(timelineRegex, newSections);

// 2. Remove Framework
const frameworkRegex = /\{\/\*\s*Analysis Framework\s*\(Bento Box\)\s*\*\/\}\s*<section[\s\S]*?(?=\{\/\*\s*Future Outlook\s*\*\/})/m;
code = code.replace(frameworkRegex, "");

// 3. Remove Competency
const competencyRegex = /\{\/\*\s*Competency Shift\s*\*\/\}\s*<section[\s\S]*?(?=\{\/\*\s*CTA \/ Conclusion\s*\*\/})/m;
code = code.replace(competencyRegex, "");

// Fix missing imports like AlertTriangle and Settings
if (!code.includes('AlertTriangle')) {
  code = code.replace(/import \{(.*?)\} from 'lucide-react';/s, (match, p1) => {
    return `import { ${p1}, AlertTriangle, Settings, Zap } from 'lucide-react';`;
  });
}

fs.writeFileSync('src/App.tsx', code);
console.log('Update complete!');
