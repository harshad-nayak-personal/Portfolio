import {Holding, HoldingWithComputedValues} from './types';

const roundToTwoDecimalPlaces = (num: number) => {
  return parseFloat(num.toFixed(3));
};

export const calculateHoldingValues = (
  holdings: Holding[],
): HoldingWithComputedValues[] => {
  return holdings.map(holding => {
    const currentValue = roundToTwoDecimalPlaces(
      holding.ltp * holding.quantity,
    );
    const investmentValue = roundToTwoDecimalPlaces(
      holding.avgPrice * holding.quantity,
    );
    const pnl = roundToTwoDecimalPlaces(currentValue - investmentValue);
    return {
      ...holding,
      currentValue,
      investmentValue,
      pnl,
    };
  });
};

export const calculatePortfolioSummary = (
  holdings: HoldingWithComputedValues[],
) => {
  const totalCurrentValue = roundToTwoDecimalPlaces(
    holdings.reduce((total, holding) => total + holding.currentValue, 0),
  );
  const totalInvestmentValue = roundToTwoDecimalPlaces(
    holdings.reduce((total, holding) => total + holding.investmentValue, 0),
  );
  const totalPNL = roundToTwoDecimalPlaces(
    totalCurrentValue - totalInvestmentValue,
  );
  const todayPNL = roundToTwoDecimalPlaces(
    holdings.reduce(
      (total, holding) =>
        total + (holding.close - holding.ltp) * holding.quantity,
      0,
    ),
  );

  return {
    totalCurrentValue,
    totalInvestmentValue,
    totalPNL,
    todayPNL,
  };
};
