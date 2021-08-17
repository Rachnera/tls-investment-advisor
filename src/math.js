/**
 * Extra New Givini points:
 * - +1 each phase from New Givini Trade
 * - +1 from informing Givino Vinai equipment shop girl of succubus floor of teahouse
 * - +2 for choosing New Givini in the merchants dispute OR +1 if choosing a neutral compromise
 * - +2 for choosing New Givini as the recipient of the magical items requisitioned in Lady Entila's warehouse
 * - +1 for speaking with the king in the ball during the Ardan succession crisis
 *
 * Work hypothesis: +6 for first phase, +1 for second
 */

/**
 * Lexicographic method
 *
 * a    ab    abc
 *            abd
 *      ac    acd
 *      ad
 * b    bc    bcd
 * b    bd
 * c    cd
 * d
 */

import allInvestments from './investments';

const specialInvestments = allInvestments.filter(
  ({ profits }) => typeof profits === 'function'
);

export const combinations = (investments, maxPrice = Infinity) => {
  if (investments.length === 0) {
    return [[]];
  }

  const sortedInvestments = [...investments].sort(
    ({ price: a = 0 }, { price: b = 0 }) => {
      return b - a;
    }
  );

  let cheaperThan = {};
  for (let i = 0; i < sortedInvestments.length; i++) {
    cheaperThan[sortedInvestments[i]['name']] = sortedInvestments.slice(i + 1);
  }

  let results = [[], ...sortedInvestments.map((investment) => [investment])];

  let resultPerSize = [];

  resultPerSize[0] = [{ invs: [], cost: 0 }];
  resultPerSize[1] = sortedInvestments.map((investment) => {
    return { invs: [investment], cost: investment.price };
  });

  for (let s = 2; s <= investments.length; s++) {
    resultPerSize[s] = [];

    const prefixes = resultPerSize[s - 1];
    for (let i = 0; i < prefixes.length; i++) {
      const { invs, cost } = prefixes[i];

      const lastName = invs[invs.length - 1]['name'];
      const suffixes = cheaperThan[lastName];
      for (let j = 0; j < suffixes.length; j++) {
        const inv = suffixes[j];
        const totalCost = cost + inv.price;

        if (totalCost > maxPrice) {
          continue;
        }

        const candidate = [...invs, inv];
        resultPerSize[s].push({ invs: candidate, cost: totalCost });
        results.push(candidate);
      }
    }
  }

  return results;
};

const comp = (value, context) => {
  if (typeof value === 'function') {
    return value(context);
  }
  return value || 0;
};

export const combine = (investments, context = {}) => {
  const updatedContext = {
    ...context,
    investments,
  };

  let price = 0;
  let profits = 0;
  let social = 0;
  let computedInvestments = [];

  investments.forEach((investment) => {
    const invProfits = comp(investment.profits, updatedContext);

    price += investment.price;
    profits += invProfits;
    social += investment.social || 0;
    computedInvestments.push({
      ...investment,
      profits: invProfits,
    });
  });

  specialInvestments.forEach((specialInv) => {
    if (context?.previousInvestments?.includes(specialInv.name)) {
      profits +=
        specialInv.profits(updatedContext) -
        specialInv.profits({ ...updatedContext, investments: [] });
    }
  });

  return {
    price,
    profits,
    social,
    investments: computedInvestments,
  };
};

export const isBetter = ({ current, candidate, money, social }) => {
  if (candidate.price > money || candidate.social < social) {
    return false;
  }

  return (
    candidate.profits > current.profits ||
    (candidate.profits === current.profits && candidate.price < current.price)
  );
};

export const best = ({ money, investments, context = {}, social = 0 }) => {
  let result = {
    price: 0,
    profits: 0,
    social: 0,
    investments: [],
  };

  combinations(investments, money).forEach((comb) => {
    const candidate = combine(comb, context);
    if (isBetter({ current: result, candidate, money, social })) {
      result = candidate;
    }
  });

  return result;
};

export const buildParams = ({
  money,
  previousInvestments = [],
  social = 0,
  ...misc
}) => {
  const context = {
    ...misc,
    previousInvestments,
  };

  return {
    money,
    social,
    investments: allInvestments
      .filter(({ name }) => !previousInvestments.includes(name))
      .map((investment) => {
        return {
          ...investment,
          price: comp(investment.price, context),
        };
      }),
    context,
  };
};

export const finest = (params) => {
  return best(buildParams(params));
};
