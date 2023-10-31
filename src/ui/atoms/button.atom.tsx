import { ButtonHTMLAttributes, FC } from "react";
import Typography from "../../interfaces/typography.interface";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, Partial<Typography> {
  bgColor?: Typography["textColor"] | "transparent";
}

const Button: FC<ButtonProps> = ({ bgColor = "purplish-blue", textWeight = "bold", textColor = "white", ...props }) => (
  <button
    className={`cursor-pointer max-w-lg text-base px-7 py-4 rounded-lg ${
      props.disabled ? "opacity-60" : ""
    } hover:opacity-80 bg-${bgColor} text-${textColor} font-${textWeight}`}
    {...props}
  />
);

export default Button;
