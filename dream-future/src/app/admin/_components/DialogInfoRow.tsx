import { FC, ReactNode } from "react";

interface DialogInfoRowProps {
  label: string;
  value: ReactNode;
}

const DialogInfoRow: FC<DialogInfoRowProps> = ({ label, value }) => {
  return (
    <div className="flex gap-3">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
};

export default DialogInfoRow;
