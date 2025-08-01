import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Central color mapping
const profileColors = {
  blue: "#1c8ef9",
  yellow: "#f5c518",
  kids: "linear-gradient(to right, #0f0 25%, #f90 25%, #f90 50%, #f0f 50%, #f0f 75%, #00f 75%)",
  add: "#333",
};

// Outer container
const ProfilesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #000;
  padding: 2rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

// Title
const Title = styled.h1`
  color: #fff;
  font-size: 3rem;
  font-weight: 500;
  margin-bottom: 3rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 600px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

// Static-width grid for web layout
const ProfileRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  flex-wrap: wrap;
  max-width: 900px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const ProfileItem = styled.div`
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover p {
    color: #fff;
    font-weight: bold;
  }

  &:hover div {
    border: 3px solid white;
  }

  @media (max-width: 768px) {
    transform: scale(0.9);
  }

  @media (max-width: 480px) {
    transform: scale(0.8);
  }
`;

const ProfilePicture = styled.div`
  width: 160px;
  height: 160px;
  background: ${({ type }) => profileColors[type] || "#555"};
  border-radius: ${({ type }) => (type === "add" ? "50%" : "10px")};
  border: 3px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  position: relative;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }

  @media (max-width: 480px) {
    width: 90px;
    height: 90px;
  }
`;

const SmileyFace = styled.svg`
  width: 60%;
  height: 60%;
  fill: white;
`;

const KidsLabel = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  font-family: sans-serif;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const PlusIcon = styled.span`
  color: white;
  font-size: 3rem;
`;

const ProfileName = styled.p`
  margin-top: 8px;
  color: #aaa;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

function ProfilesPage() {
  const navigate = useNavigate();

  const profiles = [
    { id: "1", name: "Bruce", type: "blue" },
    { id: "2", name: "Kim", type: "yellow" },
    { id: "3", name: "Kids", type: "kids" },
  ];

  const handleProfileClick = () => {
    // Navigate to the home page or profile details
    navigate("/browse");
  };

  return (
    <ProfilesContainer>
      <Title>Who's watching?</Title>
      <ProfileRow>
        {profiles.map((profile) => (
          <ProfileItem key={profile.id} onClick={() => handleProfileClick()}>
            <ProfilePicture type={profile.type}>
              {profile.type === "kids" ? (
                <KidsLabel>kids</KidsLabel>
              ) : (
                <SmileyFace viewBox="0 0 100 100">
                  <circle cx="30" cy="35" r="5" />
                  <circle cx="70" cy="35" r="5" />
                  <path
                    d="M35 65 Q50 80 65 65"
                    stroke="white"
                    strokeWidth="5"
                    fill="none"
                  />
                </SmileyFace>
              )}
            </ProfilePicture>
            <ProfileName>{profile.name}</ProfileName>
          </ProfileItem>
        ))}
      </ProfileRow>
      <div style={{ marginTop: "20px" }}>
        <button
          type="button"
          style={{
            padding: "15px",
            border: "1px solid grey",
            borderRadius: 10,
            background: "none",
            color: "grey",
          }}
          onClick={() => console.log("Add profile clicked")}
        >
          Manage Profile
        </button>
      </div>
    </ProfilesContainer>
  );
}

export default ProfilesPage;
