import { createClient } from '@supabase/supabase-js';

// Substitua pelas suas credenciais reais
const SUPABASE_URL = 'https://uquivcuxwzlothnpmkzw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxdWl2Y3V4d3psb3RobnBta3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1ODk5NzMsImV4cCI6MjA4NDE2NTk3M30.6-Ty80DrIDXGNwZLM3zjTHGVq0KbbfahH0V_5ItGaz4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface CalculatorData {
  id: string;
  content: any;
  updated_at: string;
}

// Função para salvar dados
export const saveToCloud = async (key: string, data: any) => {
  const { error } = await supabase
    .from('calculator_data')
    .upsert({ 
      id: key, 
      content: data,
      updated_at: new Date().toISOString()
    });

  if (error) {
    console.error('Erro ao salvar na nuvem:', error);
    throw error;
  }
};

// Função para carregar dados
export const loadFromCloud = async (key: string) => {
  const { data, error } = await supabase
    .from('calculator_data')
    .select('content')
    .eq('id', key)
    .single();

  if (error) {
    // Se não encontrar (código PGRST116), retorna null sem erro
    if (error.code === 'PGRST116') return null;
    console.error('Erro ao carregar da nuvem:', error);
    throw error;
  }

  return data?.content || null;
};
