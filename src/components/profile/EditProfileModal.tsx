import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Modal, Center } from '@mantine/core';
import { BackgroundPanel, BackgroundPanel2, TextLight } from '../../colors';
import { Button } from '../shared/elements/Button';
import { Input as InputUI, TextInputLabelStyles } from '../shared/elements/Input';
import { TextArea as TextAreaUI } from '../shared/elements/TextArea';
import { Text } from '../shared/elements/Text';
import { MidnightBlue } from '../../colors';
import { useAuthContext } from '../github/AuthContext';
import { ProfileData } from './ProfileContext';
import { isValidTwitterHandle, isValidURL } from '../../helpers';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  bio?: string;
  twitterHandle?: string;
  personalSiteUrl?: string;
  onClickSave: (
    newProfileData: Partial<Pick<ProfileData, 'bio' | 'personalSiteUrl' | 'twitterHandle'>>,
  ) => void;
  isSaveLoading: boolean;
};

const StyledModal = styled(Modal)`
  .mantine-Modal-modal {
    background-color: ${BackgroundPanel};
  }
`;

const Content = styled(Center)`
  flex-direction: column;
  padding: ${rem(30)} ${rem(70)};
`;

const Header = styled.div`
  font-family: VT323;
  font-size: ${rem(48)};
  text-align: center;
  color: ${TextLight};
`;

const FieldLabel = styled.div`
  ${TextInputLabelStyles};
`;

const ProfileFields = styled.div`
  background-color: ${MidnightBlue};
  padding: ${rem(30)} ${rem(70)};
  border: ${rem(1)} solid ${BackgroundPanel2};
  border-radius: ${rem(10)};
  margin-bottom: ${rem(30)};
  min-width: ${rem(600)};
`;

const Setting = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: ${rem(35)};
  justify-content: space-between;
`;

const SettingSection = styled.div`
  display: flex;
  margin-bottom: ${rem(30)};
`;

const TwitterHandle = styled(SettingSection)``;

const ConnectGitHub = styled.div``;

const PersonalWebsite = styled(SettingSection)``;

const ProfileBio = styled.div`
  display: flex;
`;

const Input = styled(InputUI)`
  flex: 1;
`;

const TextArea = styled(TextAreaUI)`
  flex: 1;
`;

export const SettingsText = styled(Text)`
  padding-right: ${rem(30)};
`;

export const EditProfileModal = ({
  isOpen,
  onClose,
  twitterHandle,
  bio,
  personalSiteUrl,
  onClickSave,
  isSaveLoading,
}: Props) => {
  const { authState, handleLogout, authorizeGitHub } = useAuthContext();
  const [personSiteUrlValue, setPersonalSiteUrlValue] =
    useState<string | undefined>(personalSiteUrl);
  const [bioValue, setBioValue] = useState<string | undefined>(bio);
  const [twitterHandleValue, setTwitterHandleValue] = useState<string | undefined>(twitterHandle);
  /* TODO: replace with mantine's useForm hook */
  const canSave =
    personSiteUrlValue !== personalSiteUrl ||
    bioValue !== bio ||
    twitterHandleValue !== twitterHandle;

  useEffect(() => {
    setPersonalSiteUrlValue(personalSiteUrl);
    setBioValue(bio);
    setTwitterHandleValue(twitterHandle);
  }, [personalSiteUrl, bio, twitterHandle]);

  return (
    <StyledModal
      onClose={onClose}
      opened={isOpen}
      centered
      size="xl"
      closeButtonLabel="Close GitPOAP claim modal"
    >
      <Content>
        <Header style={{ marginBottom: rem(30) }}>{'Edit profile'}</Header>
        <ProfileFields>
          <ConnectGitHub>
            <FieldLabel>{'GitHub'}</FieldLabel>
            {authState.isLoggedIntoGitHub ? (
              <Setting>
                <SettingsText>{`You're connected as @${authState.user?.githubHandle}`}</SettingsText>
                <Button onClick={handleLogout} variant="outline">
                  {'Disconnect'}
                </Button>
              </Setting>
            ) : (
              <Setting>
                <Text>{'Connect your GitHub account to claim GitPOAPs'}</Text>
                <Button onClick={authorizeGitHub} variant="outline">
                  {'Connect'}
                </Button>
              </Setting>
            )}
          </ConnectGitHub>

          <TwitterHandle>
            <Input
              placeholder="gitpoap"
              label={'Twitter Handle'}
              value={twitterHandleValue ?? ''}
              onChange={(e) => setTwitterHandleValue(e.target.value)}
              error={twitterHandleValue && !isValidTwitterHandle(twitterHandleValue)}
            />
          </TwitterHandle>

          <PersonalWebsite>
            <Input
              placeholder="https://gitpoap.io"
              label={'Website Url'}
              value={personSiteUrlValue ?? ''}
              onChange={(e) => setPersonalSiteUrlValue(e.target.value)}
              error={personSiteUrlValue && !isValidURL(personSiteUrlValue)}
            />
          </PersonalWebsite>
          <ProfileBio>
            <TextArea
              placeholder="web3 developer, aspiring dao contributor"
              label={'Profile Bio'}
              value={bioValue ?? ''}
              onChange={(e) => setBioValue(e.target.value)}
              autosize
              minRows={4}
              maxRows={4}
            />
          </ProfileBio>
        </ProfileFields>

        <Button
          onClick={() =>
            onClickSave({
              twitterHandle: twitterHandleValue,
              bio: bioValue,
              personalSiteUrl: personSiteUrlValue,
            })
          }
          disabled={!canSave}
          loading={isSaveLoading}
          style={{ minWidth: rem(100) }}
        >
          {'Save'}
        </Button>
      </Content>
    </StyledModal>
  );
};