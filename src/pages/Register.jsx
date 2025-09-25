import React, { useState } from "react";
import useRegisterForm from "../hooks/useRegisterForm";
import { PlayerCard } from "./Registerparts";

/* ---- Modal minimaliste ---- */
function Modal({ open, children }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-[92vw] max-w-md rounded-2xl bg-white p-5 shadow-xl">
        {children}
      </div>
    </div>
  );
}

export default function Register() {
  const {
    tournament,
    setTournament,
    teamName,
    setTeamName,
    players,
    subs,
    addSub,
    removeSub,
    multiOpgg,
    setMultiOpgg,
    status, // on l’utilise en fallback d’affichage
    cfg,
    totals,
    overCap,
    specialViolated,
    canSubmit,
    setPlayerField,
    handleSubmit, // <-- doit idéalement renvoyer {ok, message}
    makeRankKey,
    parseRankKey,
    TIER_DIVISIONS,
  } = useRegisterForm();

  const [captainIndex, setCaptainIndex] = useState(null);

  const [modal, setModal] = useState(null);

  const openLoading = (text = "Envoi en cours…") =>
    setModal({ type: "loading", title: text });

  const openResult = (success, message) =>
    setModal({
      type: "result",
      success: !!success,
      title: success ? "Inscription envoyée" : "Erreur",
      message: message || (success ? "Votre inscription a bien été envoyée." : "Une erreur est survenue."),
    });

const handleOk = () => {
  const isSuccess = modal?.type === "result" && modal?.success === true;

  if (isSuccess) {
    const home = import.meta.env.BASE_URL || "/";
    setTimeout(() => window.location.replace(home), 0);
  } else {
    setModal(null);
  }
};

  const rankSelectProps = {
    allowedTiers: cfg.allowedTiers,
    divisionsByTier: TIER_DIVISIONS,
    makeRankKey,
    parseRankKey,
  };

  const ROLES = ["TOP", "JGL", "MID", "ADC", "SUPP"];
  const canSubmitAll = canSubmit && captainIndex !== null;
  const isSubmitting = modal?.type === "loading";

  const onSubmit = async (e) => {
    openLoading();
    try {
      const res = await handleSubmit(e, { captainIndex }); 
      const ok =
        typeof res?.ok === "boolean"
          ? res.ok
          : /ok|envoy/i.test(String(status || "")); 
      const msg = res?.message || status || (ok ? "Merci !" : "Impossible d’envoyer le formulaire.");
      openResult(ok, msg);
    } catch (err) {
      openResult(false, err?.message || "Erreur réseau.");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 space-y-6">
      <h1 className="text-2xl font-bold">Inscrire son équipe</h1>

      <div className="rounded-xl border p-3 bg-amber-50 text-amber-900">
        <ul className="list-disc ml-5 space-y-1 text-sm">
          <li>
            Cap d’équipe : <b>{cfg.cap} points</b>.
          </li>
          {tournament === "clown" ? (
            <>
              <li>
                <b>Maximum 1 joueur Émeraude I, Émeraude II ou Diamant IV</b> par
                équipe.
              </li>
              <li>
                Master / GrandMaster / Challenger : <b>non autorisés</b>.
              </li>
            </>
          ) : (
            <li>
              Rangs autorisés : <b>Iron, Bronze, Silver, Gold (I–IV)</b>.
            </li>
          )}
        </ul>
      </div>

      <form onSubmit={onSubmit} className="bg-white rounded-xl shadow border p-4 space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">Tournoi</label>
          <div className="flex gap-2">
            <button
              type="button"
              className={
                "px-4 py-2 rounded-xl border " +
                (tournament === "clown"
                  ? "bg-blue-600 text-white border-blue-700"
                  : "bg-white border-gray-300")
              }
              onClick={() => setTournament("clown")}
              disabled={isSubmitting}
            >
              Clown
            </button>
            <button
              type="button"
              className={
                "px-4 py-2 rounded-xl border " +
                (tournament === "mini"
                  ? "bg-blue-600 text-white border-blue-700"
                  : "bg-white border-gray-300")
              }
              onClick={() => setTournament("mini")}
              disabled={isSubmitting}
            >
              Mini Clown
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <input
            className="w-full border rounded-xl px-3 py-2"
            placeholder="Nom de l’équipe"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            disabled={isSubmitting}
          />
          <input
            className="w-full border rounded-xl px-3 py-2"
            placeholder="Lien multi-op.gg (équipe)"
            value={multiOpgg}
            onChange={(e) => setMultiOpgg(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold">Joueurs titulaires (5)</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {players.map((p, i) => (
              <PlayerCard
                key={`p-${i}`}
                p={p}
                i={i}
                list="players"
                roleLabel={ROLES[i]}
                setPlayerField={setPlayerField}
                rankSelectProps={rankSelectProps}
                captainIndex={captainIndex}
                setCaptainIndex={setCaptainIndex}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Remplaçants (optionnel)</h3>
            <button
              type="button"
              onClick={addSub}
              className="px-3 py-1.5 rounded-xl border bg-white hover:bg-gray-50"
              disabled={subs.length >= 2 || isSubmitting}
              title={subs.length >= 2 ? "Maximum 2 remplaçants" : ""}
            >
              + Ajouter un remplaçant
            </button>
          </div>
          {subs.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {subs.map((p, i) => (
                <PlayerCard
                  key={`s-${i}`}
                  p={p}
                  i={i}
                  list="subs"
                  onRemove={() => removeSub(i)}
                  setPlayerField={setPlayerField}
                  rankSelectProps={rankSelectProps}
                />
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border p-4 bg-gray-50 flex flex-wrap items-center gap-3">
          <span className="text-sm">
            Total points équipe :{" "}
            <b className={overCap ? "text-red-600" : ""}>{totals.points}</b> / {cfg.cap}
          </span>
          {tournament === "clown" && (
            <>
              <span className="text-sm">
                • Émeraude I / Émeraude II / Diamant IV : <b>{totals.special}</b> / 1
              </span>
              {specialViolated && (
                <span className="text-sm text-red-700">
                  ⚠️ Maximum 1 Émeraude I, Émeraude II ou Diamant IV autorisé.
                </span>
              )}
              {captainIndex === null && (
                <span className="text-sm text-amber-700">
                  ⚠️ Merci de sélectionner un capitaine.
                </span>
              )}
            </>
          )}
          {overCap && <span className="text-sm text-red-700">⚠️ Cap de {cfg.cap} dépassé.</span>}
        </div>

        <div className="flex items-center gap-3">
          <button
            className={
              "px-4 py-2 rounded-xl text-white " +
              (canSubmitAll && !isSubmitting
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed")
            }
            disabled={!canSubmitAll || isSubmitting}
          >
            Envoyer
          </button>
          {status && <p className="text-sm">{status}</p>}
        </div>
      </form>

      {/* --- MODAL --- */}
      <Modal open={!!modal}>
        {modal?.type === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 rounded-full border-4 border-gray-300 border-t-transparent animate-spin" />
            <div className="text-center">
              <div className="font-semibold">{modal.title || "Envoi en cours…"}</div>
              <div className="text-sm text-gray-500 mt-1">
                Merci de patienter pendant l’envoi de votre inscription.
              </div>
            </div>
          </div>
        )}

        {modal?.type === "result" && (
          <div className="space-y-3">
            <div className="font-semibold text-lg">{modal.title}</div>
            <div className="text-sm text-gray-700">{modal.message}</div>
            <div className="pt-2 text-right">
              <button
                onClick={handleOk}
                className="px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
