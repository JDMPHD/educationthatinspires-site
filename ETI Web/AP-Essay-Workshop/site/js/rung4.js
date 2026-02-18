// ============================================
// Rung 4: The Argument Essay — You Are the Source
// ============================================
import { Passage, WritingArea, RevealPanel, RankingExercise, ComparisonView, EditableTable, Timer, Checklist, Activity, Bridge, SectionHeader, SplitPane, RungProgress, CompleteRungButton } from './components.js';

export function render(container, savedData, ctx) {
  const { onComplete, uid, rung } = ctx;
  const saved = savedData?.activities || {};

  // ---- Bridge In ----
  const bridgeIn = Bridge('in', 'Rung 4 — The Argument Essay',
    'The AP Lang Argument essay has no source packet. <strong>You are the source.</strong> Your reading, observations, knowledge of history, science, literature, current events &mdash; that is your evidence.',
    'The difference from Rung 3: nobody hands you excerpts. You pull evidence from everything you know and deploy it strategically.'
  );
  container.appendChild(bridgeIn);

  // Skills summary
  const skillsSummary = document.createElement('div');
  skillsSummary.className = 'bridge';
  skillsSummary.innerHTML = `
    <p><strong>Skills from Rungs 1&ndash;3:</strong> Source analysis, rhetorical analysis, thesis construction, evidence-driven paragraphs with commentary.</p>
    <p><strong>New in this rung:</strong></p>
    <ul>
      <li>Generating your own evidence from reading, experience, and observation</li>
      <li>Crafting a defensible (not obvious) thesis</li>
      <li>Writing commentary that explains <em>how</em> and <em>why</em> evidence supports your claim</li>
      <li>Engaging with complexity: counterarguments, qualifications, nuance</li>
    </ul>
    <p><strong>Scoring framework:</strong> Thesis (0&ndash;1) + Evidence/Commentary (0&ndash;4) + Sophistication (0&ndash;1) = <strong>6 points</strong></p>
  `;
  container.appendChild(skillsSummary);

  // ============================================
  // Warm-Up — Evidence Generation Practice (55 min)
  // ============================================

  const warmUpTimer = Timer(55);

  const sparkPassage = Passage(
    'Julian D. Michels, <em>Teleodynamic Sociology</em>, Chapter 6: The Southern Roads',
    'It is 1351. The monk with the red headband is drawing a circle in the dirt with a stick. &ldquo;Three ages,&rdquo; he says. &ldquo;The age of the True Law: already gone. The age of the Copied Law: dying now. Soon comes the age of the End of the Law, when the Buddha&rsquo;s teachings fade completely and the world falls into darkness.&rdquo;',
    'You are a farmer. You do not understand cycles of cosmic time. But you understand that your family is dead from the plague. You understand that the Mongol tax collectors took your last measure of grain and burned your house when you couldn&rsquo;t pay more.',
    'The monk taps the circle. &ldquo;But after the darkness, Maitreya descends from Tushita Heaven. He is the Next Buddha. He brings the new kalpa &mdash; a new age dawns! No more foreign dynasties. No more suffering. The Middle Kingdom will be restored!&rdquo; You look at the red cloth in his hand. You know the Mongol authorities execute those preaching the new faith. You have seen the bodies displayed.',
    'The monk holds out the cloth. You take it and tie it around your head.',
    'You think: <em>The old age is over</em>. You think: <em>Let the new one begin.</em>'
  );

  const warmUpPrompt = Passage(
    'The Prompt',
    '<strong>&ldquo;Desperation, not vision, is the true engine of political change.&rdquo;</strong>',
    'Write an argument that supports, challenges, or qualifies this claim. Draw evidence from your reading, observations, knowledge of history, current events, or personal experience.'
  );

  const warmUpBrainstorm = EditableTable(4, 'warmup-brainstorm', [
    'Category', 'Evidence That SUPPORTS the Claim', 'Evidence That CHALLENGES the Claim'
  ], [
    ['<strong>History</strong>', '', ''],
    ['<strong>History</strong>', '', ''],
    ['<strong>Literature / film</strong>', '', ''],
    ['<strong>Current events</strong>', '', ''],
    ['<strong>Personal experience / observation</strong>', '', '']
  ]);
  if (saved['warmup-brainstorm']) warmUpBrainstorm.loadData(saved['warmup-brainstorm']);

  const warmUpThesisR4 = WritingArea(4, 'warmup', 'thesis', {
    placeholder: 'Write a defensible thesis that takes a clear position on this claim. Remember: \u201Cdefensible\u201D means someone could reasonably argue the opposite...',
    minHeight: '80px',
    label: 'Your Thesis'
  });
  if (saved.warmup?.thesis) warmUpThesisR4.loadValue(saved.warmup.thesis);

  const warmUpParagraph = WritingArea(4, 'warmup', 'paragraph', {
    placeholder: 'Choose your single strongest piece of evidence. Write one full body paragraph: claim \u2192 evidence \u2192 commentary. Your commentary should explain HOW and WHY this evidence supports your thesis.',
    minHeight: '180px',
    label: 'One Body Paragraph \u2014 Your Strongest Evidence'
  });
  if (saved.warmup?.paragraph) warmUpParagraph.loadValue(saved.warmup.paragraph);

  container.appendChild(Activity(
    null,
    'Warm-Up \u2014 Evidence Generation Practice',
    '<p>Read the passage below. It\u2019s not a source to analyze &mdash; it\u2019s a spark. Let it activate your thinking, then respond to the prompt using <strong>your own knowledge</strong> as evidence.</p>',
    warmUpTimer,
    sparkPassage,
    warmUpPrompt,
    SectionHeader('Step 1: Brainstorm Your Evidence'),
    Passage(null, 'Fill in as many cells as you can. Not every category needs an entry &mdash; go where your knowledge is strongest.'),
    warmUpBrainstorm,
    SectionHeader('Step 2: Draft a Thesis'),
    warmUpThesisR4,
    SectionHeader('Step 3: Write One Body Paragraph'),
    warmUpParagraph
  ));

  // ============================================
  // Activity 1 — The Evidence Inventory
  // ============================================

  // Step 1: Brainstorm table
  const brainstormTable = EditableTable(4, 'evidence-inventory', [
    'Category', 'Your Evidence Idea'
  ], [
    ['<strong>Personal experience</strong>', ''],
    ['<strong>Personal experience</strong>', ''],
    ['<strong>History</strong>', ''],
    ['<strong>History</strong>', ''],
    ['<strong>Literature / film</strong>', ''],
    ['<strong>Literature / film</strong>', ''],
    ['<strong>Science / technology</strong>', ''],
    ['<strong>Science / technology</strong>', ''],
    ['<strong>Current events</strong>', ''],
    ['<strong>Sports / arts</strong>', ''],
    ['<strong>Philosophy / psychology</strong>', ''],
    ['<strong>Counterexamples</strong>', ''],
  ]);
  if (saved['evidence-inventory']) brainstormTable.loadData(saved['evidence-inventory']);

  // Step 2: Ranking table
  const rankingTable = EditableTable(4, 'evidence-ranking', [
    'Evidence Piece', 'Specificity (1-5)', 'Relevance (1-5)', 'Star?'
  ], [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
  ]);
  if (saved['evidence-ranking']) rankingTable.loadData(saved['evidence-ranking']);

  // Step 3: Share and Steal
  const shareStealArea = WritingArea(4, 'activity1', 'share-steal', {
    placeholder: 'Write down any evidence you borrowed from a partner...',
    label: 'Partner Evidence Notes'
  });
  if (saved.activity1?.['share-steal']) shareStealArea.loadValue(saved.activity1['share-steal']);

  // Debrief
  const debriefArea = WritingArea(4, 'activity1', 'debrief', {
    placeholder: 'Respond to the debrief questions here...',
    label: 'Debrief Responses',
    minHeight: '100px'
  });
  if (saved.activity1?.debrief) debriefArea.loadValue(saved.activity1.debrief);

  const activity1 = Activity(1, 'The Evidence Inventory',
    `<p>Read the following quotation:</p>
    <blockquote>&ldquo;Failure is simply the opportunity to begin again, this time more intelligently.&rdquo;<br>&mdash; attributed to Henry Ford</blockquote>
    <p><strong>Write an essay arguing for or against the idea that failure is necessary for meaningful success.</strong></p>`,

    // Step 1
    SectionHeader('Step 1: Brainstorm (5 minutes)'),
    (() => {
      const d = document.createElement('div');
      d.innerHTML = '<p>Before you worry about a thesis or an outline, dump everything you know. Your goal: <strong>at least 8&ndash;10 potential evidence pieces</strong> in five minutes. Cast the widest net you can. Use these categories to jog your thinking:</p>';
      return d;
    })(),
    Timer(5),
    brainstormTable,

    // Step 2
    SectionHeader('Step 2: Rank Your Evidence (5 minutes)'),
    (() => {
      const d = document.createElement('div');
      d.innerHTML = `<p>Now look at your list critically. For each piece of evidence, rate it on two scales:</p>
        <ul>
          <li><strong>Specificity</strong> (1&ndash;5): How concrete and detailed is this? &ldquo;People fail sometimes&rdquo; = 1. &ldquo;Thomas Edison tested over 1,000 filament materials before finding one that worked&rdquo; = 5.</li>
          <li><strong>Relevance</strong> (1&ndash;5): How directly does this connect to the prompt&rsquo;s claim about failure and success? A tangential anecdote = 1. A case that directly proves or complicates the claim = 5.</li>
        </ul>
        <p><strong>Star your top 3&ndash;4 pieces.</strong> These are your essay evidence.</p>`;
      return d;
    })(),
    Timer(5),
    rankingTable,

    // Step 3
    SectionHeader('Step 3: Share and Steal (3 minutes)'),
    (() => {
      const d = document.createElement('div');
      d.innerHTML = '<p>Turn to a partner. Share your top-ranked evidence and hear theirs. If they have something better than what is on your list, write it down. Good writers are good thieves.</p>';
      return d;
    })(),
    Timer(3),
    shareStealArea,

    // Debrief
    SectionHeader('Debrief Questions'),
    (() => {
      const d = document.createElement('div');
      d.innerHTML = `<ul>
        <li>What categories did most of your strong evidence come from?</li>
        <li>Did anyone find that their best evidence was a <em>counterexample</em> &mdash; a case that complicates the prompt rather than simply agreeing with it?</li>
        <li>What is the difference between evidence that <em>illustrates</em> a point and evidence that <em>proves</em> a point?</li>
      </ul>`;
      return d;
    })(),
    debriefArea
  );
  container.appendChild(activity1);

  // ============================================
  // Activity 2 — The Defensible Thesis Lab
  // ============================================

  // Step 1: Ranking exercise
  const thesisRanking = RankingExercise(4, 'thesis-ranking', [
    { id: 'A', label: 'Thesis A', text: 'Failure is bad because it makes people feel discouraged and can ruin their confidence.' },
    { id: 'B', label: 'Thesis B', text: 'Failure is necessary for meaningful success because it teaches people important lessons.' },
    { id: 'C', label: 'Thesis C', text: 'While failure can sometimes lead to growth, the idea that it is <em>necessary</em> for success oversimplifies the relationship between struggle and achievement &mdash; and risks romanticizing hardship that is, for many people, simply destructive.' },
    { id: 'D', label: 'Thesis D', text: 'There are many examples throughout history of people who failed before succeeding.' },
    { id: 'E', label: 'Thesis E', text: 'Failure is most valuable not when it &ldquo;builds character&rdquo; in some abstract sense, but when it forces a specific recalibration &mdash; a concrete change in method, strategy, or understanding that would not have occurred otherwise.' },
  ], { D: 1, A: 2, B: 3, E: 4, C: 5 });

  // Ranking explanation area
  const rankingExplainArea = WritingArea(4, 'activity2', 'ranking-explanations', {
    placeholder: 'Write a one-sentence explanation for each ranking...',
    label: 'Explain each ranking',
    minHeight: '150px'
  });
  if (saved.activity2?.['ranking-explanations']) rankingExplainArea.loadValue(saved.activity2['ranking-explanations']);

  // Ranking guide reveal
  const rankingGuideReveal = RevealPanel('Reveal Ranking Guide', `
    <table class="editable-table">
      <thead><tr><th>Thesis</th><th>Issue</th><th>Score</th></tr></thead>
      <tbody>
        <tr><td><strong>D</strong></td><td>Not a thesis at all &mdash; it is a statement of fact. Not debatable. Does not take a position.</td><td>Weakest</td></tr>
        <tr><td><strong>A</strong></td><td>Takes a position, but it is surface-level and obvious. &ldquo;Bad because it feels bad&rdquo; does not give you anywhere interesting to go.</td><td>Weak</td></tr>
        <tr><td><strong>B</strong></td><td>Defensible and clear, but generic. &ldquo;Teaches important lessons&rdquo; is vague &mdash; <em>which</em> lessons? This is a passable thesis but will not earn sophistication.</td><td>Middle</td></tr>
        <tr><td><strong>E</strong></td><td>Specific, debatable, and gives the essay a clear direction. Distinguishes between abstract and concrete value of failure. Sets up body paragraphs that can explore <em>specific recalibration</em>.</td><td>Strong</td></tr>
        <tr><td><strong>C</strong></td><td>Debatable, nuanced, and actively engages with the complexity of the prompt. Qualifies the claim (&ldquo;while&hellip; sometimes&rdquo;) and names the stakes (&ldquo;risks romanticizing hardship&rdquo;). Sets up a sophisticated argument.</td><td>Strongest</td></tr>
      </tbody>
    </table>
  `, rankingExplainArea);

  // Step 2: Write your own thesis statements
  const thesisSafe = WritingArea(4, 'activity2', 'thesis-safe', {
    placeholder: 'Your safe option (clear and defensible, if a bit straightforward)...',
    label: '1. Safe Option'
  });
  if (saved.activity2?.['thesis-safe']) thesisSafe.loadValue(saved.activity2['thesis-safe']);

  const thesisAmbitious = WritingArea(4, 'activity2', 'thesis-ambitious', {
    placeholder: 'Your ambitious option (nuanced, specific, maybe a little risky)...',
    label: '2. Ambitious Option'
  });
  if (saved.activity2?.['thesis-ambitious']) thesisAmbitious.loadValue(saved.activity2['thesis-ambitious']);

  const thesisWildcard = WritingArea(4, 'activity2', 'thesis-wildcard', {
    placeholder: 'Your wildcard (the take you are not sure about but find interesting)...',
    label: '3. Wildcard'
  });
  if (saved.activity2?.['thesis-wildcard']) thesisWildcard.loadValue(saved.activity2['thesis-wildcard']);

  // Step 3: Peer Evaluation
  const peerEvalArea = WritingArea(4, 'activity2', 'peer-eval', {
    placeholder: 'For each of your partner\'s three thesis statements, answer the three criteria questions and explain which is strongest...',
    label: 'Peer Evaluation Notes',
    minHeight: '120px'
  });
  if (saved.activity2?.['peer-eval']) peerEvalArea.loadValue(saved.activity2['peer-eval']);

  const activity2 = Activity(2, 'The Defensible Thesis Lab',
    '<p>The Argument essay thesis is worth 1 point, but it shapes everything else. A weak thesis makes the whole essay harder to write. A strong thesis gives you a roadmap.</p>',

    // Step 1
    SectionHeader('Step 1: Rank These Thesis Statements'),
    (() => {
      const d = document.createElement('div');
      d.innerHTML = '<p>Below are five thesis statements responding to the failure prompt. <strong>Rank them from weakest (1) to strongest (5)</strong> and write a one-sentence explanation for each ranking.</p>';
      return d;
    })(),
    thesisRanking,
    rankingExplainArea,
    (() => {
      const d = document.createElement('div');
      d.className = 'activity-instructions';
      d.innerHTML = `<p><strong>The Criteria</strong> &mdash; Use these three questions to evaluate any thesis:</p>
        <ol>
          <li><strong>Is it debatable?</strong> Could a reasonable person argue the opposite? If everyone would agree, it is not a thesis &mdash; it is an observation.</li>
          <li><strong>Does it take a clear position?</strong> The reader should know exactly where you stand after one sentence.</li>
          <li><strong>Is it specific enough to guide an essay?</strong> A thesis that could apply to any topic is too vague. A strong thesis tells you what your body paragraphs need to do.</li>
        </ol>`;
      return d;
    })(),
    rankingGuideReveal,

    // Step 2
    SectionHeader('Step 2: Write Your Own (5 minutes)'),
    (() => {
      const d = document.createElement('div');
      d.innerHTML = '<p>Write <strong>three</strong> different thesis statements for the failure prompt. Push yourself &mdash; make each one take a slightly different angle or level of specificity.</p>';
      return d;
    })(),
    Timer(5),
    thesisSafe,
    thesisAmbitious,
    thesisWildcard,

    // Step 3
    SectionHeader('Step 3: Peer Evaluation (5 minutes)'),
    (() => {
      const d = document.createElement('div');
      d.innerHTML = '<p>Trade with a partner. For each of their three thesis statements, answer the three criteria questions (debatable? clear position? specific enough?) and <strong>circle the one you think is strongest.</strong> Write one sentence explaining your choice.</p>';
      return d;
    })(),
    Timer(5),
    peerEvalArea
  );
  container.appendChild(activity2);

  // ============================================
  // Activity 3 — Commentary Deep Dive
  // ============================================

  // Step 1: Comparison view
  const commentaryComparison = ComparisonView(
    'Version 1 (Weak Commentary)',
    '<p>Failure is necessary for success because it teaches valuable lessons. For example, Thomas Edison tried thousands of different materials before finding the right filament for the light bulb. He failed many times but kept going. Eventually, he succeeded and invented one of the most important technologies in history. This shows that failure can lead to success.</p>',
    'Version 2 (Strong Commentary)',
    '<p>Failure functions as a necessary mechanism of elimination &mdash; not because struggle inherently &ldquo;builds character,&rdquo; but because each failed attempt narrows the field of possibilities and sharpens the inventor&rsquo;s understanding of the problem. Edison&rsquo;s testing of over a thousand filament materials was not random perseverance; it was systematic exclusion. Each failed material provided specific data about conductivity, durability, and heat resistance that no amount of theoretical planning could replicate. The meaningful success &mdash; a commercially viable light bulb &mdash; was not achieved <em>despite</em> the failures but <em>through the specific knowledge each failure generated.</em> This distinction matters: the value of failure lies not in the suffering it causes but in the information it produces.</p>'
  );

  // Spot the difference writing area
  const spotDiffArea = WritingArea(4, 'activity3', 'spot-difference', {
    placeholder: 'Answer the three questions:\n1. How many sentences in Version 1 are commentary vs summary?\n2. What does Version 2 do after presenting the Edison example that Version 1 does not?\n3. Find the sentence in Version 2 that most clearly connects evidence to the larger argument.',
    label: 'Identify the Differences',
    minHeight: '150px'
  });
  if (saved.activity3?.['spot-difference']) spotDiffArea.loadValue(saved.activity3['spot-difference']);

  // Step 3: Practice commentary
  const commentaryPractice1 = WritingArea(4, 'activity3', 'commentary-practice-1', {
    placeholder: 'Evidence piece #1: Write 1-2 sentences presenting the evidence, then 2-3 sentences of commentary...',
    label: 'Evidence + Commentary #1',
    minHeight: '160px'
  });
  if (saved.activity3?.['commentary-practice-1']) commentaryPractice1.loadValue(saved.activity3['commentary-practice-1']);

  const commentaryPractice2 = WritingArea(4, 'activity3', 'commentary-practice-2', {
    placeholder: 'Evidence piece #2: Write 1-2 sentences presenting the evidence, then 2-3 sentences of commentary...',
    label: 'Evidence + Commentary #2',
    minHeight: '160px'
  });
  if (saved.activity3?.['commentary-practice-2']) commentaryPractice2.loadValue(saved.activity3['commentary-practice-2']);

  const commentaryModelReveal = RevealPanel('Reveal Commentary Toolkit Reminder', `
    <p>Strong commentary answers one or more of these questions:</p>
    <table class="editable-table">
      <thead><tr><th>Question</th><th>What it does</th></tr></thead>
      <tbody>
        <tr><td><strong>WHY does this evidence matter?</strong></td><td>Explains the significance &mdash; moves beyond &ldquo;this shows that&hellip;&rdquo;</td></tr>
        <tr><td><strong>HOW does this evidence support the thesis?</strong></td><td>Draws a specific, logical connection between the example and your claim</td></tr>
        <tr><td><strong>WHAT does this reveal about the larger issue?</strong></td><td>Zooms out to connect the specific example to a broader truth or pattern</td></tr>
        <tr><td><strong>SO WHAT?</strong></td><td>States the implication &mdash; what should the reader take away from this evidence?</td></tr>
      </tbody>
    </table>
    <p><strong>Sentence patterns to get you started</strong> (use these as scaffolding, then adapt to your own voice):</p>
    <ul>
      <li>&ldquo;This matters because&hellip;&rdquo;</li>
      <li>&ldquo;What this reveals is not simply [surface reading] but rather [deeper insight]&hellip;&rdquo;</li>
      <li>&ldquo;The significance lies not in [obvious takeaway] but in [more nuanced point]&hellip;&rdquo;</li>
      <li>&ldquo;This example demonstrates that [specific mechanism/process], which suggests&hellip;&rdquo;</li>
      <li>&ldquo;If [evidence] is true, then [implication for the larger argument]&hellip;&rdquo;</li>
      <li>&ldquo;This distinction is important because&hellip;&rdquo;</li>
    </ul>
  `, commentaryPractice1);

  const activity3 = Activity(3, 'Commentary Deep Dive',
    '<p>Evidence gets you <em>some</em> points. Commentary is where the real scoring happens. The difference between a 2 and a 4 in the Evidence/Commentary row is almost entirely about what you <em>do</em> with your evidence after you present it.</p>',

    // Step 1
    SectionHeader('Step 1: Spot the Difference'),
    (() => {
      const d = document.createElement('div');
      d.innerHTML = '<p>Below are two versions of the same body paragraph. Both use the same evidence. Read them carefully.</p>';
      return d;
    })(),
    commentaryComparison,
    (() => {
      const d = document.createElement('div');
      d.innerHTML = `<p><strong>Identify the differences.</strong> Answer:</p>
        <ol>
          <li>How many sentences in Version 1 are <em>commentary</em> (explaining why/how the evidence matters) versus <em>summary</em> (restating what happened)?</li>
          <li>What does Version 2 do <em>after</em> presenting the Edison example that Version 1 does not?</li>
          <li>Find the sentence in Version 2 that most clearly connects the evidence to the larger argument. What makes it effective?</li>
        </ol>`;
      return d;
    })(),
    spotDiffArea,

    // Step 2: Commentary Toolkit
    SectionHeader('Step 2: The Commentary Toolkit'),
    commentaryModelReveal,

    // Step 3: Practice
    SectionHeader('Step 3: Practice (10 minutes)'),
    (() => {
      const d = document.createElement('div');
      d.innerHTML = `<p>Choose <strong>two</strong> of your strongest evidence pieces from Activity 1. For each one:</p>
        <ol>
          <li>Write 1&ndash;2 sentences presenting the evidence (be specific and concrete)</li>
          <li>Write 2&ndash;3 sentences of commentary using the toolkit above</li>
        </ol>
        <p><strong>The rule:</strong> Your commentary must be <em>at least</em> as long as your evidence. If you are writing more evidence than commentary, you are summarizing, not analyzing.</p>`;
      return d;
    })(),
    Timer(10),
    commentaryPractice1,
    commentaryPractice2
  );
  container.appendChild(activity3);

  // ============================================
  // Activity 4 — The Sophistication Challenge
  // ============================================

  // Sophistication practice area
  const sophPracticeArea = WritingArea(4, 'activity4', 'soph-practice', {
    placeholder: 'Revise your strongest body paragraph or add 2-3 sentences incorporating one sophistication move. Label which move you used.',
    label: 'Your Revised Paragraph',
    minHeight: '200px'
  });
  if (saved.activity4?.['soph-practice']) sophPracticeArea.loadValue(saved.activity4['soph-practice']);

  // Model sophistication reveal
  const sophReveal = RevealPanel('Reveal Sophistication Move Examples', `
    <h4>Move 1: The Genuine Counterargument</h4>
    <p>Do not just mention the other side &mdash; engage with it seriously. Show why a reasonable person might disagree, and explain why your position holds despite that challenge.</p>
    <p><em>Weak:</em> &ldquo;Some people might say failure is not necessary, but they are wrong because many successful people have failed.&rdquo;</p>
    <p><em>Strong:</em> &ldquo;The claim that failure is necessary for success carries an uncomfortable implication: that those who succeed without significant failure somehow achieved less, or that those trapped in cycles of poverty and systemic disadvantage simply have not &lsquo;learned their lesson&rsquo; yet. This objection has real force &mdash; and it should push us to be more precise. Failure is not inherently valuable. It is valuable only when the person who fails has the resources, support, and opportunity to extract meaning from the experience.&rdquo;</p>
    <h4>Move 2: The Qualification</h4>
    <p><em>Strong:</em> &ldquo;Failure is most necessary in domains where the path to success cannot be fully mapped in advance &mdash; innovation, creative work, interpersonal relationships. In domains governed by clear, known rules &mdash; arithmetic, assembly-line procedures, standardized protocols &mdash; failure is simply error, and the most successful approach is to avoid it entirely.&rdquo;</p>
    <h4>Move 3: The Broader Context</h4>
    <p><em>Strong:</em> &ldquo;America&rsquo;s relationship with failure is paradoxical: we celebrate it in retrospect (&lsquo;she failed her way to the top&rsquo;) while punishing it in real time (bankruptcy, academic probation, social stigma). This gap between our mythology of failure and our actual treatment of it suggests that the Ford quotation captures an aspiration more than a reality.&rdquo;</p>
    <h4>Move 4: The Tension or Complexity</h4>
    <p><em>Strong:</em> &ldquo;The deepest tension in the &lsquo;failure is necessary&rsquo; argument is this: the people best positioned to learn from failure &mdash; those with safety nets, second chances, and supportive communities &mdash; are also the people who least need failure to succeed. Meanwhile, those for whom failure carries the highest stakes often lack the conditions that would make failure productive. Failure, it turns out, is most educational for those who need the education least.&rdquo;</p>
  `, sophPracticeArea);

  // Peer review area
  const sophPeerReview = WritingArea(4, 'activity4', 'soph-peer-review', {
    placeholder: 'Read your partner\'s revised paragraph and answer:\n- Can you identify which sophistication move they used?\n- Does the move feel earned and genuine, or bolted on?\n- Does it strengthen the argument or distract from it?',
    label: 'Peer Review Notes',
    minHeight: '120px'
  });
  if (saved.activity4?.['soph-peer-review']) sophPeerReview.loadValue(saved.activity4['soph-peer-review']);

  const activity4 = Activity(4, 'The Sophistication Challenge',
    '<p>The Sophistication point is the hardest to earn. Only about 5&ndash;15% of students get it on any given exam. But it is not magic &mdash; it is a set of specific intellectual moves you can practice.</p>',

    // What sophistication is/isn't
    SectionHeader('What Sophistication Actually Looks Like'),
    (() => {
      const d = document.createElement('div');
      d.innerHTML = `
        <p>Sophistication is <strong>not</strong>:</p>
        <ul>
          <li>Using big words</li>
          <li>Writing longer essays</li>
          <li>Having more evidence</li>
          <li>Saying &ldquo;in today&rsquo;s society&rdquo;</li>
        </ul>
        <p>Sophistication <strong>is</strong>:</p>
        <ul>
          <li>Acknowledging complexity rather than flattening it</li>
          <li>Engaging with the strongest version of the opposing view</li>
          <li>Qualifying your claims when honesty demands it</li>
          <li>Connecting your specific argument to a broader context or tension</li>
        </ul>`;
      return d;
    })(),

    // The Four Moves
    SectionHeader('The Four Sophistication Moves'),
    (() => {
      const d = document.createElement('div');
      d.innerHTML = '<p>Read each move and the example that follows. All examples use the failure prompt.</p>';
      return d;
    })(),
    sophReveal,

    // Your Turn
    SectionHeader('Your Turn (10 minutes)'),
    (() => {
      const d = document.createElement('div');
      d.innerHTML = `<ol>
        <li>Choose the strongest body paragraph you have written so far (from Activity 3 or your brainstorming).</li>
        <li>Pick <strong>one</strong> sophistication move from the list above.</li>
        <li>Revise your paragraph &mdash; or add 2&ndash;3 sentences &mdash; that incorporate that move.</li>
        <li>Label which move you used.</li>
      </ol>`;
      return d;
    })(),
    Timer(10),
    sophPracticeArea,

    // Peer Review
    SectionHeader('Peer Review (5 minutes)'),
    (() => {
      const d = document.createElement('div');
      d.innerHTML = `<p>Trade with a partner. Read their revised paragraph and answer:</p>
        <ul>
          <li>Can you identify which sophistication move they used?</li>
          <li>Does the move feel earned and genuine, or does it feel bolted on?</li>
          <li>Does it strengthen the argument or distract from it?</li>
        </ul>`;
      return d;
    })(),
    Timer(5),
    sophPeerReview
  );
  container.appendChild(activity4);

  // ============================================
  // Practice Prompt
  // ============================================

  // Pre-write checklist
  const preWriteChecklist = Checklist(4, 'pre-write', [
    { id: 'brainstorm', text: 'Brainstorm at least 6&ndash;8 evidence pieces (Activity 1 method)' },
    { id: 'star', text: 'Star your top 3&ndash;4' },
    { id: 'thesis', text: 'Draft a thesis &mdash; make sure it is debatable, clear, and specific (Activity 2 criteria)' },
    { id: 'commentary', text: 'Plan where your commentary will do the heavy lifting (Activity 3)' },
    { id: 'sophistication', text: 'Decide where one sophistication move might fit naturally (Activity 4)' },
  ]);
  if (saved['pre-write']) preWriteChecklist.loadStates(saved['pre-write']);

  // Brainstorm area for practice prompt
  const practiceBrainstorm = WritingArea(4, 'practice', 'brainstorm', {
    placeholder: 'Brainstorm your evidence pieces here...',
    label: 'Evidence Brainstorm',
    minHeight: '150px'
  });
  if (saved.practice?.brainstorm) practiceBrainstorm.loadValue(saved.practice.brainstorm);

  // Full essay writing area
  const practiceEssay = WritingArea(4, 'practice', 'essay', {
    placeholder: 'Write your complete essay here. Aim for a strong introduction with a defensible thesis, 2-3 body paragraphs with specific evidence and developed commentary, and a conclusion that does more than restate your thesis.',
    label: 'Your Essay',
    minHeight: '400px'
  });
  if (saved.practice?.essay) practiceEssay.loadValue(saved.practice.essay);

  const practiceSection = document.createElement('div');
  practiceSection.className = 'activity fade-in';
  practiceSection.appendChild(SectionHeader('Practice Prompt'));

  const practiceIntro = document.createElement('div');
  practiceIntro.className = 'activity-instructions';
  practiceIntro.innerHTML = '<p>You have built an evidence inventory, sharpened your thesis, practiced commentary, and experimented with sophistication. Time to put it all together.</p>';
  practiceSection.appendChild(practiceIntro);

  const promptBlock = document.createElement('div');
  promptBlock.className = 'activity-instructions';
  promptBlock.innerHTML = `<p>Read the following quotation:</p>
    <blockquote>&ldquo;Technology is a useful servant but a dangerous master.&rdquo;<br>&mdash; Christian Lous Lange, Nobel Peace Prize lecture, 1921</blockquote>
    <p><strong>Write an essay that argues your position on the extent to which technology strengthens or diminishes genuine human connection.</strong></p>`;
  practiceSection.appendChild(promptBlock);

  practiceSection.appendChild(SectionHeader('Before You Write: Quick Checklist (3 minutes)'));
  practiceSection.appendChild(Timer(3));
  practiceSection.appendChild(preWriteChecklist);
  practiceSection.appendChild(practiceBrainstorm);

  practiceSection.appendChild(SectionHeader('Write (40 minutes)'));
  practiceSection.appendChild(Timer(40));
  practiceSection.appendChild(practiceEssay);

  container.appendChild(practiceSection);

  // ============================================
  // Self-Assessment
  // ============================================

  const selfAssessSection = document.createElement('div');
  selfAssessSection.className = 'activity fade-in';
  selfAssessSection.appendChild(SectionHeader('Self-Assessment'));

  const selfAssessIntro = document.createElement('div');
  selfAssessIntro.innerHTML = '<p>After writing your practice essay, answer these questions honestly.</p>';
  selfAssessSection.appendChild(selfAssessIntro);

  // Thesis self-assessment
  selfAssessSection.appendChild(SectionHeader('Thesis (Row 1: 0-1 point)'));

  const thesisAssess = WritingArea(4, 'self-assess', 'thesis', {
    placeholder: '1. Does my thesis take a defensible position on the relationship between technology and human connection?\n2. Is my thesis specific enough to guide my essay?',
    label: 'Thesis Self-Assessment',
    minHeight: '100px'
  });
  if (saved['self-assess']?.thesis) thesisAssess.loadValue(saved['self-assess'].thesis);

  const thesisAssessGuide = document.createElement('div');
  thesisAssessGuide.innerHTML = `
    <p><strong>1. Does my thesis take a defensible position?</strong> Could a reasonable, informed person argue the opposite?</p>
    <ul>
      <li>No position / just restates the prompt &rarr; 0</li>
      <li>Clear, debatable position that goes beyond the obvious &rarr; 1</li>
    </ul>
    <p><strong>2. Is my thesis specific enough to guide my essay?</strong></p>
    <ul>
      <li>Vague or generic (&ldquo;Technology has pros and cons&rdquo;) &rarr; needs revision</li>
      <li>Specific and directive &rarr; ready</li>
    </ul>`;
  selfAssessSection.appendChild(thesisAssessGuide);
  selfAssessSection.appendChild(thesisAssess);

  // Evidence and Commentary self-assessment
  selfAssessSection.appendChild(SectionHeader('Evidence and Commentary (Row 2: 0-4 points)'));

  const evidenceAssessGuide = document.createElement('div');
  evidenceAssessGuide.innerHTML = `
    <p><strong>3. Is my evidence specific and concrete?</strong></p>
    <ul>
      <li>Mostly generalizations (&ldquo;many people use technology&rdquo;) &rarr; 1&ndash;2 range</li>
      <li>Specific, nameable examples with concrete details &rarr; 3&ndash;4 range</li>
    </ul>
    <p><strong>4. Does my commentary explain HOW and WHY my evidence supports my thesis?</strong></p>
    <ul>
      <li>Commentary mostly restates the evidence (&ldquo;This shows that&hellip;&rdquo;) &rarr; 1&ndash;2 range</li>
      <li>Commentary explains the mechanism, significance, or implication &rarr; 3&ndash;4 range</li>
    </ul>
    <p><strong>5. Do my body paragraphs build on each other?</strong></p>
    <ul>
      <li>Paragraphs feel interchangeable &rarr; 1&ndash;2 range</li>
      <li>Clear progression of reasoning &rarr; 3&ndash;4 range</li>
    </ul>`;
  selfAssessSection.appendChild(evidenceAssessGuide);

  const evidenceAssess = WritingArea(4, 'self-assess', 'evidence', {
    placeholder: 'Rate yourself on questions 3-5 and explain your reasoning...',
    label: 'Evidence/Commentary Self-Assessment',
    minHeight: '100px'
  });
  if (saved['self-assess']?.evidence) evidenceAssess.loadValue(saved['self-assess'].evidence);
  selfAssessSection.appendChild(evidenceAssess);

  // Sophistication self-assessment
  selfAssessSection.appendChild(SectionHeader('Sophistication (Row 3: 0-1 point)'));

  const sophAssessGuide = document.createElement('div');
  sophAssessGuide.innerHTML = `
    <p><strong>6. Did I engage with complexity?</strong> Did I acknowledge a counterargument, qualify a claim, name a tension, or connect my argument to a broader context &mdash; and do so in a way that <em>strengthened</em> rather than weakened my argument?</p>
    <ul>
      <li>No engagement with complexity &rarr; 0</li>
      <li>At least one genuine sophistication move that feels earned &rarr; 1</li>
    </ul>`;
  selfAssessSection.appendChild(sophAssessGuide);

  const sophAssess = WritingArea(4, 'self-assess', 'sophistication', {
    placeholder: 'Rate yourself on question 6 and explain...',
    label: 'Sophistication Self-Assessment',
    minHeight: '80px'
  });
  if (saved['self-assess']?.sophistication) sophAssess.loadValue(saved['self-assess'].sophistication);
  selfAssessSection.appendChild(sophAssess);

  // Priorities for revision
  selfAssessSection.appendChild(SectionHeader('My Priorities for Revision'));

  const revisionPriority = WritingArea(4, 'self-assess', 'revision-priority', {
    placeholder: 'Based on my self-assessment, the one thing I most need to improve is...',
    label: 'Top Priority',
    minHeight: '80px'
  });
  if (saved['self-assess']?.['revision-priority']) revisionPriority.loadValue(saved['self-assess']['revision-priority']);
  selfAssessSection.appendChild(revisionPriority);

  // Full self-assessment checklist
  const selfAssessChecklist = Checklist(4, 'self-assess-checklist', [
    { id: 'thesis-defensible', text: 'My thesis takes a defensible, debatable position' },
    { id: 'thesis-specific', text: 'My thesis is specific enough to guide the essay' },
    { id: 'evidence-specific', text: 'My evidence is specific and concrete' },
    { id: 'commentary-explains', text: 'My commentary explains HOW and WHY, not just WHAT' },
    { id: 'paragraphs-build', text: 'My body paragraphs build on each other' },
    { id: 'sophistication-earned', text: 'I included at least one genuine sophistication move' },
  ]);
  if (saved['self-assess-checklist']) selfAssessChecklist.loadStates(saved['self-assess-checklist']);
  selfAssessSection.appendChild(selfAssessChecklist);

  container.appendChild(selfAssessSection);

  // ============================================
  // Bridge Out
  // ============================================
  const bridgeOut = Bridge('out', 'Summary',
    'This rung practiced independent argumentation: building evidence from your own knowledge, crafting defensible theses, and writing commentary that does real analytical work.',
    '<strong>Rung 5 &mdash; Synthesis</strong> combines both skill sets: taking a position while strategically integrating provided sources to support it.'
  );
  container.appendChild(bridgeOut);

  // ============================================
  // Complete Rung Button
  // ============================================
  container.appendChild(CompleteRungButton(4, onComplete));
}
