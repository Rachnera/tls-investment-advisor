import './App.css';
import FirstRound from './first-round';
import { useEffect, useState } from 'react';
import worker from 'workerize-loader!./worker'; // eslint-disable-line import/no-webpack-loader-syntax
import Disclaimer from './Disclaimer';
import Loading from './Loading';
import Failure from './Failure';
import SecondRound from './second-round';
import ThirdRound from './third-round';

let dumbCache = {};
const dumbKey = (params) => JSON.stringify(params);

const buildRunInWorker =
  ({
    workerInstance,
    setLoading,
    setCombinationsCount,
    setProgress,
    setInvestmentsCount,
    setPreprogress,
  }) =>
  async (params) => {
    const cacheKey = dumbKey(params);
    if (!!dumbCache[cacheKey]) {
      return dumbCache[cacheKey];
    }

    setLoading(true);

    const investmentsCount = await workerInstance.prepare(params);
    setInvestmentsCount(investmentsCount);
    setPreprogress(0);
    let combinationsCount = 0;
    for (let i = 0; i <= investmentsCount; i++) {
      combinationsCount += await workerInstance.preprocess();
      setPreprogress(i / investmentsCount);
    }

    setCombinationsCount(combinationsCount);
    setProgress(0);
    const batchSize = 10000;
    let result;
    for (let i = 0; i < Math.ceil(combinationsCount / batchSize); i++) {
      const end = Math.min((i + 1) * batchSize, combinationsCount);
      result = await workerInstance.process(i * batchSize, end);
      setProgress(end / combinationsCount);
    }

    await workerInstance.clean();

    setLoading(false);
    setCombinationsCount(undefined);
    setInvestmentsCount(undefined);
    setProgress(0);
    setPreprogress(0);

    dumbCache[cacheKey] = result;

    return result;
  };

const App = () => {
  const [workerInstance, setWorkerInstance] = useState();
  const [loading, setLoading] = useState(false);
  const [combinationsCount, setCombinationsCount] = useState();
  const [progress, setProgress] = useState(0);
  const [investmentsCount, setInvestmentsCount] = useState();
  const [preprogress, setPreprogress] = useState(0);

  const [firstRoundResult, setFirstRoundResult] = useState();
  const [secondRoundResult, setSecondRoundResult] = useState();
  const [thirdRoundResult, setThirdRoundResult] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (!workerInstance) {
      setWorkerInstance(worker());
    }

    return () => {
      workerInstance?.terminate();
    };
  }, [workerInstance]);

  if (!workerInstance) {
    return null;
  }

  const runInWoker = buildRunInWorker({
    workerInstance,
    setLoading,
    setCombinationsCount,
    setProgress,
    setInvestmentsCount,
    setPreprogress,
  });

  const abort = async () => {
    workerInstance.terminate();

    const newWorkerInstance = worker();
    await newWorkerInstance.clean();

    setWorkerInstance(newWorkerInstance);

    setCombinationsCount(undefined);
    setInvestmentsCount(undefined);
    setProgress(0);
    setPreprogress(0);

    setLoading(false);
  };

  return (
    <div>
      <Disclaimer />
      <FirstRound
        runInWoker={runInWoker}
        loading={loading}
        result={firstRoundResult}
        setResult={(data) => {
          setSecondRoundResult(undefined);
          setThirdRoundResult(undefined);
          setFirstRoundResult(data);
        }}
        setError={(error) => {
          setSecondRoundResult(undefined);
          setThirdRoundResult(undefined);
          setError(error);
        }}
      />
      {firstRoundResult && (
        <SecondRound
          runInWoker={runInWoker}
          loading={loading}
          result={secondRoundResult}
          setResult={(data) => {
            setThirdRoundResult(undefined);
            setSecondRoundResult(data);
          }}
          setError={(error) => {
            setThirdRoundResult(undefined);
            setError(error);
          }}
          firstRoundResult={firstRoundResult}
        />
      )}
      {firstRoundResult && secondRoundResult && (
        <ThirdRound
          firstRoundResult={firstRoundResult}
          secondRoundResult={secondRoundResult}
          runInWoker={runInWoker}
          loading={loading}
          setResult={setThirdRoundResult}
          setError={setError}
          result={thirdRoundResult}
        />
      )}
      {loading && (
        <Loading
          combinationsCount={combinationsCount}
          progress={progress}
          preprogress={preprogress}
          investmentsCount={investmentsCount}
          abort={abort}
        />
      )}
      {error && <Failure message={error} />}
    </div>
  );
};

export default App;
