// Fichier : useClownData.js (Le même que précédemment)

import { useEffect, useMemo, useState } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxYSD6RH0Ui7792vwy8yczs6qemGc24TvPF9wMLuBCSSUJdR4aNGZ0DjWcCyDmAW3HF/exec"; // Votre URL d'origine

const ROLES = ["TOP", "JGL", "MID", "ADC", "SUPP"];

// --- Fonctions Helpers (rankKeyToLabel, mapToUi) ---
// ... (Ces fonctions restent inchangées et ne sont pas répétées ici pour la clarté) ...
const PREFIX_TO_TIER_FR = {
  I: "Fer",
  B: "Bronze",
  S: "Argent",
  G: "Or",
  P: "Platine",
  E: "Émeraude",
  D: "Diamant",
};
const NUM_TO_ROMAN = { 1: "I", 2: "II", 3: "III", 4: "IV" };

function rankKeyToLabel(key) {
  if (!key) return "";
  const k = String(key).trim();
  if (/^[IBSGPED][1234]$/.test(k)) {
    const tier = PREFIX_TO_TIER_FR[k[0]];
    const div = NUM_TO_ROMAN[k[1]];
    return tier && div ? `${tier} ${div}` : "";
  }
  return k;
}

function mapToUi(rawTeams) {
  const groups = {};
  const teams = (rawTeams || []).map((t) => {
    const players = (t.players || []).slice(0, 5).map((p, i) => ({
      nick: p.nickname || "",
      discord: p.discord || "",
      role: ROLES[i],
      elo: rankKeyToLabel(p.rankKey || p.rank || p.elo),
      captain: typeof t.captainIndex === "number" && t.captainIndex === i,
    }));
    const subs = (t.subs || [])
      .slice(0, 2)
      .map((s, i) => ({
        nick: s.nickname || "",
        discord: s.discord || "",
        role: `SUB${i + 1}`,
        elo: rankKeyToLabel(s.rankKey || s.rank || s.elo),
      }))
      .filter((s) => s.nick || s.discord || s.elo);
    const g = (t.group || "").trim();
    if (g) {
      if (!groups[g]) groups[g] = [];
      groups[g].push(t.id);
    }
    return {
      id: t.id,
      name: t.teamName || "",
      points: Number(t.totalPoints || 0),
      opgg: t.multiOpgg || "",
      special: Number(t.special || 0),
      players,
      subs,
      record: t.record || null,
    };
  });
  return { groups, teams };
}
// --- Fin des fonctions Helpers ---

const sortByRecordDesc = (a, b) => {
  const aw = a.record?.w ?? 0,
    al = a.record?.l ?? 0;
  const bw = b.record?.w ?? 0,
    bl = b.record?.l ?? 0;
  if (aw !== bw) return bw - aw;
  const ad = aw - al,
    bd = bw - bl;
  if (ad !== bd) return bd - ad;
  return (a.name || "").localeCompare(b.name || "");
};

export function useClownData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ groups: {}, teams: [] });

  useEffect(() => {
    let abort = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${SCRIPT_URL}?tournament=clown`, {
          method: "GET",
          cache: "no-store",
        });
        const json = await res.json();
        const rawTeams = Array.isArray(json) ? json : (json && json.data) || [];
        if (!abort) setData(mapToUi(rawTeams));
      } catch (e) {
        if (!abort) setError(e?.message || "Erreur de chargement");
      } finally {
        if (!abort) setLoading(false);
      }
    }
    load();
    return () => {
      abort = true;
    };
  }, []);

  const sorted = useMemo(() => {
    const teams = [...data.teams].sort(sortByRecordDesc);
    return { groups: data.groups, teams };
  }, [data]);

  return { loading, error, data: sorted };
}
