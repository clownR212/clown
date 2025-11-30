import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useClownData } from "../hooks/useClownData";
import { usePlayoffsData } from "../hooks/usePlayoffsData"; // Import du hook Playoffs dédié

/**
 * Fonction de tri par bilan (Victoires > Différence W-L > Nom)
 */
function sortByRecordDesc(a, b) {
  const aw = a.record?.w ?? 0,
    al = a.record?.l ?? 0;
  const bw = b.record?.w ?? 0,
    bl = b.record?.l ?? 0;
  if (aw !== bw) return bw - aw;
  const ad = aw - al,
    bd = bw - bl;
  if (ad !== bd) return bd - ad;
  return (a.name || "").localeCompare(b.name || "");
}

function MatchBox({ team, winner, score, isFinalist = false }) {
  const isWinner = winner === team.name;
  const isLoser = winner !== null && !isWinner;
  const highlightClass = isWinner
    ? "bg-yellow-100 border-yellow-500 font-semibold"
    : isLoser
    ? "text-gray-500 bg-gray-50 border-gray-200"
    : "bg-white border-gray-300";

  const nameDisplay = team.name || "TBD";

  return (
    <div
      className={`flex items-center justify-between p-1.5 text-xs rounded-md border ${highlightClass} 
              ${isFinalist ? "text-sm p-2" : ""}`}
    >
      <span className="truncate max-w-[65%]">{nameDisplay}</span>
      {/* max-w-[70%] changé en max-w-[65%] */}
      <span className="font-bold text-gray-700">
        {score !== undefined && score !== null ? score : "—"}
      </span>
    </div>
  );
}

function MatchNode({ match, title, isFinal = false, isLCQ = false }) {
  const winner =
    match.teamA.score > match.teamB.score
      ? match.teamA.name
      : match.teamB.score > match.teamA.score
      ? match.teamB.name
      : null;
  const headerBg = isLCQ
    ? "bg-red-100 border-red-300 text-red-800"
    : "bg-green-100 border-green-300 text-green-800";

  // Détection du forfait basé sur le statut renvoyé par Apps Script
  const isForfeit =
    match.teamA.status === "Loser - Forfait" ||
    match.teamB.status === "Loser - Forfait";

  return (
    <div
      className={`flex flex-col gap-2 p-3 rounded-xl border-2 ${
        isLCQ ? "border-red-400" : "border-green-400"
      } bg-white shadow-lg`}
    >
      <h4
        className={`text-center font-bold text-sm px-2 py-1 rounded ${headerBg}`}
      >
        {title}
      </h4>

      <div className={`space-y-1 ${isFinal ? "scale-[1.1] shadow-xl" : ""}`}>
        <MatchBox
          team={match.teamA}
          winner={winner}
          score={match.teamA.score}
          isFinalist={isFinal}
        />
        <MatchBox
          team={match.teamB}
          winner={winner}
          score={match.teamB.score}
          isFinalist={isFinal}
        />
      </div>
      {isForfeit && (
        <p className="text-center text-xs text-red-600 pt-1">
          Forfait d'une équipe
        </p>
      )}
      {isFinal && (
        <p className="text-center text-xs text-gray-600 pt-1">
          Gagnant : {winner || "Match à venir"}
        </p>
      )}
    </div>
  );
}

function PlayoffsBracket({ bracketData }) {
  // S'assurer que les données sont des tableaux, sinon utiliser un tableau vide
  const lcqMatches = Array.isArray(bracketData?.LCQ_R1) // LCQ_R1
    ? bracketData.LCQ_R1
    : [];
  const quarterMatches = Array.isArray(bracketData?.Quarters) // Quarters
    ? bracketData.Quarters
    : [];
  const semiMatches = Array.isArray(bracketData?.Semis) // Semis
    ? bracketData.Semis
    : [];
  const finalMatches = Array.isArray(bracketData?.Final) // Final
    ? bracketData.Final
    : [];

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-5 rounded bg-yellow-600" />
        <h2 className="text-xl font-semibold">Arbre de PlayOffs</h2>
      </div>

      <div className="flex justify-center items-stretch gap-8 p-4 bg-gray-50 rounded-xl shadow-inner overflow-x-auto">
        {/* 1. LCQ (Arbre de Repêchage) - Phase de Qualification */}
        <div className="flex flex-col justify-start gap-8 border-r border-gray-300 pr-8 min-w-[200px] shrink-0">
          <h3 className="text-center font-bold text-lg text-red-700 mt-1">
            LCQ (Qualification)
          </h3>
          {lcqMatches.map((match, index) => (
            <MatchNode
              key={index}
              match={match}
              title={match.name} // Utilise l'ID LCQ1, LCQ2, etc.
              isLCQ={true}
            />
          ))}
        </div>

        {/* 2. Quarts de finale / Round of 8 */}
        <div className="flex flex-col justify-around gap-12 min-w-[200px] shrink-0">
          <h3 className="text-center font-bold text-lg text-green-700">
            Quarts
          </h3>
          {quarterMatches.map((match, index) => (
            <MatchNode key={index} match={match} title={`QF${index + 1}`} />
          ))}
        </div>

        {/* 3. Demi-finales */}
        <div className="flex flex-col justify-around gap-20 min-w-[200px] shrink-0">
          <h3 className="text-center font-bold text-lg text-green-700">
            Demis
          </h3>
          {semiMatches.map((match, index) => (
            <MatchNode key={index} match={match} title={`SF${index + 1}`} />
          ))}
        </div>

        {/* 4. Finale (Arbre Principal) */}
        <div className="flex flex-col justify-center items-center min-w-[220px] shrink-0">
          <h3 className="text-center font-bold text-lg text-green-700 mb-6">
            Grande Finale
          </h3>
          {finalMatches.map((match, index) => (
            <MatchNode
              key={index}
              match={match}
              title="FINALE"
              isFinal={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// --- COMPOSANT PRINCIPAL (ClownPage) ---
// ----------------------------------------------------------------------

export default function ClownPage() {
  // Données d'équipes (EXISTANT)
  const { loading, error, data } = useClownData();
  const teams = Array.isArray(data?.teams) ? data.teams : [];
  const groups = data?.groups ?? {};

  // NOUVEAU : Données de Playoffs (DYNAMIQUES)
  const {
    loading: loadingPlayoffs,
    error: errorPlayoffs,
    bracketData,
  } = usePlayoffsData();

  const rows = useMemo(() => [...teams].sort(sortByRecordDesc), [teams]);

  const [groupFilter, setGroupFilter] = useState("ALL");

  const groupKeys = Object.keys(groups);
  const groupLabels = {
    A: "Winner Group A",
    B: "Winner Group B",
    C: "Loser Group A",
    D: "Loser Group B",
  };
  const filteredTeams = useMemo(() => {
    if (groupFilter === "ALL" || !groups[groupFilter]) return rows;
    const ids = new Set(groups[groupFilter]);
    return rows.filter((t) => ids.has(t.id));
  }, [groupFilter, groups, rows]);

  // GESTION DES ERREURS/CHARGEMENT COMBINÉS
  const anyLoading = loading || loadingPlayoffs;
  const anyError = error || errorPlayoffs;

  // Rendu de la section Équipes (Team Roster/Stats)
  const renderTeamsSection = () => (
    <section className="space-y-4 max-w-none pt-8">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded bg-yellow-600" />
          <h2 className="text-xl font-semibold">Équipes</h2>
        </div>

        {groupKeys.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setGroupFilter("ALL")}
              className={`px-3 py-1.5 rounded-lg border text-sm transition ${
                groupFilter === "ALL"
                  ? "bg-yellow-600 text-white border-yellow-600"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              Tous
            </button>
            {groupKeys.map((g) => {
              const label = groupLabels[g] || `Groupe ${g}`;
              return (
                <button
                  key={g}
                  onClick={() => setGroupFilter(g)}
                  className={`px-3 py-1.5 rounded-lg border text-sm transition ${
                    groupFilter === g
                      ? "bg-yellow-600 text-white border-yellow-600"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((t) => (
          <div key={t.id} className="rounded-2xl border bg-white shadow-sm p-5">
            <div className="flex justify-between items-start">
              <div className="min-w-0">
                <div
                  className="text-lg font-semibold truncate max-w-[14rem] sm:max-w-[16rem] md:max-w-[18rem]"
                  title={t.name}
                >
                  {t.name}
                </div>

                {t.opgg && (
                  <a
                    className="text-yellow-700 text-sm hover:underline break-all"
                    href={t.opgg}
                    target="_blank"
                    rel="noreferrer"
                  >
                    op.gg global
                  </a>
                )}
              </div>

              <div className="text-right shrink-0 ml-4">
                <div className="text-xs text-gray-500">Points</div>
                <div className="text-2xl font-bold">{t.points}</div>
              </div>
            </div>

            {/* Titulaires */}
            <div className="mt-4 pt-4 border-t divide-y divide-gray-100">
              {(t.players ?? []).map((p) => (
                <div
                  key={`${t.id}-${p.role}`}
                  className="py-1.5 grid md:grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3"
                >
                  <div className="min-w-0 leading-6">
                    <span
                      className="font-medium truncate align-middle"
                      title={p.nick}
                    >
                      {p.nick}
                    </span>
                    <span className="text-gray-500 pl-1">
                      ({p.role}
                      {p.elo ? ` · ${p.elo}` : ""})
                    </span>
                    {p.captain && (
                      <span className="ml-2 align-middle inline-block px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs">
                        Capitaine
                      </span>
                    )}
                    {p.discord && (
                      <div
                        className="md:hidden text-gray-500 text-sm truncate"
                        title={p.discord}
                      >
                        {p.discord}
                      </div>
                    )}
                  </div>

                  {p.discord && (
                    <div
                      className="hidden md:block text-gray-500 text-sm text-right truncate max-w-[12rem] lg:max-w-[16rem]"
                      title={p.discord}
                    >
                      {p.discord}
                    </div>
                  )}
                </div>
              ))}

              {!(t.players && t.players.length) && (
                <div className="py-2 text-sm text-gray-500">Roster à venir</div>
              )}
            </div>

            {/* Remplaçants */}
            {t.subs && t.subs.length > 0 && (
              <div className="mt-3 pt-3 border-t divide-y divide-gray-100">
                <div className="text-sm font-semibold text-gray-700 pb-2">
                  Remplaçants
                </div>
                {t.subs.map((s) => (
                  <div
                    key={`${t.id}-${s.role}`}
                    className="py-1.5 grid md:grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3"
                  >
                    <div className="min-w-0 leading-6">
                      <span
                        className="font-medium truncate align-middle"
                        title={s.nick}
                      >
                        {s.nick || "—"}
                      </span>
                      <span className="text-gray-500 pl-1">
                        ({s.role}
                        {s.elo ? ` · ${s.elo}` : ""})
                      </span>
                      {s.discord && (
                        <div
                          className="md:hidden text-gray-500 text-sm truncate"
                          title={s.discord}
                        >
                          {s.discord}
                        </div>
                      )}
                    </div>

                    {s.discord && (
                      <div
                        className="hidden md:block text-gray-500 text-sm text-right truncate max-w-[12rem] lg:max-w-[16rem]"
                        title={s.discord}
                      >
                        {s.discord}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="space-y-10 max-w-none">
      {/* --- HEADER --- */}
      <header className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <Link
            to="/format-clown"
            className="px-4 py-2 rounded-lg border border-yellow-600 text-yellow-700 hover:bg-yellow-50 text-sm font-medium transition"
          >
            Voir le format
          </Link>
          <Link
            to="/phase-results"
            className="px-4 py-2 rounded-lg border border-yellow-600 text-yellow-700 hover:bg-yellow-50 text-sm font-medium transition"
          >
            Résultats des précedentes phases
          </Link>
        </div>
      </header>

      {/* --- CONTENU PRINCIPAL : ARBRE DE PLAYOFFS + ÉQUIPES --- */}
      {anyError ? (
        <div className="p-6 text-red-600">
          Erreur : {error || errorPlayoffs}
        </div>
      ) : anyLoading ? (
        <div className="p-6 text-gray-500 animate-pulse">
          Chargement des données…
        </div>
      ) : (
        <>
          {/* 1. Arbre de Playoffs - Utilise les données dynamiques */}
          <PlayoffsBracket bracketData={bracketData} />

          {/* 2. Vue Équipes */}
          {renderTeamsSection()}
        </>
      )}
    </div>
  );
}
