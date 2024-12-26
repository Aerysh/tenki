type Props = {
  title: string;
  value: string;
};

export const DetailItem = ({ title, value }: Props) => {
  return (
    <div className="p-4 text-center">
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
};
