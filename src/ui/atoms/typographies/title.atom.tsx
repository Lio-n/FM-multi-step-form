import { FC, HTMLAttributes } from "react";
import Typography from "../../../interfaces/typography.interface";

interface TitleProps extends HTMLAttributes<HTMLHeadingElement>, Partial<Typography> {}

const Title: FC<TitleProps> = ({ textWeight = "normal", textColor = "purplish-blue", ...props }) => (
  <h1 className={`text-4xl text-${textColor} font-${textWeight}`} {...props} />
);

export default Title;
