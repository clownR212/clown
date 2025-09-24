import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
function sortByRecordDesc(a, b) {
  const aw = a.record?.w ?? 0, al = a.record?.l ?? 0;
  const bw = b.record?.w ?? 0, bl = b.record?.l ?? 0;

  if (aw !== bw) return bw - aw;             // + de victoires d'abord
  const ad = aw - al, bd = bw - bl;
  if (ad !== bd) return bd - ad;             // meilleur différentiel ensuite
  return (a.name || "").localeCompare(b.name || ""); // tie-breaker alpha
}
export default function CompetitionPage({ data }) {
  const teams = Array.isArray(data?.teams) ? data.teams : [];

  const rows = useMemo(() => [...teams].sort(sortByRecordDesc), [teams]);

  const [groupFilter, setGroupFilter] = useState("ALL");
  const groups = data?.groups ?? {};
  const groupKeys = Object.keys(groups);

  const filteredTeams = useMemo(() => {
    if (groupFilter === "ALL" || !groups[groupFilter]) return rows;
    const ids = new Set(groups[groupFilter]);
    return rows.filter(t => ids.has(t.id));
  }, [groupFilter, groups, rows]);
  return (
    <div className="space-y-10 max-w-none">
              <header className="flex items-start justify-between gap-4">

        <div className="flex gap-3">
          <Link
            to="/format"
            className="px-4 py-2 rounded-lg border border-yellow-600 text-yellow-700 hover:bg-yellow-50 text-sm font-medium transition"
          >
            Voir le format
          </Link>
        </div>
      </header>
<section className="space-y-6">
  <div className="flex items-center gap-2">
    <div className="w-1.5 h-5 rounded bg-yellow-600" />
    <h2 className="text-xl font-semibold">Groupes</h2>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
    {Object.entries(data.groups).map(([groupName, teamIds]) => {
      // Récupère les équipes du groupe et trie par points
      const groupTeams = teamIds
        .map((id) => data.teams.find((t) => t.id === id))
        .sort(sortByRecordDesc); 

      return (
        <div key={groupName} className="rounded-2xl border bg-white shadow-sm p-5">
          <h3 className="font-semibold text-lg mb-4">Groupe {groupName}</h3>
          <div className="space-y-2">
            {groupTeams.map((t, i) => (
              <div
                key={t.id}
                className="flex justify-between items-center px-3 py-2 rounded-lg border bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-500">{i + 1}</span>
                  <span className="font-semibold">{t.name}</span>
                </div>
                <span className="text-sm text-gray-600">  {(t.record?.w ?? 0)}–{(t.record?.l ?? 0)}
</span>
              </div>
            ))}
          </div>
        </div>
      );
    })}
  </div>
</section>

   {/* --- ÉQUIPES ------------------------------------------------------------ */}
<section className="space-y-4 max-w-none">
  <div className="flex items-center justify-between gap-2">
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-5 rounded bg-yellow-600" />
      <h2 className="text-xl font-semibold">Équipes</h2>
    </div>

    {/* Boutons filtre groupes */}
    {groupKeys.length > 0 && (
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setGroupFilter("ALL")}
          className={`px-3 py-1.5 rounded-lg border text-sm transition
            ${groupFilter === "ALL"
              ? "bg-yellow-600 text-white border-yellow-600"
              : "border-gray-300 hover:bg-gray-50"}`}
        >
          Tous
        </button>
        {groupKeys.map((g) => (
          <button
            key={g}
            onClick={() => setGroupFilter(g)}
            className={`px-3 py-1.5 rounded-lg border text-sm transition
              ${groupFilter === g
                ? "bg-yellow-600 text-white border-yellow-600"
                : "border-gray-300 hover:bg-gray-50"}`}
          >
            Groupe {g}
          </button>
        ))}
      </div>
    )}
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredTeams.map((t) => (
      <div key={t.id} className="rounded-2xl border bg-white shadow-sm p-5">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-lg font-semibold">{t.name}</div>
            <a
              className="text-yellow-700 text-sm hover:underline"
              href={t.opgg}
              target="_blank"
              rel="noreferrer"
            >
              op.gg global
            </a>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">Points</div>
            <div className="text-2xl font-bold">{t.points}</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t space-y-1.5">
          {(t.players ?? []).map((p) => (
            <div key={p.nick} className="flex justify-between text-sm leading-6">
              <div>
                <span className="font-medium">{p.nick}</span>
                <span className="text-gray-500"> ({p.role})</span>
                {p.captain && (
                  <span className="ml-2 align-middle inline-block px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs">
                    Capitaine
                  </span>
                )}
              </div>
              {p.discord && <span className="text-gray-500">{p.discord}</span>}
            </div>
          ))}
          {!(t.players && t.players.length) && (
            <div className="text-sm text-gray-500">Roster à venir</div>
          )}
        </div>
      </div>
    ))}
  </div>
</section>

    </div>
  );
}
