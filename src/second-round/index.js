import Form from './Form';
import { buildFinalStandings } from '../misc';
import Result from './results';
import { roundTwoValue as giviniRoundTwoValue } from '../data/givini';
import { price as headquartersPrice } from './Headquarters';
import { roundTwoValue as takkanRoundTwoValue } from '../data/takkan';
import { Typography } from 'antd';
import ScrollTo from '../results/ScrollTo';
import { roundTwoValue as chaliceRoundTwoValue } from '../data/chalice';

const { Title } = Typography;

const shadowBans = ['Aram Eustrin Embassy'];

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

  const {
    merchantSolution2,
    headquarters,
    orcCouncil,
    mandatory,
    banned,
    research,
    spending,
  } = values;
  const decisions = { merchantSolution2, headquarters, orcCouncil, research };

  const [military, magic] = decisions.headquarters
    .split('/')
    .map((x) => parseInt(x));
  const headquartersUpgradesPrice = headquartersPrice({
    research: firstRoundResult.decisions.research,
    military,
    magic,
  });

  const pronNote = 2500;

  const nonInvestmentChangesList = [
    {
      name: `Headquarters upgrades`,
      money: -headquartersUpgradesPrice,
    },
    !!spending && {
      name: `Other spending`,
      money: -spending,
    },
    {
      name: `Tower's chest ProN note`,
      money: pronNote,
    },
  ].filter(Boolean);

  const nonInvestmentChanges = {
    money: nonInvestmentChangesList.reduce(
      (acc, { money = 0 }) => acc + money,
      0
    ),
    profits: 0,
    social: 0,
    givini: giviniRoundTwoValue(decisions, initialStandings.investments),
    takkan: takkanRoundTwoValue(decisions, initialStandings.investments),
    chalice: chaliceRoundTwoValue(decisions, initialStandings.investments),
    list: nonInvestmentChangesList,
  };

  const params = {
    ...misc,
    previousInvestments: initialStandings.investments,
    money:
      initialStandings.money +
      initialStandings.profits +
      (nonInvestmentChanges.money - pronNote),
    giviniStart: initialStandings.givini,
    giviniExtra: nonInvestmentChanges.givini,
    takkan: initialStandings.takkan,
    completedResearch: [firstRoundResult.decisions.research],
    otherRequirements: {
      social: socialRequirement(initialStandings.social, decisions),
      orcCouncil: decisions.orcCouncil,
      mandatory,
      banned: [...shadowBans, ...banned],
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
  setError(undefined);
};

const SecondRound = ({
  runInWoker,
  loading,
  result,
  setResult,
  setError,
  firstRoundResult,
}) => {
  return (
    <div className="round-two">
      <Title level={2}>{`Chapter 4 – Round 2`}</Title>
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
        purchasedInvestments={firstRoundResult.finalStandings.investments}
      />
      <ScrollTo data={result}>
        <Result roundOneDecisions={firstRoundResult.decisions} {...result} />
      </ScrollTo>
    </div>
  );
};

export default SecondRound;
