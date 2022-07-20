import styled from "@emotion/styled";
import { theme } from "styles";

export const TableRow = styled.tr<{ isClickable?: boolean }>`
  cursor: ${({ isClickable }) => (isClickable ? "pointer" : "default")};
  transition: background-color 0.2s ease-in-out;
  border: 0;

  &:hover {
    &:last-child {
      border-radius: ${({ isClickable }) => (isClickable ? "8px" : 0)};
    }
    background: ${({ isClickable }) =>
      isClickable ? theme.colors.gray[600] : "inherit"};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    display: flex;
    flex-direction: column;

    &:not(:last-child) {
      border-bottom: 1px solid ${theme.colors.blue[400]};
    }
  }
`;

export const TableBody = styled.tbody`
  @media (max-width: ${theme.breakpoints.sm}) {
    flex: 1;
  }
`;

export const TableDataCell = styled.td<NumberProps>`
  padding: 24px 32px;
  text-align: left;

  @media (max-width: ${theme.breakpoints.sm}) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    border-bottom: 1px solid theme.colors.gray[600];
    text-align: left;

    &:last-child {
      border-bottom: none;
    }
  }

  ${theme.breakpoints.inMediumScreen} {
    padding: 16px 24px;
  }
`;

export const MobileTableHeader = styled.span`
  color: theme.colors.gray[400];
  font-weight: bold;
`;
