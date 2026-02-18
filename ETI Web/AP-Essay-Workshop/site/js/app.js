// ============================================
// Main Application
// ============================================
import { onUserReady, getCurrentUser } from './auth.js';
import { loadProgress, completeRung, flushPendingSaves } from './db.js';
import { EarlierWorkPanel } from './components.js';

// Rung modules will be loaded dynamically
const rungModules = {};
let progress = null;
let activeRung = null;
let navRequestId = 0;

const container = document.getElementById('rung-container');
const navItems = document.querySelectorAll('.rung-nav-item');
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');

// ---- Sidebar Toggle ----
sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  sidebar.classList.toggle('open');
});

// ---- Navigation ----
navItems.forEach(item => {
  item.addEventListener('click', () => {
    const rung = parseInt(item.dataset.rung);
    if (item.classList.contains('locked')) return;
    navigateToRung(rung);
  });
});

function updateNavState() {
  if (!progress) return;
  navItems.forEach(item => {
    const rung = parseInt(item.dataset.rung);
    const rungData = progress.rungs[rung];

    item.classList.remove('locked', 'active', 'completed');

    if (rungData?.completed) {
      item.classList.add('completed');
    }

    // Unlock logic: rung 1 always open, others need previous completed
    if (rung > 1 && !progress.rungs[rung - 1]?.completed) {
      item.classList.add('locked');
    }

    if (rung === activeRung) {
      item.classList.add('active');
    }
  });
}

async function refreshProgressFromServer() {
  const user = getCurrentUser();
  if (!user) return;
  const latest = await loadProgress(user.uid);
  if (latest) {
    progress = latest;
  }
}

async function navigateToRung(rung) {
  const requestId = ++navRequestId;
  activeRung = rung;
  updateNavState();
  container.innerHTML = '';
  container.classList.add('fade-in');

  try {
    // Dynamic import of rung module
    if (!rungModules[rung]) {
      const module = await import(`./rung${rung}.js`);
      rungModules[rung] = module;
    }
    if (requestId !== navRequestId) return;

    // Ensure in-flight autosaves complete before loading the destination rung.
    await flushPendingSaves();
    if (requestId !== navRequestId) return;

    // Refresh progress before render so navigating away/back reflects latest saved work.
    await refreshProgressFromServer();
    if (requestId !== navRequestId) return;
    updateNavState();

    // Show earlier writing panel for rungs 2+
    if (rung > 1 && progress) {
      container.appendChild(EarlierWorkPanel(rung, progress));
    }

    const rungData = progress?.rungs?.[rung] || { activities: {} };
    rungModules[rung].render(container, rungData, {
      onComplete: async () => {
        const user = getCurrentUser();
        if (user) {
          await completeRung(user.uid, rung);
          progress.rungs[rung].completed = true;
          if (rung < 5) {
            progress.currentRung = rung + 1;
          }
          updateNavState();
        }
      },
      uid: getCurrentUser()?.uid,
      rung
    });
  } catch (err) {
    console.error(`Error loading rung ${rung}:`, err);
    container.innerHTML = `<div class="bridge"><h2>Rung ${rung}</h2><p>Loading content... If this persists, check the console for errors.</p></div>`;
  }
}

// ---- Initialize ----
onUserReady(async (user) => {
  progress = await loadProgress(user.uid);
  if (progress) {
    updateNavState();
    // Navigate to the current rung or rung 1
    const startRung = progress.currentRung || 1;
    navigateToRung(startRung);
  }
});
