import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Format() {
  return (
    <div className="space-y-10">
            <div className="mb-4">
        <Link
          to="/clown"
          className="inline-flex items-center gap-2 text-sm text-yellow-700 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à la compétition
        </Link>
      </div>
      {/* Titre + sommaire */}
      <section className="rounded-2xl border bg-white shadow-sm p-6">
        <h1 className="text-3xl font-bold tracking-tight">Déroulement de la compétition</h1>
        <p className="text-gray-600 mt-2">
          Règlement complet : phases, répartition, critères de classement et règles pratiques.
        </p>

        {/* Sommaire rapide */}
        <nav className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
          <a href="#phase1" className="px-3 py-2 rounded-lg border hover:bg-gray-50">Phase 1 — Saison régulière</a>
          <a href="#phase2" className="px-3 py-2 rounded-lg border hover:bg-gray-50">Phase 2 — Groupes winner/loser</a>
          <a href="#lcq" className="px-3 py-2 rounded-lg border hover:bg-gray-50">Last Chance Qualifier</a>
          <a href="#phase3" className="px-3 py-2 rounded-lg border hover:bg-gray-50">Phase 3 — Playoffs</a>
          <a href="#autre" className="px-3 py-2 rounded-lg border hover:bg-gray-50">Autre (vocal, retards, etc.)</a>
        </nav>
      </section>

      {/* PHASE 1 */}
      <section id="phase1" className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded bg-yellow-600" />
          <h2 className="text-2xl font-semibold">Phase 1 — Saison régulière</h2>
        </div>

        <div className="rounded-2xl border bg-white shadow-sm p-6 space-y-4">
          <ul className="list-disc pl-6 space-y-1">
            <li>4 groupes de 5 équipes.</li>
            <li>Chaque équipe se joue 2 fois en <strong>Hard Fearless (BO2)</strong>.</li>
            <li>Choix du side : chaque équipe choisit une fois ; l’équipe la mieux seedée choisit en premier.</li>
          </ul>

          <div>
            <h3 className="text-lg font-semibold">Répartition</h3>
            <p className="text-gray-700">
              Les équipes sont seedées selon leur <strong>total de points</strong> puis, en cas d’égalité,
              selon l’<strong>écart-type</strong>. Répartition dans les poules d’après ce seeding.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Critères de classement</h3>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Nombre de points</li>
              <li>Head-to-head direct</li>
              <li>Somme des durées des games gagnées</li>
            </ol>
            <p className="mt-2 text-gray-700">
              Les <strong>deux premiers</strong> de chaque poule vont en <strong>poule winner</strong> ; 
              les <strong>deux suivants</strong> vont en <strong>poule loser</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* PHASE 2 */}
      <section id="phase2" className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded bg-yellow-600" />
          <h2 className="text-2xl font-semibold">Phase 2 — Groupes</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Winner */}
          <div className="rounded-2xl border bg-white shadow-sm p-6 space-y-3">
            <h3 className="text-lg font-semibold">Groupe <span className="text-green-700">winner</span></h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>2 poules de 4 équipes (réparties via le seeding de la phase 1).</li>
              <li>Double confrontation en <strong>Hard Fearless (BO2)</strong>.</li>
              <li>Choix du side : chaque équipe une fois ; la mieux seedée en premier.</li>
            </ul>
            <p className="text-gray-700">
              Les <strong>3 premiers</strong> de chaque poule sont qualifiés en <strong>Playoffs</strong>.
              Le <strong>4ᵉ</strong> va en <strong>Last Chance Qualifier</strong>.
            </p>
          </div>

          {/* Loser */}
          <div className="rounded-2xl border bg-white shadow-sm p-6 space-y-3">
            <h3 className="text-lg font-semibold">Groupe <span className="text-red-700">loser</span></h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>2 poules de 4 équipes (via le seeding des groupes).</li>
              <li>Double confrontation en <strong>Hard Fearless (BO2)</strong>.</li>
              <li>Choix du side : même règle.</li>
            </ul>
            <p className="text-gray-700">
              Le <strong>1er</strong> de chaque poule va en <strong>Last Chance Qualifier</strong> ; les autres sont éliminés.
            </p>
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
            <li>Tirage aléatoire (on évite deux équipes d’un même groupe de la phase 1 si possible).</li>
            <li>Matchs en <strong>BO5</strong> en <strong>Hard Fearless</strong>.</li>
            <li><strong>Side</strong> choisi par l’équipe issue du groupe <strong>winner</strong>.</li>
          </ul>
          <p className="text-gray-700">
            Le gagnant va en <strong>Playoffs</strong>, le perdant est éliminé.
          </p>
        </div>
      </section>

      {/* PHASE 3 */}
      <section id="phase3" className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded bg-yellow-600" />
          <h2 className="text-2xl font-semibold">Phase 3 — Playoffs</h2>
        </div>

        <div className="rounded-2xl border bg-white shadow-sm p-6 space-y-3">
          <ul className="list-disc pl-6 space-y-1">
            <li>Toutes les confrontations en <strong>BO3</strong>, sauf la grande finale en <strong>BO5</strong>.</li>
            <li>Mode <strong>Hard Fearless</strong> : chaque champion joué par l’une ou l’autre équipe devient indisponible ensuite.</li>
            <li>Choix du side : l’équipe avec le meilleur seeding (dernière phase) choisit pour la game 1 ; le perdant choisit les games suivantes.</li>
          </ul>

          <div>
            <h3 className="text-lg font-semibold">Répartition</h3>
            <p className="text-gray-700">
              Placement dans l’arbre selon le <strong>seed</strong> de la phase précédente.
              Les équipes d’un même groupe <em>winner</em> ne peuvent pas se rencontrer en quarts.
            </p>
          </div>
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
              Pendant les parties, présence <strong>obligatoire</strong> en vocal sur le serveur Discord.
              Coachs autorisés mais <strong>muets</strong> durant les games.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Retards</h3>
            <p className="text-gray-700">
              Au-delà de <strong>20 minutes</strong> de retard, vous pouvez demander le forfait de l’équipe adverse.
              Restez fair-play néanmoins.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Draft</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Les swaps de rôle sont libres, mais au lancement de la game l’adversaire doit savoir qui joue quel champion.</li>
              <li>Avant la draft, vous n’êtes pas obligés de révéler cette information.</li>
              <li>L’outil <strong>drafterlol</strong> permet de créer des drafts adaptées à ce mode.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Remplacements</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Un remplacement n’est autorisé que si l’équipe respecte la <strong>limite de points</strong>.</li>
              <li>L’équipe qui change doit prévenir l’adversaire et fournir l’<strong>OP.GG</strong> du remplaçant au plus tôt.</li>
              <li>Les remplacements <strong>entre BO</strong> sont autorisés si l’adversaire est prévenu.</li>
              <li>L’organisation ne vérifiera pas systématiquement tous les remplacements.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
