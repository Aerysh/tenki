import { useState } from "react";
import {
  Button,
  Container,
  Content,
  Divider,
  Form,
  Heading,
  HStack,
  Panel,
  Stack,
  Text,
  VStack,
} from "rsuite";
import { fetchWeatherApi } from "openmeteo";

function App() {
  const url = "https://api.open-meteo.com/v1/forecast";

  const [coordinates, setCoordinates] = useState("");
  const [weatherData, setWeatherData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const responses = await fetchWeatherApi(url, {
        latitude: coordinates?.split(/\s*,\s*/)[0],
        longitude: coordinates?.split(/\s*,\s*/)[1],
        current: ["temperature_2m", "relative_humidity_2m", "wind_speed_10m"],
      });

      const response = responses[0];

      const current = response.current();

      setWeatherData({
        current: {
          temperature: current?.variables(0)?.value(),
          relativeHumidity: current?.variables(1)?.value(),
          windSpeed: current?.variables(2)?.value(),
        },
      });
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setWeatherData(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Content>
        <Stack
          alignItems="center"
          justifyContent="center"
          style={{ height: "100%" }}
        >
          <Panel header="Weather App" bordered style={{ width: 400 }}>
            <Form fluid>
              <Form.Group>
                <Form.ControlLabel>Coordinates</Form.ControlLabel>
                <Form.Control
                  name="coordinates"
                  onChange={(value) => setCoordinates(value)}
                  value={coordinates || ""}
                  placeholder="Enter coordinates (latitude,longitude)"
                />
              </Form.Group>
              <VStack spacing={8}>
                <Button
                  appearance="primary"
                  block
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  Submit
                </Button>
              </VStack>
            </Form>
            {isError && (
              <>
                <Divider />
                <HStack alignItems="center" justifyContent="center">
                  <Heading level={4}>Error, try again</Heading>
                </HStack>
              </>
            )}
            {weatherData && (
              <>
                <Divider />
                <HStack alignItems="center" justifyContent="center">
                  <Heading level={2}>
                    {weatherData.current.temperature
                      ? `${weatherData.current.temperature.toFixed(1)}  C`
                      : ""}
                  </Heading>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <VStack alignItems="center" justifyContent="center">
                    <Heading level={3}>
                      {`${weatherData.current.relativeHumidity?.toFixed(1)}%`}
                    </Heading>
                    <Text>Humidity</Text>
                  </VStack>
                  <VStack alignItems="center" justifyContent="center">
                    <Heading level={3}>
                      {`${weatherData.current.windSpeed?.toFixed(1)} km/h`}
                    </Heading>
                    <Text>Wind Speed</Text>
                  </VStack>
                </HStack>
              </>
            )}
          </Panel>
        </Stack>
      </Content>
    </Container>
  );
}

export default App;
