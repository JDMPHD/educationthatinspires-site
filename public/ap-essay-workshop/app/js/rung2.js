// ============================================
// Rung 2 — Rhetorical Analysis Workshop
// ============================================
import {
  Passage, WritingArea, RevealPanel, RankingExercise, ComparisonView,
  EditableTable, Timer, Checklist, Activity, Bridge, SectionHeader,
  SplitPane, RungProgress, CompleteRungButton
} from './components.js';

const RUNG = 2;

export function render(container, savedData, ctx) {
  const saved = savedData?.activities || {};

  // ========== BRIDGE IN ==========
  container.appendChild(Bridge(
    'in',
    'Rung 2 — Rhetorical Analysis',
    'Rung 1 asked: <em>Is this argument convincing?</em> Rung 2 asks: <em>What is the author doing &mdash; line by line, word by word &mdash; to make it convincing?</em>',
    'The focus shifts from identifying arguments to analyzing the specific rhetorical choices an author makes to persuade.'
  ));

  // ========== WARM-UP — Rhetorical Analysis Practice (60 min) ==========

  const warmUpTimer = Timer(60);

  // -- Warm-Up Passage A --
  const warmUpPassageA = Passage(
    'Julian D. Michels, <em>A Conscious History of Consciousness</em>',
    'It&rsquo;s important to note, here, that the word <strong>prophecy</strong> is typically misunderstood. <strong>Prophets</strong> (Hebrew \u05E0\u05B0\u05D1\u05B4\u05D9\u05D0\u05B4\u05D9\u05DD, <em>navi&rsquo;im</em>) are not primarily seers or future-tellers. Their association with prediction arises because prophets often say some version of: <em>If we continue on this path, it will end in disaster.</em> But this is not magical foresight &mdash; it is logical reasoning. Prophets name the inevitable outcomes of collective self-deception or ecological rupture. For example, if a coastal tribe overfishes and drives its food supply into extinction, a natural consequence would be starvation &mdash; and it doesn&rsquo;t matter what that tribe&rsquo;s kings or cultural consensus believes about that. In this sense, prophets are the ones who expose the chasm and the clash between a peoples&rsquo; popular belief (supported by prevailing political powers) and reality itself.',
    'When human power structures clash with reality, reality ultimately wins. Prophets don&rsquo;t predict the future; they diagnose where human cultures, institutions, and power structures have forgotten their alignment with deeper truths. The example of overfishing is obvious &mdash; but often, self-destruction takes more subtle forms. The Hebraic prophet Amos, for example, was a shepherd who went up against the entire priestly establishment of his time to declare that God hated empty rituals that weren&rsquo;t accompanied by truth, justice, or real sacrifice. He saw the performance of spirituality as a desecration against true connection to the deeper spirit &mdash; one that would result in inevitable disaster. In his words: &ldquo;Let justice roll down like waters.&rdquo;',
    'Prophets often throw their voices against kings, priests, and the entire tribal consensus if it comes to it. They are almost never celebrated or popular among the masses in their own lifetimes. They are more often feared and disliked for their refusal to get along like everyone else. They uncompromisingly refuse to reinforce collective identities or convenient lies. In this sense, they are absolute <strong>heretics.</strong> However, prophetic warnings and truthtelling appear to serve a vital function for keeping a society healthy and on-track. They often lay the path for paradigm shifts to come, realigning the collective consciousness toward clarity and moral vision. They also remind us: neither authority nor group consensus decides what&rsquo;s true. Ultimately, the perception of truth is a matter of radical individual <strong>conscience</strong> &mdash; a word that originally shares a root with consciousness &mdash; and the prophetic conscience is thus another face of the heretical consciousness ensuring that truth is remembered by the tribe.'
  );

  const warmUpWritingA = WritingArea(RUNG, 'warmup', 'passage-a', {
    placeholder: 'Name 3\u20134 specific rhetorical choices Michels makes in this passage. For each, quote the relevant language and write one sentence about its effect...',
    minHeight: '200px',
    label: 'Your Annotations \u2014 Passage A'
  });
  if (saved.warmup?.['passage-a']) warmUpWritingA.loadValue(saved.warmup['passage-a']);

  const warmUpRevealA = RevealPanel('Reveal Guidance \u2014 Passage A', `
<h4>1. Redefinition (Logos)</h4>
<p>&ldquo;Prophets are not primarily seers or future-tellers&hellip; this is not magical foresight &mdash; it is logical reasoning.&rdquo;</p>
<p><em>Effect:</em> Michels opens by dismantling the reader&rsquo;s assumed definition. By replacing &ldquo;magical foresight&rdquo; with &ldquo;logical reasoning,&rdquo; he reframes prophets from mystical figures into something closer to public intellectuals &mdash; making the concept accessible and serious.</p>

<h4>2. Analogy (Logos + Pathos)</h4>
<p>&ldquo;If a coastal tribe overfishes and drives its food supply into extinction, a natural consequence would be starvation.&rdquo;</p>
<p><em>Effect:</em> The overfishing analogy grounds an abstract claim (prophets diagnose misalignment with reality) in a concrete, undeniable scenario. The reader cannot argue with the logic &mdash; starvation follows overfishing &mdash; and this transfers credibility to the larger claim about prophecy.</p>

<h4>3. Juxtaposition</h4>
<p>&ldquo;Neither authority nor group consensus decides what&rsquo;s true&rdquo; vs. the earlier &ldquo;supported by prevailing political powers.&rdquo;</p>
<p><em>Effect:</em> Michels sets up a recurring tension between institutional power and actual truth. The prophets stand on one side; kings, priests, and popular consensus stand on the other. This binary forces the reader to choose &mdash; and the passage makes it clear which side the author is on.</p>

<h4>4. Diction &mdash; &ldquo;heretics&rdquo;</h4>
<p>&ldquo;In this sense, they are absolute heretics.&rdquo;</p>
<p><em>Effect:</em> The word &ldquo;heretic&rdquo; typically carries negative connotations (deviance, danger, exile). By calling prophets heretics <em>as a compliment</em>, Michels inverts the word&rsquo;s charge. This forces the reader to reconsider whether the label &ldquo;heretic&rdquo; marks a threat &mdash; or a necessary corrective.
</p>`, warmUpWritingA);

  // -- Warm-Up Passage B --
  const warmUpPassageB = Passage(
    'Julian D. Michels, <em>Teleodynamic Sociology: A History of the World</em>',
    'What rose from those ruins was something new. Three Islamic dynasties &mdash; Ottoman, Safavid, and Mughal &mdash; built empires from the foundations of gunpowder and centralized bureaucracy. They came to realize that cannons changed more than just tactics. They changed the entire economy of power.',
    'The arithmetic was brutal. A medieval knight equipped himself. A feudal lord raised his own retainers. Gunpowder armies required something entirely different. The bronze alone for a single siege cannon cost more than a village produced in a year. Maintaining arsenals, powder mills, and professional infantry required rivers of silver and oceans of manpower.',
    'The old system couldn&rsquo;t bear the weight. Feudal lords, scattered across the countryside with their own armies and their own ambitions, were a liability. Power had to flow to the center or the state would shatter under the cost of its own defense.',
    'The Ottomans built their elite from Christian slave-boys &mdash; men with no family ties, no landed estates, loyal only to the throne. The Safavids made Shiism compulsory, turning religious identity into state loyalty in a Sunni world that surrounded them. The Mughals wove Hindu and Muslim elites into a single bureaucracy answering to Delhi.',
    'These were no longer medieval kingdoms. They were centralized states with professional armies, standardized laws, and bureaucracies answering to a single sovereign. Prototypes of the nation-state, built before Europe followed the same path.',
    'Centralization brought stability. But it also brought dependence. When power concentrates in one individual, everything rests on that individual&rsquo;s competence, character, and mortality. A brilliant sultan could reshape the world. A weak one could watch it crumble. And when the world itself changed &mdash; when new technologies emerged, when trade routes shifted, when the calculus of power transformed &mdash; an empire built on absolute authority often struggled to adapt.',
    'This tension between stability and flexibility would determine whether the Gunpowder Empires endured or fell.'
  );

  const warmUpWritingB = WritingArea(RUNG, 'warmup', 'passage-b', {
    placeholder: 'Name 3\u20134 specific rhetorical choices Michels makes in this passage. For each, quote the relevant language and write one sentence about its effect...',
    minHeight: '200px',
    label: 'Your Annotations \u2014 Passage B'
  });
  if (saved.warmup?.['passage-b']) warmUpWritingB.loadValue(saved.warmup['passage-b']);

  const warmUpRevealB = RevealPanel('Reveal Guidance \u2014 Passage B', `
<h4>1. Syntax &mdash; Parallel short sentences</h4>
<p>&ldquo;A medieval knight equipped himself. A feudal lord raised his own retainers.&rdquo;</p>
<p><em>Effect:</em> The clipped, parallel structure mirrors the simplicity of the old system. Each sentence is self-contained &mdash; just as each feudal actor was self-sufficient. The abrupt rhythm creates a sense of something small and manageable, which the following longer sentences about gunpowder costs will overwhelm.</p>

<h4>2. Metaphor &mdash; &ldquo;rivers of silver and oceans of manpower&rdquo;</h4>
<p><em>Effect:</em> The liquid metaphor transforms abstract costs into physical forces &mdash; vast, flowing, impossible to contain. &ldquo;Rivers&rdquo; and &ldquo;oceans&rdquo; suggest that the cost of gunpowder warfare is not just large but elemental, a force of nature that reorganizes everything in its path.</p>

<h4>3. Tricolon &mdash; three empires, three solutions</h4>
<p>&ldquo;The Ottomans built their elite from Christian slave-boys&hellip; The Safavids made Shiism compulsory&hellip; The Mughals wove Hindu and Muslim elites&hellip;&rdquo;</p>
<p><em>Effect:</em> Three parallel sentences, each starting with &ldquo;The [dynasty]&rdquo; and each describing a different solution to the same problem. The structure implies that centralization was inevitable &mdash; the only variable was method. The parallel form makes the argument feel airtight.</p>

<h4>4. Antithesis</h4>
<p>&ldquo;A brilliant sultan could reshape the world. A weak one could watch it crumble.&rdquo;</p>
<p><em>Effect:</em> The perfectly balanced opposition compresses the central paradox of centralization into two sentences. The symmetry itself enacts the argument: the system&rsquo;s strength and weakness are mirror images of each other.</p>
`, warmUpWritingB);

  // -- Warm-Up Thesis --
  const warmUpThesis = WritingArea(RUNG, 'warmup', 'thesis', {
    placeholder: 'Choose ONE of the two passages. Write a thesis statement that identifies 2\u20133 specific rhetorical choices and explains what they accomplish...',
    minHeight: '100px',
    label: 'Warm-Up Thesis \u2014 Choose one passage and write a rhetorical analysis thesis'
  });
  if (saved.warmup?.thesis) warmUpThesis.loadValue(saved.warmup.thesis);

  container.appendChild(Activity(
    null,
    'Warm-Up \u2014 Rhetorical Analysis Practice',
    '<p>Before the main activities, sharpen your eye on two passages. Read each one carefully, then identify the specific rhetorical strategies the author uses and explain their effects. Finish by drafting a thesis about one of the passages.</p>',
    warmUpTimer,
    SectionHeader('Passage A \u2014 On Prophecy'),
    warmUpPassageA,
    warmUpWritingA,
    warmUpRevealA,
    SectionHeader('Passage B \u2014 On Gunpowder and Power'),
    warmUpPassageB,
    warmUpWritingB,
    warmUpRevealB,
    SectionHeader('Draft a Thesis'),
    warmUpThesis
  ));

  // ========== ACTIVITY 1 — Rhetorical Choice Spotter ==========

  // -- Toolkit table (read-only reference) --
  const toolkitTable = EditableTable(RUNG, 'toolkit', ['Strategy', 'What It Is', 'What to Look For'], [
    ['<strong>Imagery</strong>', 'Language that appeals to the senses (sight, sound, touch, taste, smell)', 'Concrete, sensory details; descriptive language'],
    ['<strong>Diction</strong>', 'Word choice &mdash; the specific words an author selects', 'Connotation, formality level, emotionally charged words, technical terms'],
    ['<strong>Syntax / Structure</strong>', 'How sentences and passages are built', 'Sentence length, parallelism, lists, fragments, repetition, punctuation choices'],
    ['<strong>Tone</strong>', 'The author&rsquo;s attitude toward the subject', 'Shifts in formality, word connotation, level of certainty'],
    ['<strong>Ethos</strong>', 'Appeal to credibility or authority', 'Expert references, personal experience, confident or measured voice'],
    ['<strong>Pathos</strong>', 'Appeal to emotion', 'Vivid stories, charged language, appeals to values or fears'],
    ['<strong>Logos</strong>', 'Appeal to logic and reason', 'Data, cause-effect reasoning, definitions, logical structure'],
    ['<strong>Analogy / Metaphor</strong>', 'Comparing unlike things to illuminate an idea', '&ldquo;X is like Y,&rdquo; implied comparisons, extended metaphors'],
    ['<strong>Juxtaposition</strong>', 'Placing contrasting ideas side by side', 'Opposites, unexpected pairings, before/after structures']
  ]);

  // -- Salon passage --
  const shepardPassage = Passage(
    'Julian D. Michels, <em>The Rise of Reason</em>',
    '<em>Paris, 1765.</em> The city was blue at dusk. Not the blue of sky, but of porcelain and powder &mdash; fragile, perfumed, and rimmed with gold. This kind of light made candlefire seem urgent, as if it were not illuminating the night but defying it.',
    'Inside Madame Geoffrin&rsquo;s salon, the mirrors had already begun to glow. They were everywhere, these mirrors &mdash; set into panels, trimmed with gilt, nestled between paintings and candelabra. But it was not their frames that mattered. It was their arrangement. The room had been built to receive reflection. Thought. Light. Language.',
    'Voltaire was already seated, of course. Never centrally &mdash; he ruled from the diagonal, positioned like a bishop&rsquo;s gambit. His silver hair caught the fire as if it were part of it. He was speaking to a pair of marquises as though finishing a joke without a punchline. They laughed precisely &mdash; not at what was said, but at what was meant.',
    'Across the room, Diderot traced the rim of a wineglass as if distracted. He was not distracted. For Diderot, the room was an experiment: a precise application of heat to thought. One must not rush to conclusions. One must let the temperature rise.',
    'And Rousseau &mdash; Rousseau stood by the window, not disinterestedly, but because the air there was cooler, the light sharper. He preferred illumination unsoftened. He watched others from his window perch without judgment &mdash; which was of course its own form of judgment. The coat he wore was plain and his eyes were as sharp as a raven&rsquo;s.'
  );

  // -- Annotation writing area --
  const annotationArea = WritingArea(RUNG, 'act1', 'annotations', {
    placeholder: 'List the rhetorical choices you spotted. For each one, name the strategy, quote the relevant language, and write a one-sentence note on its effect...',
    minHeight: '200px',
    label: 'Your Annotations (find at least six distinct choices)'
  });
  if (saved.act1?.annotations) annotationArea.loadValue(saved.act1.annotations);

  // -- Model annotation reveal --
  const annotationModelHtml = `
<h4>1. Imagery (sensory detail)</h4>
<p>&ldquo;The city was blue at dusk. Not the blue of sky, but of porcelain and powder &mdash; fragile, perfumed, and rimmed with gold.&rdquo;</p>
<p><em>Effect:</em> The correction (&ldquo;Not the blue of sky, but of porcelain and powder&rdquo;) forces the reader to see a specific, artificial blue &mdash; not nature but culture. The adjectives &ldquo;fragile, perfumed, and rimmed with gold&rdquo; appeal to touch, smell, and sight simultaneously, establishing that this world is beautiful but constructed, decorative but breakable.</p>

<h4>2. Metaphor &mdash; &ldquo;bishop&rsquo;s gambit&rdquo;</h4>
<p>&ldquo;He ruled from the diagonal, positioned like a bishop&rsquo;s gambit.&rdquo;</p>
<p><em>Effect:</em> The chess metaphor casts Voltaire as a strategic player. In chess, the bishop attacks diagonally &mdash; indirectly, from a distance, never head-on. This mirrors Voltaire&rsquo;s famous rhetorical method: wit and implication rather than direct confrontation. A single metaphor encodes his entire intellectual persona.</p>

<h4>3. Juxtaposition &mdash; three philosophers&rsquo; positions</h4>
<p>Voltaire seated (diagonal, power); Diderot at the table (observation); Rousseau at the window (distance).</p>
<p><em>Effect:</em> Their physical positioning mirrors their intellectual positioning. Voltaire is embedded in the social game, Diderot is studying it as an experiment, Rousseau has placed himself apart from it. The spatial arrangement <em>is</em> the argument about their ideas &mdash; the passage lets the room do the philosophical work.</p>

<h4>4. Diction &mdash; &ldquo;precisely&rdquo;</h4>
<p>&ldquo;They laughed precisely &mdash; not at what was said, but at what was meant.&rdquo;</p>
<p><em>Effect:</em> The word &ldquo;precisely&rdquo; transforms laughter from spontaneous to calculated. In a single adverb, the author conveys that nothing in this salon is accidental &mdash; even humor operates on layers of unspoken meaning. The follow-up distinction (&ldquo;not at what was said, but at what was meant&rdquo;) reinforces that everything here has a surface and a depth.</p>

<h4>5. Syntax &mdash; fragmented sentences</h4>
<p>&ldquo;Thought. Light. Language.&rdquo;</p>
<p><em>Effect:</em> Three one-word sentences interrupt a flowing description of mirrors and candelabra. The abrupt shift in rhythm forces the reader to slow down and weight each word equally. The room isn&rsquo;t just decorated &mdash; it exists for these three things. The fragment structure also mirrors the reflection it describes: brief, sharp, concentrated.</p>

<h4>6. Negation as emphasis</h4>
<p>&ldquo;He was not distracted&rdquo; / &ldquo;not disinterestedly&rdquo; / &ldquo;without judgment &mdash; which was of course its own form of judgment.&rdquo;</p>
<p><em>Effect:</em> The author repeatedly tells us what things are <em>not</em> before revealing what they are. This creates a pattern of surface-then-depth: the obvious reading is corrected, training the reader to distrust appearances &mdash; the same lesson the salon itself teaches.</p>

<h4>7. Tone &mdash; sardonic omniscience</h4>
<p>The narrator knows everything &mdash; including what characters think (&ldquo;He was not distracted&rdquo;), what gestures mean (&ldquo;The joke was inclusion; its meaning was access&rdquo;), and what contradictions people carry (&ldquo;without judgment &mdash; which was of course its own form of judgment&rdquo;).</p>
<p><em>Effect:</em> The phrase &ldquo;of course&rdquo; is key: it is wry, knowing, and slightly amused. The narrator treats these Enlightenment luminaries with both respect and irony, observing them with the same penetrating attention they bring to the world. The tone itself models the salon&rsquo;s ethos: intelligence applied with precision and a faint smile.</p>`;

  const annotationReveal = RevealPanel('Reveal Completed Annotation Model', annotationModelHtml, annotationArea);

  container.appendChild(Activity(
    1,
    'Rhetorical Choice Spotter',
    '<p>Before you dive in, familiarize yourself with these common rhetorical strategies. You do not need to find every single one in every passage &mdash; but you should be able to recognize them when they appear.</p>',
    SectionHeader('Your Toolkit'),
    toolkitTable,
    SectionHeader('The Passage'),
    shepardPassage,
    annotationArea,
    annotationReveal
  ));

  // ========== ACTIVITY 2 — Thesis Builder Workshop ==========

  // -- Intro text --
  const thesisIntroHtml = '<p>A rhetorical analysis thesis must do more than restate the argument. It must name <strong>specific rhetorical choices</strong> and explain <strong>what they accomplish</strong>.</p>';

  const formulaPassage = Passage(
    'The Formula (Training Wheels)',
    '[Author] uses [rhetorical choice 1], [rhetorical choice 2], and [rhetorical choice 3] to [achieve a specific effect / advance a specific purpose].',
    'This formula is a starting point, not a ceiling. As you get comfortable, you will write thesis statements that move beyond this template.'
  );

  // -- Step 1: Fill in the blank --
  const thesisBlankArea = WritingArea(RUNG, 'act2', 'fill-blank', {
    placeholder: 'In his depiction of Madame Geoffrin\'s salon, Michels uses __________, __________, and __________ to __________.\n\nWrite at least two different versions...',
    minHeight: '160px',
    label: 'Step 1 — Fill in the Blank (write at least two versions)'
  });
  if (saved.act2?.['fill-blank']) thesisBlankArea.loadValue(saved.act2['fill-blank']);

  // -- Step 2: Ranking exercise --
  const rankingExercise = RankingExercise(RUNG, 'thesis-rank', [
    {
      id: 'A',
      label: 'Thesis A',
      text: '&ldquo;The author uses descriptive language and interesting metaphors to describe a salon in Paris where famous philosophers gathered.&rdquo;'
    },
    {
      id: 'B',
      label: 'Thesis B',
      text: '&ldquo;Michels uses imagery, metaphor, and juxtaposition to make the salon scene come alive for the reader.&rdquo;'
    },
    {
      id: 'C',
      label: 'Thesis C',
      text: '&ldquo;Through precisely orchestrated spatial positioning, chess metaphors, and a recurring pattern of negation-and-correction, Michels transforms a historical scene into an argument about the relationship between physical space and intellectual power &mdash; each philosopher&rsquo;s body reveals his philosophy.&rdquo;'
    }
  ], { A: 1, B: 2, C: 3 });

  // -- Ranking discussion reveal --
  const rankingDiscussionHtml = `
<p><strong>Thesis A (Weakest &mdash; Rank 1):</strong> This is mostly summary. &ldquo;Descriptive language&rdquo; and &ldquo;interesting metaphors&rdquo; are vague &mdash; they could describe any vivid passage. &ldquo;To describe a salon&rdquo; is not analysis; it tells us what the passage is <em>about</em>, not what the author is <em>doing</em> rhetorically.</p>
<p><strong>Thesis B (Middle &mdash; Rank 2):</strong> This names specific strategies (imagery, metaphor, juxtaposition), which is good. But &ldquo;come alive for the reader&rdquo; is too generic &mdash; it could describe any effective writing. The thesis identifies tools but doesn&rsquo;t explain what they <em>build</em>.</p>
<p><strong>Thesis C (Strongest &mdash; Rank 3):</strong> This names precise, specific strategies (&ldquo;spatial positioning,&rdquo; &ldquo;chess metaphors,&rdquo; &ldquo;negation-and-correction&rdquo;) and explains exactly what they accomplish &mdash; turning a scene into &ldquo;an argument about the relationship between physical space and intellectual power.&rdquo; The final clause (&ldquo;each philosopher&rsquo;s body reveals his philosophy&rdquo;) crystallizes the thesis with real precision.</p>`;

  const rankingReveal = RevealPanel('Reveal Discussion Notes', rankingDiscussionHtml);

  // -- Step 3: Write your own thesis --
  const thesisOwnArea = WritingArea(RUNG, 'act2', 'own-thesis', {
    placeholder: 'Write your own thesis statement from scratch — no fill-in-the-blank. Aim for the quality level of Thesis C...',
    minHeight: '140px',
    label: 'Step 3 — Write Your Own Thesis'
  });
  if (saved.act2?.['own-thesis']) thesisOwnArea.loadValue(saved.act2['own-thesis']);

  const thesisChecklist = Checklist(RUNG, 'thesis-check', [
    { id: '1', text: 'Does it name at least two specific rhetorical choices (not just &ldquo;rhetorical strategies&rdquo;)?' },
    { id: '2', text: 'Does it explain the <em>effect</em> or <em>purpose</em> of those choices (not just &ldquo;to persuade&rdquo;)?' },
    { id: '3', text: 'Does it avoid summarizing the argument?' }
  ]);
  if (saved['thesis-check']) thesisChecklist.loadStates(saved['thesis-check']);

  container.appendChild(Activity(
    2,
    'Thesis Builder Workshop',
    thesisIntroHtml,
    formulaPassage,
    thesisBlankArea,
    SectionHeader('Step 2 — Rank These Thesis Statements'),
    rankingExercise,
    rankingReveal,
    thesisOwnArea,
    thesisChecklist
  ));

  // ========== ACTIVITY 3 — The Evidence Sandwich ==========

  const sandwichDiagram = Passage(
    'The Evidence Sandwich Structure',
    '<strong>TOPIC SENTENCE</strong> &mdash; Claim about one rhetorical choice<br><strong>EVIDENCE (QUOTE)</strong> &mdash; Specific passage from the text<br><strong>COMMENTARY</strong> &mdash; Analyze HOW the quote works rhetorically. <em>This is where your analysis lives. Make it thick.</em><br><strong>CONNECTION</strong> &mdash; Link back to your thesis',
    'The most common mistake in rhetorical analysis: <strong>too much evidence, not enough commentary.</strong> Your commentary should be <em>longer</em> than your quote. You are not proving that the quote exists &mdash; you are explaining what it <em>does</em>.'
  );

  // -- Commentary vs. Summary comparison --
  const comparisonQuote = Passage(
    'The Quote',
    '&ldquo;He ruled from the diagonal, positioned like a bishop&rsquo;s gambit. His silver hair caught the fire as if it were part of it.&rdquo;'
  );

  const responseXHtml = `<p>&ldquo;Here, the author describes Voltaire sitting off to the side rather than in the center of the room. He compares Voltaire to a chess piece and mentions his silver hair in the firelight. This shows that Voltaire was an important figure at the salon.&rdquo;</p>`;
  const responseYHtml = `<p>&ldquo;Michels&rsquo;s chess metaphor positions Voltaire not just physically but strategically &mdash; the bishop in chess attacks from the diagonal, striking indirectly and from a distance. This mirrors Voltaire&rsquo;s famous rhetorical method: he never argues head-on but approaches obliquely, through wit and implication. The follow-up image &mdash; &lsquo;his silver hair caught the fire as if it were part of it&rsquo; &mdash; merges Voltaire with the room&rsquo;s defining element. He does not merely sit near the light; he absorbs it, becoming indistinguishable from the salon&rsquo;s intellectual energy. The effect is twofold: Voltaire is presented as both strategist and atmosphere &mdash; a man so deeply embedded in this world that he is part of its light.&rdquo;</p>`;

  const comparisonView = ComparisonView('Response X', responseXHtml, 'Response Y', responseYHtml);

  // -- Spot the difference writing area --
  const spotDiffArea = WritingArea(RUNG, 'act3', 'spot-diff', {
    placeholder: 'Which response is commentary and which is summary? Explain your reasoning...',
    minHeight: '100px',
    label: 'Which is commentary and which is summary?'
  });
  if (saved.act3?.['spot-diff']) spotDiffArea.loadValue(saved.act3['spot-diff']);

  const spotDiffReveal = RevealPanel('Reveal Answer', `
<p><strong>Response X is summary</strong> &mdash; it restates <em>what</em> the passage describes.</p>
<p><strong>Response Y is commentary</strong> &mdash; it analyzes <em>how</em> the list structure and sensory progression create a specific effect on the reader. Notice that Response Y is also significantly longer than the quote itself.</p>`, spotDiffArea);

  // -- Build a Paragraph Together (editable table) --
  const sandwichTable = EditableTable(RUNG, 'sandwich-builder', ['Layer', 'Your Writing'], [
    ['<strong>Topic Sentence</strong><br><em>Claim about one rhetorical choice</em>', ''],
    ['<strong>Evidence</strong><br><em>Quote from the passage</em>', ''],
    ['<strong>Commentary</strong><br><em>Analyze HOW this quote works (2-3 sentences)</em>', ''],
    ['<strong>Connection</strong><br><em>Link back to thesis/purpose</em>', '']
  ]);
  if (saved['sandwich-builder']) sandwichTable.loadData(saved['sandwich-builder']);

  // -- Model paragraph reveal --
  const modelParagraphHtml = `
<p>The spatial arrangement of the three philosophers is the passage&rsquo;s most sophisticated rhetorical move &mdash; a form of argument conducted entirely through physical positioning. Voltaire &ldquo;ruled from the diagonal,&rdquo; a chess metaphor that frames his intellect as strategic and indirect; he does not need the center because he commands from an angle, exactly as the bishop piece does. Diderot, by contrast, sits with the group but observes from within &mdash; &ldquo;traced the rim of a wineglass as if distracted. He was not distracted.&rdquo; The immediate correction forces the reader beneath the surface, mirroring Diderot&rsquo;s own method: the empiricist who watches, waits, and only then draws conclusions. Rousseau completes the triad from the window &mdash; the furthest point from the room&rsquo;s social core &mdash; &ldquo;because the air there was cooler, the light sharper.&rdquo; His preference for &ldquo;illumination unsoftened&rdquo; is simultaneously a physical detail and a philosophical statement: Rousseau distrusts the salon&rsquo;s gilded social games and seeks unmediated truth. By encoding each thinker&rsquo;s philosophy into where and how they occupy space, Michels makes the room itself into an argument about the relationship between power, knowledge, and positioning.</p>`;

  const modelParagraphReveal = RevealPanel('Reveal Model Paragraph', modelParagraphHtml);

  // -- Now You Try: own evidence sandwich --
  const ownSandwichArea = WritingArea(RUNG, 'act3', 'own-sandwich', {
    placeholder: 'Pick a different rhetorical choice from your Activity 1 annotations — one not covered in the model paragraph. Write your own Evidence Sandwich paragraph...',
    minHeight: '200px',
    label: 'Now You Try — Write Your Own Evidence Sandwich Paragraph'
  });
  if (saved.act3?.['own-sandwich']) ownSandwichArea.loadValue(saved.act3['own-sandwich']);

  const sandwichChecklist = Checklist(RUNG, 'sandwich-check', [
    { id: '1', text: 'Does my topic sentence make a claim about a rhetorical choice (not just name a topic)?' },
    { id: '2', text: 'Do I quote specific language from the passage?' },
    { id: '3', text: 'Is my commentary longer than my quote?' },
    { id: '4', text: 'Does my commentary explain HOW the choice works, not just WHAT the passage says?' },
    { id: '5', text: 'Does my final sentence connect back to the author&rsquo;s purpose or my thesis?' }
  ]);
  if (saved['sandwich-check']) sandwichChecklist.loadStates(saved['sandwich-check']);

  container.appendChild(Activity(
    3,
    'The Evidence Sandwich',
    '<p>Strong rhetorical analysis paragraphs follow a reliable structure. Think of it as a sandwich.</p>',
    sandwichDiagram,
    SectionHeader('Commentary vs. Summary: Spot the Difference'),
    comparisonQuote,
    comparisonView,
    spotDiffArea,
    spotDiffReveal,
    SectionHeader('Build a Paragraph Together'),
    sandwichTable,
    modelParagraphReveal,
    ownSandwichArea,
    sandwichChecklist
  ));

  // ========== PRACTICE PROMPT — Timed Essay ==========

  const mehraPassage = Passage(
    'Dr. Anya Mehra, lecture on technology and sustained attention (2019)',
    'We speak of paying attention as though it were a simple transaction &mdash; I give my focus, I receive understanding. But attention is not a payment. It is a habitat. The mind does not simply <em>direct</em> itself toward a task; it <em>settles into</em> a task the way an animal settles into a landscape, gradually adjusting its rhythms to the rhythms of the work. Deep reading requires a particular habitat: silence, or near-silence; the absence of urgent signals; a willingness to be bored for the first five minutes before the text begins to generate its own momentum. What our devices have done is not so much to weaken attention as to destroy its habitat. The notification, the vibration in the pocket, the small red badge on the screen &mdash; these are not distractions in the way a loud noise is a distraction. A loud noise is a single interruption. A notification is an invitation to an entirely different world, one algorithmically designed to be more immediately rewarding than whatever you are currently doing. To read deeply in the presence of a smartphone is like trying to sleep in a room where someone keeps opening the door to show you something interesting. It can be done, but it requires an unnatural act of will, a constant reassertion of purpose that is itself exhausting. The mind, like any creature, will eventually abandon a habitat that no longer supports its life.'
  );

  const promptText = Passage(
    'The Prompt',
    'Write an essay that analyzes the rhetorical choices Dr. Mehra makes to convey her argument about technology and sustained attention. In your essay, consider such rhetorical elements as imagery, analogy, diction, structure, and tone.'
  );

  const remindersHtml = `
<ul>
<li>Your thesis should identify specific rhetorical choices and their effects &mdash; not just restate Mehra&rsquo;s argument.</li>
<li>Use the Evidence Sandwich structure for each body paragraph.</li>
<li>Your commentary should be longer than your evidence.</li>
<li>Aim for at least three body paragraphs, each focused on a different rhetorical choice.</li>
</ul>`;

  const timer = Timer(40);

  const essayArea = WritingArea(RUNG, 'practice', 'essay', {
    placeholder: 'Write your complete rhetorical analysis essay here...',
    minHeight: '400px',
    label: 'Your Essay'
  });
  if (saved.practice?.essay) essayArea.loadValue(saved.practice.essay);

  const practiceSection = Activity(
    null,
    'Practice Prompt — Timed Essay',
    '<p>Now put it all together. Below is a new passage and a rhetorical analysis prompt. Give yourself <strong>40 minutes</strong> (the approximate timing for the AP Lang rhetorical analysis essay) and write a complete essay.</p>',
    mehraPassage,
    promptText,
    Passage(null, remindersHtml),
    timer,
    essayArea
  );
  // Override the activity number display for the practice prompt section
  const practiceHeader = practiceSection.querySelector('.activity-number');
  if (practiceHeader) practiceHeader.textContent = 'Practice';
  container.appendChild(practiceSection);

  // ========== SELF-ASSESSMENT CHECKLIST ==========

  // -- Thesis scoring --
  const thesisScoringTable = EditableTable(RUNG, 'self-thesis-score', ['Score', 'Description', 'Check Yourself'], [
    ['0', 'No thesis, or thesis only restates the argument (&ldquo;Mehra argues that phones are bad for attention&rdquo;)', 'Did I just summarize what she says?'],
    ['1', 'Thesis identifies specific rhetorical choices AND explains their effect/purpose', 'Did I name at least two specific strategies and say what they accomplish?']
  ]);

  const thesisScoreArea = WritingArea(RUNG, 'self-assess', 'thesis-score', {
    placeholder: 'My thesis score: 0 or 1',
    minHeight: '40px',
    label: 'My Thesis Score (0-1)'
  });
  if (saved['self-assess']?.['thesis-score']) thesisScoreArea.loadValue(saved['self-assess']['thesis-score']);

  // -- Evidence/Commentary scoring --
  const evidenceScoringTable = EditableTable(RUNG, 'self-evidence-score', ['Score', 'Description', 'Check Yourself'], [
    ['1', 'Evidence is vague or missing; commentary is mostly summary', 'Did I quote specific language? Or did I just gesture at the passage?'],
    ['2', 'Some specific evidence; commentary is uneven &mdash; sometimes analytical, sometimes summary', 'Do some of my paragraphs explain HOW while others just explain WHAT?'],
    ['3', 'Specific evidence throughout; commentary is mostly analytical but may lack consistency or depth in places', 'Is my commentary consistently explaining the rhetorical effect, not just identifying the strategy?'],
    ['4', 'Specific, well-chosen evidence; commentary is consistently analytical, well-developed, and clearly connected to the thesis', 'Is every paragraph a strong Evidence Sandwich? Is my commentary always longer than my quotes?']
  ]);

  const evidenceScoreArea = WritingArea(RUNG, 'self-assess', 'evidence-score', {
    placeholder: 'My evidence/commentary score: 1-4',
    minHeight: '40px',
    label: 'My Evidence/Commentary Score (0-4)'
  });
  if (saved['self-assess']?.['evidence-score']) evidenceScoreArea.loadValue(saved['self-assess']['evidence-score']);

  // -- Sophistication scoring --
  const sophScoringTable = EditableTable(RUNG, 'self-soph-score', ['Score', 'Description', 'Check Yourself'], [
    ['0', 'Analysis is straightforward; treats each rhetorical choice in isolation', 'Did I just go through a checklist of strategies?'],
    ['1', 'Analysis shows nuance: explains how choices work <em>together</em>, acknowledges complexity, uses precise language, or explores tensions in the text', 'Did I connect strategies to each other? Did I notice something surprising or complex about how the rhetoric works?']
  ]);

  const sophScoreArea = WritingArea(RUNG, 'self-assess', 'soph-score', {
    placeholder: 'My sophistication score: 0 or 1',
    minHeight: '40px',
    label: 'My Sophistication Score (0-1)'
  });
  if (saved['self-assess']?.['soph-score']) sophScoreArea.loadValue(saved['self-assess']['soph-score']);

  const totalScoreArea = WritingArea(RUNG, 'self-assess', 'total-score', {
    placeholder: 'My total: ___ / 6',
    minHeight: '40px',
    label: 'Total Score ( /6)'
  });
  if (saved['self-assess']?.['total-score']) totalScoreArea.loadValue(saved['self-assess']['total-score']);

  // -- Reflection Questions --
  const reflection1 = WritingArea(RUNG, 'self-assess', 'reflect-1', {
    placeholder: 'Which Evidence Sandwich paragraph is your strongest? What makes it strong?',
    minHeight: '100px',
    label: '1. Which Evidence Sandwich paragraph is your strongest? What makes it strong?'
  });
  if (saved['self-assess']?.['reflect-1']) reflection1.loadValue(saved['self-assess']['reflect-1']);

  const reflection2 = WritingArea(RUNG, 'self-assess', 'reflect-2', {
    placeholder: 'Which paragraph needs the most revision? What specifically would you change?',
    minHeight: '100px',
    label: '2. Which paragraph needs the most revision? What specifically would you change?'
  });
  if (saved['self-assess']?.['reflect-2']) reflection2.loadValue(saved['self-assess']['reflect-2']);

  const reflection3 = WritingArea(RUNG, 'self-assess', 'reflect-3', {
    placeholder: 'Look at your commentary sentences. Highlight every sentence that explains HOW a rhetorical choice works. Now highlight every sentence that summarizes WHAT the passage says. What is the ratio? (Aim for at least 3:1 commentary-to-summary.)',
    minHeight: '100px',
    label: '3. Commentary-to-summary ratio analysis'
  });
  if (saved['self-assess']?.['reflect-3']) reflection3.loadValue(saved['self-assess']['reflect-3']);

  const reflection4 = WritingArea(RUNG, 'self-assess', 'reflect-4', {
    placeholder: 'Did your thesis evolve as you wrote, or did you stick with your original?',
    minHeight: '100px',
    label: '4. Did your thesis evolve as you wrote, or did you stick with your original?'
  });
  if (saved['self-assess']?.['reflect-4']) reflection4.loadValue(saved['self-assess']['reflect-4']);

  const selfAssessSection = Activity(
    null,
    'Self-Assessment Checklist',
    '<p>After you finish your practice essay, evaluate your own work honestly.</p>',
    SectionHeader('Thesis (0-1 point)'),
    thesisScoringTable,
    thesisScoreArea,
    SectionHeader('Evidence and Commentary (0-4 points)'),
    evidenceScoringTable,
    evidenceScoreArea,
    SectionHeader('Sophistication (0-1 point)'),
    sophScoringTable,
    sophScoreArea,
    totalScoreArea,
    SectionHeader('Reflection Questions'),
    reflection1,
    reflection2,
    reflection3,
    reflection4
  );
  const selfAssessHeader = selfAssessSection.querySelector('.activity-number');
  if (selfAssessHeader) selfAssessHeader.textContent = 'Self-Assessment';
  container.appendChild(selfAssessSection);

  // ========== BRIDGE OUT ==========
  container.appendChild(Bridge(
    'out',
    'Summary',
    'Rhetorical analysis &mdash; identifying specific choices and explaining how they work on a reader &mdash; applies everywhere: speeches, articles, ads, film, any situation where someone is trying to move an audience.',
    '<strong>Rung 3</strong> shifts from analyzing other writers\' arguments to building your own, using multiple sources as evidence.'
  ));

  // ========== COMPLETE RUNG BUTTON ==========
  container.appendChild(CompleteRungButton(RUNG, ctx.onComplete));
}
