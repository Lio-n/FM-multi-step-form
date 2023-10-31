import { FC, HTMLAttributes } from "react";
import Typography from "../../../interfaces/typography.interface";

interface BodyProps extends HTMLAttributes<HTMLParagraphElement>, Partial<Typography> {}

const Body: FC<BodyProps> = (props) => (
  <p className={`text-base text-${props.textColor && "purplish-blue"} font-${props.textWeight && "normal"}`} {...props} />
);

export default Body;
