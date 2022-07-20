declare type NumberProps = {
  isNumber?: boolean;
};

declare type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  title: string;
  isNumber?: boolean;
};

declare type CustomRenderers<T> = Partial<
  Record<keyof T, (it: T) => ReactNode>
>;
