import { FC, HTMLAttributes } from "react";
import Typography from "../../../interfaces/typography.interface";

interface PhraseProps extends HTMLAttributes<HTMLSpanElement>, Partial<Typography> {}

const Phrase: FC<PhraseProps> = ({ textWeight = "normal", textColor = "purplish-blue", ...props }) => (
  <span className={`text-sm text-${textColor} font-${textWeight}`} {...props} />
);

export default Phrase;
