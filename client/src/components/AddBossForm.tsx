import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

interface AddBossFormProps {
  onAddBoss: (name: string, percentage: number) => void;
}

export function AddBossForm({ onAddBoss }: AddBossFormProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [percentage, setPercentage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !percentage.trim()) {
      return;
    }

    const percentageNum = parseFloat(percentage);
    if (isNaN(percentageNum) || percentageNum < 0 || percentageNum > 100) {
      return;
    }

    onAddBoss(name.trim(), percentageNum);
    setName('');
    setPercentage('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full gap-2" size="lg">
          <Plus className="w-4 h-4" />
          Adicionar Patrão
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Patrão</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="boss-name">Nome do Patrão</Label>
            <Input
              id="boss-name"
              placeholder="Ex: João Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="boss-percentage">Porcentagem (%)</Label>
            <Input
              id="boss-percentage"
              type="number"
              placeholder="Ex: 30"
              min="0"
              max="100"
              step="0.01"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Cadastrar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
