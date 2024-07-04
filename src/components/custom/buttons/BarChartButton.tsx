import { Button } from '@/components/ui/button';
import { BarChart4 } from 'lucide-react';

interface BarChartButtonProps {
  isSelected: boolean;
  onClick: () => void;
}

const BarChartButton = ({ isSelected, onClick }: BarChartButtonProps) => {
  return (
    <Button
      size="iconButton"
      variant="outline"
      onClick={onClick}
      disabled={isSelected}
    >
      <BarChart4 size={20} />
    </Button>
  );
};

export default BarChartButton;
