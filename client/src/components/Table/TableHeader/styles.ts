import styled from "@emotion/styled";
import { theme } from "styles";

export const TableHeader = styled.thead``;

export const TableHeaderCell = styled.th<NumberProps>`
  color: ${theme.colors.gray[300]};
  border-bottom: 1px solid ${theme.colors.gray[700]};
  padding: 24px 32px;
  background: ${theme.colors.gray[700]};
  text-align: left;

  ${theme.breakpoints.inMediumScreen} {
    padding: 16px 24px;
  }
`;

export const TableHeaderRow = styled.tr`
  @media (max-width: ${theme.breakpoints.sm}) {
    display: flex;
    flex-direction: column;
  }
`;
