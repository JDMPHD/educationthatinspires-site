// ============================================
// Reusable UI Components
// ============================================
import { saveResponse, saveTableData, saveChecklist } from './db.js';
import { getCurrentUser } from './auth.js';

// ---- Helper ----
function el(tag, attrs = {}, ...children) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'className') e.className = v;
    else if (k === 'innerHTML') e.innerHTML = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2).toLowerCase(), v);
    else e.setAttribute(k, v);
  }
  for (const child of children) {
    if (typeof child === 'string') e.appendChild(document.createTextNode(child));
    else if (child) e.appendChild(child);
  }
  return e;
}

function uid() { return getCurrentUser()?.uid; }

// ---- Passage ----
export function Passage(source, ...paragraphs) {
  const container = el('div', { className: 'passage' });
  if (source) container.appendChild(el('div', { className: 'passage-source' }, source));
  for (const p of paragraphs) {
    container.appendChild(el('p', { innerHTML: p }));
  }
  return container;
}

// ---- Writing Area ----
export function WritingArea(rung, activityId, responseId, options = {}) {
  const { placeholder = 'Write your response here...', minHeight = '120px', label = '' } = options;
  const container = el('div', { className: 'writing-area-container' });

  if (label) container.appendChild(el('div', { className: 'writing-area-label' }, label));

  // If placeholder is long (has line breaks or > 80 chars), show it as persistent prompt above textarea
  const isLongPrompt = placeholder.includes('\n') || placeholder.length > 80;
  const textareaPlaceholder = isLongPrompt ? 'Write your response here...' : placeholder;

  if (isLongPrompt && placeholder !== 'Write your response here...') {
    container.appendChild(el('div', { className: 'writing-prompt', innerHTML: placeholder.replace(/\n/g, '<br>') }));
  }

  const textarea = el('textarea', {
    className: 'writing-area',
    placeholder: textareaPlaceholder,
    style: `min-height: ${minHeight}`,
    'data-rung': rung,
    'data-activity': activityId,
    'data-response': responseId
  });

  const wordCount = el('span', { className: 'word-count' }, '0 words');
  const meta = el('div', { className: 'writing-meta' }, wordCount);

  let debounce = null;
  let lastSavedValue = '';

  function updateWordCount(value) {
    const words = value.trim().split(/\s+/).filter(w => w).length;
    wordCount.textContent = `${words} word${words !== 1 ? 's' : ''}`;
  }

  function autoExpand() {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  function persistNow() {
    clearTimeout(debounce);
    const value = textarea.value;
    if (value === lastSavedValue) return;
    const currentUid = uid();
    if (!currentUid) return;
    lastSavedValue = value;
    saveResponse(currentUid, rung, activityId, responseId, value);
  }

  textarea.addEventListener('input', () => {
    // Auto-expand
    autoExpand();
    // Word count
    updateWordCount(textarea.value);
    // Auto-save
    clearTimeout(debounce);
    debounce = setTimeout(persistNow, 1000);
    // Dispatch custom event for reveal panels
    textarea.dispatchEvent(new CustomEvent('writing-changed', { bubbles: true, detail: { hasContent: textarea.value.trim().length > 0 } }));
  });
  textarea.addEventListener('blur', persistNow);

  container.appendChild(textarea);
  container.appendChild(meta);

  // Method to load saved data
  container.loadValue = (val) => {
    if (typeof val !== 'string') return;
    textarea.value = val;
    lastSavedValue = val;
    autoExpand();
    updateWordCount(val);
    textarea.dispatchEvent(new CustomEvent('writing-changed', { bubbles: true, detail: { hasContent: val.trim().length > 0 } }));
  };

  container.getValue = () => textarea.value;
  container.textarea = textarea;

  return container;
}

// ---- Reveal Panel ----
export function RevealPanel(title, contentHtml, linkedWritingArea = null) {
  const container = el('div', { className: 'reveal-panel' });
  const btn = el('button', { className: 'btn btn-reveal', disabled: linkedWritingArea ? 'true' : undefined },
    title || 'Reveal Model Response');
  const content = el('div', { className: 'reveal-content hidden', innerHTML: contentHtml });

  btn.addEventListener('click', () => {
    content.classList.remove('hidden');
    btn.classList.add('hidden');
  });

  // Listen for writing in linked area
  if (linkedWritingArea) {
    const ta = linkedWritingArea.textarea || linkedWritingArea.querySelector?.('textarea');
    if (ta) {
      ta.addEventListener('writing-changed', (e) => {
        btn.disabled = !e.detail.hasContent;
      });
    }
  }

  container.appendChild(btn);
  container.appendChild(content);
  return container;
}

// ---- Ranking Exercise ----
export function RankingExercise(rung, activityId, items, correctOrder = null) {
  // items: [{ id, label, text }]
  const container = el('div', { className: 'ranking-exercise' });

  const itemEls = items.map((item, i) => {
    const select = el('select', { className: 'ranking-select' });
    select.appendChild(el('option', { value: '' }, '—'));
    for (let n = 1; n <= items.length; n++) {
      select.appendChild(el('option', { value: n }, String(n)));
    }
    const row = el('div', { className: 'ranking-item' },
      select,
      el('div', { className: 'ranking-text' },
        el('div', { className: 'ranking-label' }, item.label),
        el('p', { innerHTML: item.text })
      )
    );
    row.select = select;
    row.itemId = item.id;
    return row;
  });

  itemEls.forEach(r => container.appendChild(r));

  if (correctOrder) {
    const checkBtn = el('button', { className: 'btn btn-small mt-2' }, 'Check My Ranking');
    const result = el('div', { className: 'reveal-content hidden mt-1' });

    checkBtn.addEventListener('click', () => {
      const answers = itemEls.map(r => ({ id: r.itemId, rank: parseInt(r.select.value) || 0 }));
      let correct = true;
      for (const a of answers) {
        if (a.rank !== correctOrder[a.id]) { correct = false; break; }
      }
      result.innerHTML = correct
        ? '<strong>Correct.</strong>'
        : `<strong>Not quite.</strong> Suggested ranking: ${Object.entries(correctOrder).map(([id, rank]) => `${id} = ${rank}`).join(', ')}`;
      result.classList.remove('hidden');
    });

    container.appendChild(checkBtn);
    container.appendChild(result);
  }

  return container;
}

// ---- Comparison View ----
export function ComparisonView(leftTitle, leftHtml, rightTitle, rightHtml) {
  return el('div', { className: 'comparison' },
    el('div', { className: 'comparison-panel' },
      el('div', { className: 'comparison-panel-title' }, leftTitle),
      el('div', { innerHTML: leftHtml })
    ),
    el('div', { className: 'comparison-panel' },
      el('div', { className: 'comparison-panel-title' }, rightTitle),
      el('div', { innerHTML: rightHtml })
    )
  );
}

// ---- Editable Table ----
export function EditableTable(rung, tableId, headers, rows, modelData = null) {
  const container = el('div', { className: 'editable-table-container' });
  const table = el('table', { className: 'editable-table' });
  let debounce = null;
  let lastSavedSerialized = null;

  // Header row
  const thead = el('thead');
  const headerRow = el('tr');
  headers.forEach(h => headerRow.appendChild(el('th', {}, h)));
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Body rows
  const tbody = el('tbody');
  function collectData() {
    const data = [];
    tbody.querySelectorAll('tr').forEach(r => {
      const rowData = [];
      r.querySelectorAll('td[contenteditable]').forEach(c => rowData.push(c.textContent));
      if (rowData.length) data.push(rowData);
    });
    return data;
  }

  function persistTable() {
    clearTimeout(debounce);
    const currentUid = uid();
    if (!currentUid) return;
    const data = collectData();
    const serialized = JSON.stringify(data);
    if (serialized === lastSavedSerialized) return;
    lastSavedSerialized = serialized;
    saveTableData(currentUid, rung, tableId, data);
  }

  rows.forEach((row, ri) => {
    const tr = el('tr');
    row.forEach((cell, ci) => {
      const isEditable = cell === '';
      const td = el('td', isEditable ? { contenteditable: 'true' } : { innerHTML: cell });
      if (isEditable) {
        td.addEventListener('input', () => {
          clearTimeout(debounce);
          debounce = setTimeout(persistTable, 1000);
        });
        td.addEventListener('blur', persistTable);
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.appendChild(table);

  // Model reveal
  if (modelData) {
    const revealBtn = el('button', { className: 'btn btn-reveal mt-2' }, 'Reveal Completed Model');
    const modelContainer = el('div', { className: 'reveal-content hidden' });
    const modelTable = el('table', { className: 'editable-table' });
    const mHead = el('thead');
    const mHr = el('tr');
    headers.forEach(h => mHr.appendChild(el('th', {}, h)));
    mHead.appendChild(mHr);
    modelTable.appendChild(mHead);
    const mBody = el('tbody');
    modelData.forEach(row => {
      const tr = el('tr');
      row.forEach(cell => tr.appendChild(el('td', { innerHTML: cell })));
      mBody.appendChild(tr);
    });
    modelTable.appendChild(mBody);
    modelContainer.appendChild(modelTable);
    revealBtn.addEventListener('click', () => {
      modelContainer.classList.remove('hidden');
      revealBtn.classList.add('hidden');
    });
    container.appendChild(revealBtn);
    container.appendChild(modelContainer);
  }

  // Load saved data
  container.loadData = (data) => {
    if (!data) return;
    const editableCells = tbody.querySelectorAll('td[contenteditable]');
    const flat = data.flat();
    editableCells.forEach((cell, i) => {
      if (flat[i] !== undefined && flat[i] !== null) {
        cell.textContent = flat[i];
      }
    });
    lastSavedSerialized = JSON.stringify(collectData());
  };

  lastSavedSerialized = JSON.stringify(collectData());

  return container;
}

// ---- Timer ----
export function Timer(minutes) {
  let totalSeconds = minutes * 60;
  let remaining = totalSeconds;
  let interval = null;
  let running = false;

  const display = el('span', { className: 'timer-display' }, formatTime(remaining));
  const startBtn = el('button', { className: 'btn btn-small' }, 'Start');
  const resetBtn = el('button', { className: 'btn btn-small' }, 'Reset');

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  }

  function tick() {
    remaining--;
    display.textContent = formatTime(remaining);
    if (remaining <= 0) {
      clearInterval(interval);
      running = false;
      display.style.color = 'var(--warning)';
      startBtn.textContent = 'Done';
      startBtn.disabled = true;
    }
  }

  startBtn.addEventListener('click', () => {
    if (running) {
      clearInterval(interval);
      running = false;
      startBtn.textContent = 'Resume';
    } else {
      interval = setInterval(tick, 1000);
      running = true;
      startBtn.textContent = 'Pause';
    }
  });

  resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    running = false;
    remaining = totalSeconds;
    display.textContent = formatTime(remaining);
    display.style.color = 'var(--accent)';
    startBtn.textContent = 'Start';
    startBtn.disabled = false;
  });

  return el('div', { className: 'timer-container' },
    display,
    el('div', { className: 'timer-controls' }, startBtn, resetBtn)
  );
}

// ---- Checklist ----
export function Checklist(rung, checklistId, items) {
  // items: [{ id, text }]
  const container = el('div', { className: 'checklist' });

  items.forEach((item) => {
    const checkbox = el('input', { type: 'checkbox', id: `check-${checklistId}-${item.id}` });
    const label = el('label', { className: 'checklist-label', for: `check-${checklistId}-${item.id}`, innerHTML: item.text });

    checkbox.addEventListener('change', () => {
      const states = {};
      container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        states[cb.id] = cb.checked;
      });
      if (uid()) saveChecklist(uid(), rung, checklistId, states);
    });

    container.appendChild(el('div', { className: 'checklist-item' }, checkbox, label));
  });

  container.loadStates = (states) => {
    if (!states) return;
    for (const [id, checked] of Object.entries(states)) {
      const cb = container.querySelector(`#${id}`);
      if (cb) cb.checked = checked;
    }
  };

  container.allChecked = () => {
    const boxes = container.querySelectorAll('input[type="checkbox"]');
    return boxes.length > 0 && Array.from(boxes).every(cb => cb.checked);
  };

  return container;
}

// ---- Activity Wrapper ----
export function Activity(number, title, instructions, ...children) {
  const container = el('div', { className: 'activity fade-in' });
  const headerChildren = [];
  if (number) headerChildren.push(el('span', { className: 'activity-number' }, `Activity ${number}`));
  headerChildren.push(el('span', { className: 'activity-title' }, title));
  const header = el('div', { className: 'activity-header' }, ...headerChildren);
  container.appendChild(header);
  if (instructions) {
    container.appendChild(el('div', { className: 'activity-instructions', innerHTML: instructions }));
  }
  for (const child of children) {
    if (child) container.appendChild(child);
  }
  return container;
}

// ---- Bridge Section ----
export function Bridge(type, title, ...contentParagraphs) {
  const container = el('div', { className: 'bridge' });
  container.appendChild(el('div', { className: 'bridge-label' }, type === 'in' ? 'Bridge In' : 'Bridge Out'));
  container.appendChild(el('h2', {}, title));
  for (const p of contentParagraphs) {
    container.appendChild(el('p', { innerHTML: p }));
  }
  return container;
}

// ---- Section Header (for practice prompts, self-assessment) ----
export function SectionHeader(title) {
  return el('div', { className: 'activity-header' },
    el('span', { className: 'activity-title' }, title)
  );
}

// ---- Split Pane ----
export function SplitPane(leftContent, rightContent) {
  return el('div', { className: 'split-pane' }, leftContent, rightContent);
}

// ---- Rung Progress Bar ----
export function RungProgress(totalSteps, currentStep) {
  const bar = el('div', { className: 'rung-progress' });
  for (let i = 0; i < totalSteps; i++) {
    const cls = i < currentStep ? 'rung-progress-step done' : (i === currentStep ? 'rung-progress-step current' : 'rung-progress-step');
    bar.appendChild(el('div', { className: cls }));
  }
  return bar;
}

// ---- Complete Rung Button ----
export function CompleteRungButton(rung, onComplete) {
  const btn = el('button', { className: 'btn btn-complete mt-3' }, `Complete Rung ${rung}`);
  btn.addEventListener('click', () => {
    btn.disabled = true;
    btn.textContent = 'Completed';
    if (onComplete) onComplete();
  });
  return btn;
}

// ---- Earlier Work Panel ----
// Shows saved writing from previous rungs in a collapsible panel
export function EarlierWorkPanel(currentRung, savedData) {
  if (currentRung <= 1 || !savedData) return el('div');

  const wrapper = el('div', { className: 'earlier-work-panel' });
  const toggle = el('button', { className: 'earlier-work-toggle' }, '📄 My Earlier Writing');
  const content = el('div', { className: 'earlier-work-content hidden' });

  let loaded = false;
  toggle.addEventListener('click', () => {
    content.classList.toggle('hidden');
    toggle.classList.toggle('open');
    if (!loaded) {
      loaded = true;
      for (let r = 1; r < currentRung; r++) {
        const rungData = savedData?.rungs?.[r]?.activities;
        if (!rungData) continue;
        const rungSection = el('div', { className: 'earlier-work-rung' });
        rungSection.appendChild(el('h4', {}, `Rung ${r}`));
        let hasContent = false;
        for (const [actId, responses] of Object.entries(rungData)) {
          for (const [respId, value] of Object.entries(responses)) {
            if (typeof value === 'string' && value.trim().length > 20) {
              hasContent = true;
              const entry = el('div', { className: 'earlier-work-entry' });
              entry.appendChild(el('div', { className: 'earlier-work-id' }, `${actId} / ${respId}`));
              entry.appendChild(el('div', { className: 'earlier-work-text' }, value.slice(0, 500) + (value.length > 500 ? '...' : '')));
              rungSection.appendChild(entry);
            }
          }
        }
        if (hasContent) content.appendChild(rungSection);
      }
      if (!content.children.length) {
        content.appendChild(el('p', { className: 'text-muted' }, 'No earlier writing saved yet.'));
      }
    }
  });

  wrapper.appendChild(toggle);
  wrapper.appendChild(content);
  return wrapper;
}
