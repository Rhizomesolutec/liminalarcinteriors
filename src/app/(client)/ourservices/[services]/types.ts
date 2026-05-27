interface Review {
  name: string;
  text: string;
}

interface ServiceCategory {
  [key: string]: string[] | undefined; // For sub-categories like "Garden Design"
}

interface ImageData {
  image: string[];
}

interface BodyText {
  body: string;
}

interface Gnarig {
  gnarig?: Review[]; // Made 'gnarig' optional
}

export type ServiceArray = [ServiceCategory, ImageData, BodyText, Gnarig];

export interface Data {
  [key: string]: ServiceArray;
}