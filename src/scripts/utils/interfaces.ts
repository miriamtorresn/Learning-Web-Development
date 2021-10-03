export interface IUtils {
  updateHTMLById: (id: string, html :string) => void;
  divideArray: (array: any[], items: number) => any[];
  getURLParam: (param: string) => string;
};