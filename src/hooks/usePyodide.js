// hooks/usePyodide.js
import { useEffect, useState } from "react";

export default function usePyodide() {
  const [pyodide, setPyodide] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const pyodideInstance = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
        });
        setPyodide(pyodideInstance);
      } catch (error) {
        console.error("Pyodide жүктеу кезінде қате:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { pyodide, loading };
}