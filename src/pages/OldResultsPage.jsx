import { Link } from "react-router-dom";

function sortByRecordDesc(a, b) {
  const aw = a.w ?? 0,
    al = a.l ?? 0;
  const bw = b.w ?? 0,
    bl = b.l ?? 0;
  if (aw !== bw) return bw - aw;
  const ad = aw - al,
    bd = bw - bl;
  if (ad !== bd) return bd - ad;
  if (a.name === "TPA esport" && b.name === "L212") return -1;
  if (a.name === "L212" && b.name === "TPA esport") return 1;
  return (a.name || "").localeCompare(b.name || "");
}

const renderGroupTable = (groupName, teams, isPhase2 = false) => {
  const sortedTeams = [...teams].sort(sortByRecordDesc);

  let title = `Groupe ${groupName}`;
  if (groupName === "A") title = "Group A";
  else if (groupName === "B") title = "Group B";
  else if (groupName === "C") title = "Group C";
  else if (groupName === "D") title = "Group D";
  else if (groupName === "A2") title = "Winner Group A";
  else if (groupName === "B2") title = "Winner Group B";
  else if (groupName === "C2") title = "Loser Group A";
  else if (groupName === "D2") title = "Loser Group B";
  else if (isPhase2) title = `Phase 2 - Groupe ${groupName}`;

  return (
    <div key={groupName} className="rounded-2xl border bg-white shadow-sm p-5">
      <h3 className="font-semibold text-lg mb-4 text-center">{title}</h3>
      <div className="space-y-2">
        {sortedTeams.map((t, i) => (
          <div
            key={i}
            className={`flex justify-between items-center px-3 py-2 rounded-lg border 
                                  `}
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
              {t.w}–{t.l}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Phase1ResultsPage() {
  const phase2Groups = {
    A2: [
      // Winner Group A
      { name: "Protect Our Group", w: 6, l: 0 },
      { name: "Starlight Foxes", w: 3, l: 3 },
      { name: "Vantage", w: 3, l: 3 },
      { name: "Confrérie Du W", w: 0, l: 6 },
    ],
    B2: [
      // Winner Group B
      { name: "EhpadQuartier", w: 5, l: 1 },
      { name: "Nulary", w: 5, l: 1 },
      { name: "L’équipe21 #ANG", w: 1, l: 5 },
      { name: "Vermine Corp", w: 1, l: 5 },
    ],
    C2: [
      // Loser Group A
      { name: "Randomizer.org", w: 6, l: 0 },
      { name: "PCM", w: 2, l: 2 },
      { name: "TPA esport", w: 1, l: 3 },
      { name: "Tours Tourelles", w: 1, l: 5 },
    ],
    D2: [
      // Loser Group B
      { name: "Unwanted Union", w: 6, l: 1 },
      { name: "L212", w: 5, l: 2 },
      { name: "11 minutos tardes", w: 0, l: 4 },
      { name: "T2", w: 0, l: 4 },
    ],
  };

  const phase1Groups = {
    A: [
      { name: "Protect Our Group", w: 7, l: 1 },
      { name: "L’équipe21 #ANG", w: 6, l: 2 },
      { name: "Randomizer.org", w: 4, l: 4 },
      { name: "11 minutos tardes", w: 3, l: 5 },
      { name: "Tours Tourelles", w: 0, l: 8 },
    ],
    B: [
      { name: "Nulary", w: 4, l: 2 },
      { name: "Starlight Foxes", w: 4, l: 2 },
      { name: "Unwanted Union", w: 4, l: 2 },
      { name: "PCM", w: 0, l: 6 },
    ],
    C: [
      { name: "Confrérie Du W", w: 4, l: 2 },
      { name: "Vermine Corp", w: 4, l: 2 },
      { name: "TPA esport", w: 2, l: 4 },
      { name: "L212", w: 2, l: 4 },
    ],
    D: [
      { name: "EhpadQuartier", w: 5, l: 1 },
      { name: "T2", w: 3, l: 3 },
      { name: "Vantage", w: 4, l: 2 },
      { name: "Les Outsiders d…", w: 0, l: 6 },
    ],
  };

  // Rendu des groupes de Phase 1
  const renderPhase1 = () => (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-5 rounded bg-yellow-600" />
        <h2 className="text-xl font-semibold">
          Résultats de la phase 1 (Groupes A, B, C, D)
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(phase1Groups).map(([groupName, teams]) =>
          renderGroupTable(groupName, teams, false)
        )}
      </div>
    </section>
  );

  // Rendu de la Phase 2 (Nouveaux groupes)
  const renderPhase2 = () => (
    <section className="space-y-6 pt-10 border-t border-gray-200">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-5 rounded bg-yellow-600" />
        <h2 className="text-xl font-semibold">Résultats de la phase 2</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(phase2Groups).map(([groupName, teams]) =>
          renderGroupTable(groupName, teams, true)
        )}
      </div>
    </section>
  );

  return (
    <div className="space-y-10 max-w-none">
      <header className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <Link
            to="/format-clown"
            className="px-4 py-2 rounded-lg border border-yellow-600 text-yellow-700 hover:bg-yellow-50 text-sm font-medium transition"
          >
            Voir le format
          </Link>
          <Link
            to="/clown"
            className="px-4 py-2 rounded-lg border border-yellow-600 text-yellow-700 hover:bg-yellow-50 text-sm font-medium transition"
          >
            Retour à la compétition
          </Link>
        </div>
      </header>
      {renderPhase1()}
      {renderPhase2()}
    </div>
  );
}
