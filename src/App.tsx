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
  Lightbulb,
  MoreHorizontal,
  ArrowUpRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';
import Heatmap from './components/Heatmap';
import CAVETest from './components/CAVETest';

export default function App() {
  const [activeTab, setActiveTab ] = React.useState('#mbti-test');
  const isScrollingToRef = React.useRef(false);
  const scrollTimeoutRef = React.useRef<any>(null);

  const handleTabClick = (hash: string) => {
    setActiveTab(hash);
    isScrollingToRef.current = true;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingToRef.current = false;
    }, 1000);
  };

  React.useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        setActiveTab(window.location.hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    
    const observer = new IntersectionObserver((entries) => {
      if (isScrollingToRef.current) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTab(`#${entry.target.id}`);
        }
      });
    }, { threshold: 0.1, rootMargin: '-10% 0px -30% 0px' });

    const sections = [
      'mbti-test',
      'background',
      'job-list',
      'timeline',
      'sources'
    ];

    const observedSet = new Set<string>();

    const checkAndObserve = () => {
      sections.forEach(id => {
        if (observedSet.has(id)) return;
        const el = document.getElementById(id);
        if (el) {
          observer.observe(el);
          observedSet.add(id);
        }
      });
    };

    checkAndObserve();
    const intervalId = setInterval(checkAndObserve, 500);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearInterval(intervalId);
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-ui-bg-main text-ui-text-primary font-sans selection:bg-ui-bg-card">
      
      {/* Navigation */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95vw] md:max-w-fit pointer-events-auto">
        <div className="bg-white/95 rounded-full shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] border border-[#EDEDED] p-1.5 flex items-center gap-1 overflow-x-auto scrollbar-none whitespace-nowrap">
          <a
            href="#mbti-test"
            onClick={() => handleTabClick('#mbti-test')}
            className="px-4 py-2 md:px-5 md:py-2.5 bg-[#2699F6] text-white hover:bg-[#2699F6]/90 rounded-full font-bold transition-all text-[12px] md:text-[14px] duration-300 shadow-sm shrink-0"
          >
            내 환승직업 찾기
          </a>
          <a
            href="#background"
            onClick={() => handleTabClick('#background')}
            className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full transition-all text-[12px] md:text-[14px] duration-300 ${activeTab === '#background' ? 'text-[#121212] font-bold' : 'text-gray-500 hover:text-black hover:bg-gray-100 font-normal'}`}
          >
            배경
          </a>
          <a
            href="#job-list"
            onClick={() => handleTabClick('#job-list')}
            className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full transition-all text-[12px] md:text-[14px] duration-300 ${activeTab === '#job-list' ? 'text-[#121212] font-bold' : 'text-gray-500 hover:text-black hover:bg-gray-100 font-normal'}`}
          >
            직업 리스트
          </a>
          <a
            href="#timeline"
            onClick={() => handleTabClick('#timeline')}
            className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full transition-all text-[12px] md:text-[14px] duration-300 ${activeTab === '#timeline' ? 'text-[#121212] font-bold' : 'text-gray-500 hover:text-black hover:bg-gray-100 font-normal'}`}
          >
            일자리 타임라인
          </a>
        </div>
      </nav>

      {/* CAVE Test (Main Entrance Section) */}
      <section id="mbti-test" className="w-full m-0 p-0">
        <CAVETest />
      </section>

      {/* Background Section */}
      <section id="background" className="py-24 bg-ui-bg-card border-y border-ui-border">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <span className="text-[#2699F6] font-semibold tracking-wider text-[16px] uppercase">Background</span>
            <h2 className="text-[28px] md:text-[32px] font-bold mt-2 leading-[1.25]">프로젝트 배경</h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            <div className="w-full max-w-[800px] aspect-[16/9] bg-black rounded-[32px] overflow-hidden border border-[#EDEDED] shadow-md">
              <iframe
                id="youtube-project-background-video"
                className="w-full h-full border-0"
                src="https://www.youtube.com/embed/5O-iA-M7jpQ?autoplay=0&rel=0"
                title="프로젝트 배경 설명 영상"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Job List & Timeline Rendered via Heatmap */}
      <Heatmap />

      {/* Sources Section */}
      <section id="sources" className="py-24 bg-[#F5F5F7] border-t border-ui-border">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <span className="text-[#2699F6] font-semibold tracking-wider text-[16px] uppercase">Sources</span>
            <h2 className="text-[28px] md:text-[32px] font-bold mt-2 leading-[1.25]">출처</h2>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {/* Source 1 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 16 } }
              }}
              className="bg-white rounded-[32px] p-8 flex flex-col min-h-[280px] shadow-sm relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-[22px] font-bold text-[#444444] leading-tight mb-1">국가통계포털</h3>
                  <p className="text-[#A1A1AA] text-[14px] font-medium">산업별 취업자 수 (1963-2026)</p>
                </div>
              </div>
              <div className="flex-1"></div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[#A1A1AA] text-[14px] font-medium">Visit Site...</span>
                <a 
                  href="https://kosis.kr/statHtml/statHtml.do?sso=ok&returnurl=https%3A%2F%2Fkosis.kr%3A443%2FstatHtml%2FstatHtml.do%3Fconn_pat%3D%26tblId%3DDT_1DA7E26S%26orgId%3D101%26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            {/* Source 2 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 16 } }
              }}
              className="bg-white rounded-[32px] p-8 flex flex-col min-h-[280px] shadow-sm relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-[22px] font-bold text-[#444444] leading-tight mb-1">통계청</h3>
                  <p className="text-[#A1A1AA] text-[14px] font-medium">중장기 인력수급전망 (2023-2033)</p>
                </div>
              </div>
              <div className="flex-1"></div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[#A1A1AA] text-[14px] font-medium">Visit Site...</span>
                <a 
                  href="https://www.keis.or.kr/keis/ko/bbs/115/list.do?pageIndex=1&pageItm=10&searchOrderSort=0&searchGbn=0#;"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            {/* Source 3 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 16 } }
              }}
              className="bg-white rounded-[32px] p-8 flex flex-col min-h-[280px] shadow-sm relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-[22px] font-bold text-[#444444] leading-tight mb-1">지표누리</h3>
                  <p className="text-[#A1A1AA] text-[14px] font-medium leading-snug">국내총생산 및 경제성장률(GDP)<br/>(1970-2024)</p>
                </div>
              </div>
              <div className="flex-1"></div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[#A1A1AA] text-[14px] font-medium">Visit Site...</span>
                <a 
                  href="https://www.index.go.kr/unity/potal/main/EachDtlPageDetail.do?idx_cd=2736"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            {/* Source 4 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 16 } }
              }}
              className="bg-white rounded-[32px] p-8 flex flex-col min-h-[280px] shadow-sm relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-[22px] font-bold text-[#444444] leading-tight mb-1">NCS 국가직무능력표준</h3>
                  <p className="text-[#A1A1AA] text-[14px] font-medium">국가직무능력표준 웹사이트</p>
                </div>
              </div>
              <div className="flex-1"></div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[#A1A1AA] text-[14px] font-medium">Visit Site...</span>
                <a 
                  href="https://www.ncs.go.kr/index.do"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Analysis Framework (Bento Box) */}
      <section id="framework" className="py-24 bg-ui-bg-card text-white px-6 hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-[#2699F6] font-semibold tracking-wider text-[16px] uppercase">Analysis Framework</span>
            <h2 className="text-[28px] md:text-[32px] font-bold mt-2 mb-4 leading-[1.25]">직업의 생태계 변화 패턴</h2>
            <p className="text-ui-text-secondary max-w-2xl">
              데이터를 통해 도출한 산업혁명 단계별 직업의 등장, 소멸 그리고 이동 패턴입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Disappeared */}
            <div className="md:col-span-1 bg-ui-bg-card rounded-3xl p-8 border border-ui-border flex flex-col">
              <div className="w-12 h-12 bg-ui-bg-card rounded-2xl flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6 text-brand-threat" />
              </div>
              <h3 className="text-[20px] font-bold mb-2 leading-[1.25]">소멸 직업</h3>
              <p className="text-[16px] font-medium text-brand-main mb-6">Disappeared</p>
              
              <div className="flex-grow">
                <h4 className="text-[16px] font-semibold text-ui-text-secondary mb-2">쇠퇴 원인</h4>
                <p className="text-ui-text-secondary text-[16px] mb-6">기계적 자동화, 기업의 비용 절감, 기술적 완벽한 대체</p>
                
                <h4 className="text-[16px] font-semibold text-ui-text-secondary mb-2">대표 예시</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-ui-bg-main rounded-lg text-[16px] text-ui-text-secondary">버스 안내양</span>
                  <span className="px-3 py-1 bg-ui-bg-main rounded-lg text-[16px] text-ui-text-secondary">전화 교환원</span>
                  <span className="px-3 py-1 bg-ui-bg-main rounded-lg text-[16px] text-ui-text-secondary">단순 데이터 입력원</span>
                </div>
              </div>

              {/* Data Viz Placeholder */}
              <div className="mt-8 h-32 rounded-xl bg-ui-bg-card border border-ui-border border-dashed flex flex-col items-center justify-center text-ui-text-secondary">
                 <span className="text-[12px]">소멸 곡선 그래프 영역</span>
              </div>
            </div>

            {/* Created */}
            <div className="md:col-span-1 bg-ui-bg-card rounded-3xl p-8 border border-ui-border flex flex-col">
               <div className="w-12 h-12 bg-ui-bg-card rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-brand-extinction" />
              </div>
              <h3 className="text-[20px] font-bold mb-2 leading-[1.25]">등장 직업</h3>
              <p className="text-[16px] font-medium text-brand-main mb-6">Created</p>
              
              <div className="flex-grow">
                <h4 className="text-[16px] font-semibold text-ui-text-secondary mb-2">등장 배경</h4>
                <p className="text-ui-text-secondary text-[16px] mb-6">새로운 기술 인프라 구축의 필요성, 인간의 삶의 질 향상 요구</p>
                
                <h4 className="text-[16px] font-semibold text-ui-text-secondary mb-2">대표 예시</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-ui-bg-main rounded-lg text-[16px] text-ui-text-secondary">웹 디자이너</span>
                  <span className="px-3 py-1 bg-ui-bg-main rounded-lg text-[16px] text-ui-text-secondary">데이터 사이언티스트</span>
                  <span className="px-3 py-1 bg-ui-bg-main rounded-lg text-[16px] text-ui-text-secondary">콘텐츠 크리에이터</span>
                </div>
              </div>

              {/* Data Viz Placeholder */}
              <div className="mt-8 h-32 rounded-xl bg-ui-bg-card border border-ui-border border-dashed flex flex-col items-center justify-center text-ui-text-secondary">
                 <span className="text-[12px]">신생 직업 성장 그래프 영역</span>
              </div>
            </div>

            {/* Survival */}
            <div className="md:col-span-1 bg-gradient-to-br from-ui-bg-card to-ui-bg-main rounded-3xl p-8 border border-ui-border flex flex-col sm:col-span-2 md:col-span-1">
               <div className="w-12 h-12 bg-brand-main/20 rounded-2xl flex items-center justify-center mb-6">
                <BrainCircuit className="w-6 h-6 text-brand-spread" />
              </div>
              <h3 className="text-[20px] font-bold mb-2 leading-[1.25]">이동 패턴</h3>
              <p className="text-[16px] font-medium text-brand-main mb-6">Survival Skills</p>
              
              <div className="flex-grow flex flex-col justify-center">
                <p className="text-[13px] text-ui-text-secondary leading-relaxed mb-6">
                  수많은 직업이 사라지는 가운데 여전히 굳건한 역량이 있습니다. 이는 기술이 범접하기 어려운 인간 고유의 영역입니다.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-ui-bg-card/90 p-3 rounded-xl border border-ui-border">
                    <div className="w-2 h-2 rounded-full bg-brand-main"></div>
                    <span className="font-medium text-[16px]">비판적 사고 (Critical Thinking)</span>
                  </div>
                  <div className="flex items-center gap-3 bg-ui-bg-card/90 p-3 rounded-xl border border-ui-border">
                    <div className="w-2 h-2 rounded-full bg-brand-main"></div>
                    <span className="font-medium text-[16px]">공감 능력 (Empathy)</span>
                  </div>
                  <div className="flex items-center gap-3 bg-ui-bg-card/90 p-3 rounded-xl border border-ui-border">
                    <div className="w-2 h-2 rounded-full bg-brand-main"></div>
                    <span className="font-medium text-[16px]">복합 문제 해결력 (Complex Problem Solving)</span>
                  </div>
                  <div className="flex items-center gap-3 bg-ui-bg-card/90 p-3 rounded-xl border border-ui-border">
                    <div className="w-2 h-2 rounded-full bg-brand-main"></div>
                    <span className="font-medium text-[16px]">창의적 편집 능력 (Creative Editing)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Competency Shift */}
      <section id="competency" className="py-24 px-6 bg-ui-bg-card border-t border-ui-border hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#2699F6] font-semibold tracking-wider text-[16px] uppercase">Competency Shift</span>
            <h2 className="text-[28px] md:text-[32px] font-bold mt-2 leading-[1.25]">역량 변화</h2>
            <p className="text-ui-text-secondary mt-4 max-w-2xl mx-auto">
              미래 산업 환경에 맞춰 변화하는 역량 체계와 우리가 준비해야 할 핵심 역량을 분석합니다.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            
            {/* Card 1 */}
            <div className="bg-ui-bg-card p-8 rounded-3xl border border-ui-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-ui-bg-card rounded-2xl flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-ui-text-primary" />
                </div>
                <h3 className="text-[18px] md:text-[20px] font-bold text-ui-text-primary leading-[1.25]">AI 시대, NCS 역량 체계의 대전환: 10 → 7</h3>
              </div>
              <p className="text-[15px] text-ui-text-secondary leading-relaxed mb-6">
                기존의 직업기초능력 10개 영역이 미래 산업 변화에 맞춰 7개 영역으로 슬림화되고 전문화되었습니다. 이는 단순 지식 보유보다 실무 적용과 디지털 적응력을 강조하는 방향입니다.
              </p>
              <div className="space-y-4">
                <div className="bg-ui-bg-card p-4 rounded-xl border border-ui-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[14px] text-ui-text-secondary">정보능력</span>
                    <ChevronRight className="w-4 h-4 text-ui-text-secondary mx-2" />
                    <span className="text-[14px] font-bold text-ui-text-primary">디지털능력</span>
                  </div>
                  <p className="text-[13px] text-ui-text-secondary">컴퓨터 활용을 넘어 AI 활용과 윤리로 확장</p>
                </div>
                <div className="bg-ui-bg-card p-4 rounded-xl border border-ui-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[14px] text-ui-text-secondary">자기개발 + 자원관리</span>
                    <ChevronRight className="w-4 h-4 text-ui-text-secondary mx-2" />
                    <span className="text-[14px] font-bold text-ui-text-primary">자기관리능력</span>
                  </div>
                  <p className="text-[13px] text-ui-text-secondary">변화하는 환경에서의 적응학습 강조</p>
                </div>
                <div className="bg-ui-bg-card p-4 rounded-xl border border-ui-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[14px] text-ui-text-secondary">문제해결능력</span>
                    <ChevronRight className="w-4 h-4 text-ui-text-secondary mx-2" />
                    <span className="text-[14px] font-bold text-ui-text-primary">문제해결능력</span>
                  </div>
                  <p className="text-[13px] text-ui-text-secondary">논리를 넘어선 합리적 의사결정 추가</p>
                </div>
                <div className="bg-ui-bg-card p-4 rounded-xl border border-ui-border opacity-60">
                   <div className="flex items-center justify-between mb-2">
                    <span className="text-[14px] text-ui-text-secondary">기술·조직이해능력</span>
                    <ChevronRight className="w-4 h-4 text-ui-text-secondary mx-2" />
                    <span className="text-[14px] font-bold text-ui-text-secondary">(삭제/통합)</span>
                  </div>
                  <p className="text-[13px] text-ui-text-secondary">실무 중심의 슬림화 및 현장성 강화</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-ui-bg-card p-8 rounded-3xl border border-ui-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-ui-bg-card rounded-2xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-ui-text-primary" />
                </div>
                <h3 className="text-[18px] md:text-[20px] font-bold text-ui-text-primary leading-[1.25]">미래 성장을 결정짓는 5가지 핵심 신규 역량</h3>
              </div>
              <p className="text-[15px] text-ui-text-secondary leading-relaxed mb-6">
                AI와 공존하는 업무 환경에서 새롭게 정의된 5가지 필수 세부능력입니다.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-main mt-2 shrink-0"></div>
                  <div>
                    <span className="font-bold text-[15px] text-ui-text-primary">인공지능(AI) 활용능력:</span>
                    <span className="text-[15px] text-ui-text-secondary ml-1">AI 도구를 업무 프로세스에 능숙하게 적용하여 생산성을 높이는 역량.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-main mt-2 shrink-0"></div>
                  <div>
                    <span className="font-bold text-[15px] text-ui-text-primary">디지털 책임의식:</span>
                    <span className="text-[15px] text-ui-text-secondary ml-1">디지털 윤리, 보안, 개인정보 보호를 실천하는 직무 윤리.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-main mt-2 shrink-0"></div>
                  <div>
                    <span className="font-bold text-[15px] text-ui-text-primary">적응학습능력:</span>
                    <span className="text-[15px] text-ui-text-secondary ml-1">불확실한 미래 환경에서 지속적으로 새로운 지식을 습득하고 적응하는 평생학습 역량.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-main mt-2 shrink-0"></div>
                  <div>
                    <span className="font-bold text-[15px] text-ui-text-primary">의사결정능력:</span>
                    <span className="text-[15px] text-ui-text-secondary ml-1">복잡한 상황 데이터 속에서 최선의 대안을 판단하고 결정하는 실무 리더십.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-main mt-2 shrink-0"></div>
                  <div>
                    <span className="font-bold text-[15px] text-ui-text-primary">산업안전보건의식:</span>
                    <span className="text-[15px] text-ui-text-secondary ml-1">현장의 안전과 보건을 최우선으로 실천하는 책임 의식.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-ui-bg-card p-8 rounded-3xl border border-ui-border">
               <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-ui-bg-card rounded-2xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-ui-text-primary" />
                </div>
                <h3 className="text-[18px] md:text-[20px] font-bold text-ui-text-primary leading-[1.25]">산업별 역량 수요 및 훈련 현황 분석</h3>
              </div>
              <p className="text-[15px] text-ui-text-secondary leading-relaxed mb-6">
                현재 국내 훈련 과정 설계 현황(총 10,225개)을 분석한 결과, 미래 산업군으로의 이동이 뚜렷하게 나타나고 있습니다.
              </p>
              
              <div className="mb-6">
                <h4 className="text-[15px] font-bold text-ui-text-primary mb-3">1. 주요 분야별 필수 역량 Top 3</h4>
                <div className="space-y-2 text-[14px]">
                  <div className="flex items-center justify-between border-b border-ui-border pb-2">
                    <span className="font-medium text-ui-text-secondary">정보통신</span>
                    <span className="text-ui-text-secondary">문제해결능력 &gt; 정보능력 &gt; 기술능력</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-ui-border pb-2">
                    <span className="font-medium text-ui-text-secondary">금융·보험</span>
                    <span className="text-ui-text-secondary">수리능력 &gt; 정보능력 &gt; 직업윤리</span>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <span className="font-medium text-ui-text-secondary">문화·예술</span>
                    <span className="text-ui-text-secondary">의사소통능력 &gt; 창의·혁신 &gt; 자기개발능력</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-[15px] font-bold text-ui-text-primary mb-3">2. 교육훈련 설계 집중도 (과정 수 기준)</h4>
                <div className="space-y-2 text-[14px]">
                  <div className="flex items-center gap-3">
                    <div className="w-[100px] font-medium text-ui-text-secondary shrink-0">경영·회계·사무</div>
                    <div className="flex-1 bg-ui-bg-card h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-spread h-full w-[24.3%]"></div>
                    </div>
                    <div className="text-ui-text-secondary w-12 text-right">24.3%</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-[100px] font-medium text-ui-text-secondary shrink-0">기계</div>
                     <div className="flex-1 bg-ui-bg-card h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-extinction h-full w-[10.8%]"></div>
                    </div>
                    <div className="text-ui-text-secondary w-12 text-right">10.8%</div>
                  </div>
                   <div className="flex items-center gap-3">
                    <div className="w-[100px] font-medium text-ui-text-secondary shrink-0">정보통신</div>
                     <div className="flex-1 bg-ui-bg-card h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-appearance h-full w-[9.6%]"></div>
                    </div>
                    <div className="text-ui-text-secondary w-12 text-right">9.6%</div>
                  </div>
                </div>
              </div>

              <div className="bg-brand-appearance/10 p-4 rounded-xl text-[14px] text-brand-appearance border border-brand-appearance/20">
                <strong>[인사이트]</strong> 훈련 과정은 여전히 경영·회계 등 전통적 사무직군에 집중되어 있으나(24.3%), 실무 현장에서는 정보통신 및 디지털 역량에 대한 요구가 급증하고 있습니다. 특히 <strong>화학·바이오(0.2%)</strong>와 같은 전문 신산업 분야의 인력 양성 확대가 시급한 과제로 나타납니다.
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-ui-bg-card p-8 rounded-3xl border border-ui-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-ui-bg-card rounded-2xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-brand-extinction" />
                </div>
                <h3 className="text-[18px] md:text-[20px] font-bold text-ui-text-primary leading-[1.25]">AI 시대에 우리가 집중해야 할 역량 유형</h3>
              </div>
              <p className="text-[15px] text-ui-text-secondary leading-relaxed mb-6">
                업무 성격에 따라 미래 역량은 크게 4가지 유형으로 분류됩니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-ui-bg-card p-4 rounded-xl border border-ui-border">
                  <div className="font-bold text-[15px] text-ui-text-primary mb-2">디지털·분석형</div>
                  <p className="text-[13px] text-ui-text-secondary mb-2">데이터 분석, 정보능력, AI 활용</p>
                  <p className="text-[12px] text-brand-main font-semibold">(IT, 금융 분야 필수)</p>
                </div>
                <div className="bg-ui-bg-card p-4 rounded-xl border border-ui-border">
                  <div className="font-bold text-[15px] text-ui-text-primary mb-2">대인·소통형</div>
                  <p className="text-[13px] text-ui-text-secondary mb-2">의사소통능력, 대인관계능력, 글로벌 역량</p>
                  <p className="text-[12px] text-brand-main font-semibold">(서비스, 의료 분야 필수)</p>
                </div>
                <div className="bg-ui-bg-card p-4 rounded-xl border border-ui-border">
                  <div className="font-bold text-[15px] text-ui-text-primary mb-2">관리·전략형</div>
                  <p className="text-[13px] text-ui-text-secondary mb-2">의사결정, 기획·전략수립, 프로젝트 관리</p>
                  <p className="text-[12px] text-brand-main font-semibold">(사업관리, 경영 분야 필수)</p>
                </div>
                <div className="bg-ui-bg-card p-4 rounded-xl border border-ui-border shadow-[0_0_0_2px_rgba(38,153,246,0.2)]">
                  <div className="font-bold text-[15px] text-ui-text-primary mb-2">자기주도형</div>
                  <p className="text-[13px] text-ui-text-secondary mb-2">적응학습능력, 자기관리능력, 창의·혁신</p>
                  <p className="text-[12px] text-brand-main font-semibold">(전 분야 공통 미래 역량)</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>




    </div>
  );
}
