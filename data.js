(function () {
const buildPairs = [
  { name: "Nameless Sword + Nameless Spear", nameZh: "鸣金虹(无名剑法+无名枪法)", tier: "S", role: "Balanced DPS", difficulty: "Beginner", pve: 9, pvp: 8, weapons: ["Sword", "Spear"], skills: ["Nameless Sword Art", "Nameless Spear Art"], stats: ["ATK", "Crit Rate", "Precision"], heartMethods: ["Nameless Heart", "Yi Shui Song", "Wei Meng Song"], note: "Easy to learn, fast attacks, excellent mobility." },
  { name: "Strategic Sword + Heavenquaker Spear", nameZh: "鸣金影(积矩九剑+九曲惊神枪)", tier: "S", role: "Burst DPS", difficulty: "Advanced", pve: 10, pvp: 9, weapons: ["Sword", "Spear"], skills: ["Nine Swords", "Shocking Spear"], stats: ["Crit Rate", "Crit DMG", "ATK"], heartMethods: ["Sword Qi", "Yi Shui Song", "Wolf Chaser"], note: "High burst windows with bleed pressure." },
  { name: "Panacea Fan + Soulshade Umbrella", nameZh: "牵丝霖(明川药典+千香引魂蛊)", tier: "S", role: "Support/Healer", difficulty: "Easy", pve: 8, pvp: 7, weapons: ["Fan", "Umbrella"], skills: ["Medicine Canon", "Soul Shade"], stats: ["Healing", "HP", "DEF"], heartMethods: ["Medicine King", "Apricot Blossom", "Silk Thread"], note: "Team sustain with shields and safe ranged uptime." },
  { name: "Stormbreaker Spear + Thundercry Blade", nameZh: "裂石威(嗟夫刀法+八方风雷枪)", tier: "A", role: "Tank", difficulty: "Easy", pve: 9, pvp: 7, weapons: ["Mo Blade", "Spear"], skills: ["Alas Blade", "Thunder Spear"], stats: ["DEF", "HP", "Block"], heartMethods: ["Rock Solid", "Yi Shui Song", "Endurance"], note: "Frontline mitigation and stable boss control." },
  { name: "Vernal Umbrella + Inkwell Fan", nameZh: "牵丝玉(青山执笔+九重春色)", tier: "A", role: "Ranged DPS", difficulty: "Intermediate", pve: 8, pvp: 8, weapons: ["Umbrella", "Fan"], skills: ["Green Mountain", "Nine Springs"], stats: ["ATK", "Crit Rate", "Range"], heartMethods: ["Flower Moon", "Yi Shui Song", "Star Pluck"], note: "Aerial control with safe ranged pressure." },
  { name: "Infernal Twinblades + Mortal Rope Dart", nameZh: "破竹风(泥犁三垢+粟子游尘)", tier: "A", role: "Fast DPS", difficulty: "Hard", pve: 9, pvp: 9, weapons: ["Dual Blades", "Rope Dart"], skills: ["Three Defilements", "Dust Mote"], stats: ["ATK Speed", "Crit", "ATK"], heartMethods: ["Forgotten River", "Yi Shui Song", "Extreme Joy"], note: "Fast tempo build with high APM and pursuit." },
  { name: "Bamboocut Dust + Cloud Rope", nameZh: "破竹尘(醉梦游春+粟子行云)", tier: "B", role: "Hybrid DPS", difficulty: "Intermediate", pve: 7, pvp: 6, weapons: ["Rope Dart", "Dual Blades"], skills: ["Drunken Dream", "Cloud Walk"], stats: ["ATK", "Precision", "Crit"], heartMethods: ["Thousand Camps", "Yi Shui Song", "Tang Song"], note: "Stable output for casual play and short sessions." },
  { name: "Bellstrike Umbra + Ten Directions", nameZh: "裂石钧(斩雪刀法+十方破阵)", tier: "A", role: "Bruiser", difficulty: "Intermediate", pve: 8, pvp: 7, weapons: ["Blade", "Mo Blade"], skills: ["Snow Cut", "Ten Directions"], stats: ["ATK", "Crit", "Penetration"], heartMethods: ["Frost Night", "Yi Shui Song", "Throat Pierce"], note: "Flexible blade style with strong stagger control." },
  { name: "Snowparting Blade + Phalanx Spear", nameZh: "雪断锋(断雪刀法+破阵枪)", tier: "A", role: "Boss Breaker", difficulty: "Intermediate", pve: 9, pvp: 6, weapons: ["Blade", "Spear"], skills: ["Snowparting Blade", "Phalanx Spear"], stats: ["Break", "ATK", "Crit Rate"], heartMethods: ["Cold Ridge", "Yi Shui Song", "Battle Standard"], note: "Designed around stance break and safe punish windows." },
  { name: "Moonveil Fan + Jade Umbrella", nameZh: "月隐玉(临月扇+玉影伞)", tier: "A", role: "Control Support", difficulty: "Intermediate", pve: 8, pvp: 8, weapons: ["Fan", "Umbrella"], skills: ["Moonveil Fan", "Jade Umbrella"], stats: ["Cooldown", "Healing", "HP"], heartMethods: ["Moonlit Mind", "Apricot Blossom", "River Watch"], note: "Crowd control and off-heal support for group routes." },
  { name: "Ironwall Mo Blade + Nameless Spear", nameZh: "铁壁势(陌刀+无名枪法)", tier: "B", role: "Frontline", difficulty: "Beginner", pve: 8, pvp: 6, weapons: ["Mo Blade", "Spear"], skills: ["Ironwall Blade", "Nameless Spear Art"], stats: ["HP", "DEF", "Block"], heartMethods: ["Iron Body", "Yi Shui Song", "Stone Gate"], note: "Low-risk frontline route for players learning boss timing." },
  { name: "Silk Fan + Nameless Sword", nameZh: "丝雨剑(药扇+无名剑法)", tier: "B", role: "Solo Sustain", difficulty: "Beginner", pve: 7, pvp: 6, weapons: ["Fan", "Sword"], skills: ["Silk Fan", "Nameless Sword Art"], stats: ["ATK", "Healing", "Crit Rate"], heartMethods: ["Medicine King", "Nameless Heart", "Clear Spring"], note: "A forgiving solo route with emergency sustain." },
  { name: "Shadow Rope + Thunder Blade", nameZh: "影雷行(游尘索+风雷刀)", tier: "A", role: "Skirmisher", difficulty: "Hard", pve: 8, pvp: 9, weapons: ["Rope Dart", "Blade"], skills: ["Dust Mote", "Thunder Blade"], stats: ["Crit", "Mobility", "Penetration"], heartMethods: ["Shadow Step", "Wolf Chaser", "Frost Night"], note: "Hit-and-run pressure for players comfortable with spacing." }
];

const buildPlans = [
  { label: "Starter", roleSuffix: "Training", tierShift: 0, pve: 0, pvp: -1, difficultyShift: -1, description: "Beginner-friendly route that keeps the core weapon pair intact while lowering execution risk.", rotation: ["Open with safe ranged or poke skill", "Use primary weapon for steady damage", "Swap only after dodge or break window", "Spend burst when boss recovery is visible"], alternatives: ["Use HP main stat if survival is shaky", "Replace rare heart methods with any ATK or DEF option", "Prioritize easy-to-upgrade weapons"], scenarios: ["First week progression", "Solo story", "Learning boss patterns"] },
  { label: "Dungeon", roleSuffix: "PvE", tierShift: 0, pve: 1, pvp: 0, difficultyShift: 0, description: "Dungeon route tuned for stable damage windows, resource efficiency, and repeatable boss clears.", rotation: ["Pre-buff before contact", "Build resource on primary weapon", "Swap for break or crowd-control window", "Use burst after teammate setup"], alternatives: ["Carry one defensive accessory", "Swap pure crit for precision on evasive bosses", "Use team utility heart methods if solo damage is covered"], scenarios: ["Dungeons", "Weekly bosses", "Material farming"] },
  { label: "PvP", roleSuffix: "Duel", tierShift: -1, pve: -1, pvp: 1, difficultyShift: 1, description: "PvP route focused on mobility, punish timing, and short confirmed damage windows.", rotation: ["Test spacing with low-commitment poke", "Hold mobility until enemy commit", "Punish whiff with secondary weapon", "Disengage before stamina is empty"], alternatives: ["Trade some ATK for HP", "Use control resistance where available", "Prefer shorter cooldown options"], scenarios: ["Duel", "Small-scale PvP", "Counter-pick practice"] },
  { label: "Farm", roleSuffix: "Resource", tierShift: -1, pve: 0, pvp: -1, difficultyShift: -1, description: "Low-maintenance route for daily farming, open-world errands, and fragmented play sessions.", rotation: ["Group minor enemies first", "Use area skill to clean up", "Reserve mobility for travel", "Heal or reset before the next pack"], alternatives: ["Use movement speed or stamina comfort pieces", "Pick low-cost weapon upgrades", "Favor broad utility over peak damage"], scenarios: ["Daily checklist", "Open-world farming", "Short sessions"] }
];

const difficultyOrder = ["Beginner", "Easy", "Intermediate", "Advanced", "Hard"];
const tierOrder = ["B", "A", "S"];
const roleProfiles = {
  "Balanced DPS": {
    rhythm: "steady weave",
    keyWindow: "after dodge, parry, or stance break",
    failSignal: "swapping too early and losing safe uptime",
    visualClass: "duelist",
  },
  "Burst DPS": {
    rhythm: "short burst",
    keyWindow: "enemy recovery and teammate setup",
    failSignal: "spending burst before the target is locked",
    visualClass: "burst",
  },
  "Support/Healer": {
    rhythm: "protective cycle",
    keyWindow: "before group damage and after failed dodges",
    failSignal: "healing late instead of preventing pressure",
    visualClass: "support",
  },
  Tank: {
    rhythm: "frontline anchor",
    keyWindow: "boss aggro, block, and break timing",
    failSignal: "chasing damage while mitigation is down",
    visualClass: "guard",
  },
  "Ranged DPS": {
    rhythm: "spacing control",
    keyWindow: "safe air time and ranged punish windows",
    failSignal: "standing still after a ranged string",
    visualClass: "ranged",
  },
  "Fast DPS": {
    rhythm: "high-tempo chase",
    keyWindow: "after mobility bait and confirmed pursuit",
    failSignal: "empty stamina with no disengage path",
    visualClass: "chase",
  },
  "Hybrid DPS": {
    rhythm: "flex rotation",
    keyWindow: "minor enemy packs and low-risk boss openings",
    failSignal: "trying to force peak damage from a comfort route",
    visualClass: "hybrid",
  },
  Bruiser: {
    rhythm: "pressure trade",
    keyWindow: "stagger, block, and counter-hit windows",
    failSignal: "trading into burst without defensive resources",
    visualClass: "bruiser",
  },
  "Boss Breaker": {
    rhythm: "break-and-punish",
    keyWindow: "stance damage into visible recovery",
    failSignal: "using break tools while the boss is invulnerable",
    visualClass: "breaker",
  },
  "Control Support": {
    rhythm: "control ladder",
    keyWindow: "crowd-control chain and group reset windows",
    failSignal: "overlapping control before allies can follow up",
    visualClass: "control",
  },
  Frontline: {
    rhythm: "safe pressure",
    keyWindow: "block confirms and predictable boss strings",
    failSignal: "turning a learning build into a greedy DPS build",
    visualClass: "guard",
  },
  "Solo Sustain": {
    rhythm: "recover and punish",
    keyWindow: "self-heal, poke, and short punish windows",
    failSignal: "saving sustain until one hit too late",
    visualClass: "support",
  },
  Skirmisher: {
    rhythm: "hit-and-run",
    keyWindow: "whiff punish and forced spacing resets",
    failSignal: "staying in melee after the punish window closes",
    visualClass: "chase",
  },
};
const planProfiles = {
  Starter: { pace: "Low risk", opener: "safe poke", pressure: "practice consistency" },
  Dungeon: { pace: "Repeatable", opener: "pre-buff", pressure: "boss window timing" },
  PvP: { pace: "Reactive", opener: "spacing test", pressure: "confirmed punish" },
  Farm: { pace: "Low maintenance", opener: "group enemies", pressure: "route speed" },
};

function shiftValue(items, value, shift) {
  const index = Math.max(0, Math.min(items.length - 1, items.indexOf(value) + shift));
  return items[index];
}

function buildCombatProfile(pair, plan) {
  const roleProfile = roleProfiles[pair.role] || roleProfiles["Balanced DPS"];
  const planProfile = planProfiles[plan.label] || planProfiles.Starter;
  return {
    rhythm: roleProfile.rhythm,
    keyWindow: roleProfile.keyWindow,
    failSignal: roleProfile.failSignal,
    visualClass: roleProfile.visualClass,
    pace: planProfile.pace,
    opener: planProfile.opener,
    pressure: planProfile.pressure,
  };
}

const buildsData = buildPairs.flatMap((pair, pairIndex) =>
  buildPlans.map((plan, planIndex) => ({
    id: pairIndex * buildPlans.length + planIndex + 1,
    name: `${plan.label} ${pair.name}`,
    nameZh: `${pair.nameZh} · ${plan.label}`,
    tier: shiftValue(tierOrder, pair.tier, plan.tierShift),
    role: `${pair.role} / ${plan.roleSuffix}`,
    difficulty: shiftValue(difficultyOrder, pair.difficulty, plan.difficultyShift),
    pve: Math.max(1, Math.min(10, pair.pve + plan.pve)),
    pvp: Math.max(1, Math.min(10, pair.pvp + plan.pvp)),
    description: `${plan.description} ${pair.note}`,
    weapons: pair.weapons,
    skills: pair.skills,
    stats: pair.stats.join(" > "),
    statPriority: pair.stats,
    heartMethods: pair.heartMethods,
    rotation: plan.rotation,
    alternatives: plan.alternatives,
    scenarios: plan.scenarios,
    combatProfile: buildCombatProfile(pair, plan),
    tags: [plan.label, pair.role, ...pair.weapons],
  }))
);

const dailyTasksData = {
  quick: [
    { id: 1, text: "Check announcements and claim mail rewards", time: "2 min", note: "Time-limited rewards expire fast" },
    { id: 2, text: "Complete daily quests (3-5 tasks)", time: "15 min", note: "Main source of EXP" },
    { id: 3, text: "Run one dungeon for materials", time: "10 min", note: "Focus on gear upgrades" },
    { id: 4, text: "Spend stamina on resource nodes", time: "5 min", note: "Don't waste stamina cap" },
    { id: 5, text: "Quick guild check-in", time: "1 min", note: "Daily contribution points" },
    { id: 6, text: "Claim idle rewards", time: "2 min", note: "Free resources" }
  ],
  deep: [
    { id: 1, text: "Check announcements and claim all rewards", time: "5 min", note: "Don't miss event items" },
    { id: 2, text: "Complete all daily and weekly quests", time: "30 min", note: "Maximum EXP gain" },
    { id: 3, text: "Run 3-5 dungeons for gear and materials", time: "40 min", note: "Farm specific drops" },
    { id: 4, text: "Farm elite bosses in open world", time: "20 min", note: "Rare materials and recipes" },
    { id: 5, text: "Guild activities and donations", time: "10 min", note: "Guild shop currency" },
    { id: 6, text: "PvP matches (3-5 rounds)", time: "15 min", note: "Weekly PvP rewards" },
    { id: 7, text: "Organize inventory and upgrade gear", time: "10 min", note: "Plan next upgrades" }
  ]
};

const faqData = [
  { category: "Installation", question: "Game won't launch or stuck on loading screen", answer: "1. Run as administrator 2. Verify game files 3. Update GPU drivers 4. Disable antivirus temporarily 5. Check if DirectX/Visual C++ are installed" },
  { category: "Installation", question: "How much disk space do I need?", answer: "Standard package: 100GB SSD recommended. Lite package: 60GB (supports HDD but SSD recommended for better performance)" },
  { category: "Performance", question: "Game is laggy or has low FPS", answer: "1. Lower graphics settings 2. Close background apps 3. Update GPU drivers 4. Enable performance mode in Windows 5. Check if your PC meets minimum requirements" },
  { category: "Performance", question: "Crashes during gameplay", answer: "1. Verify game files 2. Update drivers 3. Lower graphics settings 4. Check system temperature 5. Disable overlays (Discord, Steam, etc.)" },
  { category: "Network", question: "Can't connect to server", answer: "1. Check your internet connection 2. Disable VPN/proxy 3. Flush DNS (ipconfig /flushdns) 4. Check firewall settings 5. Try different server region" },
  { category: "Gameplay", question: "Which martial art should I choose as beginner?", answer: "Start with Nameless Sword + Nameless Spear (鸣金虹). It's beginner-friendly, has high damage, and doesn't require complex combos or expensive gear." },
  { category: "Gameplay", question: "How do I unlock new martial arts?", answer: "1. Progress main story 2. Join sects/factions 3. Complete hidden quests 4. Steal techniques from NPCs 5. Purchase from certain vendors" },
  { category: "Mobile", question: "Mobile version issues", answer: "1. Ensure device meets requirements 2. Close background apps 3. Lower graphics settings 4. Restart device 5. Reinstall if crashes persist" }
];

const terminology = [
  { en: "Qinggong", cn: "轻功", category: "Movement", description: "Light skill for traversal and aerial movement" },
  { en: "Martial Arts", cn: "武学", category: "Combat", description: "Combat skills and fighting techniques" },
  { en: "Heart Method", cn: "心法", category: "Passive", description: "Passive skill system that enhances abilities" },
  { en: "Meridian", cn: "经脉", category: "Character", description: "Character progression and stat system" },
  { en: "Sect", cn: "门派", category: "Faction", description: "Player faction or martial arts school" },
  { en: "Jianghu", cn: "江湖", category: "World", description: "The martial arts world/society" },
  { en: "Daily Quest", cn: "日常任务", category: "Quest", description: "Repeatable daily missions for rewards" },
  { en: "Main Quest", cn: "主线任务", category: "Quest", description: "Story progression quests" },
  { en: "Waypoint", cn: "传送点", category: "System", description: "Fast travel teleport point" },
  { en: "Stamina", cn: "体力", category: "Resource", description: "Energy used for activities" },
  { en: "Cultivation", cn: "修炼", category: "Progression", description: "Character training and leveling" },
  { en: "Inner Force", cn: "内力", category: "Combat", description: "Internal energy for skills" },
  { en: "Stance", cn: "架势", category: "Combat", description: "Combat stance or posture" },
  { en: "Parry", cn: "格挡", category: "Combat", description: "Block or deflect attacks" },
  { en: "Dodge", cn: "闪避", category: "Combat", description: "Evade incoming attacks" },
  { en: "Combo", cn: "连招", category: "Combat", description: "Chain of attacks" },
  { en: "Boss", cn: "首领/BOSS", category: "Enemy", description: "Elite enemy with high difficulty" },
  { en: "Dungeon", cn: "副本", category: "Instance", description: "Instanced challenge area" },
  { en: "Guild", cn: "帮派", category: "Social", description: "Player organization" },
  { en: "PvP", cn: "玩家对战", category: "Mode", description: "Player versus player combat" },
  { en: "PvE", cn: "玩家对环境", category: "Mode", description: "Player versus environment content" }
];

const versionUpdates = [
  {
    date: "2026-04-30",
    version: "Hexi Ch. 3",
    title: "Qinchuan Expansion",
    description: "Qinchuan is announced as the next Hexi chapter, with landscape, story, and exploration content to update route and map priorities.",
    type: "major",
    affects: ["Routes", "Map"],
    source: "NetEase",
    url: "https://www.neteasegames.com/news/20260423/37000_1297472.html"
  },
  {
    date: "2026-04-02",
    version: "Hexi Ch. 2",
    title: "Liangzhou Chapter",
    description: "Liangzhou expands Hexi with story, region activities, and fresh exploration targets for returning players.",
    type: "major",
    affects: ["Routes", "Daily", "Map"],
    source: "NetEase",
    url: "https://www.neteasegames.com/news/20260402/37000_1294340.html"
  },
  {
    date: "2026-03-06",
    version: "Hexi Ch. 1",
    title: "Jade Gate Pass",
    description: "The Hexi expansion begins with Jade Gate Pass, new story beats, new boss content, and battle pass updates.",
    type: "major",
    affects: ["Routes", "Builds", "Map"],
    source: "NetEase",
    url: "https://www.neteasegames.com/news/20260227/37000_1288719.html"
  },
  {
    date: "2025-12-12",
    version: "Mobile",
    title: "Mobile Version Launch",
    description: "The mobile version launches, making platform notes and performance troubleshooting more important for overseas players.",
    type: "milestone",
    affects: ["FAQ", "Setup"],
    source: "NetEase IR",
    url: "https://ir.netease.com/news-releases/news-release-details/where-winds-meet-mobile-version-launches-today-game-awards-2025"
  },
  {
    date: "2025-11-15",
    version: "Global",
    title: "Global PC Launch",
    description: "Where Winds Meet launches globally on PC, establishing the baseline for overseas onboarding, server choice, and first-week routes.",
    type: "milestone",
    affects: ["Setup", "Routes"],
    source: "NetEase",
    url: "https://www.neteasegames.com/news/WhereWindsMeet/20260226/43512_1271123.html"
  }
];

const mapData = [
  {
    region: "Qinghe",
    priority: "First route",
    focus: "Starter exploration, waypoints, early encounters",
    image: "./assets/images/where-winds-meet-open-world-bg.jpg",
    time: "25-45 min",
    rewardType: "Waypoints + early chests",
    risk: "Low",
    routeTheme: "onboarding loop",
    checkpoints: ["Unlock nearby waypoints before side quests", "Mark short encounters for fragmented play sessions", "Keep material runs close to teleport points"],
    tip: "Use this as the low-pressure onboarding region before chasing completion.",
    nodes: [
      { label: "Start", x: 14, y: 70, type: "waypoint" },
      { label: "River path", x: 34, y: 52, type: "resource" },
      { label: "Hidden note", x: 58, y: 34, type: "hidden" },
      { label: "Return hub", x: 78, y: 58, type: "vendor" },
    ],
  },
  {
    region: "Kaifeng",
    priority: "Main city hub",
    focus: "Vendors, social systems, quest density",
    image: "./assets/images/where-winds-meet-map-hero.jpg",
    time: "15-30 min",
    rewardType: "Vendors + upgrades",
    risk: "Low",
    routeTheme: "maintenance loop",
    checkpoints: ["Record repeatable vendor stops", "Separate story errands from daily routine tasks", "Use hub visits to clean inventory and upgrade gear"],
    tip: "Treat Kaifeng as a maintenance stop, not a place to wander without a plan.",
    nodes: [
      { label: "Gate", x: 18, y: 42, type: "waypoint" },
      { label: "Vendor", x: 42, y: 58, type: "vendor" },
      { label: "Upgrade", x: 62, y: 44, type: "resource" },
      { label: "Guild", x: 82, y: 34, type: "event" },
    ],
  },
  {
    region: "Hexi",
    priority: "Expansion route",
    focus: "Jade Gate Pass, Liangzhou, Qinchuan update trail",
    image: "./assets/images/where-winds-meet-map-hero.jpg",
    time: "45-90 min",
    rewardType: "Bosses + event entries",
    risk: "Medium",
    routeTheme: "expansion sweep",
    checkpoints: ["Start with main chapter unlocks", "Track bosses and event entries separately", "Update daily checklist when limited-time activities appear"],
    tip: "Expansion zones age fast; keep source links beside each update.",
    nodes: [
      { label: "Pass", x: 10, y: 62, type: "waypoint" },
      { label: "Boss", x: 36, y: 36, type: "boss" },
      { label: "Event", x: 64, y: 50, type: "event" },
      { label: "Qinchuan prep", x: 86, y: 28, type: "hidden" },
    ],
  }
];

window.GuideData = {
  buildPairs,
  buildPlans,
  buildsData,
  dailyTasksData,
  faqData,
  terminology,
  versionUpdates,
  mapData,
};
})();
