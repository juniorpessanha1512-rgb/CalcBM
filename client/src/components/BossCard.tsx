import { useState } from 'react';
import { Boss } from '@/hooks/useBossCalculator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash2, Plus, X } from 'lucide-react';

interface BossCardProps {
  boss: Boss;
  onAddValue: (value: number) => void;
  onRemoveValue: (index: number) => void;
  onRemoveBoss: () => void;
}

export function BossCard({ boss, onAddValue, onRemoveValue, onRemoveBoss }: BossCardProps) {
  const [open, setOpen] = useState(false);
  const [valueInput, setValueInput] = useState('');

  const totalValue = boss.values.reduce((sum, val) => sum + val, 0);
  const bossShare = totalValue * (boss.percentage / 100);
  const myShare = totalValue - bossShare;

  const handleAddValue = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(valueInput);
    if (!isNaN(value) && value > 0) {
      onAddValue(value);
      setValueInput('');
      setOpen(false);
    }
  };

  return (
    <div className="card-elevated p-4 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-heading text-foreground">{boss.name}</h3>
          <p className="text-sm text-muted-foreground">{boss.percentage}% de comissão</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemoveBoss}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Valores adicionados */}
      {boss.values.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase">Valores</p>
          <div className="flex flex-wrap gap-2">
            {boss.values.map((value, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-sm"
              >
                <span className="font-mono-value text-foreground">R$ {value.toFixed(2)}</span>
                <button
                  onClick={() => onRemoveValue(index)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resumo de valores */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="font-mono-value text-foreground">R$ {totalValue.toFixed(2)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Repasse</p>
          <p className="font-mono-value text-destructive">R$ {bossShare.toFixed(2)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Meu</p>
          <p className="font-mono-value text-chart-1">R$ {myShare.toFixed(2)}</p>
        </div>
      </div>

      {/* Botão para adicionar valor */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full gap-2" size="sm">
            <Plus className="w-4 h-4" />
            Adicionar Valor
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Valor para {boss.name}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddValue} className="space-y-4">
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
    </div>
  );
}
