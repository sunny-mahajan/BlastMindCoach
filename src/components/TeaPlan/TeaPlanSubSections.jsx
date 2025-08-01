import React from 'react';
import styled from 'styled-components';

const SubSectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  background-color: #222;
  border-radius: 8px;
  margin-top: 20px;
  justify-content: center;
`;

const SubSectionCard = styled.div`
  background-color: #333;
  border-radius: 8px;
  padding: 15px;
  color: white;
  text-align: center;
  width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SubSectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const SubSectionDescription = styled.p`
  font-size: 0.9rem;
  color: #bbb;
`;

function TeaPlanSubSections({ subSections }) {
    return (
        <SubSectionContainer>
            {subSections.map((subSection) => (
                <SubSectionCard key={subSection.id}>
                    <SubSectionTitle>{subSection.title}</SubSectionTitle>
                    <SubSectionDescription>
                        {subSection.description}
                    </SubSectionDescription>
                </SubSectionCard>
            ))}
        </SubSectionContainer>
    );
}

export default TeaPlanSubSections;