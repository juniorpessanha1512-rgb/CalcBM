import { useBossCalculator, Employee } from '@/hooks/useBossCalculator';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, UserPlus, X, ChevronDown, ChevronUp } from 'lucide-react';

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
    markAsSent,
    resetSentAmounts,
  } = useBossCalculator();

  const [bossName, setBossName] = useState('');
  const [bossPercentage, setBossPercentage] = useState('');
  const [valuesInput, setValuesInput] = useState<{ [key: string]: string }>({});
  const [sentAmountInput, setSentAmountInput] = useState<{ [key: string]: string }>({});
  const [expandedBossId, setExpandedBossId] = useState<string | null>(null);

  // Estado para novos funcionários
  const [newEmployees, setNewEmployees] = useState<Employee[]>([]);
  const [empName, setEmpName] = useState('');
  const [empPercentage, setEmpPercentage] = useState('');

  const handleAddEmployee = () => {
    if (!empName.trim() || !empPercentage.trim()) return;
    const percentageNum = parseFloat(empPercentage);
    if (isNaN(percentageNum) || percentageNum <= 0) return;

    setNewEmployees([
      ...newEmployees,
      { id: Date.now().toString(), name: empName.trim(), percentage: percentageNum }
    ]);
    setEmpName('');
    setEmpPercentage('');
  };

  const removeNewEmployee = (id: string) => {
    setNewEmployees(newEmployees.filter(e => e.id !== id));
  };

  const handleAddBoss = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bossName.trim() || !bossPercentage.trim()) return;
    
    const percentageNum = parseFloat(bossPercentage);
    if (isNaN(percentageNum) || percentageNum < 0 || percentageNum > 100) return;

    // Validar soma total das porcentagens
    const totalEmployeesPercentage = newEmployees.reduce((sum, emp) => sum + emp.percentage, 0);
    if (percentageNum + totalEmployeesPercentage > 100) {
      alert(`Erro: A soma das porcentagens (${percentageNum + totalEmployeesPercentage}%) ultrapassa 100%`);
      return;
    }

    addBoss(bossName.trim(), percentageNum, newEmployees);
    setBossName('');
    setBossPercentage('');
    setNewEmployees([]);
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

  const toggleExpand = (bossId: string) => {
    setExpandedBossId(expandedBossId === bossId ? null : bossId);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center py-4 md:py-8">
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
      <div className="relative z-10 w-full max-w-7xl px-2 md:px-4">
        {/* Card Principal */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-2xl overflow-hidden border-2 md:border-4 border-yellow-400/30">
          {/* Header do Card */}
          <div className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 px-4 md:px-8 py-4 md:py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-4xl font-black text-black drop-shadow-lg">
                  📊 BM Calculadora
                </h1>
                <p className="text-xs md:text-sm text-black/80 font-semibold mt-1">
                  {new Date().toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <Button
                className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-sm md:text-lg px-6 py-2 md:py-3 rounded-lg shadow-lg"
                onClick={clearDayData}
              >
                🧹 Limpar Dados
              </Button>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-3 md:p-8">
            {/* Formulário de Entrada */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 md:p-6 rounded-xl mb-6 md:mb-8 border-2 border-yellow-400/20">
              <form onSubmit={handleAddBoss} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900 uppercase tracking-wide">Nome do Patrão:</label>
                    <Input
                      placeholder="Ex: João Silva"
                      value={bossName}
                      onChange={(e) => setBossName(e.target.value)}
                      className="bg-white border-2 border-yellow-400/50 focus:border-yellow-500 font-semibold text-black placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900 uppercase tracking-wide">Minha Porcentagem (%):</label>
                    <Input
                      type="number"
                      placeholder="Ex: 10"
                      min="0"
                      max="100"
                      step="0.01"
                      value={bossPercentage}
                      onChange={(e) => setBossPercentage(e.target.value)}
                      className="bg-white border-2 border-yellow-400/50 focus:border-yellow-500 font-semibold text-black placeholder:text-gray-400"
                    />
                  </div>
                  <div className="hidden md:block"></div>
                </div>

                {/* Área de Funcionários */}
                <div className="bg-white/50 p-3 md:p-4 rounded-lg border border-yellow-400/30">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Adicionar Funcionários (Opcional)</label>
                  <div className="flex flex-col md:flex-row gap-2 items-end mb-3">
                    <div className="w-full md:w-1/3">
                      <Input
                        placeholder="Nome Funcionário"
                        value={empName}
                        onChange={(e) => setEmpName(e.target.value)}
                        className="bg-white border-gray-300 h-9 text-sm text-black"
                      />
                    </div>
                    <div className="w-full md:w-24 flex gap-2">
                      <Input
                        type="number"
                        placeholder="%"
                        value={empPercentage}
                        onChange={(e) => setEmpPercentage(e.target.value)}
                        className="bg-white border-gray-300 h-9 text-sm flex-1 text-black"
                      />
                      <Button 
                        type="button"
                        onClick={handleAddEmployee}
                        className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-3 md:hidden"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button 
                      type="button"
                      onClick={handleAddEmployee}
                      className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-3 hidden md:flex"
                    >
                      <UserPlus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>

                  {/* Lista de Funcionários Adicionados */}
                  {newEmployees.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {newEmployees.map(emp => (
                        <div key={emp.id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 border border-blue-200">
                          {emp.name} ({emp.percentage}%)
                          <button type="button" onClick={() => removeNewEmployee(emp.id)} className="text-blue-600 hover:text-red-600">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold text-lg py-4 md:py-6 rounded-lg shadow-lg"
                >
                  💾 Salvar Patrão
                </Button>
              </form>
            </div>

            {/* Lista de Patrões */}
            {state.bosses.length === 0 ? (
              <div className="p-8 md:p-12 text-center space-y-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <p className="text-xl md:text-2xl font-bold text-gray-600">📭 Nenhum patrão cadastrado</p>
                <p className="text-sm md:text-base text-gray-500 font-semibold">
                  Preencha o formulário acima e clique em "Salvar Patrão" para começar.
                </p>
              </div>
            ) : (
              <>
                {/* Visualização Desktop (Tabela) */}
                <div className="hidden md:block overflow-x-auto mb-6">
                  <table className="w-full border-collapse">
                    <thead className="bg-gradient-to-r from-yellow-400 to-yellow-500">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-black text-black uppercase rounded-tl-lg">Patrão / Equipe</th>
                        <th className="px-4 py-3 text-left text-sm font-black text-black uppercase">Valores</th>
                        <th className="px-4 py-3 text-left text-sm font-black text-black uppercase min-w-[180px]">Entrada</th>
                        <th className="px-4 py-3 text-right text-sm font-black text-black uppercase">Total Bruto</th>
                        <th className="px-4 py-3 text-right text-sm font-black text-red-600 uppercase">Repasse Patrão</th>
                        <th className="px-4 py-3 text-right text-sm font-black text-green-600 uppercase">Meu Ganho</th>
                        <th className="px-4 py-3 text-center text-sm font-black text-black uppercase">Status</th>
                        <th className="px-4 py-3 text-center text-sm font-black text-black uppercase rounded-tr-lg">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {state.bosses.map((boss, idx) => {
                        const totalValue = boss.values.reduce((sum, val) => sum + val, 0);
                        const myShare = totalValue * (boss.percentage / 100);
                        
                        let employeesShareTotal = 0;
                        const employeesShares = boss.employees.map(emp => {
                          const share = totalValue * (emp.percentage / 100);
                          employeesShareTotal += share;
                          return { ...emp, share };
                        });

                        const bossShare = totalValue - myShare - employeesShareTotal;
                        
                        const valuesDisplay = boss.values.length > 0 
                          ? boss.values.map(v => v.toFixed(0)).join(' + ')
                          : '-';
                        
                        const amountSent = boss.amountSent || 0;
                        let statusColor = 'bg-red-500';
                        let statusText = 'Nao Enviado';
                        
                        if (amountSent > 0 && amountSent < bossShare) {
                          statusColor = 'bg-yellow-500';
                          statusText = 'Parcial';
                        } else if (amountSent >= bossShare && bossShare > 0) {
                          statusColor = 'bg-green-500';
                          statusText = 'Enviado';
                        }

                        return (
                          <tr 
                            key={boss.id} 
                            className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-yellow-50 transition-colors`}
                          >
                            <td className="px-4 py-4 align-top">
                              <div>
                                <p className="font-black text-gray-900 text-lg">{boss.name}</p>
                                <p className="text-xs font-bold text-yellow-600 bg-yellow-100 inline-block px-2 py-0.5 rounded border border-yellow-200 mb-2">
                                  Minha parte: {boss.percentage}%
                                </p>
                                {employeesShares.length > 0 && (
                                  <div className="mt-2 space-y-1 border-l-2 border-blue-200 pl-2">
                                    {employeesShares.map(emp => (
                                      <div key={emp.id} className="text-sm flex justify-between items-center bg-blue-50 p-1 rounded pr-2">
                                        <span className="font-semibold text-blue-900">{emp.name} <span className="text-xs text-blue-500">({emp.percentage}%)</span></span>
                                        <span className="font-bold text-blue-700">R$ {emp.share.toFixed(2)}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4 align-top">
                              <p className="text-sm font-mono font-bold text-gray-700 break-all max-w-[150px]">{valuesDisplay}</p>
                            </td>
                            <td className="px-4 py-4 align-top">
                              <div className="flex gap-2">
                                <Input
                                  type="text"
                                  placeholder="100+200"
                                  value={valuesInput[boss.id] || ''}
                                  onChange={(e) => handleInputChange(boss.id, e.target.value)}
                                  onKeyPress={(e) => handleKeyPress(e, boss.id)}
                                  className="bg-white border-2 border-yellow-400/50 focus:border-yellow-500 text-sm font-semibold text-black placeholder:text-gray-400 w-full"
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
                            <td className="px-4 py-4 text-right align-top">
                              <p className="font-black text-gray-900 text-lg">R$ {totalValue.toFixed(2)}</p>
                            </td>
                            <td className="px-4 py-4 text-right align-top bg-red-50/50">
                              <p className="font-black text-red-600 text-lg">R$ {bossShare.toFixed(2)}</p>
                              <p className="text-xs text-red-400 font-semibold">A Repassar</p>
                            </td>
                            <td className="px-4 py-4 text-right align-top bg-green-50/50">
                              <p className="font-black text-green-600 text-lg">R$ {myShare.toFixed(2)}</p>
                              <p className="text-xs text-green-400 font-semibold">Lucro</p>
                            </td>
                            <td className="px-4 py-4 text-center align-top">
                              <div className="flex flex-col gap-2 items-center">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm w-24 ${statusColor}`}>
                                  {statusText}
                                </span>
                                <div className="flex gap-1 items-center justify-center mt-1">
                                  <Input
                                    type="number"
                                    placeholder="0"
                                    value={sentAmountInput[boss.id] || ''}
                                    onChange={(e) => setSentAmountInput({ ...sentAmountInput, [boss.id]: e.target.value })}
                                    className="bg-white border border-gray-300 text-xs h-7 w-16 px-1 text-center text-black"
                                  />
                                  <Button
                                    size="sm"
                                    className="h-7 px-2 bg-blue-600 hover:bg-blue-700 text-white text-xs"
                                    onClick={() => {
                                      const val = parseFloat(sentAmountInput[boss.id]);
                                      if (!isNaN(val) && val > 0) {
                                        markAsSent(boss.id, val);
                                        setSentAmountInput({ ...sentAmountInput, [boss.id]: '' });
                                      }
                                    }}
                                  >
                                    OK
                                  </Button>
                                </div>
                                {amountSent > 0 && (
                                  <span className="text-xs font-bold text-gray-500">
                                    Pago: R$ {amountSent.toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-center align-top">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeBoss(boss.id)}
                                className="text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Visualização Mobile (Cards) */}
                <div className="md:hidden space-y-4 mb-6">
                  {state.bosses.map((boss) => {
                    const totalValue = boss.values.reduce((sum, val) => sum + val, 0);
                    const myShare = totalValue * (boss.percentage / 100);
                    
                    let employeesShareTotal = 0;
                    const employeesShares = boss.employees.map(emp => {
                      const share = totalValue * (emp.percentage / 100);
                      employeesShareTotal += share;
                      return { ...emp, share };
                    });

                    const bossShare = totalValue - myShare - employeesShareTotal;
                    
                    const valuesDisplay = boss.values.length > 0 
                      ? boss.values.map(v => v.toFixed(0)).join(' + ')
                      : 'Sem valores';
                    
                    const amountSent = boss.amountSent || 0;
                    let statusColor = 'bg-red-500';
                    let statusText = 'Nao Enviado';
                    
                    if (amountSent > 0 && amountSent < bossShare) {
                      statusColor = 'bg-yellow-500';
                      statusText = 'Parcial';
                    } else if (amountSent >= bossShare && bossShare > 0) {
                      statusColor = 'bg-green-500';
                      statusText = 'Enviado';
                    }

                    const isExpanded = expandedBossId === boss.id;

                    return (
                      <div key={boss.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                        {/* Header do Card Mobile */}
                        <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-start">
                          <div>
                            <h3 className="font-black text-gray-900 text-lg">{boss.name}</h3>
                            <div className="flex gap-2 mt-1">
                              <span className="text-xs font-bold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded">
                                Eu: {boss.percentage}%
                              </span>
                              <span className={`text-xs font-bold text-white px-2 py-0.5 rounded ${statusColor}`}>
                                {statusText}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeBoss(boss.id)}
                            className="text-gray-400 hover:text-red-600 -mt-1 -mr-2"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>

                        {/* Corpo do Card Mobile */}
                        <div className="p-4 space-y-4">
                          {/* Input de Valores */}
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              placeholder="Add: 100+50"
                              value={valuesInput[boss.id] || ''}
                              onChange={(e) => handleInputChange(boss.id, e.target.value)}
                              className="bg-white border-gray-300 text-sm h-10 text-black"
                            />
                            <Button
                              onClick={() => handleAddValues(boss.id)}
                              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold h-10 w-12"
                            >
                              <Plus className="w-5 h-5" />
                            </Button>
                          </div>

                          {/* Resumo Financeiro */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-50 p-2 rounded border border-gray-100">
                              <p className="text-xs text-gray-500 uppercase font-bold">Total Bruto</p>
                              <p className="text-lg font-black text-gray-900">R$ {totalValue.toFixed(2)}</p>
                            </div>
                            <div className="bg-green-50 p-2 rounded border border-green-100">
                              <p className="text-xs text-green-600 uppercase font-bold">Meu Lucro</p>
                              <p className="text-lg font-black text-green-700">R$ {myShare.toFixed(2)}</p>
                            </div>
                          </div>

                          {/* Repasse Patrão */}
                          <div className="bg-red-50 p-3 rounded border border-red-100 flex justify-between items-center">
                            <div>
                              <p className="text-xs text-red-500 uppercase font-bold">Repasse Patrão</p>
                              <p className="text-xl font-black text-red-600">R$ {bossShare.toFixed(2)}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-400 mb-1">Já pago: R$ {amountSent.toFixed(2)}</p>
                              <div className="flex gap-1">
                                <Input
                                  type="number"
                                  placeholder="0"
                                  value={sentAmountInput[boss.id] || ''}
                                  onChange={(e) => setSentAmountInput({ ...sentAmountInput, [boss.id]: e.target.value })}
                                  className="bg-white border-gray-300 h-8 w-16 text-xs px-1 text-black"
                                />
                                <Button
                                  size="sm"
                                  className="h-8 px-2 bg-blue-600 text-white"
                                  onClick={() => {
                                    const val = parseFloat(sentAmountInput[boss.id]);
                                    if (!isNaN(val) && val > 0) {
                                      markAsSent(boss.id, val);
                                      setSentAmountInput({ ...sentAmountInput, [boss.id]: '' });
                                    }
                                  }}
                                >
                                  OK
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Detalhes Expansíveis (Funcionários e Histórico) */}
                          <div className="border-t border-gray-100 pt-2">
                            <button 
                              onClick={() => toggleExpand(boss.id)}
                              className="w-full flex justify-between items-center text-sm text-gray-500 font-medium py-1"
                            >
                              <span>Ver detalhes e funcionários</span>
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            
                            {isExpanded && (
                              <div className="mt-3 space-y-3 animate-in slide-in-from-top-2 duration-200">
                                {/* Valores Individuais */}
                                <div>
                                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">Histórico de Entradas</p>
                                  <p className="text-sm font-mono bg-gray-50 p-2 rounded text-gray-600 break-all">
                                    {valuesDisplay}
                                  </p>
                                </div>

                                {/* Lista de Funcionários */}
                                {employeesShares.length > 0 && (
                                  <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Equipe</p>
                                    <div className="space-y-1">
                                      {employeesShares.map(emp => (
                                        <div key={emp.id} className="flex justify-between items-center bg-blue-50 p-2 rounded text-sm">
                                          <span className="text-blue-900 font-medium">{emp.name} ({emp.percentage}%)</span>
                                          <span className="text-blue-700 font-bold">R$ {emp.share.toFixed(2)}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Totais Gerais (Fixo no fundo ou final da página) */}
                <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg border border-gray-700">
                  <h3 className="text-yellow-400 font-bold uppercase text-sm mb-3 border-b border-gray-700 pb-2">Resumo Geral do Dia</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Total Bruto</p>
                      <p className="text-lg md:text-xl font-black">R$ {state.totalGeneral.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-red-400 uppercase">A Repassar</p>
                      <p className="text-lg md:text-xl font-black text-red-400">R$ {state.totalSentToBosses.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-400 uppercase">Meu Lucro</p>
                      <p className="text-lg md:text-xl font-black text-green-400">R$ {state.myEarnings.toFixed(2)}</p>
                    </div>
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
