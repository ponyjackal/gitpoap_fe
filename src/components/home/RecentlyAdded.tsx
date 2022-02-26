import React, { useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useQuery } from 'urql';
import { FaArrowRight } from 'react-icons/fa';
import { FaQuestion } from 'react-icons/fa';
import { ProjectHex as ProjectHexUI } from '../shared/compounds/ProjectHex';
import { Header as HeaderUI } from '../shared/elements/Header';
import { Project } from '../../types';
import { Button } from '../shared/elements/Button';
import { TextGray, TextLight } from '../../colors';
import { RecentlyAddedPopover } from './RecentlyAddedPopover';

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${rem(10)};
`;

const Projects = styled.div`
  display: inline-flex;
  flex-direction: row;
  max-width: ${rem(1200)};
  flex-wrap: wrap;
  margin-top: ${rem(50)};
  margin-bottom: ${rem(50)};
`;

const ProjectHex = styled(ProjectHexUI)`
  margin-right: ${rem(40)};
  margin-bottom: ${rem(35)};
`;

const Question = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: ${rem(25)};
  width: ${rem(25)};
  color: ${TextLight};
  padding: ${rem(6)};
  border: ${rem(2)} solid ${TextGray};
  margin-left: ${rem(10)};
  cursor: pointer;
`;

const Header = styled(HeaderUI)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const RecentProjectsQuery = `
query recentProjects {
  allStats {
    value
    unit
    rate
    icon
  }
}
`;

export const RecentlyAdded = () => {
  const [result] = useQuery<{
    recentProjects: {
      projects: Project[];
    };
  }>({
    query: RecentProjectsQuery,
  });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <Header>
        {'Recently added projects'}
        <RecentlyAddedPopover
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          target={
            <Question onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
              <FaQuestion />
            </Question>
          }
        />
      </Header>
      <Projects>
        {result.data?.recentProjects.projects.map((project) => {
          return (
            <ProjectHex
              key={project.id}
              category={project.category}
              name={project.name}
              memberCount={project.memberCount}
              gitPoapCount={project.gitPoapCount}
              stars={project.stars}
            />
          );
        })}
      </Projects>
      <Button variant="outline" rightIcon={<FaArrowRight />}>
        {'All Projects'}
      </Button>
    </Container>
  );
};
