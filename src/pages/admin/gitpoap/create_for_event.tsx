import { useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import type { NextPage } from 'next';
import Head from 'next/head';
import { HiPlus } from 'react-icons/hi';
import { Checkbox, Grid, Group } from '@mantine/core';
import { Input, Button, NumberInput, Header } from '../../../components/shared/elements';
import { Divider } from '../../../components/shared/elements';
import { useAuthContext } from '../../../components/github/AuthContext';
import { DateTime } from 'luxon';
import { DateInput } from '../../../components/shared/elements/DateInput';
import { EventCreateRow } from '../../../components/admin/EventCreateRow';
import { ConnectGitHub } from '../../../components/admin/ConnectGitHub';

const FormInput = styled(Input)`
  width: ${rem(400)};
  margin-bottom: ${rem(20)};
`;

const FormNumberInput = styled(NumberInput)`
  width: ${rem(150)};
  margin-bottom: ${rem(20)};
`;

const FormDatePicker = styled(DateInput)`
  width: ${rem(200)};
  margin-bottom: ${rem(20)};
`;

const CreateGitPOAP: NextPage = () => {
  const { isLoggedIntoGitHub } = useAuthContext();
  /* Form Seed Values */
  const [eventName, setEventName] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(DateTime.local().toJSDate());
  const [endDate, setEndDate] = useState<Date | null>(DateTime.local().toJSDate());
  const [expiry, setExpiry] = useState<Date | null>(DateTime.local(2023, 4, 1).toJSDate());
  const [codeCount, setCodeCount] = useState<number>(10);
  const [rowCount, setRowCount] = useState<number>(1);
  const [hasYear, setHasYear] = useState<boolean>(true);

  return (
    <div>
      <Head>
        <title>{'Create GitPOAPs for Events | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Frontend App" />
      </Head>
      <Grid justify="center" style={{ marginTop: rem(20) }}>
        <Grid.Col xs={10} sm={10} md={10} lg={12}>
          {isLoggedIntoGitHub ? (
            <Group direction="row" position="center">
              <Group direction="column">
                <Header style={{ alignSelf: 'start' }}>
                  {'Admin - Create new Event GitPOAPs'}
                </Header>

                <Group position="apart" style={{ width: '100%' }}>
                  <Header style={{ alignSelf: 'start', fontSize: rem(24) }}>
                    {'Enter values below to automatically generate values in the form'}
                  </Header>
                  <Button
                    leftIcon={<HiPlus size={18} />}
                    onClick={() => setRowCount(rowCount + 1)}
                    style={{ marginTop: rem(20) }}
                  >
                    {'Add Row '}
                  </Button>
                </Group>

                <Group>
                  <Group>
                    <FormInput
                      required
                      label={'Event Name'}
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                    />
                    <FormNumberInput
                      required
                      label={'Requested Codes'}
                      name={'numRequestedCodes'}
                      placeholder={'10'}
                      hideControls
                      value={codeCount}
                      onChange={(e) => setCodeCount(e!)}
                    />
                  </Group>
                  <Group>
                    <FormDatePicker
                      required
                      label={'Event Start Date'}
                      name={'startDate'}
                      value={startDate}
                      onChange={(startDate) => setStartDate(startDate)}
                    />
                    <FormDatePicker
                      required
                      label={'Event End Date'}
                      name={'endDate'}
                      value={endDate}
                      onChange={(endDate) => setEndDate(endDate)}
                    />
                    <FormDatePicker
                      required
                      label={'POAP Expiration Date'}
                      name={'expiryDate'}
                      value={expiry}
                      onChange={(date) => setExpiry(date)}
                    />
                    <Checkbox
                      mt="md"
                      label="Include year?"
                      checked={hasYear}
                      onChange={() => setHasYear(!hasYear)}
                    />
                  </Group>
                </Group>
                <Divider style={{ width: '100%', marginTop: rem(10), marginBottom: rem(10) }} />

                {[...Array(rowCount)].map((_, index) => {
                  return (
                    <EventCreateRow
                      key={index}
                      rowNumber={index + 1}
                      eventName={eventName}
                      eventStartDate={startDate}
                      eventEndDate={endDate}
                      expiry={expiry}
                      codeCount={codeCount}
                      hasYear={hasYear}
                    />
                  );
                })}
              </Group>
            </Group>
          ) : (
            <ConnectGitHub />
          )}
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default CreateGitPOAP;
