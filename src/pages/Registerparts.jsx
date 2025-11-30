import React from "react";

export const RankSelect = React.memo(function RankSelect({
  value,
  onChange,
  allowedTiers,
  divisionsByTier,
  makeRankKey,
  parseRankKey,
}) {
  const { tier, division } = parseRankKey(value);
  const divisions = tier ? divisionsByTier[tier] : [];

  const handleTier = (e) => {
    const newTier = e.target.value;
    const firstDiv = divisionsByTier[newTier][0];
    onChange(makeRankKey(newTier, firstDiv));
  };
  const handleDivision = (e) => onChange(makeRankKey(tier, e.target.value));

  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <select
        className="w-full border rounded-xl px-3 py-2 bg-white"
        value={tier || ""}
        onChange={handleTier}
      >
        <option value="" disabled>
          Choisir un rang…
        </option>
        {allowedTiers.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <select
        className="w-full border rounded-xl px-3 py-2 bg-white"
        value={division || ""}
        onChange={handleDivision}
        disabled={!tier}
      >
        <option value="" disabled>
          Division…
        </option>
        {divisions.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </div>
  );
});

export const PlayerCard = React.memo(function PlayerCard({
  p,
  i,
  list,
  onRemove,
  setPlayerField,
  rankSelectProps,
  roleLabel,
  captainIndex,
  setCaptainIndex,
}) {
  const DEFAULT_ROLES = ["TOP", "JGL", "MID", "ADC", "SUPP"];
  const title =
    list === "players"
      ? roleLabel || DEFAULT_ROLES[i] || `Joueur ${i + 1}`
      : `Remplaçant ${i + 1}`;

  return (
    <div className="rounded-xl border p-3 space-y-3 bg-white h-full">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{title}</h4>
        {list === "players" && (
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="captain"
              checked={captainIndex === i}
              onChange={() => setCaptainIndex(i)}
            />
            Capitaine
          </label>
        )}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-sm text-red-600 hover:underline"
          >
            Retirer
          </button>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <input
          className="w-full border rounded-xl px-3 py-2"
          placeholder="Pseudo LOL"
          value={p.nickname}
          onChange={(e) => setPlayerField(list, i, "nickname", e.target.value)}
          autoComplete="off"
        />
        <input
          className="w-full border rounded-xl px-3 py-2"
          placeholder="Discord"
          value={p.discord}
          onChange={(e) => setPlayerField(list, i, "discord", e.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Élo</label>
        <RankSelect
          value={p.rankKey}
          onChange={(key) => setPlayerField(list, i, "rankKey", key)}
          {...rankSelectProps}
        />
      </div>
    </div>
  );
});
