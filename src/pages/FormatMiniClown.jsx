import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function FormatMiniClown() {
  return (
    <div className="space-y-10">
      <div className="mb-4">
        <Link
          to="/miniclown"
          className="inline-flex items-center gap-2 text-sm text-yellow-700 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à la compétition
        </Link>
      </div>

      <section className="rounded-2xl border bg-white shadow-sm p-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Format – MiniClown
        </h1>
        <p className="text-gray-600 mt-2">
          Édition réservée aux joueurs entre <strong>Iron IV</strong> et{" "}
          <strong>Gold I</strong>. Limite d’équipe : <strong>17 points</strong>.
        </p>

        <nav className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
          <a
            href="#eligibilite"
            className="px-3 py-2 rounded-lg border hover:bg-gray-50"
          >
            Critères & points
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
            href="#playoffs"
            className="px-3 py-2 rounded-lg border hover:bg-gray-50"
          >
            Playoffs
          </a>
          <a
            href="#autre"
            className="px-3 py-2 rounded-lg border hover:bg-gray-50"
          >
            Autre
          </a>
        </nav>
      </section>

      {/* ÉLIGIBILITÉ */}
      <section id="eligibilite" className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded bg-yellow-600" />
          <h2 className="text-2xl font-semibold">
            Critères de validité & points
          </h2>
        </div>

        <div className="rounded-2xl border bg-white shadow-sm p-6 space-y-4">
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>
              Éligible : <strong>Iron IV → Gold I</strong>. Limite de points :{" "}
              <strong>17</strong>.
            </li>
            <li>
              Un joueur MiniClown peut aussi participer à la CLOWN principale.
            </li>
            <li>
              Il faut au moins un <strong>supporter SLY</strong> et/ou des{" "}
              <strong>anciens de la CLOWN</strong>.
            </li>
          </ul>

          <div>
            <h3 className="text-lg font-semibold">Calcul des points</h3>
            <p className="text-gray-700">
              On retient l’<strong>elo de fin de split 2024</strong> (S1/S2/S3)
              ou l’<strong>elo actuel</strong> s’il est plus haut (Solo/Duo).
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
              <li>
                <strong>Pas d’elo 2024 :</strong> on regarde les 3 derniers
                splits op.gg, sinon cas géré à la main.
              </li>
              <li>
                <strong>Écart trop grand avec l’actuel :</strong> l’orga peut
                ajuster/refuser.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Anti-smurf</h3>
            <p className="text-gray-700">
              Tournoi “low-elo friendly” : si vous êtes Platine+, allez sur la
              CLOWN. Smurf avéré ⇒ <strong>ban définitif</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* FORMAT MATCHS */}
      <section id="explication" className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded bg-yellow-600" />
          <h2 className="text-2xl font-semibold">
            Format des matchs — SOLARY PARTY
          </h2>
        </div>

        <div className="rounded-2xl border bg-white shadow-sm p-6 space-y-3">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Chaque champion <strong>joué</strong> par une équipe devient{" "}
              <strong>indisponible pour la suite de la phase</strong> pour cette
              équipe.
            </li>
            <li>Un document de suivi des champions sera mis en place.</li>
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
              Double confrontation en <strong>BO2 SOLARY PARTY</strong>.
            </li>
            <li>
              Chaque équipe choisit son side une fois ; la mieux seedée choisit
              en premier.
            </li>
            <li>
              Chaque équipe “brûle” ses champions <em>pour elle-même</em> durant
              toute la phase.
            </li>
          </ul>

          <div>
            <h3 className="text-lg font-semibold">Seeding & classement</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Seeding : total de points puis écart-type.</li>
              <li>
                Classement : 1) Points 2) Head-to-head 3) Somme des durées des
                games gagnées.
              </li>
              <li>
                Nombre d’équipes qualifiées pour la phase suivante :{" "}
                <em>en fonction des inscriptions</em>.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* PLAYOFFS */}
      <section id="playoffs" className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded bg-yellow-600" />
          <h2 className="text-2xl font-semibold">Playoffs</h2>
        </div>

        <div className="rounded-2xl border bg-white shadow-sm p-6 space-y-3">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>BO3</strong> (grande finale en <strong>BO5</strong>),
              toujours en <strong>SOLARY PARTY</strong>.
            </li>
            <li>Side : meilleur seed choisit G1 ; puis le perdant choisit.</li>
            <li>
              Si en finale il reste &lt; 50 champions dispo, on{" "}
              <strong>réintègre</strong> ceux utilisés lors du premier BO des
              playoffs.
            </li>
            <li>
              Placement dans l’arbre selon le seed de la phase précédente.
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
              Obligatoire sur le Discord. Coachs autorisés mais{" "}
              <strong>muets</strong>.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Retards</h3>
            <p className="text-gray-700">
              Au-delà de <strong>20 min</strong>, vous pouvez demander le
              forfait. Restez fair-play.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Draft</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>
                Swaps OK, mais à l’<em>entrée en game</em> l’adversaire sait qui
                joue quel champion.
              </li>
              <li>
                Avant la draft, pas d’obligation de révéler. Outil conseillé :{" "}
                <strong>drafterlol</strong>.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Remplacements</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>
                OK si la limite de <strong>17 points</strong> est respectée.
              </li>
              <li>
                Prévenir l’adversaire et communiquer l’<strong>op.gg</strong> du
                remplaçant rapidement.
              </li>
              <li>
                Remplacements <strong>entre BO</strong> autorisés si
                l’adversaire est prévenu.
              </li>
              <li>
                L’orga ne vérifiera pas systématiquement tous les remplacements.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
