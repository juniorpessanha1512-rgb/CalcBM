import { CalculatorState } from '@/hooks/useBossCalculator';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface SummaryPanelProps {
  state: CalculatorState;
  onClearDay: () => void;
}

export function SummaryPanel({ state, onClearDay }: SummaryPanelProps) {
  return (
    <div className="card-elevated-lg p-6 space-y-6 sticky top-4">
      <div className="space-y-2">
        <h2 className="font-heading text-foreground">Resumo do Dia</h2>
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Total Geral */}
      <div className="space-y-1 p-4 bg-muted rounded-lg">
        <p className="text-xs font-semibold text-muted-foreground uppercase">Total Geral</p>
        <p className="font-mono-value text-2xl text-foreground">
          R$ {state.totalGeneral.toFixed(2)}
        </p>
      </div>

      {/* Enviado para Patrões */}
      <div className="space-y-1 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
        <p className="text-xs font-semibold text-destructive uppercase">Enviado para Patrões</p>
        <p className="font-mono-value text-2xl text-destructive">
          R$ {state.totalSentToBosses.toFixed(2)}
        </p>
      </div>

      {/* Meu Faturamento Líquido */}
      <div className="space-y-1 p-4 bg-chart-1/10 rounded-lg border border-chart-1/20">
        <p className="text-xs font-semibold text-chart-1 uppercase">Meu Faturamento Líquido</p>
        <p className="font-mono-value text-2xl text-chart-1">
          R$ {state.myEarnings.toFixed(2)}
        </p>
      </div>

      {/* Percentual */}
      {state.totalGeneral > 0 && (
        <div className="space-y-1 p-4 bg-muted rounded-lg">
          <p className="text-xs font-semibold text-muted-foreground uppercase">Percentual</p>
          <p className="text-sm text-foreground">
            {((state.totalSentToBosses / state.totalGeneral) * 100).toFixed(1)}% do total para patrões
          </p>
          <p className="text-sm text-foreground">
            {((state.myEarnings / state.totalGeneral) * 100).toFixed(1)}% para você
          </p>
        </div>
      )}

      {/* Botão Limpar */}
      <Button
        variant="outline"
        className="w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={onClearDay}
      >
        <RotateCcw className="w-4 h-4" />
        Limpar Dados do Dia
      </Button>
    </div>
  );
}
