import { useMemo, useState } from "react";

/* ===== Points & mapping rangs ===== */
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
  Diamond: ["IV"], // D4 uniquement
};

/* ===== Config tournois =====
   - MiniClown : Gold autorisé (cap 17, pas de règle spéciale)
   - Clown : cap 34, règle max 1 parmi E1/E2/D4
*/
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
    specialKeys: ["E1", "E2", "D4"], // max 1 parmi eux
  },
  mini: {
    cap: 17,
    allowedTiers: ["Iron", "Bronze", "Silver", "Gold"],
    specialKeys: [],
  },
};

/* ===== Helpers exposés au composant ===== */
const makeRankKey = (tier, divisionRoman) => {
  const romanToNum = { I: "1", II: "2", III: "3", IV: "4" };
  return (TIER_PREFIX[tier] || "") + (romanToNum[divisionRoman] || "");
};

const parseRankKey = (rankKey) => {
  if (!rankKey) return { tier: "", division: "" };
  const numToRoman = { 1: "I", 2: "II", 3: "III", 4: "IV" };
  const prefix = rankKey[0];
  const tier =
    Object.entries(TIER_PREFIX).find(([, p]) => p === prefix)?.[0] || "";
  const division = numToRoman[rankKey.slice(1)] || "";
  return { tier, division };
};

const emptyPlayer = () => ({ nickname: "", discord: "", rankKey: "" });

const isKeyAllowed = (cfg, key) => {
  if (!key) return false;
  const { tier } = parseRankKey(key);
  return cfg.allowedTiers.includes(tier);
};

/* ===== Hook principal ===== */
export default function useRegisterForm() {
  const [tournament, setTournament] = useState("clown"); // "clown" | "mini"
  const [teamName, setTeamName] = useState("");
  const [players, setPlayers] = useState(
    Array.from({ length: 5 }, emptyPlayer)
  );
  const [subs, setSubs] = useState([]);
  const [multiOpgg, setMultiOpgg] = useState("");
  const [status, setStatus] = useState(null);

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
    // Si rang interdit => on efface
    if (field === "rankKey" && !isKeyAllowed(cfg, value)) {
      copy[index].rankKey = "";
    }
    list === "players" ? setPlayers(copy) : setSubs(copy);
  };

  const addSub = () => setSubs((s) => [...s, emptyPlayer()]);
  const removeSub = (i) => setSubs((s) => s.filter((_, idx) => idx !== i));

  const canSubmit =
    teamName.trim() &&
    players.every(
      (p) =>
        p.nickname && p.discord && p.rankKey && isKeyAllowed(cfg, p.rankKey)
    ) &&
    !overCap &&
    !specialViolated;

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!canSubmit) {
      setStatus(
        "Merci de compléter tous les champs et de respecter les règles."
      );
      return;
    }
    // Brancher ici ton Apps Script / backend si besoin
    console.log({
      tournament,
      teamName,
      players,
      subs,
      multiOpgg,
      totalPoints: totals.points,
    });
    setStatus("✅ Formulaire prêt à être envoyé (voir console).");
  };

  return {
    // state
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

    // config & calculs
    cfg,
    totals,
    overCap,
    specialViolated,
    canSubmit,

    // actions
    setPlayerField,
    handleSubmit,

    // helpers pour l’UI
    makeRankKey,
    parseRankKey,
    TIER_DIVISIONS,
  };
}
