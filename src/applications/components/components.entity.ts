// Сущность компонента. Не класс и не объект, просто тип.
// Бизнес-логика как таковая отсутствует
export type ComponentType = {
  id?: number;
  name: string;
  concentration: number;
}