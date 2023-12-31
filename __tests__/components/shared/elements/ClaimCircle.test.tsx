import { screen } from '@testing-library/react';
import 'jest-styled-components';
import { rem } from 'polished';
import { ClaimCircle } from '../../../../src/components/shared/elements';
import { renderWithTheme } from '../../../__utils__/renderWithTheme';

describe('ClaimCircle', () => {
  it('renders an ClaimCircle - small text', () => {
    const { container } = renderWithTheme(<ClaimCircle value={15} />);
    const claimCircle = container.firstChild;

    expect(claimCircle).toBeInTheDocument();
    expect(claimCircle).toHaveTextContent('15');
    expect(claimCircle).toMatchSnapshot();
    expect(screen.getByText('15')).toHaveStyle({ fontSize: rem(11) });
  });

  it('renders an ClaimCircle - large text', () => {
    const { container } = renderWithTheme(<ClaimCircle value={5} />);
    const claimCircle = container.firstChild;

    expect(claimCircle).toBeInTheDocument();
    expect(claimCircle).toHaveTextContent('5');
    expect(claimCircle).toMatchSnapshot();
    expect(screen.getByText('5')).toHaveStyle({ fontSize: rem(13) });
  });
});
