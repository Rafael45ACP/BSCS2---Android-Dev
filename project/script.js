let activeUserName = "";
let userProfilesDB = {}; // { "name": { liftHistory: [] } }

function loadUserProfilesDB() {
    const saved = localStorage.getItem("wl_profiles");
    if (saved) userProfilesDB = JSON.parse(saved);
}
function persistUserProfilesDB() {
    localStorage.setItem("wl_profiles", JSON.stringify(userProfilesDB));
}

function displaySelectorScreen() {
    document.getElementById("selector-screen").classList.remove("hidden");
    document.getElementById("profile-screen").classList.add("hidden");
    document.getElementById("header-name").classList.add("hidden");
}
function displayMainDashboard() {
    document.getElementById("selector-screen").classList.add("hidden");
    document.getElementById("profile-screen").classList.remove("hidden");
    document.getElementById("header-name").classList.remove("hidden");
    document.getElementById("current-username").textContent = activeUserName;
}

function initializeUserProfile() {
    const nameInput = document.getElementById("name-input").value.trim();
    if (!nameInput) return alert("Please enter a name");

    activeUserName = nameInput;
    if (!userProfilesDB[activeUserName]) userProfilesDB[activeUserName] = { liftHistory: [] };

    persistUserProfilesDB();
    displayMainDashboard();
    synchronizeAllUIComponents();

    // default today
    document.getElementById("date-input").value = new Date().toISOString().split('T')[0];
}

function switchUserProfile() {
    activeUserName = "";
    displaySelectorScreen();
    document.getElementById("name-input").value = "";
}

function getUserLiftHistory() {
    return activeUserName && userProfilesDB[activeUserName] ? userProfilesDB[activeUserName].liftHistory : [];
}
function saveUserLiftHistory(newHistory) {
    if (activeUserName) {
        userProfilesDB[activeUserName].liftHistory = newHistory;
        persistUserProfilesDB();
    }
}

function updateLatestPRDisplay() {
    const history = getUserLiftHistory();
    const container = document.getElementById("current-max-display");
    container.innerHTML = "";

    if (history.length === 0) {
        container.innerHTML = `<div class="col-span-2 text-center py-6 text-zinc-500">No maxes yet<br><span class="text-xs">add your first entry above</span></div>`;
        return;
    }

    const latest = [...history].sort((a,b) => new Date(b.date) - new Date(a.date))[0];
    container.innerHTML = `
        <div><div class="flex items-baseline gap-x-2"><span class="text-5xl font-bold text-white">${latest.lift1}</span><span class="text-emerald-400 text-xl">kg</span></div><p class="text-xs text-zinc-500 mt-1">CLEAN &amp; JERK</p></div>
        <div><div class="flex items-baseline gap-x-2"><span class="text-5xl font-bold text-white">${latest.lift2}</span><span class="text-emerald-400 text-xl">kg</span></div><p class="text-xs text-zinc-500 mt-1">SNATCH</p></div>
    `;
}

function initializePercentOptions() {
    const select = document.getElementById("percent-select");
    select.innerHTML = "";
    for (let i = 5; i <= 100; i += 5) {
        const opt = document.createElement("option");
        opt.value = i;
        opt.textContent = `${i}%`;
        select.appendChild(opt);
    }
    select.value = "70";
}

function refreshLoadCalculator() {
    const history = getUserLiftHistory();
    if (history.length === 0) {
        document.getElementById("lift1-result").textContent = "—";
        document.getElementById("lift2-result").textContent = "—";
        return;
    }
    const latest = [...history].sort((a,b) => new Date(b.date) - new Date(a.date))[0];
    const percent = parseFloat(document.getElementById("percent-select").value);

    const roundToHalf = n => Math.round(n * 2) / 2;
    const lift1Weight = roundToHalf(latest.lift1 * percent / 100);
    const lift2Weight = roundToHalf(latest.lift2 * percent / 100);

    document.getElementById("lift1-result").textContent = lift1Weight;
    document.getElementById("lift2-result").textContent = lift2Weight;
    document.getElementById("lift1-percent-label").innerHTML = `kg at <span class="text-emerald-400">${percent}%</span>`;
    document.getElementById("lift2-percent-label").innerHTML = `kg at <span class="text-emerald-400">${percent}%</span>`;
}

function buildHistoryTable() {
    const history = getUserLiftHistory();
    const tableContainer = document.getElementById("history-table-container");
    const noEntriesMsg = document.getElementById("no-entries-message");

    if (history.length === 0) {
        tableContainer.innerHTML = "";
        noEntriesMsg.classList.remove("hidden");
        return;
    }

    noEntriesMsg.classList.add("hidden");
    const sorted = [...history].sort((a,b) => new Date(a.date) - new Date(b.date));

    let html = `
        <table class="w-full text-left">
            <thead>
                <tr class="border-b border-zinc-700">
                    <th class="py-4 px-6 text-xs font-medium text-zinc-500">DATE</th>
                    <th class="py-4 px-6 text-xs font-medium text-zinc-500 text-right">C&amp;J</th>
                    <th class="py-4 px-6 text-xs font-medium text-zinc-500 text-right">% CHANGE</th>
                    <th class="py-4 px-6 text-xs font-medium text-zinc-500 text-right">SNATCH</th>
                    <th class="py-4 px-6 text-xs font-medium text-zinc-500 text-right">% CHANGE</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-zinc-800">
    `;

    for (let i = 0; i < sorted.length; i++) {
        const entry = sorted[i];
        let lift1Change = "—", lift2Change = "—";
        if (i > 0) {
            const prev = sorted[i-1];
            const lift1Delta = ((entry.lift1 - prev.lift1) / prev.lift1 * 100);
            const lift2Delta = ((entry.lift2 - prev.lift2) / prev.lift2 * 100);
            lift1Change = `<span class="${lift1Delta >= 0 ? 'text-emerald-400' : 'text-red-400'}">${lift1Delta >= 0 ? '+' : ''}${lift1Delta.toFixed(1)}%</span>`;
            lift2Change = `<span class="${lift2Delta >= 0 ? 'text-emerald-400' : 'text-red-400'}">${lift2Delta >= 0 ? '+' : ''}${lift2Delta.toFixed(1)}%</span>`;
        }
        html += `
            <tr class="hover:bg-zinc-800 transition-colors">
                <td class="py-5 px-6 font-medium">${entry.date}</td>
                <td class="py-5 px-6 text-right text-xl font-semibold">${entry.lift1}</td>
                <td class="py-5 px-6 text-right">${lift1Change}</td>
                <td class="py-5 px-6 text-right text-xl font-semibold">${entry.lift2}</td>
                <td class="py-5 px-6 text-right">${lift2Change}</td>
            </tr>
        `;
    }
    html += `</tbody></table>`;
    tableContainer.innerHTML = html;
}

function synchronizeAllUIComponents() {
    updateLatestPRDisplay();
    buildHistoryTable();
    refreshLoadCalculator();
}

function saveNewLiftEntry() {
    const date = document.getElementById("date-input").value;
    const lift1 = parseFloat(document.getElementById("lift1-input").value);
    const lift2 = parseFloat(document.getElementById("lift2-input").value);

    if (!date || !lift1 || !lift2) return alert("Please fill all fields");
    if (lift1 <= 0 || lift2 <= 0) return alert("Weights must be greater than 0");

    let history = getUserLiftHistory();

    // overwrite if same date
    if (history.some(e => e.date === date)) {
        if (!confirm("Entry for this date exists. Overwrite?")) return;
        history = history.filter(e => e.date !== date);
    }

    const previousLatest = history.length ? history.reduce((prev, curr) => new Date(curr.date) > new Date(prev.date) ? curr : prev) : null;

    history.push({ date, lift1, lift2 });
    saveUserLiftHistory(history);

    if (previousLatest) {
        const lift1Inc = ((lift1 - previousLatest.lift1) / previousLatest.lift1 * 100).toFixed(1);
        const lift2Inc = ((lift2 - previousLatest.lift2) / previousLatest.lift2 * 100).toFixed(1);
        alert(`✅ Entry saved!\n\nClean & Jerk: ${lift1Inc >= 0 ? '+' : ''}${lift1Inc}%\nSnatch: ${lift2Inc >= 0 ? '+' : ''}${lift2Inc}%`);
    } else {
        alert("✅ First entry saved! Great start!");
    }

    document.getElementById("lift1-input").value = "";
    document.getElementById("lift2-input").value = "";

    synchronizeAllUIComponents();
}

function bootApp() {
    loadUserProfilesDB();
    initializePercentOptions();
    displaySelectorScreen();

    // Enter key support
    document.getElementById("name-input").addEventListener("keypress", e => {
        if (e.key === "Enter") initializeUserProfile();
    });
}

window.onload = bootApp;