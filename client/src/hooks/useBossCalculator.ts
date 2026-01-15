import { useState, useCallback, useEffect } from 'react';

export interface Boss {
  id: string;
  name: string;
  percentage: number;
  values: number[];
}

export interface CalculatorState {
  bosses: Boss[];
  totalGeneral: number;
  totalSentToBosses: number;
  myEarnings: number;
}

const STORAGE_KEY = 'boss_calculator_data';

export function useBossCalculator() {
  const [state, setState] = useState<CalculatorState>(() => {
    // Tentar carregar dados do localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { bosses: [], totalGeneral: 0, totalSentToBosses: 0, myEarnings: 0 };
      }
    }
    return { bosses: [], totalGeneral: 0, totalSentToBosses: 0, myEarnings: 0 };
  });

  // Salvar estado no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Recalcular totais
  const recalculateTotals = useCallback((bosses: Boss[]) => {
    let totalGeneral = 0;
    let totalSentToBosses = 0;

    bosses.forEach(boss => {
      const bossTotal = boss.values.reduce((sum, val) => sum + val, 0);
      const bossShare = bossTotal * (boss.percentage / 100);
      totalGeneral += bossTotal;
      totalSentToBosses += bossShare;
    });

    const myEarnings = totalGeneral - totalSentToBosses;

    return {
      bosses,
      totalGeneral,
      totalSentToBosses,
      myEarnings,
    };
  }, []);

  // Adicionar novo patrão
  const addBoss = useCallback((name: string, percentage: number) => {
    const newBoss: Boss = {
      id: Date.now().toString(),
      name,
      percentage,
      values: [],
    };
    const newBosses = [...state.bosses, newBoss];
    setState(recalculateTotals(newBosses));
  }, [state.bosses, recalculateTotals]);

  // Remover patrão
  const removeBoss = useCallback((bossId: string) => {
    const newBosses = state.bosses.filter(boss => boss.id !== bossId);
    setState(recalculateTotals(newBosses));
  }, [state.bosses, recalculateTotals]);

  // Adicionar valor para um patrão
  const addValue = useCallback((bossId: string, value: number) => {
    const newBosses = state.bosses.map(boss =>
      boss.id === bossId
        ? { ...boss, values: [...boss.values, value] }
        : boss
    );
    setState(recalculateTotals(newBosses));
  }, [state.bosses, recalculateTotals]);

  // Remover valor de um patrão
  const removeValue = useCallback((bossId: string, valueIndex: number) => {
    const newBosses = state.bosses.map(boss =>
      boss.id === bossId
        ? { ...boss, values: boss.values.filter((_, i) => i !== valueIndex) }
        : boss
    );
    setState(recalculateTotals(newBosses));
  }, [state.bosses, recalculateTotals]);

  // Limpar dados do dia
  const clearDayData = useCallback(() => {
    const newBosses = state.bosses.map(boss => ({ ...boss, values: [] }));
    setState(recalculateTotals(newBosses));
  }, [state.bosses, recalculateTotals]);

  // Editar patrão
  const editBoss = useCallback((bossId: string, name: string, percentage: number) => {
    const newBosses = state.bosses.map(boss =>
      boss.id === bossId
        ? { ...boss, name, percentage }
        : boss
    );
    setState(recalculateTotals(newBosses));
  }, [state.bosses, recalculateTotals]);

  return {
    state,
    addBoss,
    removeBoss,
    addValue,
    removeValue,
    clearDayData,
    editBoss,
  };
}
