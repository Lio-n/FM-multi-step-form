type TextColor = {
  "marine-blue": string;
  "light-gray": string;
  white: string;
  "purplish-blue": string;
  "strawberry-red": string;
};

type TextWeight = {
  normal: string; // font-normal
  medium: string; // font-medium
  bold: string; // font-bold
};

interface Typography {
  textColor: keyof TextColor;
  textWeight: keyof TextWeight;
}

export default Typography;
