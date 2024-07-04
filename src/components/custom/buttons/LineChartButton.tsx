import { Button } from '@/components/ui/button';
import { LineChart } from 'lucide-react';

interface LineChartButtonProps {
  isSelected: boolean;
  onClick: () => void;
}

const LineChartButton = ({ isSelected, onClick }: LineChartButtonProps) => {
  return (
    <Button
      size="iconButton"
      variant="outline"
      onClick={onClick}
      disabled={isSelected}
    >
      <LineChart size={20} />
    </Button>
  );
};

export default LineChartButton;
