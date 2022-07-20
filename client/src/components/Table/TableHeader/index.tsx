import { theme } from "styles";
import * as C from "@chakra-ui/react";
import * as S from "./styles";

export type TableHeaderProps<T, K extends keyof T> = {
  columns: ColumnDefinitionType<T, K>[];
};

export const TableHeader = <T, K extends keyof T>({
  columns,
}: TableHeaderProps<T, K>): JSX.Element => {
  const isDesktop = C.useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

  const headers = columns.map((column) => {
    return (
      <S.TableHeaderCell key={column.key.toString()} isNumber={column.isNumber}>
        {column.title}
      </S.TableHeaderCell>
    );
  });

  return (
    <>
      {isDesktop && (
        <S.TableHeader>
          <S.TableHeaderRow>{headers}</S.TableHeaderRow>
        </S.TableHeader>
      )}
    </>
  );
};
