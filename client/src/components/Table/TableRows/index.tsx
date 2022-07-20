import React from "react";
import { theme } from "styles";
import * as C from "@chakra-ui/react";
import * as S from "./styles";

type TableRowsProps<T, K extends keyof T> = {
  data: T[];
  columns: ColumnDefinitionType<T, K>[];
  customRenderers?: CustomRenderers<T>;
  isClickable?: boolean;
  clickableKey: string | number;
  onClickAtRow?: (id: string | number) => void;
};

export const TableRows = <T, K extends keyof T>({
  data,
  columns,
  customRenderers,
  isClickable,
  clickableKey,
  onClickAtRow = () => {},
}: TableRowsProps<T, K>): JSX.Element => {
  const customRenderer = Object.keys(customRenderers || []);

  const isDesktop = C.useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

  const rows = data.map((row, rowIdx) => {
    return (
      <S.TableRow
        isClickable={isClickable}
        key={`row-${rowIdx}`}
        onClick={() => (isClickable ? onClickAtRow(row[clickableKey]) : {})}
      >
        {columns.map((column, colIdx) => {
          const customComponent = customRenderers?.[column.key];

          const isCustom =
            !!customComponent && customRenderer.includes(column.key.toString());

          if (isCustom) {
            return (
              <S.TableDataCell
                key={`${column.key.toString()}-${colIdx}`}
                isNumber={column.isNumber}
              >
                {!isDesktop && (
                  <S.MobileTableHeader>{column.title}</S.MobileTableHeader>
                )}
                {customComponent(row)}
              </S.TableDataCell>
            );
          }

          return (
            <S.TableDataCell
              key={`${column.key.toString()}-${colIdx}`}
              isNumber={column.isNumber}
            >
              {!isDesktop && (
                <S.MobileTableHeader>{column.title}</S.MobileTableHeader>
              )}
              {row[column.key]}
            </S.TableDataCell>
          );
        })}
      </S.TableRow>
    );
  });

  return <S.TableBody>{rows}</S.TableBody>;
};
