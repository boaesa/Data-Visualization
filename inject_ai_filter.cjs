const fs = require('fs');

let code = fs.readFileSync('src/components/Heatmap.tsx', 'utf-8');

const aiJobsListStr = `const AI_REPLACEABLE_JOBS = [
  { industry: '정보통신업', year: 1970, title: '전산원(펀치카드)' },
  { industry: '정보통신업', year: 1980, title: '전산원(펀치카드)' },
  { industry: '정보통신업', year: 1980, title: '타이피스트' },
  { industry: '정보통신업', year: 2000, title: '전신기사' },
  { industry: '정보통신업', year: 2020, title: '데이터 라벨러' },
  { industry: '정보통신업', year: 2030, title: '소프트웨어 개발자(초급)' },
  { industry: '금융 및 보험업', year: 1977, title: '보험 계리사' },
  { industry: '금융 및 보험업', year: 1981, title: '금융 분석가' },
  { industry: '금융 및 보험업', year: 1996, title: '신용분석사' },
  { industry: '금융 및 보험업', year: 1997, title: '금융 분析가' },
  { industry: '금융 및 보험업', year: 1997, title: '은행 창구직원' },
  { industry: '금융 및 보험업', year: 1999, title: '대출 심사원' },
  { industry: '금융 및 보험업', year: 2020, title: '은행 창구직원' },
  { industry: '금융 및 보험업', year: 2030, title: '금융 분析가' },
  { industry: '금융 및 보험업', year: 2030, title: '대출 심사원' },
  { industry: '금융 및 보험업', year: 2030, title: '은행 창구직원' },
  { industry: '전문과학 및 기술서비스업', year: 1876, title: '통역관·역관' },
  { industry: '전문과학 및 기술서비스업', year: 1961, title: '광고 카피라이터' },
  { industry: '전문과학 및 기술서비스업', year: 1990, title: '번역가' },
  { industry: '전문과학 및 기술서비스업', year: 2020, title: '번역가' },
  { industry: '전문과학 및 기술서비스업', year: 2030, title: '공인회계사' },
  { industry: '전문과학 및 기술서비스업', year: 2030, title: '번역가' },
  { industry: '전문과학 및 기술서비스업', year: 2030, title: '번역가(단순)' },
  { industry: '도매', year: 1990, title: '편의점 점원' },
  { industry: '도매', year: 2000, title: '외판원(방문판매원)' },
  { industry: '도매', year: 2008, title: '편의점 점원' },
  { industry: '도매', year: 2010, title: '백화점 판매원' },
  { industry: '도매', year: 2020, title: '계산원(캐셔)' },
  { industry: '도매', year: 2020, title: '고객 서비스 상담원' },
  { industry: '도매', year: 2020, title: '편의점 점원' },
  { industry: '도매', year: 2030, title: '계산원(캐셔)' },
  { industry: '도매', year: 2030, title: '고객 서비스 상담원' },
  { industry: '도매', year: 2030, title: '편의점 점원' },
  { industry: '도매', year: 2035, title: '배달원(라이더)' },
  { industry: '예술·스포츠 및 여가', year: 1950, title: '타이피스트' },
  { industry: '예술·스포츠 및 여가', year: 1970, title: '방송 작가' },
  { industry: '예술·스포츠 및 여가', year: 1986, title: '아시안게임 통역사' },
  { industry: '예술·스포츠 및 여가', year: 1988, title: '통역사(동시통역)' },
  { industry: '예술·스포츠 및 여가', year: 2000, title: '3D 모델러' },
  { industry: '예술·스포츠 및 여가', year: 2019, title: '웹툰 번역가' },
  { industry: '예술·스포츠 및 여가', year: 2020, title: '그래픽 디자이너' },
  { industry: '예술·스포츠 및 여가', year: 2020, title: '일러스트레이터' },
  { industry: '예술·스포츠 및 여가', year: 2030, title: '3D 모델러' },
  { industry: '예술·스포츠 및 여가', year: 2030, title: '그래픽 디자이너' },
  { industry: '예술·스포츠 및 여가', year: 2030, title: '방송 작가' },
  { industry: '교육서비스업', year: 2030, title: '어학원 강사(원어민)' },
  { industry: '공공행정 및 국방', year: 2030, title: '세무 공무원' },
  { industry: '공공행정 및 국방', year: 2030, title: '통계 조사원' },
  { industry: '제조업', year: 1990, title: '신발 제조공' },
  { industry: '제조업', year: 1990, title: '합판 제조공' },
  { industry: '제조업', year: 2030, title: 'CNC 기계 조작원' },
  { industry: '제조업', year: 2030, title: '용접공' },
  { industry: '운수 및 창고업', year: 2000, title: '택배 기사' },
  { industry: '운수 및 창고업', year: 2030, title: '배달원(라이더)' },
  { industry: '운수 및 창고업', year: 2030, title: '버스 기사' },
  { industry: '운수 및 창고업', year: 2030, title: '전기차 충전 인프라 기사' },
  { industry: '운수 및 창고업', year: 2030, title: '항공기 조종사' },
  { industry: '운수 및 창고업', year: 2030, title: '화물 트럭 기사' },
  { industry: '운수 및 창고업', year: 2035, title: 'UAM(도심항공) 조종사' },
  { industry: '운수 및 창고업', year: 2035, title: '화물 트럭 기사' },
  { industry: '운수 및 창고업', year: 2040, title: '항공기 조종사' }
];

`;

if (!code.includes('AI_REPLACEABLE_JOBS')) {
  code = code.replace('const ALL_SIDEBAR_JOBS = buildSidebarJobs();', aiJobsListStr + 'const ALL_SIDEBAR_JOBS = buildSidebarJobs();');
}

if (!code.includes('aiFilterActive')) {
  code = code.replace(
    'const [activeFilter, setActiveFilter] = useState<string | null>(null);',
    'const [activeFilter, setActiveFilter] = useState<string | null>(null);\n  const [aiFilterActive, setAiFilterActive] = useState<boolean>(false);'
  );

  code = code.replace(
    /let filteredSidebarJobs = ALL_SIDEBAR_JOBS;\s+if \(activeFilter\) \{\s+filteredSidebarJobs = filteredSidebarJobs.filter\(j => j\.status === activeFilter\);\s+\}/,
    `let filteredSidebarJobs = ALL_SIDEBAR_JOBS;
  if (activeFilter) {
    filteredSidebarJobs = filteredSidebarJobs.filter(j => j.status === activeFilter);
  }
  if (aiFilterActive) {
    filteredSidebarJobs = filteredSidebarJobs.filter(j => 
       AI_REPLACEABLE_JOBS.some(r => r.year === j.year && r.title === j.title && (r.industry === j.industry || j.industry.startsWith(r.industry)))
    );
  }`
  );
}

// target string
const targetStr = `<div className="w-full px-2 md:px-4 mb-2 flex justify-center items-center max-w-7xl mx-auto relative min-h-[28px]">
          <div className="absolute left-2 md:left-4">
             <p className="text-[10px] md:text-[11px] text-ui-text-secondary font-medium bg-ui-bg-card px-2 py-0.5 rounded-full border border-ui-border">
               {sidebarRemaining.length}개 대기중
             </p>
          </div>
          <h2 className="text-base md:text-lg font-bold leading-tight text-center">직업 리스트</h2>
          <p className="text-[10px] text-ui-text-secondary hidden sm:block absolute right-2 md:right-4">스크롤하면 타임라인에 나타납니다.</p>
        </div>`;
const newStr = `<div className="w-full px-2 md:px-4 mb-2 flex flex-col justify-center items-center max-w-7xl mx-auto relative">
          <div className="w-full flex justify-center items-center relative min-h-[28px] mb-2">
            <div className="absolute left-0">
               <p className="text-[10px] md:text-[11px] text-ui-text-secondary font-medium bg-ui-bg-card px-2 py-0.5 rounded-full border border-ui-border whitespace-nowrap">
                 {sidebarRemaining.length}개 대기중
               </p>
            </div>
            <h2 className="text-base md:text-lg font-bold leading-tight text-center">직업 리스트</h2>
            <p className="text-[10px] text-ui-text-secondary hidden md:block absolute right-0">스크롤하면 타임라인에 나타납니다.</p>
          </div>
          <button 
             onClick={() => setAiFilterActive(!aiFilterActive)}
             className={\`px-4 py-1.5 rounded-full text-[12px] font-bold transition-all duration-200 border \${
               aiFilterActive 
                 ? 'bg-black text-white border-black' 
                 : 'bg-ui-bg-card text-ui-text-primary border-ui-border hover:bg-gray-100'
             }\`}
          >
            AI 대체 가능성 높은 직업
          </button>
        </div>`;

if (code.includes('mb-2 flex justify-center items-center max-w-7xl')) {
  code = code.replace(targetStr, newStr);
  console.log('replaced header!');
}

fs.writeFileSync('src/components/Heatmap.tsx', code);
console.log('Done!');
