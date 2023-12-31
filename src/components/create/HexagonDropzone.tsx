import { Dropzone, FileWithPath } from '@mantine/dropzone';
import Image from 'next/image';
import { rem } from 'polished';
import { ImFilePicture } from 'react-icons/im';
import styled from 'styled-components';

import { HexagonPath, HexagonStyles } from '../shared/elements';
import { BackgroundPanel, BackgroundPanel2, BackgroundPanel3 } from '../../colors';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '../../lib/api/gitpoapRequest';
import { Button, Center, Group, Stack, Text } from '@mantine/core';

const StyledDropzone = styled(Dropzone)`
  ${HexagonStyles}

  top: ${rem(4)};
  left: ${rem(4)};

  height: ${rem(372)};
  width: ${rem(372)};

  background: ${BackgroundPanel};
  &:hover {
    background: ${BackgroundPanel2};
  }
`;

const DropzoneBorder = styled.div`
  ${HexagonStyles}

  background-image: repeating-conic-gradient(${BackgroundPanel} 0 3deg, ${BackgroundPanel3} 3deg 6deg);

  height: ${rem(380)};
  width: ${rem(380)};
`;

type Props = {
  imageUrl: string | null;
  setError: (path: string, error: React.ReactNode) => void;
  addImage: (image: FileWithPath) => void;
  removeImage: () => void;
};

export const HexagonDropzone = ({ imageUrl, setError, addImage, removeImage }: Props) => {
  return (
    <Center mt={44}>
      <DropzoneBorder>
        <StyledDropzone
          accept={ACCEPTED_IMAGE_TYPES}
          maxSize={MAX_FILE_SIZE}
          onDrop={(files) => addImage(files[0])}
          onReject={(fileRejects) => {
            const { code, message } = fileRejects[0].errors[0];
            setError('image', code === 'file-too-large' ? 'Max file size is 5MB.' : message);
          }}
          styles={() => ({
            inner: {
              alignItems: 'center',
              display: 'flex',
              height: '100%',
              justifyContent: 'center',
              pointerEvents: imageUrl ? 'auto' : 'none',
            },
            root: {
              button: {
                display: 'none',
              },
              '&:hover': {
                img: {
                  filter: 'brightness(75%)',
                },
                button: {
                  display: 'block',
                },
              },
            },
          })}
        >
          {imageUrl ? (
            <>
              <Image
                alt="GitPOAP Image"
                src={imageUrl}
                fill
                style={{ pointerEvents: 'none' }}
                sizes={`(max-width: 768px) ${rem(380)}, ${rem(380)}`}
              />
              <Stack>
                <Button variant="filled">{'Replace'}</Button>
                <Button
                  variant="filled"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeImage();
                  }}
                >
                  {'Remove'}
                </Button>
              </Stack>
            </>
          ) : (
            <Group align="center">
              <Text size="md">{'Upload Art'}</Text>
              <ImFilePicture />
            </Group>
          )}
        </StyledDropzone>
      </DropzoneBorder>
      <HexagonPath />
    </Center>
  );
};
