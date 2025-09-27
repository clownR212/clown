import { useMemo, useState } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxYSD6RH0Ui7792vwy8yczs6qemGc24TvPF9wMLuBCSSUJdR4aNGZ0DjWcCyDmAW3HF/exec";

const RANK_POINTS = {
  D4: 10,
  E1: 8.4,
  E2: 8.1,
  E3: 7.8,
  E4: 7.5,
  P1: 6.8,
  P2: 6.5,
  P3: 6.2,
  P4: 5.9,
  G1: 5.4,
  G2: 5.1,
  G3: 4.8,
  G4: 4.5,
  S1: 4.0,
  S2: 3.7,
  S3: 3.4,
  S4: 3.1,
  B1: 2.4,
  B2: 2.2,
  B3: 2.0,
  B4: 1.8,
  I1: 1.3,
  I2: 1.2,
  I3: 1.1,
  I4: 1.0,
};

const TIER_PREFIX = {
  Iron: "I",
  Bronze: "B",
  Silver: "S",
  Gold: "G",
  Platinum: "P",
  Emerald: "E",
  Diamond: "D",
};

const TIER_DIVISIONS = {
  Iron: ["I", "II", "III", "IV"],
  Bronze: ["I", "II", "III", "IV"],
  Silver: ["I", "II", "III", "IV"],
  Gold: ["I", "II", "III", "IV"],
  Platinum: ["I", "II", "III", "IV"],
  Emerald: ["I", "II", "III", "IV"],
  Diamond: ["IV"],
};

const TOURNAMENTS = {
  clown: {
    cap: 34,
    allowedTiers: [
      "Iron",
      "Bronze",
      "Silver",
      "Gold",
      "Platinum",
      "Emerald",
      "Diamond",
    ],
    specialKeys: ["E1", "E2", "D4"],
  },
  mini: {
    cap: 17,
    allowedTiers: ["Iron", "Bronze", "Silver", "Gold"],
    specialKeys: [],
  },
};
const makeRankKey = (tier, divisionRoman) => {
  const romanToNum = { I: "1", II: "2", III: "3", IV: "4" };
  return (TIER_PREFIX[tier] || "") + (romanToNum[divisionRoman] || "");
};
export function parseRankKey(rankKey) {
  if (!rankKey) return { tier: "", division: "" };
  const numToRoman = { 1: "I", 2: "II", 3: "III", 4: "IV" };
  const prefix = rankKey[0];
  const tier =
    Object.entries(TIER_PREFIX).find(([, p]) => p === prefix)?.[0] || "";
  const division = numToRoman[rankKey.slice(1)] || "";
  return { tier, division };
}
const SAFE_CHARS = /[^\p{L}\p{N}\s._\-#()[\]!:/\\|]/gu;
const stripTags = (s) =>
  String(s || "")
    .replace(/</g, "")
    .replace(/>/g, "")
    .replace(/\u0000/g, "");

function cleanStr(s, max = 60) {
  return stripTags(s)
    .replace(SAFE_CHARS, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function sanitizePlayer(p) {
  return {
    nickname: cleanStr(p.nickname, 32),
    discord: cleanStr(p.discord, 40),
    rankKey: p.rankKey,
  };
}
function isValidOpgg(url) {
  if (!url) return true;
  try {
    const u = new URL(url);
    return u.protocol === "https:" && u.hostname.endsWith("op.gg");
  } catch {
    return false;
  }
}

export default function useRegisterForm() {
  const [tournament, setTournament] = useState("clown");
  const [teamName, setTeamName] = useState("");
  const [players, setPlayers] = useState(
    Array.from({ length: 5 }, () => ({
      nickname: "",
      discord: "",
      rankKey: "",
    }))
  );
  const [subs, setSubs] = useState([]);
  const [multiOpgg, setMultiOpgg] = useState("");
  const [status, setStatus] = useState(null); // "loading" | "sent" | message string

  const cfg = TOURNAMENTS[tournament];
  const allPlayers = [...players, ...subs];

  const totals = useMemo(() => {
    const points = allPlayers
      .map((p) =>
        isKeyAllowed(cfg, p.rankKey) ? RANK_POINTS[p.rankKey] ?? 0 : 0
      )
      .reduce((a, b) => a + b, 0);
    const special = cfg.specialKeys.length
      ? allPlayers.filter((p) => cfg.specialKeys.includes(p.rankKey)).length
      : 0;
    return { points: Number(points.toFixed(1)), special };
  }, [allPlayers, cfg]);

  const overCap = totals.points > cfg.cap;
  const specialViolated = cfg.specialKeys.length > 0 && totals.special > 1;

  const setPlayerField = (list, index, field, value) => {
    const copy = [...(list === "players" ? players : subs)];
    copy[index] = { ...copy[index], [field]: value };
    if (field === "rankKey" && !isKeyAllowed(cfg, value))
      copy[index].rankKey = "";
    (list === "players" ? setPlayers : setSubs)(copy);
  };

  const addSub = () =>
    setSubs((s) =>
      s.length >= 2 ? s : [...s, { nickname: "", discord: "", rankKey: "" }]
    );
  const removeSub = (i) => setSubs((s) => s.filter((_, idx) => idx !== i));

  const canSubmit =
    teamName.trim() &&
    players.every(
      (p) =>
        p.nickname && p.discord && p.rankKey && isKeyAllowed(cfg, p.rankKey)
    ) &&
    !overCap &&
    !specialViolated;

  const handleSubmit = async (e, extra = {}) => {
    e?.preventDefault?.();
    const { captainIndex = null } = extra;

    if (!canSubmit || captainIndex === null) {
      const msg =
        "Merci de compléter tous les champs, respecter les règles et choisir un capitaine.";
      setStatus(msg);
      return { ok: false, message: msg };
    }
    if (multiOpgg && !isValidOpgg(multiOpgg)) {
      const msg = "Lien op.gg invalide. Attendu : https://…op.gg/…";
      setStatus(msg);
      return { ok: false, message: msg };
    }

    const payload = {
      tournament,
      teamName: cleanStr(teamName, 48),
      players: players.map(sanitizePlayer),
      subs: subs.map(sanitizePlayer),
      multiOpgg: multiOpgg ? new URL(multiOpgg).toString() : "",
      captainIndex,
    };

    const fd = new FormData();
    fd.append("payload", JSON.stringify(payload));

    setStatus("loading");

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        body: fd,
        signal: controller.signal,
      });
      clearTimeout(timer);
      setStatus("Envoyé");
      return { ok: true, message: "Envoyé" };
    } catch (err) {
      clearTimeout(timer);

      console.error("submit error (no-cors):", err);
      setStatus("Envoyé");
      return { ok: true, message: "Envoyé" };
    }
  };

  return {
    tournament,
    setTournament,
    teamName,
    setTeamName,
    players,
    setPlayers,
    subs,
    setSubs,
    addSub,
    removeSub,
    multiOpgg,
    setMultiOpgg,
    status,
    setStatus,
    cfg,
    totals,
    overCap,
    specialViolated,
    canSubmit,
    setPlayerField,
    handleSubmit,
    makeRankKey,
    parseRankKey,
    TIER_DIVISIONS,
  };
}

function isKeyAllowed(cfg, key) {
  if (!key) return false;
  const { tier } = parseRankKey(key);
  return cfg.allowedTiers.includes(tier);
}
