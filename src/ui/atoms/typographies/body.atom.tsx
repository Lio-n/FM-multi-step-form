import { FC, HTMLAttributes } from "react";
import Typography from "../../../interfaces/typography.interface";

interface BodyProps extends HTMLAttributes<HTMLParagraphElement>, Partial<Typography> {}

const Body: FC<BodyProps> = ({ textWeight = "normal", textColor = "purplish-blue", ...props }) => (
  <p className={`text-base text-${textColor} font-${textWeight}`} {...props} />
);

export default Body;
