// ============================================
// Rung 1 — Guided Source Analysis (EOCa)
// ============================================
import {
  Passage, WritingArea, RevealPanel, ComparisonView, EditableTable,
  Timer, Checklist, Activity, Bridge, SectionHeader, CompleteRungButton
} from './components.js';

export function render(container, savedData, ctx) {
  const saved = savedData?.activities || {};

  // ---- Bridge In ----
  container.appendChild(Bridge('in', 'Rung 1 — Source Analysis',
    'Three questions sit at the center of analytical writing:',
    '<strong>1.</strong> <strong>What</strong> is the author arguing?<br><strong>2.</strong> <strong>How</strong> do they build that argument &mdash; what is their reasoning?<br><strong>3.</strong> <strong>Does their evidence actually work?</strong>',
    'These are the backbone of the AP Seminar EOCa. They are also the foundation of every analytical essay. You cannot respond to an argument you haven\'t understood. You cannot critique reasoning you haven\'t mapped. You cannot build your own case if you can\'t tell strong evidence from weak evidence.',
    'This rung works each skill separately, then combines them on a new passage under timed conditions.'
  ));

  // ================================================================
  // Activity 1 — Argument Hunting
  // ================================================================
  {
    const skillExplanation = Passage(null,
      'An author\'s argument (or thesis) is the central claim the entire text is built to support. It is not the topic. It is not a fact. It is the author\'s <em>position</em> &mdash; the thing they want you to believe or consider by the end of the piece.',
      '<strong>Quick test:</strong> If someone asked "So what\'s the point?" after reading the text, the answer is the argument.'
    );

    const warmUpTimer = Timer(35);

    // --- Practice Round 1 ---
    const round1Header = SectionHeader('Practice Round 1 \u2014 Warm-Up (Easy)');
    const round1Directions = Passage(null,
      'Read the following short passage, then write the author\'s argument in one sentence.'
    );
    const round1Passage = Passage(null,
      'Travel is often sold as a luxury, but it may be closer to a necessity. Studies in psychology consistently show that exposure to unfamiliar environments increases cognitive flexibility, reduces implicit bias, and improves problem-solving skills. A two-week trip abroad does more for a student\'s intellectual development than a month of textbook study on the same region. Schools that cut travel programs in the name of budget savings may be cutting one of the most effective educational tools they have.'
    );
    const round1Writing = WritingArea(1, 'a1', 'round1', { label: 'Your answer: What is the author\'s argument?' });
    if (saved.a1?.round1) round1Writing.loadValue(saved.a1.round1);

    const round1Reveal = RevealPanel('Reveal Guidance', `
      <p><strong>Guidance:</strong> The author argues that travel is a powerful educational tool and that schools should not cut travel programs. Notice how the passage is not just <em>about</em> travel &mdash; it takes a <em>position</em>: travel is educationally valuable and cutting it is a mistake. If you wrote something like "the passage is about travel," push yourself further. What does the author <em>want you to believe</em> about travel?</p>
    `, round1Writing);

    // --- Practice Round 2 ---
    const round2Header = SectionHeader('Practice Round 2 \u2014 Moderate Difficulty');
    const round2Passage = Passage(null,
      'Most people assume that memory works like a video camera &mdash; recording events faithfully and playing them back on demand. Decades of research in cognitive science tell a different story. Every time we recall an event, we reconstruct it, filling in gaps with expectations, emotions, and information acquired after the fact. Eyewitness testimony, long treated as gold-standard evidence in courtrooms, is particularly vulnerable to this reconstructive process. The question is not whether our memories are unreliable. They are. The question is what we do with legal and social systems built on the assumption that they are not.'
    );
    const round2Writing = WritingArea(1, 'a1', 'round2', { label: 'Your answer: What is the author\'s argument?' });
    if (saved.a1?.round2) round2Writing.loadValue(saved.a1.round2);

    const round2Reveal = RevealPanel('Reveal Guidance', `
      <p><strong>Guidance:</strong> This one is trickier because the author builds to the argument gradually. The thesis is not "memory is unreliable" &mdash; that is presented as established fact. The argument is in the final sentence: our legal and social systems are built on a false assumption about memory's reliability, and we need to reckon with that. A strong answer captures both the <em>claim</em> (memory is reconstructive and unreliable) and the <em>so what</em> (systems that depend on memory need to be re-examined).</p>
    `, round2Writing);

    // --- Practice Round 3 ---
    const round3Header = SectionHeader('Practice Round 3 \u2014 Harder (Implicit Thesis)');
    const round3Passage = Passage(null,
      'In 1950, there were roughly 2.5 billion people on Earth. Today there are over 8 billion. Global grain production has more than tripled in that same period. The average person alive today has access to more calories than the average person in 1950. Yet approximately 735 million people are classified as chronically undernourished. Meanwhile, roughly one third of all food produced globally is lost or wasted before it is eaten. The technology to feed every person on the planet exists. The infrastructure to distribute food to every region has been built. The political will to do so has not.'
    );
    const round3Writing = WritingArea(1, 'a1', 'round3', { label: 'Your answer: What is the author\'s argument?' });
    if (saved.a1?.round3) round3Writing.loadValue(saved.a1.round3);

    const round3Reveal = RevealPanel('Reveal Guidance', `
      <p><strong>Guidance:</strong> The author never writes "I argue that..." This is an <em>implicit</em> thesis &mdash; the argument emerges from the arrangement of facts. The author is arguing that global hunger is not a problem of production or technology but of political will. Notice how the last three sentences are structured: "The technology exists. The infrastructure has been built. The political will has not." That final pivot is where the argument lives. When you encounter passages without an explicit thesis statement, look for the turn &mdash; the moment where facts stop being neutral and start pointing somewhere.</p>
    `, round3Writing);

    container.appendChild(Activity(1, 'Argument Hunting',
      '<strong>The Skill:</strong> Identifying an author\'s central argument (thesis).',
      warmUpTimer,
      skillExplanation,
      round1Header, round1Directions, round1Passage, round1Writing, round1Reveal,
      round2Header, round2Passage, round2Writing, round2Reveal,
      round3Header, round3Passage, round3Writing, round3Reveal
    ));
  }

  // ================================================================
  // Activity 2 — Reasoning Mapper
  // ================================================================
  {
    const skillExplanation = Passage(null,
      'An author\'s <strong>line of reasoning</strong> is the sequence of claims they make to move you from where you are (before reading) to where they want you to be (accepting their argument). Think of it as a path: each claim is a stepping stone, and your job is to map the path.'
    );

    const michelsPassage = Passage('Julian D. Michels, <em>Science and Enlightenment</em>',
      'The conflict between Galileo and the Church wasn\'t really about whether the Earth moved around the Sun. It was about something far more fundamental: who has the right to define truth itself? For a thousand years, the Church had claimed that authority. Scripture, interpreted by clergy, was the ultimate arbiter of reality. The new science challenged this monopoly by introducing a different standard: empirical observation and mathematical proof.',
      'What made this revolutionary wasn\'t just that the scientists were right and the Church was wrong. It was that science was claiming that truth could be determined by anyone with the tools and methods, not by appointed authorities citing authority. A Dutch cloth merchant grinding lenses could see things bishops could not. A German mathematician could prove things cardinals could not.',
      'This shift would echo far beyond astronomy. If religious authorities could be wrong about the heavens, what else might they be wrong about? If truth required evidence rather than only power, then every institution claiming power based on tradition or divine sanction was on shakier ground. The Scientific Revolution didn\'t just change what people knew &mdash; it changed who decided what counts as knowledge. That transformation would reshape everything from politics to economics to humanity itself.'
    );

    // Editable table — Reasoning Map
    const reasoningHeaders = ['Step', 'Claim', 'Evidence / Support', 'Connection to Next Step'];
    const reasoningRows = [
      ['1', '', '', ''],
      ['2', '', '', ''],
      ['3', '', '', ''],
      ['4', '', '', ''],
      ['5', '', '', '']
    ];
    const reasoningModel = [
      ['1', 'The Galileo-Church conflict was not about astronomy but about who has the right to define truth.', 'Opens by overturning a common assumption &mdash; the dispute was "far more fundamental."', 'Hooks the reader by reframing a familiar story. Sets up the real argument about authority.'],
      ['2', 'The Church had held a monopoly on defining truth through scripture for a thousand years.', 'Historical assertion about the Church\'s role as "ultimate arbiter of reality."', 'Establishes the status quo that science would disrupt. Without understanding the old system, the revolution makes no sense.'],
      ['3', 'Science introduced a new standard &mdash; empirical observation &mdash; that anyone could use.', '"A Dutch cloth merchant grinding lenses could see things bishops could not. A German mathematician could prove things cardinals could not."', 'The parallel examples make the abstract argument concrete: ordinary people vs. powerful authorities. This is the passage\'s pivot.'],
      ['4', 'If the Church could be wrong about the heavens, all institutions built on tradition were vulnerable.', 'Rhetorical question: "what else might they be wrong about?" extends the logic beyond astronomy.', 'Escalates the stakes from one scientific dispute to a challenge against every institution claiming authority from tradition.'],
      ['5', 'The Scientific Revolution changed not just knowledge but who decides what counts as knowledge.', 'Interpretive reframing of the entire revolution in one sentence.', 'Closes by naming the deeper transformation. The final claim &mdash; that this would "reshape everything" &mdash; signals broader significance.']
    ];
    const reasoningTable = EditableTable(1, 'a2-reasoning-map', reasoningHeaders, reasoningRows, reasoningModel);
    if (saved['a2-reasoning-map']) reasoningTable.loadData(saved['a2-reasoning-map']);

    // Debrief questions
    const debriefHeader = SectionHeader('Debrief Questions');
    const debriefQ1 = WritingArea(1, 'a2', 'debrief1', { label: 'Why does the author open by saying the conflict "wasn\'t really about whether the Earth moved"?' });
    if (saved.a2?.debrief1) debriefQ1.loadValue(saved.a2.debrief1);
    const debriefR1 = RevealPanel('Reveal Insight', '<p>It\'s a deliberate reframing &mdash; the opening overturns a common assumption to redirect the reader toward the author\'s actual argument about authority and truth. By setting aside the "obvious" story, the author clears space for a deeper one.</p>', debriefQ1);

    const debriefQ2 = WritingArea(1, 'a2', 'debrief2', { label: 'What is the effect of the parallel examples &mdash; the Dutch cloth merchant and the German mathematician?' });
    if (saved.a2?.debrief2) debriefQ2.loadValue(saved.a2.debrief2);
    const debriefR2 = RevealPanel('Reveal Insight', '<p>They make the abstract argument concrete. By contrasting ordinary people (merchant, mathematician) with powerful authorities (bishops, cardinals), the author dramatizes the power shift. The parallelism also creates rhetorical momentum &mdash; two examples with identical structure, hammering the same point from different angles.</p>', debriefQ2);

    const debriefQ3 = WritingArea(1, 'a2', 'debrief3', { label: 'The passage ends with "That transformation would reshape everything from politics to economics to humanity itself." Is this claim supported by evidence, or just asserted?' });
    if (saved.a2?.debrief3) debriefQ3.loadValue(saved.a2.debrief3);
    const debriefR3 = RevealPanel('Reveal Insight', '<p>It\'s asserted, not supported. The passage provides no specific examples of political, economic, or social transformation. It functions as a closing gesture that signals broader significance, but a careful reader should notice that the biggest claim in the passage is also the least substantiated. This is a useful pattern to recognize: writers often save their most sweeping claims for the end, where momentum makes them feel earned even when they aren\'t.</p>', debriefQ3);

    container.appendChild(Activity(2, 'Reasoning Mapper',
      '<strong>The Skill:</strong> Tracing an author\'s line of reasoning &mdash; the sequence of claims that build toward their argument.',
      skillExplanation,
      michelsPassage,
      SectionHeader('Your Task: Reasoning Map'),
      Passage(null, 'Use the graphic organizer below. For each row, identify a <strong>claim</strong> Michels makes, the <strong>evidence or support</strong> he provides for it, and how it <strong>connects</strong> to the next claim.'),
      reasoningTable,
      debriefHeader,
      debriefQ1, debriefR1,
      debriefQ2, debriefR2,
      debriefQ3, debriefR3
    ));
  }

  // ================================================================
  // Activity 3 — Evidence Evaluator
  // ================================================================
  {
    const skillExplanation = Passage(null,
      'Not all evidence is created equal. Your job as a reader is to ask four questions about any piece of evidence an author uses:'
    );

    // Four-question framework (read-only reference table)
    const frameworkHeaders = ['Question', 'What You\'re Looking For'];
    const frameworkRows = [
      ['<strong>What kind of evidence is it?</strong>', 'Data/statistics? Expert testimony? Historical example? Analogy? Personal anecdote?'],
      ['<strong>How specific is it?</strong>', 'Does the author name sources, give dates, cite studies &mdash; or stay vague?'],
      ['<strong>What\'s missing?</strong>', 'What would make this evidence stronger? What has the author left out?'],
      ['<strong>Does it actually support the claim?</strong>', 'Is the connection between evidence and claim tight, or is there a logical gap?']
    ];
    const frameworkTable = EditableTable(1, 'a3-framework-ref', frameworkHeaders, frameworkRows);

    // Evidence evaluation editable table
    const evalHeaders = ['Evidence Used', 'Kind', 'Specificity (High / Medium / Low)', 'What\'s Missing?', 'Supports the Claim?'];
    const evalRows = [
      ['"For a thousand years, the Church had claimed that authority"', '', '', '', ''],
      ['Dutch cloth merchant / German mathematician', '', '', '', ''],
      ['Rhetorical question: "what else might they be wrong about?"', '', '', '', ''],
      ['"Reshape everything from politics to economics to humanity itself"', '', '', '', '']
    ];
    const evalModel = [
      ['"For a thousand years, the Church had claimed that authority"', 'Historical generalization', 'Low &mdash; no specific dates, events, councils, or figures named.', 'A concrete example &mdash; a specific Church council, a papal decree, or a historical case of the Church defining scientific truth &mdash; would make this claim verifiable.', 'Partially &mdash; the claim is widely accepted, but the passage takes it as given rather than demonstrating it. A reader unfamiliar with this history would have to trust the author.'],
      ['Dutch cloth merchant / German mathematician', 'Illustrative examples (unnamed)', 'Medium &mdash; the examples are vivid and specific in <em>type</em> (merchant grinding lenses, mathematician proving things), but no individuals are named.', 'Names would strengthen this considerably. The "Dutch cloth merchant" is likely Antonie van Leeuwenhoek. The "German mathematician" could be Kepler or Leibniz. Naming them turns illustrations into historical evidence.', 'Yes &mdash; even unnamed, they effectively dramatize the author\'s point that science democratized truth-making. The parallel structure (merchant/bishops, mathematician/cardinals) reinforces the argument.'],
      ['Rhetorical question: "what else might they be wrong about?"', 'Logical reasoning / implication', 'N/A &mdash; this is not evidence but a logical move that draws out implications of preceding claims.', 'The leap from "wrong about astronomy" to "wrong about everything" is significant. An actual historical example of this cascade (e.g., Enlightenment thinkers challenging divine right of kings) would make the move more convincing.', 'Effective as rhetoric but not as evidence. It invites the reader to agree without providing proof that this cascade actually occurred.'],
      ['"Reshape everything from politics to economics to humanity itself"', 'Interpretive claim / thesis restatement', 'Low &mdash; this is the author\'s concluding judgment, not evidence. No specifics about the political, economic, or human transformations mentioned.', 'At least one concrete example of how politics, economics, or society was actually reshaped by the epistemological shift the author describes.', 'As evidence &mdash; no, it is a claim, not support. As a conclusion &mdash; it ties the passage together effectively, but the biggest claim in the entire passage is also the least substantiated.']
    ];
    const evalTable = EditableTable(1, 'a3-evidence-eval', evalHeaders, evalRows, evalModel);
    if (saved['a3-evidence-eval']) evalTable.loadData(saved['a3-evidence-eval']);

    // Key takeaway
    const takeaway = Passage(null,
      '<strong>Key Takeaway:</strong> This passage builds its argument through <strong>logical structure</strong> rather than accumulated evidence. Its strength is in its reasoning &mdash; each step follows logically from the last. Its limitation is that the evidence stays at the level of illustration and assertion rather than documented specifics. The author names no scientists, cites no experiments, and gives no dates after the opening reference to Galileo. A reader who already agrees will find the argument compelling; a skeptical reader would want the claims anchored in verifiable history.'
    );

    // Strong vs Weak comparison
    const comparisonHeader = SectionHeader('Strong vs. Weak Evidence \u2014 Comparison Exercise');
    const comparisonIntro = Passage(null,
      '<strong>Claim:</strong> Sleep deprivation significantly impairs academic performance.',
      'Below are two versions of a claim with supporting evidence. Read both, then answer the questions that follow.'
    );

    const comparison = ComparisonView(
      'Version A (Weak Evidence)',
      '<p>Everyone knows that not sleeping enough makes it harder to do well in school. Students who stay up late tend to get worse grades. Sleep is important for learning and memory.</p>',
      'Version B (Strong Evidence)',
      '<p>A 2019 study published in <em>Science of Learning</em> tracked 600 university students over a semester and found that students who averaged fewer than six hours of sleep per night scored, on average, 1.5 grade points lower than peers who slept seven or more hours. The researchers controlled for variables including course difficulty, prior GPA, and caffeine consumption. Neuroscience research further explains the mechanism: during sleep, the hippocampus replays and consolidates newly encoded information, a process critical to long-term memory formation.</p>'
    );

    const compQ1 = WritingArea(1, 'a3', 'comp-q1', { label: '1. Using the four-question framework, evaluate Version A. What kind of evidence does it use? How specific is it? What\'s missing?' });
    if (saved.a3?.['comp-q1']) compQ1.loadValue(saved.a3['comp-q1']);

    const compQ2 = WritingArea(1, 'a3', 'comp-q2', { label: '2. Do the same for Version B.' });
    if (saved.a3?.['comp-q2']) compQ2.loadValue(saved.a3['comp-q2']);

    const compQ3 = WritingArea(1, 'a3', 'comp-q3', { label: '3. Version A is not wrong &mdash; sleep deprivation does impair performance. So why is it weak evidence? What does this tell you about the difference between being correct and being well-supported?' });
    if (saved.a3?.['comp-q3']) compQ3.loadValue(saved.a3['comp-q3']);

    const compReveal = RevealPanel('Reveal Key Insight for Question 3', `
      <p><strong>Key insight:</strong> Being correct is not enough. An argument's job is to <em>convince a skeptical reader</em>. Version A asks you to take the author's word for it. Version B gives you something to check, challenge, and build on. In academic writing, evidence must be verifiable and specific &mdash; not just true.</p>
    `, compQ3);

    container.appendChild(Activity(3, 'Evidence Evaluator',
      '<strong>The Skill:</strong> Evaluating the quality, specificity, and effectiveness of an author\'s evidence.',
      skillExplanation,
      frameworkTable,
      SectionHeader('Apply to the Michels Passage'),
      Passage(null, 'Work through each piece of evidence Michels uses. Fill in the evaluation table below.'),
      evalTable,
      takeaway,
      comparisonHeader, comparisonIntro, comparison,
      compQ1, compQ2, compQ3, compReveal
    ));
  }

  // ================================================================
  // Practice Prompt — Timed Writing
  // ================================================================
  {
    const practiceHeader = SectionHeader('Practice Prompt \u2014 Timed Writing');
    const practiceIntro = Passage(null,
      'You now have all three skills. Time to put them together.',
      '<strong>Directions:</strong> Read the passage below. Then answer the three questions that follow. You have <strong>25 minutes</strong>.'
    );

    const timer = Timer(25);

    const practicePassage = Passage(null,
      'The global decline in insect populations has received far less public attention than the decline of large mammals or coral reefs, but its consequences may be more severe. Insects pollinate roughly 75 percent of the world\'s flowering plants, including many crops that humans depend on for food. They decompose organic matter, recycling nutrients back into soil. They form the base of food webs that support birds, freshwater fish, and small mammals. A 2019 meta-analysis examining 73 studies across multiple continents found that insect biomass is declining at an average rate of 2.5 percent per year &mdash; a figure that, if sustained, would mean a halving of insect life within three decades. The primary drivers identified by researchers include habitat loss from agricultural expansion, widespread pesticide use (particularly neonicotinoids), light pollution that disrupts nocturnal insect behavior, and climate change altering seasonal timing. Some scientists have described the trend as an "insect apocalypse," though others caution that data gaps &mdash; especially in tropical regions where insect diversity is highest &mdash; make sweeping conclusions premature. What is not in dispute is that the systems humans depend on for food, clean water, and stable ecosystems are deeply entangled with the fate of creatures most people overlook entirely.'
    );

    const timedQ1 = WritingArea(1, 'practice', 'q1', {
      label: '1. Identify the author\'s argument. What is the central claim of this passage? State it in one clear sentence.',
      minHeight: '100px'
    });
    if (saved.practice?.q1) timedQ1.loadValue(saved.practice.q1);

    const timedQ2 = WritingArea(1, 'practice', 'q2', {
      label: '2. Explain the author\'s line of reasoning. How does the author build the argument? Trace the sequence of claims and explain how they connect to each other.',
      minHeight: '180px'
    });
    if (saved.practice?.q2) timedQ2.loadValue(saved.practice.q2);

    const timedQ3 = WritingArea(1, 'practice', 'q3', {
      label: '3. Evaluate the effectiveness of the evidence. What kinds of evidence does the author use? How specific and credible is it? What are its strengths? What, if anything, is missing or could be stronger?',
      minHeight: '180px'
    });
    if (saved.practice?.q3) timedQ3.loadValue(saved.practice.q3);

    // Reveal guidance for all three
    const timedReveal = RevealPanel('Reveal Response Guidance (review after writing)', `
      <h4>Question 1 &mdash; Argument:</h4>
      <p>The author argues that the global decline in insect populations deserves far more attention because insects are essential to ecological and agricultural systems that humans depend on. A strong response captures both parts: the decline is serious <em>and</em> it is underappreciated.</p>

      <h4>Question 2 &mdash; Line of Reasoning:</h4>
      <p>The author follows a deliberate sequence: (1) frames insect decline as under-discussed relative to other environmental crises; (2) establishes why insects matter by listing their ecological roles (pollination, decomposition, food web support); (3) presents quantitative evidence for the decline (2.5% per year, potential halving in 30 years); (4) identifies causes (habitat loss, pesticides, light pollution, climate change); (5) acknowledges a counterpoint (data gaps, "premature" conclusions); (6) closes by reasserting the core claim &mdash; regardless of debate, human systems depend on insects. Notice the concession in step 5: it strengthens the argument by showing the author is aware of limitations.</p>

      <h4>Question 3 &mdash; Evidence Evaluation:</h4>
      <p><em>Strengths:</em> The passage uses a published meta-analysis with specific numbers (73 studies, 2.5% decline, 30-year projection). It names a specific pesticide class (neonicotinoids). It acknowledges data limitations, which builds credibility. <em>Areas to strengthen:</em> The meta-analysis is described generally &mdash; the author could name the journal, lead researcher, or publication. The phrase "some scientists" is vague. The ecological roles (pollination percentage, decomposition, food webs) are presented as facts without citations &mdash; strong responses note that even well-known facts benefit from sourcing in academic writing.</p>
    `, timedQ1);

    container.appendChild(practiceHeader);
    container.appendChild(practiceIntro);
    container.appendChild(timer);
    container.appendChild(practicePassage);
    container.appendChild(timedQ1);
    container.appendChild(timedQ2);
    container.appendChild(timedQ3);
    container.appendChild(timedReveal);
  }

  // ================================================================
  // Self-Assessment
  // ================================================================
  {
    const selfHeader = SectionHeader('Self-Assessment');
    const selfIntro = Passage(null,
      'Evaluate your practice response against these questions.'
    );

    const checklist = Checklist(1, 'self-assessment', [
      { id: '1', text: '<strong>Argument:</strong> Did I state the author\'s argument as a specific <em>claim</em> (not just a topic)? Does my sentence capture the author\'s position, not just the subject matter?' },
      { id: '2', text: '<strong>Reasoning:</strong> Did I trace the <em>sequence</em> of claims, or did I just list ideas from the passage without showing how they connect? A reasoning map should feel like a path, not a pile.' },
      { id: '3', text: '<strong>Evidence &mdash; Specificity:</strong> When I evaluated the evidence, did I name <em>specific</em> pieces of evidence from the passage, or did I speak in generalities ("the author uses good evidence")?' },
      { id: '4', text: '<strong>Evidence &mdash; Balance:</strong> Did I identify both strengths <em>and</em> limitations of the evidence? One-sided evaluation (all praise or all criticism) is almost always incomplete.' },
      { id: '5', text: '<strong>Evidence &mdash; "So What?":</strong> Did I explain <em>why</em> the evidence strengths and weaknesses matter for the argument\'s overall persuasiveness, or did I just list them?' }
    ]);
    if (saved['self-assessment']) checklist.loadStates(saved['self-assessment']);

    container.appendChild(selfHeader);
    container.appendChild(selfIntro);
    container.appendChild(checklist);
  }

  // ---- Bridge Out ----
  container.appendChild(Bridge('out', 'Summary',
    'The three skills from this rung:',
    '&bull; <strong>What</strong> an author argues (thesis identification)<br>&bull; <strong>How</strong> they build their argument (line of reasoning)<br>&bull; <strong>Whether</strong> their evidence holds up (evidence evaluation)',
    '<strong>Rung 2</strong> shifts from understanding arguments to analyzing the rhetorical choices that make writing persuasive &mdash; the craft behind the argument.'
  ));

  // ---- Complete Rung Button ----
  container.appendChild(CompleteRungButton(1, ctx.onComplete));
}
