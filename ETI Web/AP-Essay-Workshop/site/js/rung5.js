// ============================================
// Rung 5 — Lang Synthesis: The Summit (Capstone)
// ============================================
import {
  Passage, WritingArea, RevealPanel, RankingExercise,
  ComparisonView, EditableTable, Timer, Checklist,
  Activity, Bridge, SectionHeader, SplitPane,
  RungProgress, CompleteRungButton
} from './components.js';

const RUNG = 5;

// ---- Source texts for Activity 1 (Social Media Regulation) ----
const sourceA = {
  label: 'Source A — Public Health Data',
  text: 'A 2023 report from the National Institute of Mental Health found that adolescents who spend more than three hours daily on social media are twice as likely to report symptoms of anxiety and depression compared to those who spend less than one hour. Emergency room visits for self-harm among teens aged 13\u201317 rose 45% between 2015 and 2022, a period that closely tracks the mass adoption of image-based platforms. Researchers caution that correlation does not prove causation, but describe the parallel trends as \u201cdeeply concerning and worthy of policy attention.\u201d'
};

const sourceB = {
  label: 'Source B — Technology Industry Perspective',
  text: 'Maria Chen, Vice President of Policy at a major social media company, testified before Congress: \u201cOur platforms connect billions of people and provide vital spaces for community, creativity, and support \u2014 especially for marginalized youth who may lack safe offline spaces. Regulation that restricts access or mandates content changes risks silencing vulnerable voices. We believe the industry can self-regulate through improved parental controls, transparency reports, and voluntary mental health partnerships. Government intervention is a blunt instrument for a nuanced problem.\u201d'
};

const sourceC = {
  label: 'Source C — Personal Narrative',
  text: 'When I was fifteen, I deleted every social media app from my phone for six months. The first two weeks were miserable \u2014 I felt invisible, cut off from inside jokes and group plans. But by month three, something shifted. I slept better. I stopped comparing my body to strangers\u2019 photos. I read eleven books. When I came back online, I was choosier about what I followed and how long I scrolled. Nobody forced me off those apps. I chose to leave, and that choice mattered more than any rule could have. Not everyone needs a law to protect them \u2014 some of us just need a wake-up call.'
};

const sourceD = {
  label: 'Source D — Counterargument / Civil Liberties',
  text: 'The American Civil Liberties Union has raised concerns about social media regulation, arguing that government oversight of online platforms risks infringing on First Amendment rights. \u201cHistory shows that content regulation disproportionately silences dissenting, minority, and politically unpopular voices,\u201d the organization stated in a 2023 policy brief. The ACLU warns that well-intentioned mental health regulations could grant governments broad censorship powers, particularly if the definition of \u201charmful content\u201d is left vague or politically influenced.'
};

const sourceE = {
  label: 'Source E — Policy Proposal',
  text: 'The proposed Digital Wellness Act would require social media companies to disable algorithmic recommendation systems for users under 16, provide default screen-time notifications, and submit to independent annual audits of their platforms\u2019 effects on youth mental health. Sponsors describe the bill as a \u201cseatbelt, not a ban\u201d \u2014 a structural safeguard that preserves user freedom while reducing passive exposure to harmful content. Critics counter that age verification is technically unreliable and that the bill\u2019s audit requirements could burden smaller platforms disproportionately.'
};

const sourceF = {
  label: 'Source F — Historical Parallel',
  text: 'In the early twentieth century, public outcry over unsafe food and deceptive labeling led to the Pure Food and Drug Act of 1906 \u2014 landmark regulation that manufacturers initially called catastrophic for business. Critics warned that government meddling would stifle innovation and raise costs. Instead, the law created a baseline of safety that ultimately strengthened consumer trust and industry growth. Today, few argue that food should be entirely unregulated. The question is whether digital platforms \u2014 which shape the psychological diets of billions \u2014 deserve a similar framework of accountability.'
};

// ---- Source texts for Practice Prompt (Technology in K-12 Education) ----
const practiceSource1 = {
  label: 'Source 1 — Research Data',
  text: 'A five-year longitudinal study conducted across 200 U.S. school districts found that students in classrooms using adaptive learning software for math showed a 12% average improvement in standardized test scores compared to control groups using traditional instruction alone. However, the gains were concentrated among students in middle-performance bands; the highest- and lowest-performing students showed no statistically significant improvement. Researchers noted that the software was most effective when used alongside direct teacher instruction \u2014 not as a replacement for it. Districts that replaced teacher-led lessons with software-only modules saw flat or declining performance.'
};

const practiceSource2 = {
  label: 'Source 2 — Educator Perspective',
  text: 'Jamal Worthing, a high school English teacher with 22 years of experience, writes: \u201cI have watched three waves of \u2018revolutionary\u2019 education technology wash through my classroom. Each one promised transformation. What I have learned is this: technology is a spectacular delivery system, but it cannot teach a student to care about a poem, to listen to a classmate\u2019s grief during a discussion of memoir, or to find their own voice in an essay. The things that matter most in my classroom happen in the silence after a question, in the look on a student\u2019s face when they finally understand. No screen replicates that. Use the tools, yes. But never confuse the tool for the teaching.\u201d'
};

const practiceSource3 = {
  label: 'Source 3 — Student Experience',
  text: 'During the pandemic, I did online school for fourteen months. At first I liked it \u2014 I could wake up late, rewatch lectures, and work at my own pace. But by month six I realized I had not raised my hand in a live discussion once. I had not worked through a hard problem with a partner. My teachers were thumbnails on a screen. When I came back to in-person classes, I felt like I had forgotten how to be a student in a room with other people. Technology kept me connected to content. It completely disconnected me from the experience of learning.'
};

const practiceSource4 = {
  label: 'Source 4 — Equity and Access Argument',
  text: 'The Education Trust reports that in low-income school districts, one-to-one device programs have significantly narrowed the \u201chomework gap\u201d \u2014 the disparity between students who have home access to technology and those who do not. Before device distribution, 34% of students in surveyed districts reported being unable to complete online assignments at home. After distribution and broadband partnerships, that figure dropped to 8%. Advocates argue that technology is not a luxury in modern education but a baseline equity issue: without access, students in under-resourced communities fall further behind in digital literacy, college readiness, and workforce preparation.'
};

const practiceSource5 = {
  label: 'Source 5 — Neuroscience Caution',
  text: 'Cognitive scientist Dr. Priya Mehta argues that the rapid adoption of screens in classrooms overlooks critical evidence about how young brains learn. \u201cSustained attention, deep reading, and the ability to hold complex ideas in working memory are all skills that develop through practice \u2014 particularly through slow, focused engagement with print text and face-to-face dialogue,\u201d Mehta writes. Her research shows that students who primarily read on screens demonstrate lower comprehension of long-form texts and weaker retention after 48 hours compared to students who read the same material in print. She recommends a \u201cbalanced cognitive diet\u201d that limits screen-based instruction to no more than 40% of classroom time for students under age 14.'
};

const practiceSource6 = {
  label: 'Source 6 — International Policy Model',
  text: 'Estonia, frequently cited as a global leader in digital education, introduced a national coding curriculum for all students beginning in first grade in 2012. By 2023, Estonian students ranked first in Europe on the PISA assessment in reading, math, and science. However, analysts caution against attributing these results solely to technology. Estonia simultaneously invested in small class sizes, extensive teacher training, and a cultural emphasis on education as civic duty. The technology was embedded within a broader pedagogical ecosystem rather than deployed as a standalone solution. \u201cThe computer is not the teacher,\u201d said Estonia\u2019s former education minister. \u201cThe teacher is the teacher. The computer is a pencil that thinks.\u201d'
};

// ---- Model data for the Source Triage Chart ----
const triageModelData = [
  ['A \u2014 Public Health Data', 'Teens on social media 3+ hrs/day face 2x risk of anxiety/depression; ER self-harm visits up 45%.', 'Support \u2014 provides measurable evidence of harm that justifies regulation.', 'Yes \u2014 strongest empirical evidence for the pro-regulation side.'],
  ['B \u2014 Tech Industry', 'Platforms provide vital community; industry can self-regulate; government is a blunt instrument.', 'Challenge \u2014 argues regulation is unnecessary and potentially harmful.', 'Yes \u2014 useful as a counterargument to address and rebut.'],
  ['C \u2014 Personal Narrative', 'One teen benefited from voluntarily leaving social media; personal choice mattered more than rules.', 'Complicate \u2014 suggests individual agency works but also reveals how powerful the pull is.', 'Maybe \u2014 can support either side depending on framing.'],
  ['D \u2014 Civil Liberties', 'ACLU warns regulation risks censorship and disproportionately silences minority voices.', 'Challenge \u2014 raises serious First Amendment concerns.', 'Yes \u2014 essential for addressing the counterargument honestly.'],
  ['E \u2014 Policy Proposal', 'Digital Wellness Act targets algorithms, not content; a \u201cseatbelt, not a ban.\u201d', 'Support \u2014 shows that smart regulation is possible without censorship.', 'Yes \u2014 directly answers the \u201chow\u201d question.'],
  ['F \u2014 Historical Parallel', 'Food safety regulation was called catastrophic but ultimately strengthened trust and industry.', 'Support \u2014 provides historical precedent for regulation working.', 'Yes \u2014 powerful analogy that addresses \u201cslippery slope\u201d fears.']
];

export function render(container, savedData, ctx) {
  const { onComplete } = ctx;
  const saved = savedData?.activities || {};

  // ========================================
  // BRIDGE IN
  // ========================================
  const bridgeIn = Bridge('in', 'Rung 5 \u2014 Synthesis',
    'The synthesis essay combines everything from the previous rungs: critical reading, rhetorical awareness, source-based argumentation, and independent reasoning.',
    'The task: take a position on a complex issue, choose your strongest sources from a provided set, and weave them into a cohesive argument.'
  );
  container.appendChild(bridgeIn);

  // Rubric table
  const rubricHeader = SectionHeader('AP Lang Synthesis Rubric');
  container.appendChild(rubricHeader);
  const rubricTable = EditableTable(RUNG, 'rubric-reference',
    ['Category', 'Points', 'What It Means'],
    [
      ['<strong>Thesis</strong>', '0\u20131', 'A defensible position that directly responds to the prompt'],
      ['<strong>Evidence &amp; Commentary</strong>', '0\u20134', 'Use evidence from at least 3 sources, clearly attributed. Top scores require specific evidence <em>plus</em> commentary that consistently explains how evidence supports your line of reasoning'],
      ['<strong>Sophistication</strong>', '0\u20131', 'A nuanced argument that engages with complexity and avoids oversimplification'],
      ['<strong>Total</strong>', '<strong>6</strong>', '&nbsp;']
    ]
  );
  container.appendChild(rubricTable);

  container.appendChild(RungProgress(7, 0));

  // ========================================
  // Warm-Up — Synthesis Practice (55 min)
  // ========================================

  const warmUpTimer = Timer(55);

  const wuSource1 = {
    label: 'Source 1 \u2014 The Abbasid Golden Age',
    text: 'In Baghdad\u2019s fabled House of Wisdom, scholars of many faiths \u2014 Muslims, Christians, Jews, even ancient traditions like the Sabians \u2014 gathered to translate and expand upon the knowledge of the ancient world. Over two centuries, Greek philosophy, Indian mathematics, and Persian science were shifted into Arabic. The works of Aristotle, Euclid, and Galen found new life in Arabic commentaries, while original thinkers like al-Khwarizmi and Ibn Sina pushed the frontiers of knowledge. Muslim scholars made breakthroughs in mathematics, medicine, astronomy, and optics, with technology far ahead of Europe and in certain areas even ahead of China. \u2014 Julian D. Michels, Teleodynamic Sociology, Ch. 2: Dar al-Islam'
  };

  const wuSource2 = {
    label: 'Source 2 \u2014 The Pax Mongolica',
    text: 'Out of unprecedented slaughter emerged an era of unprecedented stability: the Pax Mongolica. Once the Mongols conquered a territory, the killing stopped, and business began. The Mongols understood a simple truth: dead peasants don\u2019t pay taxes, and frightened merchants don\u2019t move goods. By the mid-13th century, the Great Khans had imposed a terrifying law and order across the heart of Eurasia. The roads were patrolled. Bandits were hunted down. It was said that under Mongol rule, \u201Ca maiden bearing a nugget of gold on her head could wander safely throughout the realm.\u201D For the first time in human history, the route from Europe to China was not just open \u2014 it was secure. \u2014 Julian D. Michels, Teleodynamic Sociology, Ch. 5: The Northern Roads'
  };

  const wuSource3 = {
    label: 'Source 3 \u2014 The Ming Restoration',
    text: '\u201CThe land tax stays where it is. Reduce it where the harvest was poor. The people are the root of the country.\u201D The Hongwu Emperor leaned forward slightly. \u201CIf the root is damaged, the tree falls. Do you understand this?\u201D The word fell like a stone into still water. The entire court went even quieter. Hongwu had risen from the lowest of origins \u2014 a destitute peasant who had watched his family die of famine, survived by begging and joining a monastery. He understood hunger in a way that no scholar or courtier ever could. And he built the Ming Dynasty on that understanding: that a state which forgets its people destroys its own foundation. \u2014 Julian D. Michels, Teleodynamic Sociology, Ch. 6: The Southern Roads'
  };

  const wuPrompt = Passage(
    'The Prompt',
    '<strong>&ldquo;Stability requires violence.&rdquo;</strong> Evaluate this claim using the provided sources. You may support, challenge, or qualify it.'
  );

  const wuTriageChart = EditableTable(RUNG, 'warmup-triage',
    ['Source', 'Main Claim (1 sentence)', 'Relationship to My Position', 'Use It?'],
    [
      ['1 \u2014 Abbasid Golden Age', '', '', ''],
      ['2 \u2014 Pax Mongolica', '', '', ''],
      ['3 \u2014 Ming Restoration', '', '', '']
    ]
  );

  const wuPosition = WritingArea(RUNG, 'warmup', 'position', {
    label: 'What is your initial position on this prompt?',
    placeholder: 'One sentence \u2014 do you lean toward supporting, challenging, or qualifying the claim?',
    minHeight: '60px'
  });
  if (saved.warmup?.position) wuPosition.loadValue(saved.warmup.position);

  const wuThesis = WritingArea(RUNG, 'warmup', 'thesis', {
    placeholder: 'Write a synthesis thesis that takes a clear position and accounts for complexity. Reference at least two sources in your thinking...',
    minHeight: '100px',
    label: 'Your Thesis'
  });
  if (saved.warmup?.thesis) wuThesis.loadValue(saved.warmup.thesis);

  const wuOutline = WritingArea(RUNG, 'warmup', 'outline', {
    placeholder: 'Sketch the structure: Which sources support your thesis? Which complicate it? What order would your body paragraphs follow?',
    minHeight: '120px',
    label: 'Quick Outline \u2014 Paragraph Plan'
  });
  if (saved.warmup?.outline) wuOutline.loadValue(saved.warmup.outline);

  container.appendChild(Activity(
    null,
    'Warm-Up \u2014 Synthesis Practice',
    '<p>Three historical sources. One debatable claim. Practice the full synthesis skill set: triage your sources, take a position, draft a thesis, and sketch an argument plan.</p>',
    warmUpTimer,
    Passage(wuSource1.label, wuSource1.text),
    Passage(wuSource2.label, wuSource2.text),
    Passage(wuSource3.label, wuSource3.text),
    wuPrompt,
    SectionHeader('Step 1: Your Initial Position'),
    wuPosition,
    SectionHeader('Step 2: Source Triage'),
    wuTriageChart,
    SectionHeader('Step 3: Draft a Thesis'),
    wuThesis,
    SectionHeader('Step 4: Sketch Your Argument'),
    wuOutline
  ));

  // ========================================
  // ACTIVITY 1 — Strategic Source Triage
  // ========================================
  const act1Prompt = WritingArea(RUNG, 'act1', 'emerging-position', {
    label: 'What is your gut reaction to this prompt? Do you lean toward supporting regulation, opposing it, or something more nuanced? Write one sentence capturing your initial position.',
    placeholder: 'My emerging position...',
    minHeight: '60px'
  });

  const triageChart = EditableTable(RUNG, 'triage-chart',
    ['Source', 'Main Claim (1 sentence)', 'Relationship to My Position: Support / Challenge / Complicate?', 'Would I Use It? Why or Why Not?'],
    [
      ['A \u2014 Public Health Data', '', '', ''],
      ['B \u2014 Tech Industry', '', '', ''],
      ['C \u2014 Personal Narrative', '', '', ''],
      ['D \u2014 Civil Liberties', '', '', ''],
      ['E \u2014 Policy Proposal', '', '', ''],
      ['F \u2014 Historical Parallel', '', '', '']
    ],
    triageModelData
  );

  const postTriageQ1 = WritingArea(RUNG, 'act1', 'triage-sources-list', {
    label: '1. Which 3\u20134 sources made your "use" list?',
    placeholder: 'List the sources you plan to use...',
    minHeight: '60px'
  });
  const postTriageQ2 = WritingArea(RUNG, 'act1', 'triage-challenge-source', {
    label: '2. Did you include at least one source that challenges or complicates your position? (You should. Synthesis essays that only use agreeing sources rarely earn the Sophistication point.)',
    placeholder: 'Your answer...',
    minHeight: '60px'
  });
  const postTriageQ3 = WritingArea(RUNG, 'act1', 'triage-dismissed-source', {
    label: '3. Is there a source you initially dismissed but now see a use for \u2014 even as a counterargument to address and refute?',
    placeholder: 'Your answer...',
    minHeight: '60px'
  });

  const activity1 = Activity(1, 'Strategic Source Triage',
    '<p><strong>The Scenario:</strong> You have just been handed a synthesis prompt. Before you write a single word of your essay, you need to <em>read strategically</em>. Not every source will make it into your essay. Your job is to triage: read fast, think critically, and decide which sources earn a spot in your argument.</p><p><strong>The Prompt: Should governments regulate social media platforms to protect public mental health?</strong></p><p>Read the six sources below. Then complete the Source Triage Chart that follows.</p>',
    Passage(sourceA.label, sourceA.text),
    Passage(sourceB.label, sourceB.text),
    Passage(sourceC.label, sourceC.text),
    Passage(sourceD.label, sourceD.text),
    Passage(sourceE.label, sourceE.text),
    Passage(sourceF.label, sourceF.text),
    SectionHeader('Source Triage Chart'),
    act1Prompt,
    triageChart,
    SectionHeader('After You Triage'),
    postTriageQ1,
    postTriageQ2,
    postTriageQ3,
    RevealPanel('Reveal Key Insight', '<p><strong>Key Insight:</strong> Strong synthesis writers do not just grab sources that agree with them. They select sources <em>strategically</em> \u2014 choosing evidence that supports, evidence that lets them show nuance by addressing the other side, and evidence that adds a different dimension to the conversation.</p>')
  );
  container.appendChild(activity1);
  container.appendChild(RungProgress(7, 1));

  // ========================================
  // ACTIVITY 2 — Integration Techniques Workshop
  // ========================================
  const badIntegrationPassage = Passage('Paragraph with Integration Errors',
    'Social media is bad for teens. "Adolescents who spend more than three hours daily on social media are twice as likely to report symptoms of anxiety and depression compared to those who spend less than one hour." Also the Digital Wellness Act would require social media companies to disable algorithmic recommendation systems for users under 16, provide default screen-time notifications, and submit to independent annual audits of their platforms\u2019 effects on youth mental health. So clearly the government should regulate social media.'
  );

  const problemsWriting = WritingArea(RUNG, 'act2', 'find-problems', {
    label: 'What is wrong here? Find at least three problems:',
    placeholder: '1. ...\n2. ...\n3. ...',
    minHeight: '120px'
  });

  const rewriteWriting = WritingArea(RUNG, 'act2', 'rewrite-paragraph', {
    label: 'Now rewrite the paragraph so that it has a clear topic sentence driven by your own claim, integrates evidence smoothly with attribution, and includes commentary explaining how the evidence supports the claim.',
    placeholder: 'Write your improved paragraph here...',
    minHeight: '180px'
  });

  const rewriteReveal = RevealPanel('Reveal Model Rewrite', `
    <p><strong>Model Rewrite:</strong></p>
    <blockquote>The scale of social media's impact on adolescent mental health has moved beyond individual concern into the realm of public health crisis. According to a 2023 National Institute of Mental Health report, teenagers who spend more than three hours daily on social media are twice as likely to experience symptoms of anxiety and depression (Source A). This data is alarming not because any single teen is at risk, but because the trend implicates an entire generation — and the platforms' own design, built to maximize engagement, makes moderation a structural problem rather than a matter of personal willpower. Recognizing this, the proposed Digital Wellness Act takes a targeted approach: rather than restricting content, it would disable algorithmic recommendation systems for users under 16 and require independent audits of platform effects on youth mental health (Source E). This distinction matters. It addresses the mechanism of harm without infringing on free expression, offering what its sponsors call "a seatbelt, not a ban."</blockquote>
  `, rewriteWriting);

  const integrationChecklist = Checklist(RUNG, 'integration-errors', [
    { id: 'dropped-quote', text: '<strong>Dropped quote</strong> \u2014 a quotation appears with no introduction or attribution' },
    { id: 'no-source-tag', text: '<strong>No source tag</strong> \u2014 the reader cannot tell where the evidence came from' },
    { id: 'source-takeover', text: '<strong>Source takeover</strong> \u2014 the source\u2019s words fill most of the paragraph and the student\u2019s voice disappears' },
    { id: 'quote-and-run', text: '<strong>Quote-and-run</strong> \u2014 evidence appears but is never explained or connected to the argument' },
    { id: 'patchwork', text: '<strong>Patchwork plagiarism</strong> \u2014 the \u201cparaphrase\u201d follows the original sentence structure too closely with a few swapped words' }
  ]);

  const activity2 = Activity(2, 'Integration Techniques Workshop',
    '<p>You know you need to use sources. But <em>how</em> you bring a source into your writing matters enormously. A source dropped into a paragraph without context or connection is like a brick thrown through a window \u2014 it arrives, but it does damage instead of building something.</p><p>There are three ways to integrate sources: <strong>direct quotation</strong>, <strong>paraphrase</strong>, and <strong>summary</strong>. Each has a purpose.</p>',

    SectionHeader('The Three Techniques'),

    Passage('Direct Quotation \u2014 Use the source\u2019s exact words, in quotation marks.',
      'According to the ACLU, \u201ccontent regulation disproportionately silences dissenting, minority, and politically unpopular voices\u201d (Source D).',
      '<em>Use when:</em> The original wording is powerful, precise, or memorable. When the exact language matters \u2014 legal phrasing, a striking metaphor, a key statistic stated in a specific way.'
    ),

    Passage('Paraphrase \u2014 Restate the source\u2019s idea in your own words, at roughly the same level of detail.',
      'The ACLU cautions that regulating what appears on social media could give governments the power to suppress viewpoints that are unpopular or politically inconvenient (Source D).',
      '<em>Use when:</em> The idea matters more than the exact wording. When you want to maintain your own voice and flow. When the original phrasing is technical or awkward.'
    ),

    Passage('Summary \u2014 Condense the source\u2019s broader argument into a shorter version.',
      'Civil liberties advocates warn that social media regulation, however well-intentioned, risks becoming a tool for censorship (Source D).',
      '<em>Use when:</em> You need the big picture, not the details. When a source\u2019s overall position matters for your argument but you do not need to dwell on specifics.'
    ),

    Passage('Quick-Reference Decision Guide',
      '<strong>Are the exact words essential?</strong> \u2192 Quote.<br><strong>Is the idea important but the wording is not special?</strong> \u2192 Paraphrase.<br><strong>Do I just need the gist to set up my own point?</strong> \u2192 Summarize.',
      '<strong>Rule of thumb:</strong> Paraphrase is your default. Quote only when the language itself does real work. Summarize when you need to move quickly.'
    ),

    SectionHeader('Fix the Bad Integration'),
    badIntegrationPassage,
    problemsWriting,
    rewriteWriting,
    rewriteReveal,

    SectionHeader('Common Errors Checklist'),
    integrationChecklist
  );
  container.appendChild(activity2);
  container.appendChild(RungProgress(7, 2));

  // ========================================
  // ACTIVITY 3 — The Synthesis Paragraph
  // ========================================
  const sourceReportHtml = `<blockquote>Source A says that teens who spend more than three hours on social media are twice as likely to experience anxiety and depression. Source E describes the Digital Wellness Act, which would turn off algorithms for kids under 16. Source F talks about how food regulation in 1906 helped consumers and did not destroy the industry.</blockquote>
  <p><strong>What is wrong with this?</strong> The student has vanished. There is no claim, no argument, no reasoning \u2014 just a list of what sources say. The sources are driving. The student is just along for the ride.</p>`;

  const synthesisParaHtml = `<blockquote>Government regulation of social media is justified when platforms cause measurable harm that individuals cannot reasonably avoid on their own. National health data reveals that teens spending more than three hours daily on social media face double the risk of anxiety and depression symptoms, a trend that has worsened alongside platform growth (Source A). This is not a matter of personal willpower \u2014 algorithmic systems are specifically designed to maximize engagement, making \u201cjust log off\u201d an inadequate response to a structural problem. The Digital Wellness Act recognizes this by targeting the algorithms themselves rather than restricting user access, functioning as what its sponsors call \u201ca seatbelt, not a ban\u201d (Source E). History supports this approach: early twentieth-century food safety regulation faced identical accusations of government overreach, yet ultimately strengthened both public health and industry credibility (Source F). When the harm is systemic, the response must be structural.</blockquote>
  <p><strong>What makes the strong version work?</strong></p>
  <ul>
    <li>The student\u2019s claim opens and closes the paragraph</li>
    <li>Each source is <em>introduced by</em> the student\u2019s reasoning, not the other way around</li>
    <li>Commentary after each piece of evidence explains <em>why</em> it matters to the argument</li>
    <li>Multiple sources are woven together to build a single, unified point</li>
  </ul>`;

  const subClaimWriting = WritingArea(RUNG, 'act3', 'sub-claim', {
    label: 'My sub-claim for this paragraph:',
    placeholder: 'What specific point will this paragraph argue?',
    minHeight: '60px'
  });
  const sourcePlan1 = WritingArea(RUNG, 'act3', 'source-plan-1', {
    label: 'Source I will use first and how (quote / paraphrase / summary):',
    placeholder: 'Source ___ — I will [quote/paraphrase/summarize] because...',
    minHeight: '60px'
  });
  const sourcePlan2 = WritingArea(RUNG, 'act3', 'source-plan-2', {
    label: 'Source I will use second and how (quote / paraphrase / summary):',
    placeholder: 'Source ___ — I will [quote/paraphrase/summarize] because...',
    minHeight: '60px'
  });
  const commentaryPlan = WritingArea(RUNG, 'act3', 'commentary-plan', {
    label: 'My commentary will explain:',
    placeholder: 'What connection will you draw between the evidence and your claim?',
    minHeight: '60px'
  });

  const synthesisParagraph = WritingArea(RUNG, 'act3', 'synthesis-paragraph', {
    label: 'Write your synthesis paragraph here (use two sources from Activity 1):',
    placeholder: 'Write one synthesis paragraph that argues a specific sub-claim supporting your overall position...',
    minHeight: '220px'
  });

  const selfCheckTable = EditableTable(RUNG, 'paragraph-self-check',
    ['Question', 'Yes / No'],
    [
      ['Does your own claim appear in the first or second sentence?', ''],
      ['Could a reader identify your argument even if the source evidence disappeared?', ''],
      ['Is every source clearly attributed (by name, letter, or description)?', ''],
      ['Does at least one sentence of commentary follow each piece of evidence?', ''],
      ['Does the paragraph end with YOUR reasoning, not a source\u2019s words?', '']
    ]
  );

  const activity3 = Activity(3, 'The Synthesis Paragraph',
    '<p>This is the single most important skill in the synthesis essay. Everything else \u2014 your thesis, your outline, your source selection \u2014 leads to this: <strong>can you write a paragraph where YOUR argument drives the bus and sources ride as passengers?</strong></p>',

    SectionHeader('Source Report vs. Synthesis: See the Difference'),
    ComparisonView(
      'Source Report Paragraph (WEAK)',
      sourceReportHtml,
      'Synthesis Paragraph (STRONG)',
      synthesisParaHtml
    ),

    SectionHeader('Now You Try'),
    subClaimWriting,
    sourcePlan1,
    sourcePlan2,
    commentaryPlan,
    synthesisParagraph,

    SectionHeader('Paragraph Self-Check'),
    selfCheckTable
  );
  container.appendChild(activity3);
  container.appendChild(RungProgress(7, 3));

  // ========================================
  // ACTIVITY 4 — Full Outline With Sources Mapped
  // ========================================
  const thesisWriting = WritingArea(RUNG, 'act4', 'thesis', {
    label: 'THESIS: Write a defensible position that responds to the prompt (1\u20132 sentences).',
    placeholder: 'Your thesis statement...',
    minHeight: '80px'
  });

  const outlineTable = EditableTable(RUNG, 'essay-outline',
    ['Section', 'Detail'],
    [
      ['<strong>Body 1 \u2014 Strongest Supporting Argument</strong>', ''],
      ['Body 1: Sub-claim', ''],
      ['Body 1: Source + Integration method', ''],
      ['Body 1: Second source + Integration method', ''],
      ['Body 1: Commentary focus', ''],
      ['Body 1: Connection to thesis', ''],
      ['<strong>Body 2 \u2014 Second Supporting Argument (Different Angle)</strong>', ''],
      ['Body 2: Sub-claim', ''],
      ['Body 2: Source + Integration method', ''],
      ['Body 2: Commentary focus', ''],
      ['Body 2: Connection to thesis', ''],
      ['<strong>Body 3 \u2014 Counterargument and Rebuttal</strong>', ''],
      ['Body 3: Counterargument you will address', ''],
      ['Body 3: Source for counterargument + Integration method', ''],
      ['Body 3: Your rebuttal', ''],
      ['Body 3: Source for rebuttal (optional) + Integration method', ''],
      ['Body 3: Connection to thesis', ''],
      ['<strong>Conclusion</strong>', ''],
      ['Restate position (new language)', ''],
      ['Broader significance or call to action', '']
    ]
  );

  const modelOutlineHtml = `
    <p><strong>THESIS:</strong> While social media regulation raises legitimate concerns about free expression, the scale of documented harm to adolescent mental health demands structural safeguards that go beyond voluntary industry measures.</p>
    <hr>
    <p><strong>BODY 1 \u2014 The harm is real and measurable</strong></p>
    <ul>
      <li><strong>Sub-claim:</strong> Data shows a clear and worsening link between heavy social media use and adolescent mental health decline.</li>
      <li><strong>Source A</strong> (paraphrase): teens 2x more likely to report anxiety/depression; ER visits for self-harm up 45%</li>
      <li><strong>Source C</strong> (summary): even a teen who personally benefited from quitting acknowledges the pull of these platforms</li>
      <li><strong>Commentary:</strong> The scale of the trend \u2014 millions of adolescents, a decade of worsening outcomes \u2014 moves this beyond individual choice into public health territory.</li>
      <li><strong>Connection to thesis:</strong> Structural problems require structural solutions.</li>
    </ul>
    <p><strong>BODY 2 \u2014 Smart regulation is possible without censorship</strong></p>
    <ul>
      <li><strong>Sub-claim:</strong> Well-designed policy can target platform mechanics without restricting speech.</li>
      <li><strong>Source E</strong> (quote): \u201ca seatbelt, not a ban\u201d \u2014 targets algorithms, not content</li>
      <li><strong>Commentary:</strong> Disabling recommendation algorithms for minors does not remove any content; it simply stops the machine from force-feeding it. This distinction answers the censorship objection directly.</li>
      <li><strong>Connection to thesis:</strong> This proves structural safeguards can coexist with free expression.</li>
    </ul>
    <p><strong>BODY 3 \u2014 Counterargument and rebuttal</strong></p>
    <ul>
      <li><strong>Counterargument:</strong> Regulation could become a censorship tool.</li>
      <li><strong>Source D</strong> (paraphrase): ACLU warns that vague definitions of \u201charmful content\u201d risk political abuse</li>
      <li><strong>Rebuttal:</strong> This concern is valid but addressable \u2014 the Digital Wellness Act targets platform design, not content. Historical precedent shows regulation can be precise.</li>
      <li><strong>Source F</strong> (summary): Food safety regulation faced identical objections and ultimately strengthened both safety and industry.</li>
      <li><strong>Connection to thesis:</strong> Acknowledging the risk while showing it can be managed reinforces the argument for thoughtful regulation.</li>
    </ul>
    <p><strong>CONCLUSION:</strong> The question is not whether to act but how to act wisely. The evidence, the precedents, and the available policy tools all point toward regulation that protects without silencing.</p>
  `;

  const activity4 = Activity(4, 'Full Outline With Sources Mapped',
    '<p>You have triaged your sources, practiced integration, and written a synthesis paragraph. Now zoom out and plan the whole essay. A strong synthesis essay is not written paragraph by paragraph \u2014 it is <em>architected</em> so that each section does specific work and the sources land where they will have the most impact.</p><p>Fill in the outline below using the social media regulation prompt and sources from Activity 1.</p>',
    thesisWriting,
    outlineTable,
    RevealPanel('Reveal Model Completed Outline', modelOutlineHtml, thesisWriting)
  );
  container.appendChild(activity4);
  container.appendChild(RungProgress(7, 4));

  // ========================================
  // PRACTICE PROMPT — Full Synthesis Essay
  // ========================================
  const practiceTriageChart = EditableTable(RUNG, 'practice-triage',
    ['Source', 'Main Claim', 'Support / Challenge / Complicate?', 'Use It?'],
    [
      ['1 \u2014 Research Data', '', '', ''],
      ['2 \u2014 Educator', '', '', ''],
      ['3 \u2014 Student Experience', '', '', ''],
      ['4 \u2014 Equity & Access', '', '', ''],
      ['5 \u2014 Neuroscience', '', '', ''],
      ['6 \u2014 International Model', '', '', '']
    ]
  );

  const practiceOutline = WritingArea(RUNG, 'practice', 'outline', {
    label: 'Outline your essay before drafting. Use the template from Activity 4.',
    placeholder: 'THESIS:\n\nBODY 1 — Sub-claim:\n  Source:\n  Commentary:\n\nBODY 2 — Sub-claim:\n  Source:\n  Commentary:\n\nBODY 3 — Counterargument & Rebuttal:\n  Source:\n  Rebuttal:\n\nCONCLUSION:',
    minHeight: '250px'
  });

  const practiceEssay = WritingArea(RUNG, 'practice', 'full-essay', {
    label: 'Write your full synthesis essay (5\u20136 paragraphs). You have 40 minutes.',
    placeholder: 'Write your complete synthesis essay here...',
    minHeight: '500px'
  });

  const practiceSection = Activity('', 'Practice Prompt \u2014 Full Synthesis Essay',
    '<p><strong>You are ready.</strong> Below is a complete AP-style synthesis prompt with a new topic and six new sources. This is your chance to put every skill together \u2014 source triage, integration, synthesis paragraphing, outlining, and full essay writing.</p>',

    SectionHeader('Prompt'),
    Passage('What is the proper role of technology in K\u201312 education?',
      'The increasing presence of digital tools \u2014 laptops, tablets, educational software, artificial intelligence tutors \u2014 in K\u201312 classrooms has sparked debate about what technology should and should not do in schools. Some see technology as a transformative force for personalized learning, while others warn it is displacing essential human elements of education.',
      'Read the following six sources carefully. Then write an essay that synthesizes material from at least three of the sources and develops your position on the proper role of technology in K\u201312 education.',
      'In your response you should do the following:<br>\u2022 Respond to the prompt with a thesis that presents a defensible position.<br>\u2022 Select and use evidence from at least three of the provided sources to support your line of reasoning. Indicate clearly which sources you are referring to.<br>\u2022 Explain how the evidence supports your line of reasoning.<br>\u2022 Use appropriate grammar and punctuation in communicating your argument.'
    ),

    Passage(practiceSource1.label, practiceSource1.text),
    Passage(practiceSource2.label, practiceSource2.text),
    Passage(practiceSource3.label, practiceSource3.text),
    Passage(practiceSource4.label, practiceSource4.text),
    Passage(practiceSource5.label, practiceSource5.text),
    Passage(practiceSource6.label, practiceSource6.text),

    SectionHeader('Source Triage'),
    practiceTriageChart,

    SectionHeader('Outline'),
    practiceOutline,

    SectionHeader('Write Your Essay'),
    Timer(40),
    practiceEssay
  );
  container.appendChild(practiceSection);
  container.appendChild(RungProgress(7, 5));

  // ========================================
  // SELF-ASSESSMENT — Rubric-Aligned Reflection
  // ========================================
  const saThesis = WritingArea(RUNG, 'self-assess', 'thesis-copy', {
    label: '1. Copy your thesis statement here. Does it present a clear, defensible position that directly responds to the prompt \u2014 not just a fact, not just a topic, but an arguable claim? Would a reasonable person be able to disagree with your thesis?',
    placeholder: 'Paste your thesis and reflect...',
    minHeight: '100px'
  });

  const saSourcesTable = EditableTable(RUNG, 'sa-sources-used',
    ['Source', 'How I Used It', 'Quote / Paraphrase / Summary'],
    [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  );

  const saStrongest = WritingArea(RUNG, 'self-assess', 'strongest-commentary', {
    label: '3. Find your strongest moment of commentary \u2014 the place where you best explained how a piece of evidence supports your reasoning. Copy it here. What makes it effective?',
    placeholder: 'Paste your strongest commentary and explain...',
    minHeight: '120px'
  });

  const saWeakest = WritingArea(RUNG, 'self-assess', 'weakest-evidence', {
    label: '4. Find your weakest moment of evidence use \u2014 a place where you dropped in a source without enough explanation, or where the connection to your argument is unclear. Copy it here. How would you fix it?',
    placeholder: 'Paste your weakest moment and explain how you would revise...',
    minHeight: '120px'
  });

  const saComplexity = WritingArea(RUNG, 'self-assess', 'complexity', {
    label: '5. Did you engage with complexity? Specifically: Did you address a counterargument or concession? Did you acknowledge that the issue is more complicated than a simple yes/no? Point to the specific sentences where you did this.',
    placeholder: 'Describe how you engaged with complexity...',
    minHeight: '120px'
  });

  const saObjection = WritingArea(RUNG, 'self-assess', 'strongest-objection', {
    label: '6. Read your essay as if you disagree with it. What is the strongest objection someone could raise against your argument? Did your essay anticipate and address it, or did it leave that hole open?',
    placeholder: 'Identify the strongest objection to your argument...',
    minHeight: '120px'
  });

  const selfAssessSection = Activity('', 'Self-Assessment \u2014 Rubric-Aligned Reflection',
    '<p>After you finish your practice essay, answer each question honestly. Be specific \u2014 vague self-assessment does not help you improve.</p>',

    SectionHeader('Thesis (0\u20131 point)'),
    saThesis,

    SectionHeader('Evidence and Commentary (0\u20134 points)'),
    Passage(null, '2. List every source you used and how you used it. For each, note whether you quoted, paraphrased, or summarized. Did you use at least three sources?'),
    saSourcesTable,
    saStrongest,
    saWeakest,

    SectionHeader('Sophistication (0\u20131 point)'),
    saComplexity,
    saObjection
  );
  container.appendChild(selfAssessSection);
  container.appendChild(RungProgress(7, 6));

  // ========================================
  // BRIDGE OUT — Capstone Reflection
  // ========================================
  const reflGrowth = WritingArea(RUNG, 'reflection', 'growth', {
    label: '1. The Growth Question \u2014 Look back at Rung 1, where you first learned to analyze sources and evaluate evidence. What can you do now that you could not do then? Be specific \u2014 name the skill, describe the difference, and point to a moment in today\u2019s work where you used it.',
    placeholder: 'Reflect on your growth from Rung 1 to now...',
    minHeight: '150px'
  });

  const reflDifficulty = WritingArea(RUNG, 'reflection', 'difficulty', {
    label: '2. The Difficulty Question \u2014 Which skill across the entire ladder was hardest for you to build? Why? Is it something you now feel confident in, or is it still an area where you need more practice?',
    placeholder: 'Reflect on your greatest challenge...',
    minHeight: '150px'
  });

  const reflTurningPoint = WritingArea(RUNG, 'reflection', 'turning-point', {
    label: '3. The Turning Point Question \u2014 Was there a specific rung, activity, or moment that felt like a breakthrough \u2014 where something clicked and your writing or thinking shifted? Describe that moment.',
    placeholder: 'Describe your breakthrough moment...',
    minHeight: '150px'
  });

  const reflSynthesis = WritingArea(RUNG, 'reflection', 'synthesis-beyond', {
    label: '4. The Synthesis Question \u2014 Synthesis requires holding multiple perspectives simultaneously and building something new from them. Where outside of this class does that skill matter?',
    placeholder: 'Reflect on how synthesis skills apply beyond the classroom...',
    minHeight: '150px'
  });

  const bridgeOut = Bridge('out', 'Capstone Reflection',
    'Source analysis, rhetorical awareness, evidence-based argumentation, independent reasoning, synthesis &mdash; these are not exam skills. They are the skills of someone who can engage with complex problems, weigh competing evidence, and articulate a position that holds up under scrutiny.'
  );
  container.appendChild(bridgeOut);

  const reflectionSection = Activity('', 'Reflective Prompts',
    '<p>Write a thoughtful response to each of these.</p>',
    reflGrowth,
    reflDifficulty,
    reflTurningPoint,
    reflSynthesis,
    Passage(null, '')
  );
  container.appendChild(reflectionSection);
  container.appendChild(RungProgress(7, 7));

  // ========================================
  // COMPLETE RUNG BUTTON
  // ========================================
  container.appendChild(CompleteRungButton(RUNG, onComplete));

  // ========================================
  // LOAD SAVED DATA
  // ========================================
  // Activity 1 writing areas
  if (saved.act1?.['emerging-position']) act1Prompt.loadValue(saved.act1['emerging-position']);
  if (saved.act1?.['triage-sources-list']) postTriageQ1.loadValue(saved.act1['triage-sources-list']);
  if (saved.act1?.['triage-challenge-source']) postTriageQ2.loadValue(saved.act1['triage-challenge-source']);
  if (saved.act1?.['triage-dismissed-source']) postTriageQ3.loadValue(saved.act1['triage-dismissed-source']);

  // Activity 2 writing areas
  if (saved.act2?.['find-problems']) problemsWriting.loadValue(saved.act2['find-problems']);
  if (saved.act2?.['rewrite-paragraph']) rewriteWriting.loadValue(saved.act2['rewrite-paragraph']);

  // Activity 3 writing areas
  if (saved.act3?.['sub-claim']) subClaimWriting.loadValue(saved.act3['sub-claim']);
  if (saved.act3?.['source-plan-1']) sourcePlan1.loadValue(saved.act3['source-plan-1']);
  if (saved.act3?.['source-plan-2']) sourcePlan2.loadValue(saved.act3['source-plan-2']);
  if (saved.act3?.['commentary-plan']) commentaryPlan.loadValue(saved.act3['commentary-plan']);
  if (saved.act3?.['synthesis-paragraph']) synthesisParagraph.loadValue(saved.act3['synthesis-paragraph']);

  // Activity 4 writing areas
  if (saved.act4?.thesis) thesisWriting.loadValue(saved.act4.thesis);

  // Practice prompt writing areas
  if (saved.practice?.outline) practiceOutline.loadValue(saved.practice.outline);
  if (saved.practice?.['full-essay']) practiceEssay.loadValue(saved.practice['full-essay']);

  // Self-assessment writing areas
  if (saved['self-assess']?.['thesis-copy']) saThesis.loadValue(saved['self-assess']['thesis-copy']);
  if (saved['self-assess']?.['strongest-commentary']) saStrongest.loadValue(saved['self-assess']['strongest-commentary']);
  if (saved['self-assess']?.['weakest-evidence']) saWeakest.loadValue(saved['self-assess']['weakest-evidence']);
  if (saved['self-assess']?.complexity) saComplexity.loadValue(saved['self-assess'].complexity);
  if (saved['self-assess']?.['strongest-objection']) saObjection.loadValue(saved['self-assess']['strongest-objection']);

  // Reflection writing areas
  if (saved.reflection?.growth) reflGrowth.loadValue(saved.reflection.growth);
  if (saved.reflection?.difficulty) reflDifficulty.loadValue(saved.reflection.difficulty);
  if (saved.reflection?.['turning-point']) reflTurningPoint.loadValue(saved.reflection['turning-point']);
  if (saved.reflection?.['synthesis-beyond']) reflSynthesis.loadValue(saved.reflection['synthesis-beyond']);

  // Tables
  if (saved['warmup-triage']) wuTriageChart.loadData(saved['warmup-triage']);
  if (saved['triage-chart']) triageChart.loadData(saved['triage-chart']);
  if (saved['paragraph-self-check']) selfCheckTable.loadData(saved['paragraph-self-check']);
  if (saved['essay-outline']) outlineTable.loadData(saved['essay-outline']);
  if (saved['practice-triage']) practiceTriageChart.loadData(saved['practice-triage']);
  if (saved['sa-sources-used']) saSourcesTable.loadData(saved['sa-sources-used']);

  // Checklists
  if (saved['integration-errors']) integrationChecklist.loadStates(saved['integration-errors']);
}
