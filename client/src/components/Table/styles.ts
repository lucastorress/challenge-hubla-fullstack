import styled from "@emotion/styled";
import { theme } from "styles";

export const Table = styled.table`
  border: 1px solid ${theme.colors.gray[700]};
  border-collapse: separate;
  border-spacing: 0;
  font-size: 12px;
  width: 100%;

  ${theme.breakpoints.inMediumScreen} {
    display: flex;
  }
`;
