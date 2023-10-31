import { FC, HTMLAttributes } from "react";
import Typography from "../../../interfaces/typography.interface";

interface TitleProps extends HTMLAttributes<HTMLHeadingElement>, Partial<Typography> {}

const Title: FC<TitleProps> = (props) => (
  <h1 className={`text-4xl text-${props.textColor && "purplish-blue"} font${props.textWeight && "normal"}`} {...props} />
);

export default Title;
