import { DetailItem } from './detail-item';

type Props = {
  feelsLike: number;
  windSpeed: number;
  humidity: number;
  precipitation: number;
};

export const AdditionalDetails = ({
  feelsLike,
  windSpeed,
  humidity,
  precipitation,
}: Props) => {
  return (
    <div className="grid grid-cols-2 justify-items-center gap-4">
      <DetailItem title="Feels Like" value={`${feelsLike.toFixed(1)} ℃`} />
      <DetailItem title="Wind Speed" value={`${windSpeed.toFixed(1)} km/h`} />
      <DetailItem title="Humidity" value={`${humidity.toFixed(0)}%`} />
      <DetailItem
        title="Precipitation"
        value={`${precipitation.toFixed(1)} mm`}
      />
    </div>
  );
};
