// ============================================
// Rung 3 — AP Seminar EOCb: Building a Research-Based Argument
// ============================================
import {
  Passage, WritingArea, RevealPanel, ComparisonView, EditableTable,
  Timer, Checklist, Activity, Bridge, SectionHeader, CompleteRungButton
} from './components.js';

const RUNG = 3;

export function render(container, savedData, ctx) {
  const { onComplete } = ctx;
  const saved = savedData?.activities || {};

  // =====================
  // Bridge In
  // =====================
  container.appendChild(Bridge('in', 'Rung 3 — Research-Based Argument (EOCb)',
    'Rungs 1 and 2 focused on reading &mdash; analyzing what others argue and how. This rung shifts to writing: building your own argument from multiple sources.',
    '<strong>From Rung 1:</strong> Identifying arguments, tracing reasoning, evaluating evidence.<br><strong>From Rung 2:</strong> Analyzing rhetorical choices, writing structured analytical paragraphs.',
    '<strong>What changes here:</strong> You move from describing what others think to developing what <em>you</em> think &mdash; backed by source evidence.'
  ));

  // =====================
  // Warm-Up — Source Dialogue Practice (60 min)
  // =====================

  const warmUpTimer = Timer(60);

  const warmUpSourceA = Passage(
    'Source A &mdash; Feudalism in Medieval Europe',
    'In the absence of a strong emperor, Europe fractured into thousands of tiny, local territories. To survive the chaos of Vikings, Magyars, and bandits, society reorganized itself into a rigid hierarchy known as <strong>Feudalism</strong>. It was a system built on a simple trade: <strong>Land for Loyalty.</strong> A King gave land (a <em>fief</em>) to a Lord. The Lord promised to fight for the King. The Lord then gave protection to the peasantry, and in return, the peasants gave up their freedom to become <strong>Serfs</strong>. This wasn&rsquo;t slavery &mdash; a serf couldn&rsquo;t be sold away from his family &mdash; but it wasn&rsquo;t freedom. A serf was bound to the soil, a piece of human machinery necessary to make the manor run.',
    '&mdash; Julian D. Michels, <em>Teleodynamic Sociology</em>, Chapter 4: Europe and the Americas'
  );

  const warmUpSourceB = Passage(
    'Source B &mdash; The Mongol Approach',
    'Most conquerors force their culture upon the conquered. The Romans built bathhouses in England; the Arabs built mosques in Spain. The Mongols were different. They were the ultimate pragmatists, unburdened by the need to prove cultural dominance. Genghis Khan and his heirs understood that a warrior on horseback could conquer a city &mdash; but he could not engineer a siege weapon, calculate a calendar, or heal a fever. So, they became headhunters. <strong>Cultural borrowers.</strong> The Mongol court became a magnet for the world&rsquo;s talent, regardless of origin. They hired Chinese engineers to smash Persian walls, Persian astronomers to map the stars over the steppe, and Arab doctors to tend to the Khans. The Mongolian empire was built not on cultural purity, but on a ruthless and efficient cosmopolitanism.',
    '&mdash; Julian D. Michels, <em>Teleodynamic Sociology</em>, Chapter 5: The Northern Roads'
  );

  const warmUpSourceC = Passage(
    'Source C &mdash; The Ottoman Devshirme',
    'The Ottomans solved this with a paradox. They built their elite class from slaves. Christian boys, taken as children, were converted to Islam and raised to serve the Sultan with absolute loyalty. They called it the devshirme. The harvest. Every three to five years, Ottoman officials traveled through the Balkans with ledgers and quotas. One Christian boy between 8 and 18 years old was stolen from every forty households. The boys were marched to Istanbul. Bathed. Circumcised. Given new Turkish names. Sorted. The strongest were assigned to the Janissary corps: the sultan&rsquo;s elite army. The most intelligent boys went to the schools. Such men ruled the empire &mdash; but they could never threaten the throne. Because they had no family connections. No landed estates. They were foreigners with no local power base. They owed everything to the Sultan. They were designed, thus, to remain perfectly loyal.',
    '&mdash; Julian D. Michels, <em>Teleodynamic Sociology</em>, Chapter 2.1: The Gunpowder Empires'
  );

  const warmUpMapHeaders = ['', 'Source A (Feudalism)', 'Source B (Mongols)', 'Source C (Ottomans)'];
  const warmUpMapRows = [
    ['<strong>How does this empire create loyalty?</strong>', '', '', ''],
    ['<strong>What does the individual give up?</strong>', '', '', ''],
    ['<strong>Where does this source AGREE with another?</strong>', '', '', ''],
    ['<strong>Where does this source DIFFER from another?</strong>', '', '', ''],
    ['<strong>What is the biggest weakness of this approach?</strong>', '', '', '']
  ];

  const warmUpSourceMap = EditableTable(RUNG, 'warmup-source-map', warmUpMapHeaders, warmUpMapRows);

  const warmUpTension = WritingArea(RUNG, 'warmup', 'tension', {
    placeholder: 'What is the deepest tension across these three approaches? Don\u2019t just say \u201Cthey\u2019re different.\u201D Name what\u2019s really at stake.',
    label: 'What\u2019s the biggest tension across these three models of imperial loyalty?'
  });
  if (saved.warmup?.tension) warmUpTension.loadValue(saved.warmup.tension);

  const warmUpTensionReveal = RevealPanel(
    'Reveal Model Response',
    '<p><strong>Model:</strong> The deepest tension is between loyalty that comes from <em>belonging</em> (feudalism ties you to land and lineage), loyalty that comes from <em>usefulness</em> (the Mongols recruit talent regardless of origin), and loyalty that comes from <em>erasure of identity</em> (the Ottomans strip family, religion, and culture to manufacture obedience). All three systems produce stability &mdash; but they define the individual\u2019s worth in fundamentally different ways: as a link in a chain, as a skill to be harvested, or as a blank slate to be written on.</p>',
    warmUpTension
  );

  const warmUpThesis = WritingArea(RUNG, 'warmup', 'thesis', {
    placeholder: 'Write a thesis statement that takes a position on this question, drawing on at least two of the three sources...',
    minHeight: '100px',
    label: 'Draft a thesis: Which approach to building loyalty was most effective \u2014 and at what cost?'
  });
  if (saved.warmup?.thesis) warmUpThesis.loadValue(saved.warmup.thesis);

  container.appendChild(Activity(
    null,
    'Warm-Up \u2014 Source Dialogue Practice',
    '<p>Three empires. Three solutions to the same problem: <strong>how do you make people loyal to your state?</strong> Read each source, map how they relate to each other, and draft a thesis.</p>',
    warmUpTimer,
    warmUpSourceA,
    warmUpSourceB,
    warmUpSourceC,
    SectionHeader('Source Conversation Map'),
    warmUpSourceMap,
    warmUpTension,
    warmUpTensionReveal,
    SectionHeader('Draft a Thesis'),
    warmUpThesis
  ));

  // =====================
  // Activity 1 — Source Dialogue
  // =====================
  const sourceAPassage = Passage(
    'Source A — Dr. Lena Torres, "The Innovation Imperative," <em>Journal of Education Policy</em> (2023)',
    'The economic data is difficult to ignore. Students who graduate with degrees in science, technology, engineering, and mathematics earn an average of 25% more in their first five years of employment than their peers in humanities fields. As automation reshapes the workforce, the demand for technical literacy will only increase. Schools that fail to prioritize STEM instruction risk leaving students unprepared for the jobs that will actually exist. Investing in STEM is not about devaluing the humanities — it is about recognizing economic reality. Students deserve an education that leads to stable, well-paying careers, and right now, the clearest path to that outcome runs through STEM.'
  );

  const sourceBPassage = Passage(
    'Source B — Marcus Whitfield, "What Robots Cannot Do," <em>The Atlantic</em> (2024)',
    'Every major tech company now lists "communication skills" and "critical thinking" as top hiring priorities — skills rooted in the humanities, not the engineering lab. The rush to prioritize STEM has produced graduates who can code an algorithm but struggle to explain what it does or why it matters. History teaches pattern recognition across centuries. Literature builds empathy by forcing readers into unfamiliar perspectives. Philosophy sharpens the ability to construct and dismantle arguments. These are not soft skills — they are the hard skills of a functioning democracy and a thoughtful workforce. Cutting humanities funding to boost STEM budgets is a trade that costs more than it saves.'
  );

  const sourceCPassage = Passage(
    'Source C — Dr. Priya Anand, "Beyond the Binary," <em>Educational Leadership</em> (2024)',
    'The STEM-versus-humanities debate is itself the problem. The most pressing challenges of our time — climate change, artificial intelligence ethics, public health communication — demand both technical expertise and humanistic reasoning. A climate scientist who cannot write persuasively will fail to move policy. A philosopher who cannot interpret data will miss the scale of the crisis. Schools should stop treating these disciplines as competitors for funding and start designing curricula that integrate them. The question is not which to prioritize; the question is how to connect them so students can think across boundaries.'
  );

  // Source Conversation Map table
  const mapHeaders = ['', 'Source A (Torres)', 'Source B (Whitfield)', 'Source C (Anand)'];
  const mapRows = [
    ['<strong>Main claim (one sentence)</strong>', '', '', ''],
    ['<strong>What kind of evidence does this source rely on?</strong>', '', '', ''],
    ['<strong>Where does this source AGREE with another source?</strong>', '', '', ''],
    ['<strong>Where does this source DISAGREE with or PUSH BACK on another source?</strong>', '', '', ''],
    ['<strong>What does this source MISS or leave out?</strong>', '', '', '']
  ];
  const mapModelData = [
    [
      '<strong>Main claim</strong>',
      'Schools must prioritize STEM because economic data shows STEM graduates earn more and the job market demands technical skills.',
      'Humanities skills (communication, critical thinking, empathy) are essential and cutting their funding to boost STEM is a net loss.',
      'The STEM-vs-humanities framing is a false binary; schools should integrate the disciplines to address real-world challenges.'
    ],
    [
      '<strong>Evidence type</strong>',
      'Economic/statistical data (25% earnings advantage, workforce automation trends)',
      'Hiring data from tech companies plus conceptual claims about what each discipline teaches',
      'Real-world examples (climate change, AI ethics) showing interdisciplinary demands'
    ],
    [
      '<strong>Agrees with</strong>',
      'Implicitly agrees with C that STEM matters, but for purely economic reasons',
      'Agrees with C that humanities skills are essential in technical fields',
      'Agrees with both that each discipline has value, but rejects the framing of choosing one over the other'
    ],
    [
      '<strong>Disagrees with</strong>',
      'Disagrees with B\'s implication that humanities skills are more important than technical training',
      'Directly pushes back on A\'s economic argument by showing STEM employers want humanities skills',
      'Pushes back on both A and B for accepting the either/or framework in the first place'
    ],
    [
      '<strong>Misses / leaves out</strong>',
      'Ignores long-term career data, job satisfaction, and the humanities skills STEM employers actually want',
      'Does not address the real economic pressures students face or offer a practical funding solution',
      'Does not address how to implement integration given budget constraints and institutional inertia'
    ]
  ];

  const sourceMap = EditableTable(RUNG, 'source-map', mapHeaders, mapRows, mapModelData);

  const tensionWriting = WritingArea(RUNG, 'act1', 'tension', {
    placeholder: 'What is the biggest tension across these three sources? (2-3 sentences)',
    label: 'What\'s the biggest tension across these three sources? Don\'t just say "they disagree." Name the specific tension — what\'s really at stake in this debate?'
  });

  const tensionReveal = RevealPanel(
    'Reveal Model Response',
    '<p><strong>Model:</strong> The deepest tension is not whether STEM or humanities is "better" — it is whether education should be designed around <em>economic outcomes</em> (Torres), <em>democratic and intellectual values</em> (Whitfield), or <em>integrated problem-solving</em> (Anand). What\'s really at stake is whether we define the purpose of education by what the job market demands today or by what complex challenges will demand tomorrow.</p>',
    tensionWriting
  );

  container.appendChild(Activity(1, 'Source Dialogue',
    '<p>Below are three source excerpts on a debatable topic:</p><blockquote><strong>Should schools prioritize STEM education over the humanities?</strong></blockquote><p>Read all three carefully. Your job is to figure out how these sources <em>talk to each other</em> — where they agree, disagree, and complicate one another.</p>',
    sourceAPassage,
    sourceBPassage,
    sourceCPassage,
    SectionHeader('Your Task: Create a Source Conversation Map'),
    sourceMap,
    tensionWriting,
    tensionReveal
  ));

  // =====================
  // Activity 2 — Finding Your Perspective
  // =====================
  const thesis1 = WritingArea(RUNG, 'act2', 'thesis1', {
    placeholder: 'Thesis statement 1...',
    label: 'Thesis 1',
    minHeight: '60px'
  });
  const thesis2 = WritingArea(RUNG, 'act2', 'thesis2', {
    placeholder: 'Thesis statement 2 (take a different angle)...',
    label: 'Thesis 2',
    minHeight: '60px'
  });
  const thesis3 = WritingArea(RUNG, 'act2', 'thesis3', {
    placeholder: 'Thesis statement 3 (push yourself — a new angle)...',
    label: 'Thesis 3',
    minHeight: '60px'
  });

  const chooseStrongest = WritingArea(RUNG, 'act2', 'strongest', {
    placeholder: 'Which thesis is strongest and why? Does it go beyond simply agreeing with one source? Can you support it with evidence from at least two sources?',
    label: 'Choose the strongest thesis and explain why'
  });

  const perspectiveComparison = ComparisonView(
    'Summary / Source-Driven',
    '<p>"Source A argues STEM matters, and Source B argues humanities matter."</p><ul><li>Restates what sources say</li><li>Your voice disappears behind the sources</li><li>Reads like a report</li></ul>',
    'Student-Driven Perspective',
    '<p>"The real failure in education is not underfunding STEM or humanities — it is treating curriculum design as a zero-sum budget fight when the actual skill gap is interdisciplinary thinking."</p><ul><li>Uses sources to support what YOU say</li><li>Your voice is the engine; sources are the fuel</li><li>Reads like an argument</li></ul>'
  );

  container.appendChild(Activity(2, 'Finding Your Perspective',
    "<p>You've mapped how the sources talk to each other. Now: <strong>What do YOU think?</strong></p><h3>Step 1: Write Three Different Thesis Statements</h3><p>Using the same STEM vs. humanities sources, draft three possible thesis statements. Each one should take a <strong>different angle</strong> on the issue. Push yourself — don't write the same idea three ways.</p>",
    thesis1,
    thesis2,
    thesis3,
    SectionHeader('Step 2: Choose the Strongest One'),
    chooseStrongest,
    SectionHeader('What Makes a "Student-Driven" Perspective?'),
    perspectiveComparison
  ));

  // =====================
  // Activity 3 — Building the Argument Architecture
  // =====================
  const outlineHeaders = ['Section', 'Your Content'];
  const outlineRows = [
    ['<strong>THESIS</strong>', ''],
    ['<strong>CLAIM 1</strong>', ''],
    ['<strong>Evidence for Claim 1</strong> (Source ___, quote or paraphrase)', ''],
    ['<strong>Commentary for Claim 1</strong> (How does this evidence support YOUR claim?)', ''],
    ['<strong>CLAIM 2</strong>', ''],
    ['<strong>Evidence for Claim 2</strong> (Source ___, quote or paraphrase)', ''],
    ['<strong>Commentary for Claim 2</strong> (Connect this evidence to your thesis)', ''],
    ['<strong>CLAIM 3</strong> (optional: third reason or complication/qualification)', ''],
    ['<strong>Evidence for Claim 3</strong> (Source ___, quote or paraphrase)', ''],
    ['<strong>Commentary for Claim 3</strong> (Why does this matter?)', ''],
    ['<strong>COUNTERARGUMENT</strong> — What would someone who disagrees say?', ''],
    ['<strong>RESPONSE</strong> — Concede partially? Refute? Reframe?', '']
  ];
  const outlineModelData = [
    [
      '<strong>THESIS</strong>',
      'Schools should stop debating whether to prioritize STEM or humanities and instead redesign curricula around interdisciplinary problem-solving, because the challenges students will face after graduation do not respect disciplinary boundaries.'
    ],
    [
      '<strong>CLAIM 1</strong>',
      'The strongest workforce skills combine technical and humanistic abilities, which means neither discipline alone is sufficient.'
    ],
    [
      '<strong>Evidence</strong>',
      'Whitfield (Source B) notes that major tech companies list "communication skills" and "critical thinking" as top hiring priorities — skills that come from humanities training, not just technical coursework.'
    ],
    [
      '<strong>Commentary</strong>',
      'This is significant because it undermines Torres\'s economic argument from within the STEM sector itself. If STEM employers are asking for humanities skills, then prioritizing STEM at the expense of humanities actually weakens STEM graduates. The skills are interdependent, not competing.'
    ],
    [
      '<strong>CLAIM 2</strong>',
      'Real-world problems — the ones students will inherit — require thinking that crosses disciplinary lines.'
    ],
    [
      '<strong>Evidence</strong>',
      'Anand (Source C) argues that challenges like climate change and AI ethics "demand both technical expertise and humanistic reasoning" and gives the example of a climate scientist who cannot write persuasively failing to influence policy.'
    ],
    [
      '<strong>Commentary</strong>',
      'Anand\'s example reveals that the cost of disciplinary silos is not abstract — it shows up as policy failures, communication breakdowns, and missed opportunities. If schools train students in only one mode of thinking, those students will hit a ceiling the moment their work requires the other.'
    ],
    [
      '<strong>CLAIM 3</strong>',
      'The economic argument for STEM, while real, is too narrow to serve as the basis for educational priorities.'
    ],
    [
      '<strong>Evidence</strong>',
      'Torres (Source A) points to a 25% earnings advantage for STEM graduates in their first five years.'
    ],
    [
      '<strong>Commentary</strong>',
      'Torres\'s data is limited to early-career earnings and does not account for long-term career trajectories, job satisfaction, or the many STEM roles that stagnate without communication and leadership skills. Using short-term salary data to set long-term educational priorities is like choosing a career based entirely on the starting salary — it ignores everything that matters after year five.'
    ],
    [
      '<strong>COUNTERARGUMENT</strong>',
      'Opponents might argue that interdisciplinary curricula sound appealing in theory but are impractical: schools have limited budgets and time, and students need depth in at least one area.'
    ],
    [
      '<strong>RESPONSE</strong>',
      'This is a fair logistical concern, but it confuses integration with dilution. Interdisciplinary design does not mean teaching everything superficially — it means connecting existing courses so students practice applying skills across contexts. A history class that includes data analysis or a physics class that requires persuasive writing costs very little but changes how students think.'
    ]
  ];

  const outlineTable = EditableTable(RUNG, 'argument-outline', outlineHeaders, outlineRows, outlineModelData);

  container.appendChild(Activity(3, 'Building the Argument Architecture',
    "<p>You have a thesis. Now you need a structure that makes your argument <em>move</em> — claim by claim, with evidence doing real work at every step.</p><p>Use the framework below to plan your argument on the STEM vs. humanities topic.</p><p><strong>Requirements:</strong></p><ul><li>At least <strong>2 sources</strong> must appear as evidence</li><li>Every piece of evidence must have <strong>commentary</strong> (no drop-in quotes)</li><li>Include at least one <strong>counterargument acknowledgment</strong></li></ul>",
    outlineTable
  ));

  // =====================
  // Activity 4 — Commentary Upgrade
  // =====================

  // Three levels of commentary comparison
  const para1Html = '<blockquote>Schools should focus on STEM because it leads to better jobs. Torres writes that "students who graduate with degrees in science, technology, engineering, and mathematics earn an average of 25% more in their first five years of employment." This shows that STEM is more valuable. Whitfield disagrees and says humanities skills like communication are important too. Both authors make good points about education.</blockquote>';

  const para2Html = '<blockquote>One reason schools should integrate STEM and humanities is that the job market values both. Torres points out that STEM graduates earn 25% more in their first five years, which suggests a clear economic advantage. However, Whitfield counters that tech companies actually prioritize communication and critical thinking — humanities-rooted skills. This tension shows that the debate is not as simple as one side winning. Students may need training in both areas to succeed in modern careers.</blockquote>';

  const para3Html = '<blockquote>The economic case for STEM education, while compelling on the surface, actually reveals why interdisciplinary training is necessary. Torres cites a 25% earnings advantage for STEM graduates in their first five years — a statistic that measures starting salaries but says nothing about long-term career growth or the skills that drive promotion. Whitfield exposes the gap in this logic: if the very companies hiring STEM graduates rank communication and critical thinking as top priorities, then the earnings advantage Torres celebrates may have less to do with technical training and more to do with market demand that has not yet caught up with what employers actually need. In other words, STEM jobs pay well today, but the graduates who advance in those jobs will be the ones who can also write, reason ethically, and persuade — skills the humanities have always taught. This is not an argument against STEM; it is an argument against pretending STEM alone is enough.</blockquote>';

  const diagnosePara1 = WritingArea(RUNG, 'act4', 'diagnose1', {
    placeholder: 'What\'s wrong with Paragraph 1?',
    label: 'What\'s wrong here?',
    minHeight: '80px'
  });
  const diagnosePara1Reveal = RevealPanel(
    'Reveal Analysis',
    '<p><strong>Problems:</strong> The commentary is almost nonexistent. "This shows that STEM is more valuable" is a restatement, not analysis. The paragraph drops two sources side by side without connecting them. "Both authors make good points" is a content-free observation that could appear in any essay on any topic. The student\'s voice is invisible.</p>',
    diagnosePara1
  );

  const diagnosePara2 = WritingArea(RUNG, 'act4', 'diagnose2', {
    placeholder: 'What\'s working? What could still improve?',
    label: 'What\'s working? What could still improve?',
    minHeight: '80px'
  });
  const diagnosePara2Reveal = RevealPanel(
    'Reveal Analysis',
    '<p><strong>What works:</strong> The paragraph identifies a tension between sources and draws a reasonable conclusion ("Students may need training in both areas"). <strong>What could improve:</strong> The commentary stays at the surface — it names the tension but doesn\'t dig into <em>why</em> it matters or what it reveals. "Not as simple as one side winning" is true but vague. Stronger commentary would explain what the tension tells us about how we define educational value.</p>',
    diagnosePara2
  );

  const diagnosePara3 = WritingArea(RUNG, 'act4', 'diagnose3', {
    placeholder: 'What makes this commentary strong?',
    label: 'What makes this commentary strong?',
    minHeight: '80px'
  });
  const diagnosePara3Reveal = RevealPanel(
    'Reveal Analysis',
    '<p><strong>Strengths:</strong> The student\'s voice drives the paragraph — sources serve the argument, not the other way around. The commentary interrogates the evidence (questioning what the 25% statistic actually measures), connects two sources in a logical chain (Torres\'s data + Whitfield\'s hiring priorities = a gap in Torres\'s logic), and lands on a clear, thesis-driven conclusion. The final sentence is the student\'s own claim, not a source restatement.</p>',
    diagnosePara3
  );

  // Commentary checklist
  const commentaryChecklist = Checklist(RUNG, 'commentary-checklist', [
    { id: 'means', text: 'My commentary explains what the evidence <strong>means</strong>, not just what it <strong>says</strong>' },
    { id: 'thesis', text: 'I connect the evidence back to <strong>my thesis</strong>, not just to the source\'s argument' },
    { id: 'why', text: 'I explain <strong>why this evidence matters</strong> for my specific claim' },
    { id: 'relate', text: 'If I use two sources, I explain <strong>how they relate to each other</strong> (not just list them side by side)' },
    { id: 'voice', text: 'My voice is louder than the sources\' voices in this paragraph' }
  ]);

  // Write your own body paragraph
  const bodyParagraph = WritingArea(RUNG, 'act4', 'body-paragraph', {
    placeholder: 'Pick one claim from your outline (Activity 3) and write a full body paragraph with strong commentary. Use the checklist above as your guide. Aim for 6-10 sentences.',
    label: 'Write a full body paragraph with strong commentary (6-10 sentences)',
    minHeight: '200px'
  });

  container.appendChild(Activity(4, 'Commentary Upgrade',
    '<p>The difference between a mediocre EOCb response and a strong one almost always comes down to <strong>commentary</strong> — what you say AFTER you present evidence. Let\'s train your eye.</p><h3>Three Body Paragraphs, Three Levels</h3><p>Read each paragraph below. All three use the same evidence. The difference is in the commentary.</p>',
    SectionHeader('Paragraph 1 (Summary-Heavy)'),
    Passage(null, para1Html),
    diagnosePara1,
    diagnosePara1Reveal,
    SectionHeader('Paragraph 2 (Adequate Commentary)'),
    Passage(null, para2Html),
    diagnosePara2,
    diagnosePara2Reveal,
    SectionHeader('Paragraph 3 (Strong Commentary)'),
    Passage(null, para3Html),
    diagnosePara3,
    diagnosePara3Reveal,
    SectionHeader('The Commentary Checklist'),
    commentaryChecklist,
    SectionHeader('Now Write Yours'),
    bodyParagraph
  ));

  // =====================
  // Practice Prompt
  // =====================
  const practiceSourceA = Passage(
    'Source A — Dr. Hannah Corwin, "The Dose Makes the Poison," <em>Pediatrics Today</em> (2024)',
    'Large-scale studies consistently find that moderate screen time — roughly one to two hours per day — is associated with no measurable decline in adolescent mental health. In fact, teens who use social media moderately report higher levels of social connectedness than those who avoid it entirely. The problem arises at extremes: heavy users (four or more hours daily) show increased rates of anxiety and disrupted sleep, while teens with no digital access report feeling socially isolated. This suggests the conversation should shift from "screens are bad" to a more precise question about thresholds, content, and context. A blanket reduction in screen time may solve one problem while creating another.'
  );

  const practiceSourceB = Passage(
    'Source B — James Okafor, "Designed to Addict," <em>Wired</em> (2023)',
    'The moderate-use argument ignores how these platforms are built. Social media companies employ teams of behavioral psychologists whose explicit goal is to maximize time on app. Features like infinite scroll, push notifications, and algorithmic content feeds are not neutral tools — they are persuasion architectures designed to override a user\'s intention to stop. Telling teenagers to "use screens moderately" is like placing them in a casino and telling them to gamble responsibly. The real question is not how much time teens spend on screens but whether they ever had meaningful control over that time in the first place. Until platforms are regulated to remove addictive design patterns, personal responsibility frameworks will continue to fail.'
  );

  const practiceSourceC = Passage(
    'Source C — Dr. Amara Osei, "Missing the Middleman," <em>Journal of Adolescent Research</em> (2024)',
    'Both the pro-moderation and anti-screen camps overlook a critical variable: parental digital literacy. Studies show that adolescents whose parents actively discuss online content, model healthy usage patterns, and set collaborative (not imposed) boundaries report lower rates of screen-related anxiety regardless of total hours used. The most at-risk teens are not necessarily the heaviest users — they are the ones navigating digital spaces without adult guidance. Focusing the debate on screen time as a number distracts from the relational context in which screens are used. A teen spending three hours online with a parent who engages in conversation about what they\'re seeing is in a fundamentally different situation than a teen spending one hour online in complete isolation.'
  );

  const practiceWriting = WritingArea(RUNG, 'practice', 'full-response', {
    placeholder: 'Write your full EOCb response here (600-900 words). Present a clear, student-driven perspective using evidence from at least two sources with meaningful commentary.',
    label: 'Your full EOCb response',
    minHeight: '400px'
  });

  const practiceTimer = Timer(45);

  container.appendChild(SectionHeader('Practice Prompt'));
  container.appendChild(Passage(null,
    '<strong>New topic. New sources. Full EOCb response.</strong> Apply everything you\'ve practiced.'
  ));
  container.appendChild(SectionHeader('Source Set: Screen Time and Adolescent Well-Being'));
  container.appendChild(practiceSourceA);
  container.appendChild(practiceSourceB);
  container.appendChild(practiceSourceC);
  container.appendChild(SectionHeader('The Prompt'));
  container.appendChild(Passage(null,
    'The relationship between screen time and adolescent well-being is widely debated. Using the three sources provided, develop an argument that presents your own perspective on how schools, families, or policymakers should approach adolescent screen use. Your argument should:',
    '<ul><li>Present a clear, student-driven perspective (not just a summary of the sources)</li><li>Develop a logical line of reasoning</li><li>Use evidence from at least two of the provided sources with meaningful commentary</li></ul>',
    '<strong>Suggested length:</strong> 600–900 words'
  ));
  container.appendChild(practiceTimer);
  container.appendChild(practiceWriting);

  // =====================
  // Self-Assessment
  // =====================
  const selfAssessItems = [
    { id: 'perspective', text: '<strong>Perspective:</strong> If I removed every source reference from my response, would my thesis and main argument still make sense on their own?' },
    { id: 'reasoning', text: '<strong>Line of Reasoning:</strong> Can I trace a clear path from my thesis through each body paragraph to my conclusion? Does each paragraph build on the one before it?' },
    { id: 'evidence', text: '<strong>Evidence & Commentary:</strong> For each piece of evidence I used, did I explain what it MEANS for my argument, or did I just show that I read the source?' },
    { id: 'integration', text: '<strong>Integration:</strong> When I used more than one source, did I show how they RELATE to each other (tension, agreement, complication)?' },
    { id: 'overall', text: '<strong>Overall:</strong> If I were the reader instead of the writer, would this response convince me? Where would I push back, and have I already anticipated that pushback?' }
  ];
  const selfAssess = Checklist(RUNG, 'sa-checklist', selfAssessItems);

  const reflectionWriting = WritingArea(RUNG, 'self-assessment', 'reflection', {
    placeholder: 'Reflect briefly: which of the five areas above is your strongest, and which needs the most work? (2-4 sentences)',
    label: 'Self-assessment reflection'
  });

  container.appendChild(SectionHeader('Self-Assessment'));
  container.appendChild(Passage(null,
    'Before you turn in your practice response (or after you finish drafting), answer these questions honestly. They map directly to how the EOCb rubric evaluates your work.'
  ));
  container.appendChild(selfAssess);
  container.appendChild(reflectionWriting);

  // =====================
  // Bridge Out
  // =====================
  container.appendChild(Bridge('out', 'Summary',
    'This rung practiced building arguments from provided sources &mdash; reading critically, finding your own angle, and using evidence to support your claims.',
    '<strong>Rung 4</strong> removes the source packet. The argument essay draws on your own knowledge and experience &mdash; no excerpts to quote, just your ideas and your reasoning.'
  ));

  // =====================
  // Complete Rung Button
  // =====================
  container.appendChild(CompleteRungButton(RUNG, onComplete));

  // =====================
  // Load Saved Data
  // =====================
  if (saved['source-map']) sourceMap.loadData(saved['source-map']);
  if (saved.act1?.tension) tensionWriting.loadValue(saved.act1.tension);
  if (saved.act2?.thesis1) thesis1.loadValue(saved.act2.thesis1);
  if (saved.act2?.thesis2) thesis2.loadValue(saved.act2.thesis2);
  if (saved.act2?.thesis3) thesis3.loadValue(saved.act2.thesis3);
  if (saved.act2?.strongest) chooseStrongest.loadValue(saved.act2.strongest);
  if (saved['argument-outline']) outlineTable.loadData(saved['argument-outline']);
  if (saved.act4?.diagnose1) diagnosePara1.loadValue(saved.act4.diagnose1);
  if (saved.act4?.diagnose2) diagnosePara2.loadValue(saved.act4.diagnose2);
  if (saved.act4?.diagnose3) diagnosePara3.loadValue(saved.act4.diagnose3);
  if (saved['commentary-checklist']) commentaryChecklist.loadStates(saved['commentary-checklist']);
  if (saved.act4?.['body-paragraph']) bodyParagraph.loadValue(saved.act4['body-paragraph']);
  if (saved.practice?.['full-response']) practiceWriting.loadValue(saved.practice['full-response']);
  if (saved['sa-checklist']) selfAssess.loadStates(saved['sa-checklist']);
  if (saved['self-assessment']?.reflection) reflectionWriting.loadValue(saved['self-assessment'].reflection);
}
