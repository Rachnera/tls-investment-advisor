import { Alert } from 'antd';

const Disclaimer = () => {
  return (
    <Alert
      message={`Assumptions`}
      description={
        <>
          <span>{`This tool takes for granted that:`}</span>
          <ol>
            <li>{`The Succubus Tower was visited during chapter 1.`}</li>
            <li>{`Tradesmasher and the Succubus Armorer were met during chapter 3.`}</li>
            <li>{`New Givini Trade was bought at the end of chapter 3.`}</li>
            <li>{`Chapter 3 in general was good enough for Yhilin to reach its final state during the first investment phase of Chapter 4.`}</li>
            <li>{`Chapter 3 in general and the war in particular were good enough for all petitions favorable to Givini to appear.`}</li>
            <li>{`All such petitions were approved.`}</li>
          </ol>
        </>
      }
      type="info"
      showIcon
    />
  );
};

export default Disclaimer;
