"use client";
import { DesignStyle } from "@model/test-to-image";
import { useState, useMemo, useEffect } from "react";

export const useGenerationStyles = () => {
  const [styles, setStyles] = useState<DesignStyle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchStyles = async () => {
    try {
      setLoading(true);
      console.log("fetching styles...");
      const response = await fetch("api/tti/styles");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data: DesignStyle[] = await response.json();
      console.log(data);
      setStyles(data);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
    return [];
  };

  useEffect(() => {
    if (styles.length == 0 && !loading) {
      fetchStyles();
    }
  }, []);

  return { styles, loading, error, fetchStyles };
};
