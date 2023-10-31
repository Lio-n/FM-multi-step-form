import { FC, HTMLAttributes } from "react";
import Typography from "../../../interfaces/typography.interface";

interface PhraseProps extends HTMLAttributes<HTMLSpanElement>, Partial<Typography> {}

const Phrase: FC<PhraseProps> = (props) => (
  <span className={`text-sm text-${props.textColor && "purplish-blue"} font-${props.textWeight && "normal"}`} {...props} />
);

export default Phrase;
