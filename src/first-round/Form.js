import {
  Form,
  Select,
  InputNumber,
  Button,
  Card,
  Checkbox,
  Typography,
  Divider,
} from 'antd';
import { useEffect, useState } from 'react';
import Banned from '../components/form/Banned';
import Mandatory from '../components/form/Mandatory';
import Extra from '../components/form/Extra';

const { Title } = Typography;

const possiblePrevious = [
  'New Givini Trade',
  "Tak'Kan Trade",
  'Chalice States Trade',
  "Min's Trade Route",
  'Yhilini Succubi Trade',
  'Yhilini Bank Core Lender',
  'Mercenary Offices',
  'Theltiar Rentals',
  'Theltiar Flowhouse',
  'Denmiel Mushrooms',
  'Denmiel Archives',
  'Eustrin Guild',
  'Gasm Falls Trade',
  'Premium Steel Owner',
  'Ivalan Bank',
  'Mercenary Flotilla',
  'Sanitation Mages Guild',
  'Crystal Refiner',
  'Ardford Restaurant',
];

const initialValues = {
  previous: [
    'Premium Steel Owner',
    'New Givini Trade',
    "Tak'Kan Trade",
    'Chalice States Trade',
    "Min's Trade Route",
    'Yhilini Succubi Trade',
    'Eustrin Guild',
    'Denmiel Mushrooms',
    'Ivalan Bank',
    'Crystal Refiner',
    'Ardford Restaurant',
  ],
  remainingPron: 7500,
  baseProfit: 2435000,
  chapter1Steel: false,
  strategy: 'compromise',
  startingSocial: 34,
  chapter3Infrastructure: true,
  merchantSolution: 'wait',
  jhenno: 'religion',
  magicalItems: 'givini',
  mandatory: ['Givini Orc Merchant', 'Bank of Givini', 'Bank of Stineford'],
  research: 'orc',
  banned: [],
  spending: 0,
  chapter1Bank: true,
  chapter1x2Tower: true,
  chapter3Armorer: true,
  chapter3Tradesmasher: true,
  trades: ['givini', 'takkan', 'chalice'],
  eustrinEmbassy: 300000,
};

const toSelectOptions = (list) => {
  return [...list].sort().map((value) => {
    return {
      label: value,
      value: value,
    };
  });
};

const requiredRule = { required: true, message: `Please provide a value.` };

const CustomForm = ({ onFinish, loading }) => {
  const [form] = Form.useForm();

  const [previous, setPrevious] = useState(initialValues.previous);
  const [mandatory, setMandatory] = useState(initialValues.mandatory);
  const [strategy, setStrategy] = useState(initialValues.strategy);

  useEffect(() => {
    if (['social', 'succession'].includes(strategy)) {
      if (form.getFieldValue('merchantSolution') === 'wait') {
        form.setFieldsValue({ merchantSolution: 'neutral' });
      }
      return;
    }

    if (form.getFieldValue('merchantSolution') === 'neutral') {
      form.setFieldsValue({ merchantSolution: 'wait' });
    }
  }, [form, strategy]);

  return (
    <Form
      initialValues={initialValues}
      onFinish={onFinish}
      onValuesChange={(_, allValues) => {
        setPrevious(allValues.previous);
        setMandatory(allValues.mandatory);
        setStrategy(allValues.strategy);
      }}
      className="round-form first-round-form"
      form={form}
    >
      <div className="past-block">
        <Title level={2}>{`Chapters 1-3`}</Title>
        <Card>
          <div className="numbers">
            <Form.Item
              label={`ProN remaining at the end of chapter 3`}
              name="remainingPron"
              tooltip={`In the Calculator, go to "War Investment Phase" and copy the value next to "ProN available".`}
              rules={[requiredRule]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label={`Total profit at the start of chapter 4`}
              name="baseProfit"
              tooltip={`In the Calculator, go to "First Tower Run and Investment and copy the value next to "Total ProN Return".`}
              rules={[requiredRule]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label={`Social standing at the start of chapter 4`}
              name="startingSocial"
              tooltip={`In the Calculator, go to "War Investment Phase" and copy the value next to "Social Score".`}
              rules={[requiredRule]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label={`Price of the Aram Eustrin Embassy`}
              name="eustrinEmbassy"
              tooltip={`In the Calculator, search for "Aram's Eustrin Embassy" and copy-paste the given prince here.`}
              rules={[requiredRule]}
            >
              <InputNumber />
            </Form.Item>
          </div>

          <Form.Item
            label={`Investments already bought during chapters 2/3`}
            name="previous"
          >
            <Select
              options={toSelectOptions(possiblePrevious)}
              mode="multiple"
            />
          </Form.Item>

          <div className="checkboxes">
            <Form.Item name="chapter1x2Tower" valuePropName="checked">
              <Checkbox>{`You visited the Stineford Succubus Tower during chapter 1/2.`}</Checkbox>
            </Form.Item>
            {!previous.includes('Premium Steel Owner') && (
              <Form.Item name="chapter1Steel" valuePropName="checked">
                <Checkbox>{`You invested 20,000 ProN in Premium Steel during chapter 1.`}</Checkbox>
              </Form.Item>
            )}
            {!previous.includes('Yhilini Bank Core Lender') && (
              <Form.Item name="chapter1Bank" valuePropName="checked">
                <Checkbox>{`You invested in the Yhilin Bank during chapter 1.`}</Checkbox>
              </Form.Item>
            )}
            {!(
              previous.includes('Yhilini Succubi Trade') &&
              previous.includes('Mercenary Offices')
            ) && (
              <Form.Item name="chapter3Infrastructure" valuePropName="checked">
                <Checkbox>{`You funded Yhilin Infrastructure during chapter 3.`}</Checkbox>
              </Form.Item>
            )}
            <Form.Item name="chapter3Armorer" valuePropName="checked">
              <Checkbox>{`You visited the Succubus Armorer during chapter 3.`}</Checkbox>
            </Form.Item>
            <Form.Item name="chapter3Tradesmasher" valuePropName="checked">
              <Checkbox>{`You met Tradesmasher during chapter 3.`}</Checkbox>
            </Form.Item>
          </div>
        </Card>
      </div>

      <Title level={2}>{`Chapter 4 – Round 1`}</Title>
      <Card title={`Strategy`}>
        <Form.Item name="strategy" label={`Succession crisis`}>
          <Select
            options={[
              {
                label: `Focus on profits; do only the bare minimum for the Ardan succession crisis (New Givini ≥ 25).`,
                value: 'money',
              },
              {
                label: `Reach most thresholds for the Ardan succession crisis while keeping a focus on profits (New Givini ≥ 25, Social ≥ 30).`,
                value: 'compromise',
              },
              {
                label: `Mix profits and social to achieve almost everything in the Ardan succession crisis (New Givini ≥ 25, Social ≥ 40).`,
                value: 'social',
              },
              {
                label: `Go all in on the Ardan succession crisis (New Givini ≥ 25, Social ≥ 40, War Monument or Givini Mage Guild).`,
                value: 'succession',
              },
            ]}
          />
        </Form.Item>
        <div className="selects">
          <Form.Item label={`Merchant dispute`} name="merchantSolution">
            <Select
              options={[
                {
                  value: 'neutral',
                  label: `Neutral compromise (force Social ≥ 40)`,
                },
                {
                  value: 'givini',
                  label: `Favor New Givini`,
                },
                {
                  value: 'wait',
                  label: `Wait`,
                },
              ]}
            />
          </Form.Item>
        </div>
        <div className="selects">
          <Form.Item label={`Research`} name="research">
            <Select
              options={[
                {
                  value: 'orc',
                  label: `Orc Diversification`,
                },
                {
                  value: 'unpeople',
                  label: `Unpeople Transformation`,
                },
                {
                  value: 'purity',
                  label: `Purity Magic`,
                },
                {
                  value: 'defense',
                  label: `Base Defense`,
                },
              ]}
            />
          </Form.Item>
          <Form.Item label={`Jhenno's cooperation`} name="jhenno">
            <Select
              options={[
                {
                  value: 'politics',
                  label: `Politics`,
                },
                {
                  value: 'religion',
                  label: `Religion`,
                },
              ]}
            />
          </Form.Item>
          <Form.Item label={`Rose's house magical items`} name="magicalItems">
            <Select
              options={[
                {
                  value: 'chalice',
                  label: `Chalice States`,
                },
                {
                  value: 'givini',
                  label: `Givini`,
                },
                {
                  value: 'takkan',
                  label: `Tak'Kan`,
                },
              ]}
            />
          </Form.Item>
        </div>

        <Divider />
        <Mandatory
          purchased={previous}
          form={form}
          tooltip={`Forcing a few certain investments can improve performances tremendously.`}
        />
        <Banned
          purchased={[...previous, ...mandatory]}
          form={form}
          tooltip={
            <>
              {`For cases where a particular investment might be more of a curse than a blessing in the long run and you want to see what happens without it.`}
              <br />
              {`Banning an investment that you know to be useless at that particular point can also improve performances quite a bit, especially if said investment is cheap.`}
            </>
          }
        />
        <Extra
          tooltip={`Money to be spent on investments not listed elsewhere, like headquarters upgrades.`}
        />

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {`Submit`}
          </Button>
        </Form.Item>
      </Card>
    </Form>
  );
};

export default CustomForm;
