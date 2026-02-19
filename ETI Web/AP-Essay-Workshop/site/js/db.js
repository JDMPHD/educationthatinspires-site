// ============================================
// Database Module (Firestore)
// ============================================
import { db } from './firebase-config.js';

const saveIndicator = document.getElementById('save-indicator');
let saveTimeout = null;
const pendingWrites = new Set();

function showSaved() {
  saveIndicator.classList.remove('hidden');
  saveIndicator.classList.add('visible');
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    saveIndicator.classList.remove('visible');
  }, 2000);
}

function trackWrite(promise) {
  pendingWrites.add(promise);
  promise.finally(() => pendingWrites.delete(promise));
  return promise;
}

// Get the user's document reference
function userDoc(uid) {
  return db.collection('users').doc(uid);
}

// Load all progress for a user
export async function loadProgress(uid) {
  try {
    const doc = await userDoc(uid).get();
    if (doc.exists) {
      return doc.data();
    }
    // Initialize new user
    const initial = {
      currentRung: 1,
      rungs: {
        1: { completed: false, activities: {} },
        2: { completed: false, activities: {} },
        3: { completed: false, activities: {} },
        4: { completed: false, activities: {} },
        5: { completed: false, activities: {} }
      }
    };
    await userDoc(uid).set(initial);
    return initial;
  } catch (err) {
    console.error('Error loading progress:', err);
    return null;
  }
}

// Save a response for a specific activity
export async function saveResponse(uid, rung, activityId, responseId, value) {
  try {
    const path = `rungs.${rung}.activities.${activityId}.${responseId}`;
    await trackWrite(userDoc(uid).update({ [path]: value }));
    showSaved();
  } catch (err) {
    console.error('Error saving response:', err);
  }
}

// Mark an activity as completed
export async function completeActivity(uid, rung, activityId) {
  try {
    const path = `rungs.${rung}.activities.${activityId}.completed`;
    await trackWrite(userDoc(uid).update({ [path]: true }));
    showSaved();
  } catch (err) {
    console.error('Error completing activity:', err);
  }
}

// Mark a rung as completed and unlock next
export async function completeRung(uid, rung) {
  try {
    const updates = { [`rungs.${rung}.completed`]: true };
    if (rung < 5) {
      updates.currentRung = rung + 1;
    }
    await trackWrite(userDoc(uid).update(updates));
    showSaved();
  } catch (err) {
    console.error('Error completing rung:', err);
  }
}

// Save checklist state
export async function saveChecklist(uid, rung, checklistId, items) {
  try {
    const path = `rungs.${rung}.activities.${checklistId}`;
    await trackWrite(userDoc(uid).update({ [path]: items }));
    showSaved();
  } catch (err) {
    console.error('Error saving checklist:', err);
  }
}

// Save ranking exercise selections
export async function saveRanking(uid, rung, rankingId, selections) {
  try {
    const path = `rungs.${rung}.activities.ranking-${rankingId}`;
    await trackWrite(userDoc(uid).update({ [path]: selections }));
    showSaved();
  } catch (err) {
    console.error('Error saving ranking:', err);
  }
}

// Save editable table data
export async function saveTableData(uid, rung, tableId, data) {
  try {
    const path = `rungs.${rung}.activities.${tableId}`;
    await trackWrite(userDoc(uid).update({ [path]: data }));
    showSaved();
  } catch (err) {
    console.error('Error saving table:', err);
  }
}

export async function flushPendingSaves() {
  if (!pendingWrites.size) return;
  await Promise.allSettled(Array.from(pendingWrites));
}
