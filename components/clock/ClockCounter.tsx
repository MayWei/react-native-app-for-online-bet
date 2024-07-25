import { useEffect, useState } from "react";
import { Text } from "react-native";
import { Body } from "../Fonts/Body";
interface Props {
  startTime: string;
  isFirst?: boolean;
}

const calculateTimeDiff = (start: number, stop: number): string => {
  const diff = stop - start;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours} h ${minutes} m`;
};

export const ClockCounter: React.FC<Props> = ({ startTime, isFirst }) => {
  const [timeDiff, setTimeDiff] = useState(
    calculateTimeDiff(new Date().getTime(), new Date(startTime).getTime())
  );
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeDiff(
        calculateTimeDiff(new Date().getTime(), new Date(startTime).getTime())
      );
    }, 1000 * 60);
    return () => clearInterval(timer);
  }, [timeDiff]);
  return (
    <Body.B4
      semiBold
      style={{
        marginRight: 10,
        backgroundColor: isFirst ? "red" : "black",
        color: "#fff",
        borderRadius: 4,
      }}
    >
      {timeDiff}
    </Body.B4>
  );
};
