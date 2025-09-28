import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useMiniClownData } from "../hooks/useMiniClownData";

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

export default function MiniClownPage() {
  const { loading, error, data } = useMiniClownData(); // <= MINI
  const teams = Array.isArray(data?.teams) ? data.teams : [];

  const rows = useMemo(() => [...teams].sort(sortByRecordDesc), [teams]);
  const [groupFilter, setGroupFilter] = useState("ALL");
  const groups = data?.groups ?? {};
  const groupKeys = Object.keys(groups);

  const filteredTeams = useMemo(() => {
    if (groupFilter === "ALL" || !groups[groupFilter]) return rows;
    const ids = new Set(groups[groupFilter]);
    return rows.filter((t) => ids.has(t.id));
  }, [groupFilter, groups, rows]);

  if (loading) return <div className="p-6">Chargement…</div>;
  if (error) return <div className="p-6 text-red-600">Erreur : {error}</div>;

  return (
    <div className="space-y-10 max-w-none">
      <header className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <Link
            to="/format-miniclown"
            className="px-4 py-2 rounded-lg border border-yellow-600 text-yellow-700 hover:bg-yellow-50 text-sm font-medium transition"
          >
            Voir le format
          </Link>
        </div>
      </header>

      {/* --- GROUPES --- */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded bg-yellow-600" />
          <h2 className="text-xl font-semibold">Groupes</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(groups).map(([groupName, teamIds]) => {
            const groupTeams = teamIds
              .map((id) => teams.find((t) => t.id === id))
              .filter(Boolean)
              .sort(sortByRecordDesc);

            return (
              <div
                key={groupName}
                className="rounded-2xl border bg-white shadow-sm p-5"
              >
                <h3 className="font-semibold text-lg mb-4">
                  Groupe {groupName}
                </h3>
                <div className="space-y-2">
                  {groupTeams.map((t, i) => (
                    <div
                      key={t.id}
                      className="flex justify-between items-center px-3 py-2 rounded-lg border bg-gray-50"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span className="text-sm font-medium text-gray-500 shrink-0">
                          {i + 1}
                        </span>
                        <div
                          className="text-lg font-semibold truncate max-w-[16rem] sm:max-w-[20rem]"
                          title={t.name}
                        >
                          {t.name}
                        </div>
                      </div>

                      <span className="text-sm text-gray-600 shrink-0 ml-3 whitespace-nowrap">
                        {t.record?.w ?? 0}–{t.record?.l ?? 0}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- ÉQUIPES --- */}
      <section className="space-y-4 max-w-none">
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
              {groupKeys.map((g) => (
                <button
                  key={g}
                  onClick={() => setGroupFilter(g)}
                  className={`px-3 py-1.5 rounded-lg border text-sm transition ${
                    groupFilter === g
                      ? "bg-yellow-600 text-white border-yellow-600"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Groupe {g}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border bg-white shadow-sm p-5"
            >
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

              <div className="mt-4 pt-4 border-t divide-y divide-gray-100">
                {(t.players ?? []).map((p) => (
                  <div
                    key={`${t.id}-${p.role}`}
                    className="py-1.5 grid md:grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3"
                  >
                    {/* gauche : pseudo/role/capitaine */}
                    <div className="min-w-0 leading-6">
                      <span
                        className="font-medium truncate align-middle"
                        title={p.nick}
                      >
                        {p.nick}
                      </span>
                      <span className="text-gray-500"> ({p.role})</span>
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

                    {/* droite : discord >= md */}
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
                  <div className="py-2 text-sm text-gray-500">
                    Roster à venir
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
