import React from "react";
import * as S from "./styles";
import { TableHeader } from "./TableHeader";
import { TableRows } from "./TableRows";

type TableProps<T, K extends keyof T> = {
  data: T[];
  columns: ColumnDefinitionType<T, K>[];
  customRenderers?: CustomRenderers<T>;
  isClickable?: boolean;
  clickableKey?: string | number;
  onClickAtRow?: (id: string | number) => void;
};

export const Table = <T, K extends keyof T>({
  data,
  columns,
  customRenderers,
  isClickable = false,
  clickableKey = "id",
  onClickAtRow,
}: TableProps<T, K>): JSX.Element => {
  return (
    <S.Table>
      <TableHeader columns={columns} />
      <TableRows
        data={data}
        customRenderers={customRenderers}
        columns={columns}
        isClickable={isClickable}
        clickableKey={clickableKey}
        onClickAtRow={onClickAtRow}
      />
    </S.Table>
  );
};
