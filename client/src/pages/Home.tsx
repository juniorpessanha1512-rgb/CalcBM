import { useBossCalculator } from '@/hooks/useBossCalculator';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash2, Plus } from 'lucide-react';

/**
 * Design: Similar ao calcrb.com - Layout Compacto e Objetivo
 * - Formulário de entrada no topo
 * - Tabela central com todos os patrões
 * - Resumo de totais na parte inferior
 * - Tipografia: Poppins (títulos), Inter (corpo), JetBrains Mono (valores)
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-foreground">Tabela de Patrões</h1>
              <p className="text-sm text-muted-foreground mt-1">
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
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
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
        <div className="card-elevated-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Nome do Patrão:</label>
              <Input
                placeholder="Ex: João Silva"
                value={bossName}
                onChange={(e) => setBossName(e.target.value)}
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
              />
            </div>
            <Button onClick={handleAddBoss} className="w-full">
              💾 Salvar
            </Button>
          </div>
        </div>

        {/* Tabela de Patrões */}
        <div className="card-elevated-lg overflow-hidden">
          {state.bosses.length === 0 ? (
            <div className="p-8 text-center space-y-4">
              <p className="text-muted-foreground">Nenhum patrão cadastrado ainda.</p>
              <p className="text-sm text-muted-foreground">
                Preencha o formulário acima e clique em "Salvar" para começar.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Patrão</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Valores</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">Total (R$)</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-destructive">Repasse (R$)</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-chart-1">Meu (R$)</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {state.bosses.map((boss) => {
                    const totalValue = boss.values.reduce((sum, val) => sum + val, 0);
                    const bossShare = totalValue * (boss.percentage / 100);
                    const myShare = totalValue - bossShare;

                    return (
                      <tr key={boss.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-semibold text-foreground">{boss.name}</p>
                            <p className="text-xs text-muted-foreground">{boss.percentage}%</p>
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
                                  className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-xs"
                                >
                                  <span className="font-mono-value">{value.toFixed(0)}</span>
                                  <button
                                    onClick={() => removeValue(boss.id, index)}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <p className="font-mono-value text-foreground">R$ {totalValue.toFixed(2)}</p>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <p className="font-mono-value text-destructive">R$ {bossShare.toFixed(2)}</p>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <p className="font-mono-value text-chart-1">R$ {myShare.toFixed(2)}</p>
                        </td>
                        <td className="px-4 py-3 text-center space-x-2">
                          <Dialog open={openAddValue === boss.id} onOpenChange={(open) => setOpenAddValue(open ? boss.id : null)}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="gap-1">
                                <Plus className="w-3 h-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Adicionar Valor para {boss.name}</DialogTitle>
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
                                />
                                <Button type="submit" className="w-full">
                                  Adicionar
                                </Button>
                              </form>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeBoss(boss.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
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
            <div className="bg-muted border-t border-border p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Total Geral</p>
                  <p className="font-mono-value text-lg text-foreground">R$ {state.totalGeneral.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-destructive uppercase">Enviado para Patrões</p>
                  <p className="font-mono-value text-lg text-destructive">R$ {state.totalSentToBosses.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-chart-1 uppercase">Meu Faturamento</p>
                  <p className="font-mono-value text-lg text-chart-1">R$ {state.myEarnings.toFixed(2)}</p>
                </div>
                {state.totalGeneral > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Percentual</p>
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
  );
}
