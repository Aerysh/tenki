type Props = {
  temperature?: number;
  weatherCondition?: string;
};

export const CurrentWeather = ({ temperature, weatherCondition }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="text-6xl font-bold">{temperature?.toFixed(0)} ℃</div>
      <div className="text-2xl font-semibold">{weatherCondition}</div>
    </div>
  );
};
