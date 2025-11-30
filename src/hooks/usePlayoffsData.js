import { useEffect, useState } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzhc4lNjCd-7dE1uox3hJAwkNlG92_zftE8lXh7O21bgZU33QvyUazx1G6Otc897rqg/exec";

const INITIAL_BRACKET_DATA = {
  LCQ_R1: [],
  Quarters: [],
  Semis: [],
  Final: [],
};

/**
 * Hook pour récupérer l'arbre de PlayOffs depuis Google Sheets via l'API.
 * @returns {{loading: boolean, error: string|null, bracketData: object}}
 */
export function usePlayoffsData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(INITIAL_BRACKET_DATA);

  useEffect(() => {
    let abort = false;
    async function load() {
      try {
        setLoading(true);
        setError(null); // Appel de l'endpoint doGetPlayoffs via le paramètre 'route=playoffs'
        const res = await fetch(
          `${SCRIPT_URL}?tournament=clown&route=playoffs`,
          {
            method: "GET",
            cache: "no-store",
          }
        );
        const json = await res.json();
        if (json.ok === false) {
          throw new Error(json.error || "Erreur de l'API Playoffs");
        }

        if (!abort) {
          setData(json);
        }
      } catch (e) {
        if (!abort) setError(e?.message || "Erreur de chargement des Playoffs");
      } finally {
        if (!abort) setLoading(false);
      }
    }
    load(); // Recharger toutes les 60 secondes pour mettre à jour l'arbre des scores
    const intervalId = setInterval(load, 60000);

    return () => {
      abort = true;
      clearInterval(intervalId);
    };
  }, []);

  return { loading, error, bracketData: data };
}
