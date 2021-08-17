import { useState } from 'react';
import Loading from './Loading';
import Disclaimer from './Disclaimer';
import Form from './Form';

const onFinish = async ({
  values: {
    previous = [],
    remainingPron,
    baseProfit,
    strategy,
    startingSocial,
    ...misc
  },
  workerInstance,
  setLoading,
  setCombinationsCount,
  setProgress,
}) => {
  setLoading(true);

  const params = {
    previousInvestments: previous,
    money: remainingPron + baseProfit,
    social: strategy === 'social' ? 40 - startingSocial : 0,
    giviniStart: 17 + previous.includes("Min's Trade Route"),
    giviniExtra: 6, // FIXME Approximate for now for simplicity's sake, but this value is interconnected with social
    ...misc,
  };

  const combinationsCount = await workerInstance.prepare(params);
  setCombinationsCount(combinationsCount);
  setProgress(0);
  const batchSize = 10000;
  let result;
  for (let i = 0; i < Math.ceil(combinationsCount / batchSize); i++) {
    const end = Math.min((i + 1) * batchSize, combinationsCount);
    result = await workerInstance.process(i * batchSize, end);
    setProgress(end / combinationsCount);
  }

  console.log(result);

  setLoading(false);
  setCombinationsCount(undefined);
  setProgress(undefined);
};

const FirstRound = ({ workerInstance }) => {
  const [loading, setLoading] = useState(false);
  const [combinationsCount, setCombinationsCount] = useState();
  const [progress, setProgress] = useState();

  if (!workerInstance) {
    return null;
  }

  return (
    <>
      <Disclaimer />
      <Form
        onFinish={(values) => {
          onFinish({
            values,
            setLoading,
            setCombinationsCount,
            setProgress,
            workerInstance,
          });
        }}
        loading={loading}
      />
      {loading && (
        <Loading combinationsCount={combinationsCount} progress={progress} />
      )}
    </>
  );
};

export default FirstRound;
