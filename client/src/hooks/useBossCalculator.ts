import { useState, useCallback, useEffect } from 'react';
import { saveToCloud, loadFromCloud } from '../lib/supabase';
import { toast } from 'sonner';

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

const STORAGE_KEY = 'boss_calculator_data_v2';
const SYNC_KEY_STORAGE = 'boss_calculator_sync_key';

export function useBossCalculator() {
  const [syncKey, setSyncKey] = useState<string>(() => {
    return localStorage.getItem(SYNC_KEY_STORAGE) || '';
  });

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
    
    // Se tiver chave de sincronização, salvar na nuvem também
    if (syncKey) {
      const saveTimeout = setTimeout(() => {
        saveToCloud(syncKey, state).catch(err => {
          console.error('Erro ao sincronizar:', err);
          toast.error('Erro ao salvar na nuvem. Verifique sua conexão.');
        });
      }, 1000); // Debounce de 1s para não salvar a cada tecla
      return () => clearTimeout(saveTimeout);
    }
  }, [state, syncKey]);

  // Carregar dados da nuvem quando a chave mudar
  useEffect(() => {
    if (syncKey) {
      localStorage.setItem(SYNC_KEY_STORAGE, syncKey);
      loadFromCloud(syncKey).then(data => {
        if (data) {
          setState(data);
          toast.success('Dados sincronizados com sucesso!');
        } else {
          // Se não tem dados na nuvem para essa chave, salvar os dados locais lá
          saveToCloud(syncKey, state);
          toast.info('Nova sessão de sincronização iniciada.');
        }
      }).catch(err => {
        console.error('Erro ao carregar:', err);
        toast.error('Erro ao carregar dados da nuvem.');
      });
    } else {
      localStorage.removeItem(SYNC_KEY_STORAGE);
    }
  }, [syncKey]);

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
    setState(prev => {
      const newBosses = [...prev.bosses, newBoss];
      return recalculateTotals(newBosses);
    });
  }, [recalculateTotals]);

  // Remover patrão
  const removeBoss = useCallback((bossId: string) => {
    setState(prev => {
      const newBosses = prev.bosses.filter(boss => boss.id !== bossId);
      return recalculateTotals(newBosses);
    });
  }, [recalculateTotals]);

  // Adicionar valor para um patrão
  const addValue = useCallback((bossId: string, value: number) => {
    setState(prev => {
      const newBosses = prev.bosses.map(boss =>
        boss.id === bossId
          ? { ...boss, values: [...boss.values, value] }
          : boss
      );
      return recalculateTotals(newBosses);
    });
  }, [recalculateTotals]);

  // Remover valor de um patrão
  const removeValue = useCallback((bossId: string, valueIndex: number) => {
    setState(prev => {
      const newBosses = prev.bosses.map(boss =>
        boss.id === bossId
          ? { ...boss, values: boss.values.filter((_, i) => i !== valueIndex) }
          : boss
      );
      return recalculateTotals(newBosses);
    });
  }, [recalculateTotals]);

  // Limpar dados do dia
  const clearDayData = useCallback(() => {
    setState(prev => {
      const newBosses = prev.bosses.map(boss => ({ ...boss, values: [] }));
      return recalculateTotals(newBosses);
    });
  }, [recalculateTotals]);

  // Editar patrão
  const editBoss = useCallback((bossId: string, name: string, percentage: number, employees: Employee[]) => {
    setState(prev => {
      const newBosses = prev.bosses.map(boss =>
        boss.id === bossId
          ? { ...boss, name, percentage, employees }
          : boss
      );
      return recalculateTotals(newBosses);
    });
  }, [recalculateTotals]);

  // Marcar repasse como enviado
  const markAsSent = useCallback((bossId: string, amount: number) => {
    setState(prev => {
      const newBosses = prev.bosses.map(boss =>
        boss.id === bossId
          ? { ...boss, amountSent: (boss.amountSent || 0) + amount }
          : boss
      );
      return recalculateTotals(newBosses);
    });
  }, [recalculateTotals]);

  // Resetar repassos
  const resetSentAmounts = useCallback(() => {
    setState(prev => {
      const newBosses = prev.bosses.map(boss => ({ ...boss, amountSent: 0 }));
      return recalculateTotals(newBosses);
    });
  }, [recalculateTotals]);

  return {
    state,
    syncKey,
    setSyncKey,
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
