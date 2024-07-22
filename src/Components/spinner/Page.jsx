import { BallTriangle } from "react-loader-spinner";

const ThreeDotSpinner = ({
  color = "#4fa94d",
  height = 100,
  width = 100,
  radius = 5,
}) => {
  return (
    <BallTriangle
      height={height}
      width={width}
      radius={radius}
      color={color}
      visible={true}
    />
  );
};

export default ThreeDotSpinner;
