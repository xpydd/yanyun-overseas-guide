const {
  buildsData,
  dailyTasksData,
  faqData,
  terminology,
  versionUpdates,
  mapData,
} = window.GuideData;
const articlesData = window.GuideArticles || [];

const routeData = {
  story: {
    eyebrow: "Recommended Route",
    title: "Story Focus",
    body:
      "Perfect for first-time overseas players. Prioritize main quests, collect waypoints, basic resources, and light side quests along the way.",
    steps: ["Progress main quest until core systems unlock", "Unlock waypoints in each new area first", "Only take short-chain side quests"],
  },
  combat: {
    eyebrow: "Growth Route",
    title: "Combat Growth",
    body:
      "For players who enjoy challenging bosses, dungeons, and build optimization. Focus on recording skill rotations, break windows, and gear alternatives.",
    steps: ["Lock in one main combat style first", "Train dodge, parry, and counter timing", "Record specific pain points after each failure"],
  },
  social: {
    eyebrow: "Casual Route",
    title: "Casual Social",
    body:
      "For players with fragmented time who want to slowly experience the open world. Break goals into completable chunks while preserving the wuxia atmosphere.",
    steps: ["Set only one regional goal per day", "Prioritize encounters and photo spots", "Save material sorting for before logout"],
  },
};

let currentDailyMode = 'quick';
const STORAGE_KEYS = {
  dailyQuick: "dailyProgress_quick",
  dailyDeep: "dailyProgress_deep",
  favoriteBuilds: "favoriteBuildIds",
  compareBuilds: "compareBuildIds",
};

function readStoredArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value.map(String) : [];
  } catch {
    return [];
  }
}

function saveStoredSet(key, set) {
  localStorage.setItem(key, JSON.stringify(Array.from(set)));
}

function openModal(modalElement) {
  modalElement.classList.add("active");
  modalElement.setAttribute("aria-hidden", "false");
}

function closeModal(modalElement) {
  modalElement.classList.remove("active");
  modalElement.setAttribute("aria-hidden", "true");
}

function resetGlobalSearch() {
  globalSearchInput.value = "";
  searchResults.innerHTML = "";
}

const tabs = document.querySelectorAll(".route-tab");
const card = document.querySelector("#route-card");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const route = routeData[tab.dataset.route];
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    card.innerHTML = `
      <p class="route-eyebrow">${route.eyebrow}</p>
      <h3>${route.title}</h3>
      <p>${route.body}</p>
      <ol>${route.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
    `;
  });
});

const dailyBoard = document.querySelector(".daily-board");

function renderDailyTasks() {
  const tasks = dailyTasksData[currentDailyMode];
  const totalTime = tasks.reduce((sum, t) => sum + parseInt(t.time), 0);
  
  dailyBoard.innerHTML = `
    <div class="daily-mode-switch">
      <button class="mode-btn ${currentDailyMode === 'quick' ? 'active' : ''}" data-mode="quick">
        45-Min Quick (${dailyTasksData.quick.length} tasks)
      </button>
      <button class="mode-btn ${currentDailyMode === 'deep' ? 'active' : ''}" data-mode="deep">
        120-Min Deep (${dailyTasksData.deep.length} tasks)
      </button>
    </div>
    <div class="daily-tasks">
      ${tasks.map(task => `
        <label class="daily-task-item">
          <input type="checkbox" data-id="${task.id}" />
          <div class="task-content">
            <span class="task-text">${task.text}</span>
            <span class="task-time">${task.time}</span>
          </div>
          <span class="task-note">${task.note}</span>
        </label>
      `).join("")}
    </div>
  `;
  
  dailyBoard.querySelectorAll(".mode-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      currentDailyMode = btn.dataset.mode;
      renderDailyTasks();
    });
  });
  
  dailyBoard.querySelectorAll("input").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      saveDailyProgress();
    });
  });
  
  loadDailyProgress();
}

function saveDailyProgress() {
  const checked = Array.from(dailyBoard.querySelectorAll("input:checked")).map(cb => cb.dataset.id);
  localStorage.setItem(`dailyProgress_${currentDailyMode}`, JSON.stringify(checked));
}

function loadDailyProgress() {
  const saved = localStorage.getItem(`dailyProgress_${currentDailyMode}`);
  if (saved) {
    const checked = JSON.parse(saved);
    checked.forEach(id => {
      const checkbox = dailyBoard.querySelector(`input[data-id="${id}"]`);
      if (checkbox) checkbox.checked = true;
    });
  }
}

renderDailyTasks();

function renderVersionUpdates() {
  const timeline = document.querySelector(".timeline");
  timeline.innerHTML = versionUpdates.map(update => `
    <article class="update-${update.type}">
      <time>${update.date}</time>
      <div class="update-header">
        <span class="update-version">${update.version || ''}</span>
        <h3>${update.title}</h3>
      </div>
      <p>${update.description}</p>
      <div class="update-tags">
        ${update.affects.map(item => `<span>${item}</span>`).join("")}
      </div>
      <a class="source-link" href="${update.url}" target="_blank" rel="noopener noreferrer">Source: ${update.source}</a>
    </article>
  `).join("");
}

renderVersionUpdates();

const modal = document.getElementById("terminology-modal");
const terminologyLink = document.getElementById("terminology-link");
const terminologyClose = modal.querySelector(".modal-close");
const searchInput = document.getElementById("terminology-search");
const terminologyList = document.getElementById("terminology-list");

function renderTerminology(terms) {
  terminologyList.innerHTML = terms.map(term => `
    <div class="term-item">
      <div class="term-header">
        <span class="term-en">${term.en}</span>
        <span class="term-cn">${term.cn}</span>
        <span class="term-category">${term.category}</span>
      </div>
      <p class="term-description">${term.description}</p>
    </div>
  `).join("");
}

terminologyLink.addEventListener("click", (e) => {
  if (!terminologyLink.getAttribute("href").startsWith("#")) return;
  e.preventDefault();
  openModal(modal);
  renderTerminology(terminology);
  searchInput.focus();
});

terminologyClose.addEventListener("click", () => {
  closeModal(modal);
  searchInput.value = "";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal(modal);
    searchInput.value = "";
  }
});

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = terminology.filter(term => 
    term.en.toLowerCase().includes(query) || 
    term.cn.includes(query) ||
    term.category.toLowerCase().includes(query)
  );
  renderTerminology(filtered);
});

document.getElementById("copy-daily-btn").addEventListener("click", () => {
  const tasks = dailyTasksData[currentDailyMode];
  const text = tasks.map((task, i) => `${i + 1}. ${task.text} (${task.time}) - ${task.note}`).join("\n");
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById("copy-daily-btn");
    const originalText = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => btn.textContent = originalText, 2000);
  });
});

const buildsModal = document.getElementById("builds");
const buildsLink = document.getElementById("builds-link");
const buildsList = document.getElementById("builds-list");
const buildsSearch = document.getElementById("builds-search");
const buildsTier = document.getElementById("builds-tier");
const buildComparePanel = document.getElementById("build-compare-panel");
const selectedBuildIds = new Set(readStoredArray(STORAGE_KEYS.compareBuilds));
const favoriteBuildIds = new Set(readStoredArray(STORAGE_KEYS.favoriteBuilds));
const mapModal = document.getElementById("map");
const mapLink = document.getElementById("map-link");
const mapList = document.getElementById("map-list");
const dataModal = document.getElementById("data");
const dataLink = document.getElementById("data-link");
const exportDataBtn = document.getElementById("export-data-btn");
const importDataInput = document.getElementById("import-data-input");
const dataStatus = document.getElementById("data-status");

function renderBuilds(builds) {
  buildsList.innerHTML = builds.map(build => `
    <div class="build-card tier-${build.tier}">
      <div class="build-header">
        <h3>${build.name}</h3>
        <span class="build-tier">${build.tier}</span>
      </div>
      <p class="build-name-zh">${build.nameZh}</p>
      <label class="compare-toggle">
        <input type="checkbox" data-compare-id="${build.id}" ${selectedBuildIds.has(String(build.id)) ? "checked" : ""} />
        Compare
      </label>
      <label class="favorite-toggle">
        <input type="checkbox" data-favorite-id="${build.id}" ${favoriteBuildIds.has(String(build.id)) ? "checked" : ""} />
        Saved Build
      </label>
      <div class="build-stats">
        <span>PvE: ${build.pve}/10</span>
        <span>PvP: ${build.pvp}/10</span>
        <span class="build-difficulty">${build.difficulty}</span>
      </div>
      <p class="build-description">${build.description}</p>
      <div class="build-details">
        <p><strong>Role:</strong> ${build.role}</p>
        <p><strong>Weapons:</strong> ${build.weapons.join(", ")}</p>
        <p><strong>Skills:</strong> ${build.skills.join(" + ")}</p>
        <p><strong>Stats:</strong> ${build.stats}</p>
        <p><strong>Heart Methods:</strong> ${build.heartMethods.join(", ")}</p>
      </div>
      <details class="build-more">
        <summary>Rotation, replacements, scenarios</summary>
        <h4>Skill Loop</h4>
        <ol>${build.rotation.map(step => `<li>${step}</li>`).join("")}</ol>
        <h4>Equipment Replacements</h4>
        <ul>${build.alternatives.map(item => `<li>${item}</li>`).join("")}</ul>
        <h4>Use Cases</h4>
        <div class="scenario-tags">${build.scenarios.map(item => `<span>${item}</span>`).join("")}</div>
      </details>
    </div>
  `).join("");

  attachCompareHandlers();
  attachFavoriteHandlers();
  renderComparePanel();
}

function getSelectedBuilds() {
  return buildsData.filter(build => selectedBuildIds.has(String(build.id)));
}

function attachCompareHandlers() {
  buildsList.querySelectorAll("[data-compare-id]").forEach((checkbox) => {
    const id = checkbox.dataset.compareId;
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        selectedBuildIds.add(id);
      } else {
        selectedBuildIds.delete(id);
      }
      saveStoredSet(STORAGE_KEYS.compareBuilds, selectedBuildIds);
      syncCompareControls();
      renderComparePanel();
    });
  });
  syncCompareControls();
}

function syncCompareControls() {
  buildsList.querySelectorAll("[data-compare-id]").forEach((checkbox) => {
    checkbox.disabled = !checkbox.checked && selectedBuildIds.size >= 3;
  });
}

function attachFavoriteHandlers() {
  buildsList.querySelectorAll("[data-favorite-id]").forEach((checkbox) => {
    const id = checkbox.dataset.favoriteId;
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        favoriteBuildIds.add(id);
      } else {
        favoriteBuildIds.delete(id);
      }
      saveStoredSet(STORAGE_KEYS.favoriteBuilds, favoriteBuildIds);
    });
  });
}

function renderComparePanel() {
  const selected = getSelectedBuilds();
  if (selected.length === 0) {
    buildComparePanel.innerHTML = `
      <p class="compare-empty">Select up to 3 builds to compare role, weapons, ratings, stat priorities, rotation, and scenarios.</p>
    `;
    return;
  }

  buildComparePanel.innerHTML = `
    <div class="compare-header">
      <strong>Comparing ${selected.length}/3 builds</strong>
      <button type="button" id="clear-compare-btn">Clear</button>
    </div>
    <div class="compare-table-wrap">
      <table class="compare-table">
        <thead>
          <tr>
            <th>Field</th>
            ${selected.map(build => `<th>${build.name}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          <tr><td>Tier</td>${selected.map(build => `<td>${build.tier}</td>`).join("")}</tr>
          <tr><td>Role</td>${selected.map(build => `<td>${build.role}</td>`).join("")}</tr>
          <tr><td>Weapons</td>${selected.map(build => `<td>${build.weapons.join(" + ")}</td>`).join("")}</tr>
          <tr><td>PvE / PvP</td>${selected.map(build => `<td>${build.pve}/10 / ${build.pvp}/10</td>`).join("")}</tr>
          <tr><td>Stats</td>${selected.map(build => `<td>${build.stats}</td>`).join("")}</tr>
          <tr><td>Core Loop</td>${selected.map(build => `<td>${build.rotation.slice(0, 2).join(" → ")}</td>`).join("")}</tr>
          <tr><td>Scenarios</td>${selected.map(build => `<td>${build.scenarios.join(", ")}</td>`).join("")}</tr>
        </tbody>
      </table>
    </div>
  `;

  document.getElementById("clear-compare-btn").addEventListener("click", () => {
    selectedBuildIds.clear();
    saveStoredSet(STORAGE_KEYS.compareBuilds, selectedBuildIds);
    renderBuilds(getFilteredBuilds());
  });
}

buildsLink.addEventListener("click", (e) => {
  if (!buildsLink.getAttribute("href").startsWith("#")) return;
  e.preventDefault();
  openModal(buildsModal);
  renderBuilds(buildsData);
  buildsSearch.focus();
});

buildsModal.querySelector(".modal-close").addEventListener("click", () => {
  closeModal(buildsModal);
});

buildsModal.addEventListener("click", (e) => {
  if (e.target === buildsModal) closeModal(buildsModal);
});

buildsSearch.addEventListener("input", filterBuilds);
buildsTier.addEventListener("change", filterBuilds);

function filterBuilds() {
  renderBuilds(getFilteredBuilds());
}

function getFilteredBuilds() {
  const query = buildsSearch.value.toLowerCase();
  const tier = buildsTier.value;
  return buildsData.filter(build => {
    const searchable = [
      build.name,
      build.nameZh,
      build.description,
      build.role,
      build.difficulty,
      build.weapons.join(" "),
      build.skills.join(" "),
      build.stats,
      build.heartMethods.join(" "),
      build.scenarios.join(" "),
      build.tags.join(" ")
    ].join(" ").toLowerCase();
    const matchQuery = searchable.includes(query);
    const matchTier = !tier || build.tier === tier;
    return matchQuery && matchTier;
  });
}

function renderMapRegions(regions) {
  mapList.innerHTML = regions.map(region => `
    <article class="map-region">
      <div class="map-region-header">
        <span>${region.priority}</span>
        <h3>${region.region}</h3>
      </div>
      <p>${region.focus}</p>
      <ul>
        ${region.checkpoints.map(checkpoint => `<li>${checkpoint}</li>`).join("")}
      </ul>
      <p class="map-tip">${region.tip}</p>
    </article>
  `).join("");
}

mapLink.addEventListener("click", (e) => {
  if (!mapLink.getAttribute("href").startsWith("#")) return;
  e.preventDefault();
  openModal(mapModal);
  renderMapRegions(mapData);
});

mapModal.querySelector(".modal-close").addEventListener("click", () => {
  closeModal(mapModal);
});

mapModal.addEventListener("click", (e) => {
  if (e.target === mapModal) closeModal(mapModal);
});

function buildExportPayload() {
  return {
    schemaVersion: 1,
    app: "where-winds-meet-overseas-guide",
    exportedAt: new Date().toISOString(),
    dailyProgress: {
      quick: readStoredArray(STORAGE_KEYS.dailyQuick),
      deep: readStoredArray(STORAGE_KEYS.dailyDeep),
    },
    favoriteBuildIds: Array.from(favoriteBuildIds),
    compareBuildIds: Array.from(selectedBuildIds),
  };
}

function setDataStatus(message, type = "info") {
  dataStatus.textContent = message;
  dataStatus.dataset.type = type;
}

function exportGuideData() {
  const payload = buildExportPayload();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `where-winds-meet-guide-data-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  setDataStatus("Export ready. Your browser downloaded a JSON backup.", "success");
}

function importGuideData(payload) {
  if (!payload || payload.app !== "where-winds-meet-overseas-guide") {
    throw new Error("This does not look like guide export data.");
  }

  const dailyProgress = payload.dailyProgress || {};
  localStorage.setItem(STORAGE_KEYS.dailyQuick, JSON.stringify(Array.isArray(dailyProgress.quick) ? dailyProgress.quick.map(String) : []));
  localStorage.setItem(STORAGE_KEYS.dailyDeep, JSON.stringify(Array.isArray(dailyProgress.deep) ? dailyProgress.deep.map(String) : []));

  favoriteBuildIds.clear();
  (Array.isArray(payload.favoriteBuildIds) ? payload.favoriteBuildIds : []).forEach(id => favoriteBuildIds.add(String(id)));
  saveStoredSet(STORAGE_KEYS.favoriteBuilds, favoriteBuildIds);

  selectedBuildIds.clear();
  (Array.isArray(payload.compareBuildIds) ? payload.compareBuildIds : []).slice(0, 3).forEach(id => selectedBuildIds.add(String(id)));
  saveStoredSet(STORAGE_KEYS.compareBuilds, selectedBuildIds);

  renderDailyTasks();
  if (buildsModal.classList.contains("active")) renderBuilds(getFilteredBuilds());
  setDataStatus("Import complete. Checklist progress and saved builds were restored.", "success");
}

dataLink.addEventListener("click", (e) => {
  e.preventDefault();
  openModal(dataModal);
  setDataStatus("");
});

dataModal.querySelector(".modal-close").addEventListener("click", () => {
  closeModal(dataModal);
});

dataModal.addEventListener("click", (e) => {
  if (e.target === dataModal) closeModal(dataModal);
});

exportDataBtn.addEventListener("click", exportGuideData);

importDataInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const payload = JSON.parse(await file.text());
    importGuideData(payload);
  } catch (error) {
    setDataStatus(error.message || "Import failed. Check the JSON file and try again.", "error");
  } finally {
    importDataInput.value = "";
  }
});

const faqModal = document.getElementById("faq");
const faqLink = document.getElementById("faq-link");
const faqList = document.getElementById("faq-list");
const faqSearch = document.getElementById("faq-search");

function renderFAQ(faqs) {
  const grouped = {};
  faqs.forEach(faq => {
    if (!grouped[faq.category]) grouped[faq.category] = [];
    grouped[faq.category].push(faq);
  });
  
  faqList.innerHTML = Object.entries(grouped).map(([category, items]) => `
    <div class="faq-category">
      <h3>${category}</h3>
      ${items.map(faq => `
        <details class="faq-item">
          <summary>${faq.question}</summary>
          <p>${faq.answer}</p>
        </details>
      `).join("")}
    </div>
  `).join("");
}

faqLink.addEventListener("click", (e) => {
  if (!faqLink.getAttribute("href").startsWith("#")) return;
  e.preventDefault();
  openModal(faqModal);
  renderFAQ(faqData);
  faqSearch.focus();
});

faqModal.querySelector(".modal-close").addEventListener("click", () => {
  closeModal(faqModal);
});

faqModal.addEventListener("click", (e) => {
  if (e.target === faqModal) closeModal(faqModal);
});

faqSearch.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = faqData.filter(faq => 
    faq.question.toLowerCase().includes(query) || 
    faq.answer.toLowerCase().includes(query) ||
    faq.category.toLowerCase().includes(query)
  );
  renderFAQ(filtered);
});

const globalSearchModal = document.getElementById("global-search");
const globalSearchBtn = document.getElementById("global-search-btn");
const globalSearchInput = document.getElementById("global-search-input");
const searchResults = document.getElementById("search-results");

globalSearchBtn.addEventListener("click", () => {
  openModal(globalSearchModal);
  globalSearchInput.focus();
});

globalSearchModal.querySelector(".modal-close").addEventListener("click", () => {
  closeModal(globalSearchModal);
  resetGlobalSearch();
});

globalSearchModal.addEventListener("click", (e) => {
  if (e.target === globalSearchModal) {
    closeModal(globalSearchModal);
    resetGlobalSearch();
  }
});

function openSearchResult(result) {
  closeModal(globalSearchModal);
  resetGlobalSearch();

  if (result.type === "Build") {
    openModal(buildsModal);
    buildsSearch.value = result.title;
    buildsTier.value = "";
    filterBuilds();
    return;
  }

  if (result.type === "FAQ") {
    openModal(faqModal);
    faqSearch.value = result.title;
    renderFAQ(faqData.filter(faq => faq.question === result.title));
    return;
  }

  if (result.type === "Term") {
    openModal(modal);
    searchInput.value = result.term;
    renderTerminology(terminology.filter(term => term.en === result.term || term.cn === result.term));
    return;
  }

  if (result.type === "Map") {
    openModal(mapModal);
    renderMapRegions(mapData.filter(region => region.region === result.region));
    return;
  }

  if (result.type === "Data") {
    openModal(dataModal);
    setDataStatus("");
    return;
  }

  if (result.type === "Article") {
    window.location.href = result.url;
  }
}

globalSearchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  if (query.length < 2) {
    searchResults.innerHTML = "";
    return;
  }
  
  const results = [];
  
  buildsData.forEach(build => {
    const searchable = [
      build.name,
      build.nameZh,
      build.role,
      build.description,
      build.weapons.join(" "),
      build.skills.join(" "),
      build.scenarios.join(" ")
    ].join(" ").toLowerCase();
    if (searchable.includes(query)) {
      results.push({ type: "Build", title: build.name, subtitle: build.nameZh, link: "#builds" });
    }
  });
  
  faqData.forEach(faq => {
    if (faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query)) {
      results.push({ type: "FAQ", title: faq.question, subtitle: faq.category, link: "#faq" });
    }
  });
  
  terminology.forEach(term => {
    if (term.en.toLowerCase().includes(query) || term.cn.includes(query)) {
      results.push({ type: "Term", title: `${term.en} (${term.cn})`, subtitle: term.description, link: "#terminology-modal", term: term.en });
    }
  });

  mapData.forEach(region => {
    const haystack = [region.region, region.priority, region.focus, ...region.checkpoints, region.tip].join(" ").toLowerCase();
    if (haystack.includes(query)) {
      results.push({ type: "Map", title: region.region, subtitle: region.focus, link: "#map", region: region.region });
    }
  });

  articlesData.forEach(article => {
    const haystack = [
      article.title,
      article.category,
      article.description,
      article.level,
      article.keywords.join(" ")
    ].join(" ").toLowerCase();
    if (haystack.includes(query)) {
      results.push({ type: "Article", title: article.title, subtitle: article.description, link: article.url, url: article.url });
    }
  });

  if (["data", "export", "import", "backup", "saved"].some(term => term.includes(query) || query.includes(term))) {
    results.push({ type: "Data", title: "Data Tools", subtitle: "Export or import progress, saved builds, and compare picks.", link: "#data" });
  }
  
  if (results.length === 0) {
    searchResults.innerHTML = '<p class="no-results">No results found</p>';
  } else {
    searchResults.innerHTML = results.map((r, index) => `
      <a href="${r.link}" class="search-result-item">
        <span class="result-type">${r.type}</span>
        <div>
          <h4>${r.title}</h4>
          <p>${r.subtitle}</p>
        </div>
      </a>
    `).join("");
    
    searchResults.querySelectorAll("a").forEach((link, index) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        openSearchResult(results[index]);
      });
    });
  }
});
