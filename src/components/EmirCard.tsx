import { Emir } from "../App";

interface EmirCardProps {
  emir: Emir;
}

const EmirCard = ({ emir }: EmirCardProps) => {
  return (
    <div className="emir-card" data-testid="emir-card">
      <p className="emir-text" data-testid="emir-text">
        {emir.emir}
      </p>
      <p className="sure-text" data-testid="sure-text">
        {emir.sure}
      </p>
    </div>
  );
};

export default EmirCard;
