import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function FormatClown() {
  return (
    <div className="space-y-10">
      {/* RETOUR */}
      <div className="mb-4">
        <Link
          to="/clown"
          className="inline-flex items-center gap-2 text-sm text-yellow-700 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à la compétition
        </Link>
      </div>

      {/* INTRO */}
      <section className="rounded-2xl border bg-white shadow-sm p-6">
        <h1 className="text-3xl font-bold tracking-tight">Format – CLOWN</h1>
        <p className="text-gray-600 mt-2">
          Règlement complet : critères d’éligibilité, calcul des points et
          déroulement.
        </p>
        <p className="text-gray-800 mt-2 font-medium">
          📅 La CLOWN se déroulera du <strong>13/10</strong> au{" "}
          <strong>21/12</strong>.
        </p>

        {/* NAVIGATION */}
        <nav className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
          <a
            href="#calendrier"
            className="px-3 py-2 rounded-lg border hover:bg-gray-50"
          >
            Calendrier
          </a>
          <a
            href="#eligibilite"
            className="px-3 py-2 rounded-lg border hover:bg-gray-50"
          >
            Critères d’éligibilité & points
          </a>
          <a
            href="#explication"
            className="px-3 py-2 rounded-lg border hover:bg-gray-50"
          >
            Format des matchs
          </a>
          <a
            href="#phase1"
            className="px-3 py-2 rounded-lg border hover:bg-gray-50"
          >
            Phase 1
          </a>
          <a
            href="#phase2"
            className="px-3 py-2 rounded-lg border hover:bg-gray-50"
          >
            Phase 2
          </a>
          <a
            href="#lcq"
            className="px-3 py-2 rounded-lg border hover:bg-gray-50"
          >
            Last Chance Qualifier
          </a>
          <a
            href="#playoffs"
            className="px-3 py-2 rounded-lg border hover:bg-gray-50"
          >
            Playoffs
          </a>
          <a
            href="#autre"
            className="px-3 py-2 rounded-lg border hover:bg-gray-50"
          >
            Autre (vocal, retards, etc.)
          </a>
        </nav>
      </section>

      {/* CALENDRIER */}
      <section id="calendrier" className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded bg-yellow-600" />
          <h2 className="text-2xl font-semibold">Calendrier</h2>
        </div>

        <div className="rounded-2xl border bg-white shadow-sm p-6">
          <p className="text-gray-700">
            La CLOWN se déroule du <strong>13/10</strong> au{" "}
            <strong>21/12</strong>. Détail des phases :
          </p>

          <div className="mt-4 rounded-xl border bg-gray-50 p-4 space-y-2">
            <h3 className="text-lg font-semibold text-yellow-700">🏆 CLOWN</h3>
            <ul className="text-sm text-gray-800 space-y-1">
              <li>
                <strong>Phase 1 :</strong> 13/10 → 05/11
              </li>
              <li>
                <strong>Phase 2 :</strong> 06/11 → 25/11
              </li>
              <li>
                <strong>LCQ :</strong> 27/11 → 02/12
              </li>
              <li>
                <strong>Playoffs :</strong> 03/12 → 21/12
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ÉLIGIBILITÉ & POINTS */}
      <section id="eligibilite" className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded bg-yellow-600" />
          <h2 className="text-2xl font-semibold">
            Critères de validité des équipes & calcul des points
          </h2>
        </div>

        <div className="rounded-2xl border bg-white shadow-sm p-6 space-y-4">
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>
              Limite de points par équipe : <strong>34</strong>.
            </li>
            <li>
              <strong>Autorisé</strong> jusqu’à <strong>Diamant IV</strong> ;
              refonte du barème pour mieux équilibrer.
            </li>
            <li>
              <strong>Maximum 1</strong> joueur parmi :{" "}
              <strong>D4, Émeraude I ou Émeraude II</strong> par équipe.
            </li>
            <li>
              Il faut au moins un <strong>supporter SLY</strong> et/ou des{" "}
              <strong>anciens de la CLOWN</strong> dans l’équipe.
            </li>
          </ul>

          <div>
            <h3 className="text-lg font-semibold">
              Comment sont calculés les points ?
            </h3>
            <p className="text-gray-700">
              On retient l’<strong>elo de fin de split 2024</strong> (S1/S2/S3)
              ou l’<strong>elo actuel</strong> s’il est plus haut. Ce n’est pas
              le “peak” temporaire, mais l’elo <em>lock</em> de fin de split
              (Solo/Duo).
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Cas particuliers</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>
                <strong>Pas d’elo en 2024 :</strong> on regarde les 3 derniers
                splits dispo sur op.gg, sinon cas géré à la main.
              </li>
              <li>
                <strong>Elo actuel bien plus haut :</strong> l’orga peut ajuster
                la valeur de points / refuser la candidature si trop haut.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Attention smurf</h3>
            <p className="text-gray-700">
              Nous serons vigilants. Des cas avérés de smurfing ⇒{" "}
              <strong>ban définitif</strong> des compétitions CLOWN. La CLOWN
              reste un tournoi Gold/Plat friendly.
            </p>
          </div>
        </div>
      </section>

      {/* FORMAT MATCHS */}
      <section id="explication" className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded bg-yellow-600" />
          <h2 className="text-2xl font-semibold">
            Format des matchs — HARD FEARLESS
          </h2>
        </div>

        <div className="rounded-2xl border bg-white shadow-sm p-6 space-y-3">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              En <strong>Hard Fearless</strong>, chaque champion{" "}
              <strong>joué</strong> par une équipe devient{" "}
              <strong>indisponible pour le reste de la série</strong> pour cette
              équipe.
            </li>
            <li>
              S’applique aux BO2/BO3/BO5 ; les bans et le choix du side suivent
              les règles précisées par phase.
            </li>
            <li>
              <strong>Pick interdit</strong> joué ⇒ défaite automatique de la
              game.
            </li>
          </ul>
        </div>
      </section>

      {/* PHASE 1 */}
      <section id="phase1" className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded bg-yellow-600" />
          <h2 className="text-2xl font-semibold">Phase 1 — Saison régulière</h2>
        </div>
        <div className="rounded-2xl border bg-white shadow-sm p-6 space-y-4">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>4 groupes</strong> de 5 équipes.
            </li>
            <li>
              Double confrontation en <strong>Hard Fearless (BO2)</strong>.
            </li>
            <li>
              Side : chaque équipe choisit une fois ; la moins bien seedée
              choisit en premier.
            </li>
          </ul>

          <div>
            <h3 className="text-lg font-semibold">Seeding & classement</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Seeding selon le <strong>total de points</strong> puis l’{" "}
                <strong>écart-type</strong> en cas d’égalité.
              </li>
              <li>
                Classement : 1) Points 2) Head-to-head 3) Somme des durées des
                games gagnées.
              </li>
              <li>
                Top 2 → <strong>poules winner</strong> ; 3ᵉ-4ᵉ →{" "}
                <strong>poules loser</strong>.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* PHASE 2 */}
      <section id="phase2" className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded bg-yellow-600" />
          <h2 className="text-2xl font-semibold">
            Phase 2 — Groupes winner/loser
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border bg-white shadow-sm p-6 space-y-3">
            <h3 className="text-lg font-semibold">
              Groupe <span className="text-green-700">winner</span>
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                2 poules de 4 (via seeding phase 1), BO2 Hard Fearless, side
                alterné (seedé d’abord).
              </li>
              <li>
                <strong>Top 3</strong> de chaque poule →{" "}
                <strong>Playoffs</strong>, 4ᵉ → <strong>LCQ</strong>.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border bg-white shadow-sm p-6 space-y-3">
            <h3 className="text-lg font-semibold">
              Groupe <span className="text-red-700">loser</span>
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>2 poules de 4, BO2 Hard Fearless, même règle de side.</li>
              <li>
                <strong>1er</strong> → <strong>LCQ</strong>, autres éliminés.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* LCQ */}
      <section id="lcq" className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded bg-yellow-600" />
          <h2 className="text-2xl font-semibold">Last Chance Qualifier</h2>
        </div>
        <div className="rounded-2xl border bg-white shadow-sm p-6 space-y-3">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Tirage aléatoire (on évite deux équipes d’un même groupe P1 si
              possible).
            </li>
            <li>
              <strong>BO5 Hard Fearless</strong>, side pour l’équipe issue du
              groupe <strong>winner</strong>.
            </li>
            <li>
              Vainqueur → <strong>Playoffs</strong>, perdant éliminé.
            </li>
          </ul>
        </div>
      </section>

      {/* PLAYOFFS */}
      <section id="playoffs" className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded bg-yellow-600" />
          <h2 className="text-2xl font-semibold">Phase 3 — Playoffs</h2>
        </div>
        <div className="rounded-2xl border bg-white shadow-sm p-6 space-y-3">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Toutes les confrontations en <strong>BO3</strong>, grande finale
              en <strong>BO5</strong>.
            </li>
            <li>
              <strong>Hard Fearless</strong> sur la série (un champion joué
              devient indispo).
            </li>
            <li>Side : meilleur seed choisit G1 ; puis le perdant choisit.</li>
            <li>
              Placement selon seed de la phase précédente ; équipes d’un même
              groupe winner évitées en quarts.
            </li>
          </ul>
        </div>
      </section>

      {/* AUTRE */}
      <section id="autre" className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded bg-yellow-600" />
          <h2 className="text-2xl font-semibold">Autre</h2>
        </div>
        <div className="rounded-2xl border bg-white shadow-sm p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Vocal</h3>
            <p className="text-gray-700">
              Présence <strong>obligatoire</strong> sur le Discord pendant les
              matchs. Coachs autorisés mais <strong>muets</strong>.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Retards</h3>
            <p className="text-gray-700">
              Au-delà de <strong>20 min</strong> de retard, demande de forfait
              possible (restez fair-play).
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Draft</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>
                Swaps libres, mais à l’<em>entrée en game</em> l’adversaire sait
                qui joue quoi.
              </li>
              <li>
                Avant la draft, rien à révéler. Outil conseillé :{" "}
                <strong>drafterlol</strong>.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Remplacements</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>
                Autorisé si la <strong>limite de points</strong> est respectée.
              </li>
              <li>
                Prévenir l’adversaire et envoyer l’<strong>op.gg</strong> du
                remplaçant dès que possible.
              </li>
              <li>
                Remplacements <strong>entre BO</strong> autorisés si
                l’adversaire est prévenu.
              </li>
              <li>
                L’orga ne vérifie pas systématiquement tous les remplacements.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
