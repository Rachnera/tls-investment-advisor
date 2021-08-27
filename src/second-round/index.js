import Form from './Form';
import { buildFinalStandings } from '../misc';
import Result from './results';
import { roundTwoValue as giviniRoundTwoValue } from '../data/givini';
import { price as headquartersPrice } from './Headquarters';
import { roundTwoValue as takkanRoundTwoValue } from '../data/takkan';

const socialRequirement = (initialSocial, decisions) => {
  if (decisions.merchantSolution2 === 'neutral' && initialSocial < 40) {
    return 40 - initialSocial;
  }

  return 0;
};

const onFinish = async ({
  setResult,
  runInWoker,
  setError,
  firstRoundResult,
  values,
}) => {
  const { finalStandings: initialStandings, misc } = firstRoundResult;

  const { merchantSolution2, headquarters } = values;
  const decisions = { merchantSolution2, headquarters };

  const headquartersUpgradesPrice = headquartersPrice({
    research: firstRoundResult.decisions.research,
    extra: decisions.headquarters === 'extra',
  });

  const nonInvestmentChanges = {
    money: -headquartersUpgradesPrice,
    profits: 0,
    social: 0,
    givini: giviniRoundTwoValue(decisions),
    takkan: takkanRoundTwoValue(),
    list: [
      {
        name: `Headquarters upgrades`,
        price: -headquartersUpgradesPrice,
      },
    ],
  };

  const giviniStart = initialStandings.givini;
  const giviniExtra = nonInvestmentChanges.givini;

  const params = {
    ...misc,
    previousInvestments: initialStandings.investments,
    money:
      initialStandings.money +
      initialStandings.profits -
      headquartersUpgradesPrice,
    giviniStart,
    giviniExtra,
    otherRequirements: {
      social: socialRequirement(initialStandings.social, decisions),
    },
  };

  const result = await runInWoker(params);

  if (!result) {
    setResult(undefined);
    setError(
      `Couldn't find a working combination of investments for that strategy with these starting values, sorry.`
    );
    return;
  }

  const investmentChanges = { ...result, money: -result.price };

  setResult({
    initialStandings,
    decisions,
    nonInvestmentChanges,
    investmentChanges,
    finalStandings: buildFinalStandings({
      initialStandings,
      nonInvestmentChanges,
      investmentChanges,
    }),
    misc,
  });
};

const FirstRound = ({
  runInWoker,
  loading,
  result,
  setResult,
  setError,
  firstRoundResult,
}) => {
  return (
    <>
      <Form
        onFinish={(values) => {
          onFinish({
            setResult,
            runInWoker,
            setError,
            firstRoundResult,
            values,
          });
        }}
        loading={loading}
        firstRoundDecisions={firstRoundResult.decisions}
      />
      {result && (
        <Result roundOneDecisions={firstRoundResult.decisions} {...result} />
      )}
    </>
  );
};

export default FirstRound;
