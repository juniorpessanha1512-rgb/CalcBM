import { useBossCalculator } from '@/hooks/useBossCalculator';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash2, Plus } from 'lucide-react';

/**
 * Design: BM Calculadora Tripeiro Pro 2026
 * - Tema dark moderno com fundo visual atrativo
 * - Paleta: Navy/Black com acentos em dourado e vermelho
 * - Layout compacto e objetivo similar ao calcrb.com
 */
export default function Home() {
  const {
    state,
    addBoss,
    removeBoss,
    addValue,
    removeValue,
    clearDayData,
  } = useBossCalculator();

  const [bossName, setBossName] = useState('');
  const [bossPercentage, setBossPercentage] = useState('');
  const [openAddBoss, setOpenAddBoss] = useState(false);
  const [openAddValue, setOpenAddValue] = useState<string | null>(null);
  const [valueInput, setValueInput] = useState('');

  const handleAddBoss = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bossName.trim() || !bossPercentage.trim()) return;
    
    const percentageNum = parseFloat(bossPercentage);
    if (isNaN(percentageNum) || percentageNum < 0 || percentageNum > 100) return;

    addBoss(bossName.trim(), percentageNum);
    setBossName('');
    setBossPercentage('');
    setOpenAddBoss(false);
  };

  const handleAddValue = (e: React.FormEvent, bossId: string) => {
    e.preventDefault();
    const value = parseFloat(valueInput);
    if (!isNaN(value) && value > 0) {
      addValue(bossId, value);
      setValueInput('');
      setOpenAddValue(null);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Fundo Visual */}
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/bg-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Overlay escuro */}
      <div className="fixed inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background pointer-events-none" />

      {/* Conteúdo */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 bg-background/40 backdrop-blur-md sticky top-0 z-20">
          <div className="container py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500">
                  BM Calculadora Tripeiro Pro 2026
                </h1>
                <p className="text-sm text-muted-foreground mt-2">
                  {new Date().toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <Button
                variant="outline"
                className="text-yellow-400 border-yellow-400/50 hover:text-yellow-300 hover:bg-yellow-400/10"
                onClick={clearDayData}
              >
                🧹 Limpar Dados do Dia
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container py-8">
          {/* Formulário de Entrada */}
          <div className="card-elevated-lg p-6 mb-8 bg-card/80 backdrop-blur-sm border-yellow-400/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Nome do Patrão:</label>
                <Input
                  placeholder="Ex: João Silva"
                  value={bossName}
                  onChange={(e) => setBossName(e.target.value)}
                  className="bg-background/50 border-yellow-400/30 focus:border-yellow-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Porcentagem (%):</label>
                <Input
                  type="number"
                  placeholder="Ex: 30"
                  min="0"
                  max="100"
                  step="0.01"
                  value={bossPercentage}
                  onChange={(e) => setBossPercentage(e.target.value)}
                  className="bg-background/50 border-yellow-400/30 focus:border-yellow-400"
                />
              </div>
              <Button 
                onClick={handleAddBoss} 
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold"
              >
                💾 Salvar
              </Button>
            </div>
          </div>

          {/* Tabela de Patrões */}
          <div className="card-elevated-lg overflow-hidden bg-card/80 backdrop-blur-sm border-yellow-400/20">
            {state.bosses.length === 0 ? (
              <div className="p-8 text-center space-y-4">
                <p className="text-muted-foreground text-lg">Nenhum patrão cadastrado ainda.</p>
                <p className="text-sm text-muted-foreground">
                  Preencha o formulário acima e clique em "Salvar" para começar.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-background/50 border-b border-yellow-400/20">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-yellow-400">Patrão</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-yellow-400">Valores</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-yellow-400">Total (R$)</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-red-400">Repasse (R$)</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-green-400">Meu (R$)</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-yellow-400">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.bosses.map((boss) => {
                      const totalValue = boss.values.reduce((sum, val) => sum + val, 0);
                      const bossShare = totalValue * (boss.percentage / 100);
                      const myShare = totalValue - bossShare;

                      return (
                        <tr key={boss.id} className="border-b border-yellow-400/10 hover:bg-background/30 transition-colors">
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-semibold text-foreground">{boss.name}</p>
                              <p className="text-xs text-yellow-400/70">{boss.percentage}%</p>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {boss.values.length === 0 ? (
                                <span className="text-sm text-muted-foreground">-</span>
                              ) : (
                                boss.values.map((value, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-1 bg-yellow-400/10 border border-yellow-400/30 px-2 py-1 rounded text-xs"
                                  >
                                    <span className="font-mono-value text-yellow-400">{value.toFixed(0)}</span>
                                    <button
                                      onClick={() => removeValue(boss.id, index)}
                                      className="text-yellow-400/50 hover:text-yellow-400 transition-colors"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ))
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <p className="font-mono-value text-yellow-400">R$ {totalValue.toFixed(2)}</p>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <p className="font-mono-value text-red-400">R$ {bossShare.toFixed(2)}</p>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <p className="font-mono-value text-green-400">R$ {myShare.toFixed(2)}</p>
                          </td>
                          <td className="px-4 py-3 text-center space-x-2">
                            <Dialog open={openAddValue === boss.id} onOpenChange={(open) => setOpenAddValue(open ? boss.id : null)}>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="gap-1 border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-card/95 backdrop-blur-sm border-yellow-400/30">
                                <DialogHeader>
                                  <DialogTitle className="text-yellow-400">Adicionar Valor para {boss.name}</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={(e) => handleAddValue(e, boss.id)} className="space-y-4">
                                  <Input
                                    type="number"
                                    placeholder="Ex: 150.50"
                                    step="0.01"
                                    min="0"
                                    value={valueInput}
                                    onChange={(e) => setValueInput(e.target.value)}
                                    autoFocus
                                    className="bg-background/50 border-yellow-400/30 focus:border-yellow-400"
                                  />
                                  <Button 
                                    type="submit" 
                                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold"
                                  >
                                    Adicionar
                                  </Button>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeBoss(boss.id)}
                              className="border-red-400/30 text-red-400 hover:bg-red-400/10"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Resumo de Totais */}
            {state.bosses.length > 0 && (
              <div className="bg-background/50 border-t border-yellow-400/20 p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-yellow-400 uppercase">Total Geral</p>
                    <p className="font-mono-value text-lg text-yellow-400">R$ {state.totalGeneral.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-400 uppercase">Enviado para Patrões</p>
                    <p className="font-mono-value text-lg text-red-400">R$ {state.totalSentToBosses.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-green-400 uppercase">Meu Faturamento</p>
                    <p className="font-mono-value text-lg text-green-400">R$ {state.myEarnings.toFixed(2)}</p>
                  </div>
                  {state.totalGeneral > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-yellow-400 uppercase">Percentual</p>
                      <p className="text-sm text-foreground">
                        {((state.totalSentToBosses / state.totalGeneral) * 100).toFixed(1)}% para patrões
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
