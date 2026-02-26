/**
 * Career Interpretation Blocks
 *
 * Reusable, deterministic text blocks for career predictions.
 * Includes monthly-specific blocks for granular month-by-month guidance.
 */

export const CAREER_DASHA_BLOCKS = {
  saturn_active:
    "Career progress will require patience and sustained effort. This period rewards " +
    "those who work diligently without expecting immediate recognition. Structured approaches " +
    "to project management and a willingness to handle mundane but important tasks will serve you well. " +
    "Long-term career goals benefit from the discipline Saturn demands.",
  jupiter_active:
    "Professional growth is supported by wisdom and mentorship. Seek guidance from " +
    "experienced colleagues and remain open to learning opportunities. Expansion of responsibilities " +
    "is likely, and roles involving teaching, counseling, or advising are particularly favored. " +
    "Your ethical approach to work earns trust from decision-makers.",
  mars_active:
    "Energy and initiative drive your career forward. Take bold action, but channel " +
    "your drive constructively to avoid conflicts with superiors. Competitive situations " +
    "bring out your best performance. Leadership roles and project-driven work suit your " +
    "current energy perfectly. Avoid impulsive decisions that could undermine long-term plans.",
  venus_active:
    "Harmonious workplace relationships become key to success. Creative fields and " +
    "collaborative projects are particularly favored. Your diplomatic skills open doors " +
    "to partnerships and alliances that accelerate career growth. Industries related to " +
    "beauty, design, hospitality, and the arts see especially strong results.",
  mercury_active:
    "Communication and analytical skills take center stage. This is an excellent " +
    "period for negotiations, presentations, and intellectual work. Writing, teaching, " +
    "data analysis, and technology-related careers thrive. Stay sharp with documentation " +
    "and correspondence as these become your primary vehicles for advancement.",
  rahu_active:
    "Unconventional career paths may open up. Be cautious of shortcuts while " +
    "remaining open to innovative opportunities. Technology, foreign collaborations, " +
    "and out-of-the-box approaches bring unexpected breakthroughs. Networking in " +
    "non-traditional circles could lead to surprising career developments.",
  ketu_active:
    "A period of introspection regarding career direction. Past work experiences " +
    "offer valuable insights for future decisions. Spiritual or research-oriented " +
    "careers gain clarity. You may feel detached from material career goals, which " +
    "paradoxically opens doors to more fulfilling work aligned with your deeper purpose.",
  sun_active:
    "Leadership qualities are highlighted. Recognition from authority figures " +
    "becomes more likely when you demonstrate confidence. Government, administrative, " +
    "and high-visibility roles align with your current energy. Taking ownership of " +
    "projects and standing firm in your expertise earns lasting respect.",
  moon_active:
    "Emotional intelligence plays a larger role in professional success. " +
    "Nurturing relationships with colleagues creates opportunities. Careers in " +
    "healthcare, hospitality, public service, and creative arts receive favorable " +
    "energies. Your intuitive understanding of others' needs becomes a professional asset.",
};

export const CAREER_HOUSE_BLOCKS = {
  saturn_1st:
    "Self-discipline becomes your greatest professional asset. How you present " +
    "yourself affects career outcomes significantly. Your work ethic speaks loudly, " +
    "and others look to you as a model of reliability and perseverance.",
  saturn_10th:
    "Professional responsibilities increase significantly. Hard work in your " +
    "core role will be noticed and eventually rewarded. Authority positions " +
    "demand your attention, and your capacity to shoulder heavy workloads becomes " +
    "your defining characteristic this period.",
  saturn_6th:
    "Attention to daily work routines is essential. Health and work life require " +
    "careful balance during this period. Service-oriented work and attention to " +
    "operational details bring gradual but steady career advancement.",
  jupiter_10th:
    "Excellent prospects for career advancement. Your reputation grows naturally " +
    "through ethical conduct and generosity. Promotions, prestigious assignments, " +
    "and public recognition are strongly indicated during this time.",
  jupiter_9th:
    "Higher education or foreign opportunities may benefit your career. " +
    "Expand your horizons through learning. Academic pursuits, international " +
    "projects, and philosophical endeavors enhance your professional standing.",
  jupiter_2nd:
    "Income potential increases through your professional efforts. " +
    "Invest in skills that increase your value. Financial wisdom and resource " +
    "management skills become central to your career growth trajectory.",
  mars_10th:
    "Competitive drive fuels professional ambitions. Channel this energy " +
    "into achieving concrete goals. Your ability to take decisive action and " +
    "lead under pressure sets you apart from peers.",
  mars_6th:
    "Competitive work environment requires strategic navigation. " +
    "Physical stamina supports your daily productivity. Tackling challenges " +
    "head-on and overcoming workplace obstacles builds your professional reputation.",
  venus_10th:
    "Public image benefits from grace and diplomacy. Creative professions " +
    "see particularly strong results. Your aesthetic sensibility and people " +
    "skills create opportunities in client-facing and creative leadership roles.",
  sun_10th:
    "Authority and leadership are natural paths. Recognition from " +
    "government or large organizations is possible. Your ability to command " +
    "respect and inspire confidence makes this an excellent period for career ascension.",
  mercury_10th:
    "Communication-based careers thrive. Your analytical abilities " +
    "are recognized and valued. Writing, consulting, technology, and " +
    "knowledge-sharing roles bring significant professional rewards.",
  rahu_10th:
    "Ambitious career goals are within reach through unconventional means. " +
    "Technology and foreign connections may play a role. Bold, innovative " +
    "approaches to your profession attract attention and open new pathways.",
};

export const CAREER_SIGN_BLOCKS = {
  saturn_capricorn:
    "Structured, traditional career paths are favored. Management and " +
    "administrative roles suit you well. Corporate leadership, institutional " +
    "roles, and positions requiring authority and organization align with your strengths.",
  saturn_aquarius:
    "Innovation within established systems creates opportunities. " +
    "Technology and humanitarian fields benefit. Your ability to merge " +
    "progressive ideas with structural discipline becomes a unique advantage.",
  jupiter_sagittarius:
    "Teaching, publishing, and international work expand naturally. " +
    "Your philosophical approach inspires others. Cross-cultural projects " +
    "and educational leadership bring fulfillment and professional growth.",
  jupiter_pisces:
    "Intuition guides career decisions wisely. Creative and healing " +
    "professions align with your nature. Work in wellness, spirituality, " +
    "music, or charitable organizations brings deep professional satisfaction.",
  mars_aries:
    "Entrepreneurial ventures and leadership roles suit you. " +
    "Your pioneering spirit drives professional success. Starting new " +
    "initiatives, leading teams, and breaking into new markets come naturally.",
  mars_scorpio:
    "Research, investigation, and transformational work thrive. " +
    "Your intensity creates breakthroughs. Careers in psychology, " +
    "forensics, finance, and strategic consulting leverage your deep analytical abilities.",
};

export const CAREER_PERSONAL_YEAR_BLOCKS: Record<number, string> = {
  1: "A year of action and initiative. Perfect for launching new ventures, seeking promotions, or starting a completely new career path. Taking the lead brings success. Fresh ideas and bold moves define your professional trajectory this year.",
  2: "Career progress relies on collaboration and patience. Focus on networking, supporting others, and working within teams rather than solo glory. Details matter. Building alliances and strengthening professional relationships yields long-term dividends.",
  3: "Creativity and communication are highlighted. Express your ideas boldly. Marketing, writing, and artistic pursuits are particularly favored this year. Your ability to present ideas engagingly opens doors to new opportunities and visibility.",
  4: "Hard work and discipline are required. This is a building year—focus on foundations, systems, and organization. Do not cut corners. Establishing solid processes and demonstrating reliability earns you trust and positions you for future advancement.",
  5: "Change is in the air. Expect unexpected opportunities or shifts in direction. Travel or new technologies may play a significant role. Adaptability is your greatest asset, and embracing disruption leads to exciting professional breakthroughs.",
  6: "Responsibilities increase. Service to others and harmonious workplace relationships lead to advancement. A good time for team leadership. Your nurturing approach to management and willingness to support colleagues builds a strong professional reputation.",
  7: "A period for analysis and skill development. Research, study, and specialization are favored over aggressive expansion. Listen to your intuition. Deepening your expertise and pursuing advanced training creates a solid foundation for future career leaps.",
  8: "The year of power and achievement. Commercial success, management roles, and financial gains are within reach if you assert yourself. Strategic thinking and decisive action in business matters bring substantial material rewards and recognition.",
  9: "Completion of cycles. Finish existing projects and prepare for the next phase. Clear out what no longer serves your professional growth. Humanitarian work and legacy projects bring deep satisfaction and prepare you for the fresh start ahead.",
};

/** Monthly career tone modifiers — planet-influenced nuances per month */
export const CAREER_MONTHLY_BLOCKS: Record<number, string> = {
  1: "January brings a period of planning and strategic review. Lay out your professional roadmap for the year ahead. Evaluate past performance and set measurable goals. Networking events and industry gatherings offer valuable connections that shape your trajectory.",
  2: "February demands patience in career matters. Build relationships with key stakeholders and focus on behind-the-scenes preparation. Collaborative projects gain momentum when you invest time in understanding your team's strengths and aligning goals effectively.",
  3: "March ignites professional energy. Take initiative on stalled projects, pitch new ideas, and assert your leadership. Competitive opportunities arise — embrace them with confidence. Your proactive approach attracts the attention of decision-makers and mentors alike.",
  4: "April continues the momentum with sustained drive. Focus on execution rather than planning. Physical energy supports demanding work schedules and tight deadlines. Channel any workplace tensions productively by staying focused on deliverables and results.",
  5: "May brings harmony to workplace dynamics. Creative collaborations and team bonding strengthen your position. Client relationships flourish through your genuine engagement and diplomatic communication style. Artistic and design-oriented projects gain particular traction.",
  6: "June favors analytical work and communication-heavy tasks. Presentations, reports, and negotiations produce strong outcomes. Documentation and process improvement yield valuable efficiency gains. Your clarity of thought and articulate expression become major professional advantages.",
  7: "July heightens emotional awareness in professional settings. Trust your instincts when making career decisions. Public-facing roles and service-oriented work thrive during this month. Your empathetic leadership style resonates deeply with colleagues and clients.",
  8: "August spotlights leadership and visibility. Take ownership of high-profile projects and demonstrate your expertise confidently. Recognition from senior management and authority figures becomes more likely. This is an excellent month for performance reviews and career conversations.",
  9: "September sharpens your analytical and research capabilities. Detail-oriented work produces exceptional results. Training programs, certifications, and skill upgrades are highly favored during this period. Your meticulous approach to complex problems earns professional respect.",
  10: "October strengthens professional partnerships and alliances. Joint ventures and collaborative initiatives bring mutual benefits. Balance in work-life dynamics improves your overall effectiveness and creative output. Diplomatic negotiations reach favorable conclusions.",
  11: "November expands professional horizons through learning and exploration. Conferences, mentorship programs, and international opportunities present themselves. Your willingness to embrace new perspectives and innovative approaches positions you for significant career growth.",
  12: "December is ideal for reflection and strategic planning. Review accomplishments and set groundwork for the next cycle. Wisdom gained through the year's experiences crystallizes into clear career direction. Express gratitude to mentors and collaborators who supported your journey.",
};
