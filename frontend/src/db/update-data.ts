import { config } from "dotenv";
config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { blogPosts, services } from "./schema";
import { eq } from "drizzle-orm";

async function update() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  // Update service prices
  console.log("💰 Setting service prices...");
  await db
    .update(services)
    .set({ price: 199 })
    .where(eq(services.slug, "1-year"));
  await db
    .update(services)
    .set({ price: 299 })
    .where(eq(services.slug, "3-year"));
  await db
    .update(services)
    .set({ price: 499 })
    .where(eq(services.slug, "5-year"));
  console.log("✅ Prices set: 1-year=₹199, 3-year=₹299, 5-year=₹499");

  // Update blog content
  console.log("📝 Adding blog content...");

  const blogContent: Record<number, string> = {
    1: `## What is a Birth Chart?

A birth chart, also known as a natal chart or Janam Kundali, is essentially a map of the sky at the exact moment you were born. It captures the positions of the Sun, Moon, planets, and other celestial bodies across the twelve houses of the zodiac.

### Why Does It Matter?

Your birth chart is unique to you — no two people have the exact same chart unless born at the same time and place. It reflects your personality traits, strengths, challenges, and life tendencies.

### Key Components

- **The Ascendant (Lagna)**: Your rising sign, which shapes your outward personality and how others perceive you.
- **The Moon Sign (Rashi)**: Governs your emotional world, instincts, and inner self.
- **The Sun Sign**: Represents your core identity, ego, and life purpose.
- **Planetary Positions**: Each planet in your chart influences different aspects of life — career, relationships, health, and finances.
- **Houses**: The twelve houses represent different life areas, from self-identity to career, relationships, and spirituality.

### How to Read Your Chart

Start with your Ascendant to understand your life's framework, then examine each planet's position and the house it occupies. The aspects (angles) between planets reveal how different energies interact in your life.

### Getting Started

If you're new to astrology, begin with understanding your three main signs — Ascendant, Moon, and Sun. This foundation will help you navigate more complex chart interpretations as you learn more.

> Remember: A birth chart is a tool for self-awareness, not a rigid prediction. Use it to understand patterns and tendencies, and to make more informed decisions.`,

    2: `## The Power of Yearly Reports

In a world full of uncertainty, having a structured overview of what lies ahead can be incredibly empowering. Yearly reports provide a framework for understanding the themes, challenges, and opportunities that are likely to unfold over the coming months.

### What Do Yearly Reports Cover?

A well-structured yearly report typically addresses:

- **Career & Professional Growth**: Key periods for advancement, challenges to watch for, and optimal timing for major career decisions.
- **Financial Planning**: Phases favorable for investments, savings goals, and financial caution periods.
- **Relationships**: Understanding dynamics with partners, family, and colleagues throughout the year.
- **Health & Wellness**: Periods requiring extra attention to physical and mental well-being.
- **Personal Development**: Opportunities for growth, learning, and self-improvement.

### How to Use Your Report

1. **Read it thoroughly** at the beginning of the period to set expectations.
2. **Review monthly** to align your actions with favorable phases.
3. **Use it as a planning tool**, not a rigid script — it's meant to inform, not dictate.
4. **Reflect regularly** on how the predictions align with your experiences.

### Why Choose a Multi-Year Report?

While a 1-year report is great for immediate planning, 3-year and 5-year reports offer strategic perspective. They help you see the bigger picture, identify long-term trends, and prepare for major life transitions.

> The best time to plan is before you need to act. Let structured insights guide your journey.`,

    3: `## Understanding Self-Reflection

Self-reflection is the practice of turning your attention inward to examine your thoughts, feelings, behaviors, and motivations. It's one of the most powerful tools available for personal growth and better decision-making.

### Why Self-Reflection Matters

Without self-reflection, we tend to operate on autopilot — repeating patterns, making reactive decisions, and missing opportunities for growth. Regular self-reflection helps you:

- **Identify patterns** in your behavior and relationships
- **Understand your triggers** and emotional responses
- **Align actions with values** instead of external pressures
- **Make better decisions** by considering multiple perspectives
- **Build emotional intelligence** and self-awareness

### Practical Self-Reflection Techniques

1. **Journaling**: Write about your experiences, thoughts, and feelings. Look for recurring themes.
2. **Structured Analysis**: Use frameworks like birth charts or personality assessments to gain objective insights about yourself.
3. **Mindful Review**: At the end of each day, spend 5 minutes reviewing key interactions and decisions.
4. **Seek Feedback**: Ask trusted people for honest feedback about your strengths and blind spots.
5. **Periodic Deep Dives**: Monthly or quarterly, take extended time to review your goals, progress, and alignment.

### From Reflection to Action

Self-reflection is only valuable when it leads to intentional action. After reflecting:

- Identify one specific behavior to change or strengthen
- Set a small, measurable goal
- Track your progress over time
- Celebrate improvements, no matter how small

> Self-awareness is the first step toward intentional living. Start small, be consistent, and watch how clarity transforms your decisions.`,

    4: `## Career Planning with Purpose

Making career decisions without a clear framework can feel overwhelming. Whether you're considering a career change, seeking a promotion, or starting a new venture, structured analysis can provide the clarity you need.

### The Career Planning Framework

Effective career planning involves understanding several key factors:

- **Your Natural Strengths**: What comes easily to you? What do others consistently recognize in you?
- **Timing & Opportunity**: Certain periods are more favorable for career moves than others.
- **Market Alignment**: How do your skills and interests align with market needs?
- **Risk Assessment**: Understanding the trade-offs involved in major career decisions.

### Using Structured Reports for Career Planning

Personalized reports can illuminate career patterns you might not see on your own:

1. **Favorable Periods**: Identify windows of opportunity for job changes, promotions, or new ventures.
2. **Challenge Periods**: Know when to consolidate rather than expand, reducing unnecessary risk.
3. **Skill Development**: Understand which skills to develop based on your chart's indications.
4. **Professional Relationships**: Navigate workplace dynamics with greater awareness.

### Action Steps

- Review your current career trajectory objectively
- Identify gaps between where you are and where you want to be
- Use structured insights to time major career decisions
- Build a support network of mentors and advisors
- Continuously invest in learning and skill development

> Your career is a marathon, not a sprint. Strategic planning combined with self-awareness creates sustainable success.`,

    5: `## Building Stronger Relationships

Relationships are at the core of human experience. Understanding yourself better — your communication style, emotional needs, and behavioral patterns — can dramatically improve how you connect with others.

### Understanding Relationship Patterns

We all have patterns in how we form and maintain relationships. These patterns are influenced by:

- **Communication Style**: How you express yourself and listen to others
- **Emotional Needs**: What you require to feel secure and valued
- **Conflict Resolution**: How you handle disagreements and stress
- **Attachment Style**: Your fundamental approach to closeness and independence
- **Values Alignment**: The core values that guide your relationship choices

### How Self-Assessment Tools Help

Structured analysis and personalized reports can reveal:

1. **Compatibility Insights**: Understanding how your personality interacts with different types of people.
2. **Timing for Relationships**: Favorable periods for deepening connections or starting new relationships.
3. **Communication Gaps**: Areas where misunderstandings are likely to occur.
4. **Growth Opportunities**: Ways to strengthen existing bonds through mutual understanding.

### Practical Relationship Tips

- **Listen actively** — seek to understand before being understood
- **Express appreciation** regularly and specifically
- **Set healthy boundaries** that honor both your needs and your partner's
- **Invest time** in understanding your partner's perspective
- **Seek professional guidance** when patterns become challenging

> The strongest relationships are built on mutual understanding. Start by understanding yourself.`,

    6: `## Smart Financial Planning

Financial decisions are among the most impactful choices we make. Understanding the cycles and patterns that influence your financial life can help you make smarter investments and build lasting wealth.

### The Role of Timing in Finance

While hard work and smart strategy are essential, timing plays a crucial role in financial outcomes:

- **Investment Windows**: Certain periods may be more favorable for starting new investments.
- **Savings Phases**: Times when consolidation and saving are more prudent than aggressive investment.
- **Risk Periods**: Phases when financial caution is advisable.
- **Growth Cycles**: Windows of opportunity for business expansion or career advancement that impacts income.

### Building a Financial Strategy

A comprehensive financial plan should address:

1. **Emergency Fund**: Maintain 3-6 months of expenses as a safety net.
2. **Debt Management**: Prioritize high-interest debt reduction.
3. **Investment Diversification**: Spread risk across different asset classes.
4. **Income Growth**: Continuously invest in skills that increase your earning potential.
5. **Long-term Planning**: Think in decades, not months.

### Using Reports for Financial Decisions

Personalized reports can complement your financial planning by:

- Identifying periods favorable for major financial decisions
- Highlighting phases that require conservative approaches
- Providing context for career and income growth patterns
- Offering insights into financial tendencies based on your profile

### Key Principles

- Always do your own research before making financial decisions
- Use insights as one data point among many
- Consult with qualified financial advisors for specific advice
- Focus on building sustainable wealth, not quick gains

> Financial freedom comes from informed decisions, disciplined habits, and strategic timing.`,
  };

  for (const [id, content] of Object.entries(blogContent)) {
    await db
      .update(blogPosts)
      .set({ content })
      .where(eq(blogPosts.id, parseInt(id)));
  }
  console.log("✅ Blog content added to all 6 posts");

  console.log("🎉 Update complete!");
}

update().catch((err) => {
  console.error("❌ Update failed:", err);
  process.exit(1);
});
