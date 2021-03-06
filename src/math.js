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

import { getInvestments, postGawnfallInvestments } from './data/investments';
import { council } from './data/takkan';

const specialInvestments = postGawnfallInvestments.filter(
  ({ profits }) => typeof profits === 'function'
);

export const buildCheaperThan = (investments, { mandatory = [] }) => {
  const sortedInvestments = investments
    .filter(({ name }) => !mandatory.includes(name))
    .sort(({ price: a = 0 }, { price: b = 0 }) => {
      return b - a;
    });

  let cheaperThan = {};

  const defaultKey = (() => {
    const mandatoryInvestments = investments.filter(({ name }) =>
      mandatory.includes(name)
    );
    if (mandatoryInvestments.length > 0) {
      return mandatoryInvestments[mandatoryInvestments.length - 1]['name'];
    }
    return 'default';
  })();
  cheaperThan[defaultKey] = sortedInvestments.slice(0);

  for (let i = 0; i < sortedInvestments.length; i++) {
    cheaperThan[sortedInvestments[i]['name']] = sortedInvestments.slice(i + 1);
  }

  return cheaperThan;
};

export const combsO = (investments, { mandatory = [], atLeastOne = [] }) => {
  const def = investments.filter(({ name }) => mandatory.includes(name));

  const relevantAtLeastOne =
    atLeastOne.length > 0 &&
    !mandatory.some((name) => atLeastOne.includes(name));
  if (relevantAtLeastOne) {
    return atLeastOne.map((one) => {
      const cb = [...def, investments.find(({ name }) => name === one)];
      return [cb, cb.reduce((acc, { price }) => acc + price, 0)];
    });
  }

  return [[def, def.reduce((acc, { price }) => acc + price, 0)]];
};

export const combsN = ({ combsNMinusOne, maxPrice, cheaperThan }) => {
  let withPrice = [];

  for (let i = 0; i < combsNMinusOne.length; i++) {
    const [invs, cost] = combsNMinusOne[i];

    const lastName = invs[invs.length - 1]?.name || 'default';
    const suffixes = cheaperThan[lastName];
    for (let j = 0; j < suffixes.length; j++) {
      const inv = suffixes[j];
      const totalCost = cost + inv.price;

      if (totalCost > maxPrice) {
        continue;
      }

      withPrice.push([[...invs, inv], totalCost]);
    }
  }

  return withPrice;
};

export const combinations = (investments, options = {}) => {
  const { maxPrice = Infinity, mandatory = [] } = options;

  const cheaperThan = buildCheaperThan(investments, { mandatory });

  let combsNMinusOne = combsO(investments, options);
  let results = [...combsNMinusOne.map((l) => l[0])];
  for (let s = combsNMinusOne[0][0].length; s <= investments.length; s++) {
    combsNMinusOne = combsN({
      combsNMinusOne,
      maxPrice,
      cheaperThan,
    });
    for (let j = 0; j < combsNMinusOne.length; j++) {
      results.push(combsNMinusOne[j][0]);
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
  let givini = 0;
  let takkan = 0;
  let chalice = 0;
  let computedInvestments = [];

  investments.forEach((investment) => {
    const invProfits = comp(investment.profits, updatedContext);
    const chaliceScore = comp(investment.chalice, updatedContext);

    price += investment.price;
    profits += invProfits;
    social += investment.social || 0;
    givini += investment.givini || 0;
    takkan += investment.takkan || 0;
    chalice += chaliceScore;
    computedInvestments.push({
      ...investment,
      profits: invProfits,
      chalice: chaliceScore,
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
    givini,
    takkan,
    chalice,
    investments: computedInvestments,
  };
};

export const isBetter = ({
  current,
  candidate,
  otherRequirements = {},
  context = {},
  money,
}) => {
  const { social = 0, givini = 0, orcCouncil, reserve } = otherRequirements;

  if (candidate.social < social) {
    return false;
  }

  if (candidate.givini < givini) {
    return false;
  }

  if (!!orcCouncil) {
    if (
      council({
        investments: [
          ...(context.previousInvestments || []),
          ...candidate.investments.map(({ name }) => name),
        ],
        takkan: context.takkan + candidate.takkan,
        researches: context.completedResearch,
      }) < orcCouncil
    ) {
      return false;
    }
  }

  if (!!reserve) {
    if (money - candidate.price + candidate.profits < reserve) {
      return false;
    }
  }

  if (!current) {
    return true;
  }

  return (
    candidate.profits > current.profits ||
    (candidate.profits === current.profits && candidate.price < current.price)
  );
};

export const best = ({
  money,
  otherRequirements = {},
  investments,
  context = {},
}) => {
  let result = null;
  const { mandatory = [], atLeastOne = [] } = otherRequirements;

  combinations(investments, { maxPrice: money, mandatory, atLeastOne }).forEach(
    (comb) => {
      const candidate = combine(comb, context);
      if (
        isBetter({
          current: result,
          candidate,
          otherRequirements,
          context,
          money,
        })
      ) {
        result = candidate;
      }
    }
  );

  return result;
};

export const buildParams = ({
  money,
  otherRequirements = {},
  list = 'default',
  ...context
}) => {
  const { previousInvestments = [] } = context;
  const { mandatory = [], atLeastOne = [], banned = [] } = otherRequirements;

  const investmentsList = getInvestments(list);

  return {
    money,
    otherRequirements,
    investments: investmentsList
      .filter(({ name }) => {
        if (previousInvestments.includes(name)) {
          return false;
        }

        if (
          banned.includes(name) &&
          !atLeastOne.includes(name) &&
          !mandatory.includes(name)
        ) {
          return false;
        }

        return true;
      })
      .map((investment) => {
        return {
          ...investment,
          price: comp(investment.price, context),
        };
      })
      .filter(({ price }) => price !== Infinity),
    context,
  };
};

export const finest = (params) => {
  return best(buildParams(params));
};
