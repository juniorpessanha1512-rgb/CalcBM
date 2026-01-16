import { useBossCalculator } from '@/hooks/useBossCalculator';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus } from 'lucide-react';

/**
 * Design: BM Calculadora Tripeiro Pro 2026
 * - Fundo épico com chamas douradas e elementos visuais marcantes
 * - Card centralizado com design premium
 * - Paleta: Dourado, Vermelho, Branco sobre fundo dark
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
  const [valuesInput, setValuesInput] = useState<{ [key: string]: string }>({});

  const handleAddBoss = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bossName.trim() || !bossPercentage.trim()) return;
    
    const percentageNum = parseFloat(bossPercentage);
    if (isNaN(percentageNum) || percentageNum < 0 || percentageNum > 100) return;

    addBoss(bossName.trim(), percentageNum);
    setBossName('');
    setBossPercentage('');
  };

  const handleAddValues = (bossId: string) => {
    const input = valuesInput[bossId] || '';
    if (!input.trim()) return;

    const values = input
      .split('+')
      .map(v => parseFloat(v.trim()))
      .filter(v => !isNaN(v) && v > 0);

    values.forEach(value => {
      addValue(bossId, value);
    });

    setValuesInput({ ...valuesInput, [bossId]: '' });
  };

  const handleInputChange = (bossId: string, value: string) => {
    setValuesInput({ ...valuesInput, [bossId]: value });
  };

  const handleKeyPress = (e: React.KeyboardEvent, bossId: string) => {
    if (e.key === 'Enter') {
      handleAddValues(bossId);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center py-8">
      {/* Fundo Épico */}
      <div 
        className="fixed inset-0 opacity-100"
        style={{
          backgroundImage: 'url(/images/bg-epic.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Overlay com gradiente */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 pointer-events-none" />

      {/* Conteúdo */}
      <div className="relative z-10 w-full max-w-6xl px-4">
        {/* Card Principal */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border-4 border-yellow-400/30">
          {/* Header do Card */}
          <div className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black text-black drop-shadow-lg">
                  📊 BM Calculadora Tripeiro Pro 2026
                </h1>
                <p className="text-sm text-black/80 font-semibold mt-1">
                  {new Date().toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-6 py-3 rounded-lg shadow-lg"
                onClick={clearDayData}
              >
                🧹 Limpar Dados
              </Button>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-8">
            {/* Formulário de Entrada */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl mb-8 border-2 border-yellow-400/20">
              <form onSubmit={handleAddBoss} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-wide">Nome do Patrão:</label>
                  <Input
                    placeholder="Ex: João Silva"
                    value={bossName}
                    onChange={(e) => setBossName(e.target.value)}
                    className="bg-white border-2 border-yellow-400/50 focus:border-yellow-500 font-semibold text-gray-900 placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-wide">Porcentagem (%):</label>
                  <Input
                    type="number"
                    placeholder="Ex: 30"
                    min="0"
                    max="100"
                    step="0.01"
                    value={bossPercentage}
                    onChange={(e) => setBossPercentage(e.target.value)}
                    className="bg-white border-2 border-yellow-400/50 focus:border-yellow-500 font-semibold text-gray-900 placeholder:text-gray-400"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold text-lg py-6 rounded-lg shadow-lg"
                >
                  💾 Salvar Patrão
                </Button>
              </form>
            </div>

            {/* Tabela de Patrões */}
            {state.bosses.length === 0 ? (
              <div className="p-12 text-center space-y-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <p className="text-2xl font-bold text-gray-600">📭 Nenhum patrão cadastrado</p>
                <p className="text-gray-500 font-semibold">
                  Preencha o formulário acima e clique em "Salvar Patrão" para começar.
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-yellow-400 to-yellow-500">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-black text-black uppercase">Patrão</th>
                        <th className="px-4 py-3 text-left text-sm font-black text-black uppercase">Valores</th>
                        <th className="px-4 py-3 text-left text-sm font-black text-black uppercase">Valores Diários</th>
                        <th className="px-4 py-3 text-right text-sm font-black text-black uppercase">Total</th>
                        <th className="px-4 py-3 text-right text-sm font-black text-red-600 uppercase">Repasse</th>
                        <th className="px-4 py-3 text-right text-sm font-black text-green-600 uppercase">Meu</th>
                        <th className="px-4 py-3 text-center text-sm font-black text-black uppercase">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.bosses.map((boss, idx) => {
                        const totalValue = boss.values.reduce((sum, val) => sum + val, 0);
                        const myShare = totalValue * (boss.percentage / 100);
                        const bossShare = totalValue - myShare;
                        const valuesDisplay = boss.values.length > 0 
                          ? boss.values.map(v => v.toFixed(0)).join(' + ')
                          : '-';

                        return (
                          <tr 
                            key={boss.id} 
                            className={`border-b-2 border-gray-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-yellow-50 transition-colors`}
                          >
                            <td className="px-4 py-4">
                              <div>
                                <p className="font-black text-gray-900 text-lg">{boss.name}</p>
                                <p className="text-sm font-bold text-yellow-600">{boss.percentage}%</p>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-sm font-mono font-bold text-gray-700">{valuesDisplay}</p>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex gap-2">
                                <Input
                                  type="text"
                                  placeholder="100+200+150"
                                  value={valuesInput[boss.id] || ''}
                                  onChange={(e) => handleInputChange(boss.id, e.target.value)}
                                  onKeyPress={(e) => handleKeyPress(e, boss.id)}
                                  className="bg-white border-2 border-yellow-400/50 focus:border-yellow-500 text-sm font-semibold text-gray-900 placeholder:text-gray-400"
                                />
                                <Button
                                  onClick={() => handleAddValues(boss.id)}
                                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-3 rounded-lg shadow-md"
                                  size="sm"
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-right">
                              <p className="font-black text-gray-900 text-lg">R$ {totalValue.toFixed(2)}</p>
                            </td>
                            <td className="px-4 py-4 text-right">
                              <p className="font-black text-red-600 text-lg">R$ {bossShare.toFixed(2)}</p>
                            </td>
                            <td className="px-4 py-4 text-right">
                              <p className="font-black text-green-600 text-lg">R$ {myShare.toFixed(2)}</p>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeBoss(boss.id)}
                                className="border-2 border-red-400 text-red-600 hover:bg-red-50 font-bold"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Resumo de Totais */}
                <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 p-6 rounded-xl border-4 border-yellow-600 shadow-lg">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/90 p-4 rounded-lg">
                      <p className="text-xs font-black text-yellow-600 uppercase">Total Geral</p>
                      <p className="font-black text-2xl text-yellow-600">R$ {state.totalGeneral.toFixed(2)}</p>
                    </div>
                    <div className="bg-white/90 p-4 rounded-lg">
                      <p className="text-xs font-black text-red-600 uppercase">Enviado</p>
                      <p className="font-black text-2xl text-red-600">R$ {state.totalSentToBosses.toFixed(2)}</p>
                    </div>
                    <div className="bg-white/90 p-4 rounded-lg">
                      <p className="text-xs font-black text-green-600 uppercase">Meu Faturamento</p>
                      <p className="font-black text-2xl text-green-600">R$ {state.myEarnings.toFixed(2)}</p>
                    </div>
                    {state.totalGeneral > 0 && (
                      <div className="bg-white/90 p-4 rounded-lg">
                        <p className="text-xs font-black text-gray-900 uppercase">Percentual</p>
                        <p className="font-black text-2xl text-gray-900">
                          {((state.totalSentToBosses / state.totalGeneral) * 100).toFixed(1)}%
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
