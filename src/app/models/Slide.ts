import Resource from './Resource';

export default class Slide extends Resource implements ISlide {
  title: string;
  content: string;

  constructor(data: Partial<Slide>) {
    super(data);
  }
}
