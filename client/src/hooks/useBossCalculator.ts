import { useState, useCallback, useEffect } from 'react';

export interface Employee {
  id: string;
  name: string;
  percentage: number;
}

export interface Boss {
  id: string;
  name: string;
  percentage: number; // Minha porcentagem
  employees: Employee[]; // Lista de funcionários do patrão
  values: number[];
  amountSent?: number; // Quanto já foi repassado
}

export interface CalculatorState {
  bosses: Boss[];
  totalGeneral: number;
  totalSentToBosses: number;
  myEarnings: number;
  employeesEarnings: number; // Total ganho pelos funcionários
}

const STORAGE_KEY = 'boss_calculator_data_v2'; // Mudando a chave para evitar conflitos com versão anterior

export function useBossCalculator() {
  const [state, setState] = useState<CalculatorState>(() => {
    // Tentar carregar dados do localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { bosses: [], totalGeneral: 0, totalSentToBosses: 0, myEarnings: 0, employeesEarnings: 0 };
      }
    }
    return { bosses: [], totalGeneral: 0, totalSentToBosses: 0, myEarnings: 0, employeesEarnings: 0 };
  });

  // Salvar estado no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Recalcular totais
  const recalculateTotals = useCallback((bosses: Boss[]) => {
    let totalGeneral = 0;
    let totalSentToBosses = 0;
    let myEarnings = 0;
    let employeesEarnings = 0;

    bosses.forEach(boss => {
      const bossTotal = boss.values.reduce((sum, val) => sum + val, 0);
      
      // Cálculo baseado no exemplo:
      // Patrão Itaú - Lipe 15% + 10% meu = 25%
      // Caiu 1000 -> 150 Lipe / 100 meu / 750 repasse
      
      const myShare = bossTotal * (boss.percentage / 100);
      
      let currentBossEmployeesShare = 0;
      boss.employees.forEach(emp => {
        currentBossEmployeesShare += bossTotal * (emp.percentage / 100);
      });

      const totalDeductions = myShare + currentBossEmployeesShare;
      const bossShare = bossTotal - totalDeductions;

      totalGeneral += bossTotal;
      totalSentToBosses += bossShare;
      myEarnings += myShare;
      employeesEarnings += currentBossEmployeesShare;
    });

    return {
      bosses,
      totalGeneral,
      totalSentToBosses,
      myEarnings,
      employeesEarnings
    };
  }, []);

  // Adicionar novo patrão com funcionários
  const addBoss = useCallback((name: string, percentage: number, employees: Employee[] = []) => {
    const newBoss: Boss = {
      id: Date.now().toString(),
      name,
      percentage,
      employees,
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
  const editBoss = useCallback((bossId: string, name: string, percentage: number, employees: Employee[]) => {
    const newBosses = state.bosses.map(boss =>
      boss.id === bossId
        ? { ...boss, name, percentage, employees }
        : boss
    );
    setState(recalculateTotals(newBosses));
  }, [state.bosses, recalculateTotals]);

  // Marcar repasse como enviado
  const markAsSent = useCallback((bossId: string, amount: number) => {
    const newBosses = state.bosses.map(boss =>
      boss.id === bossId
        ? { ...boss, amountSent: (boss.amountSent || 0) + amount }
        : boss
    );
    setState(recalculateTotals(newBosses));
  }, [state.bosses, recalculateTotals]);

  // Resetar repassos
  const resetSentAmounts = useCallback(() => {
    const newBosses = state.bosses.map(boss => ({ ...boss, amountSent: 0 }));
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
    markAsSent,
    resetSentAmounts,
  };
}
