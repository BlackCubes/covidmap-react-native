import React, { useState } from "react";
import { Text, Pressable, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import he from "he";

const ArticleContainer = styled.View`
  display: flex;
  flex-direction: column;
  padding-right: 20px;
  padding-left: 20px;
  z-index: -10;
`;

const CandidateHeading = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  text-decoration: underline;
`;

const ItalicMechanism = styled.Text`
  font-style: italic;
`;

const BoldText = styled.Text`
  font-weight: bold;
`;

const PhaseSponsorsContainer = styled.View`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const DetailsContainer = styled.View`
  display: flex;
  flex-direction: column;
  padding-top: 4px;
`;

const ViewMoreButton = styled.Text`
  color: #255c7c;
  font-weight: bold;
  padding: 4px;
  border-radius: 6px;
  border: 1px solid #77c2b0;
  width: 30%;
  margin: 0 auto;
  text-align: center;
  padding: 8px;
`;

const VaccineItem = ({
  candidate,
  mechanism,
  sponsors,
  details,
  trialPhase,
  institutions,
}) => {
  const [hideText, setHideText] = useState(true);
  const viewMoreDetails = () => setHideText(!hideText);

  const formatDetails = (unformattedDetailsString) => {
    // replace all occurences of ':' and replace with colon and newline
    const decodedString = he.decode(unformattedDetailsString);
    return decodedString.replace(/:\s*/g, ": \n");
  };

  return (
    <SafeAreaView>
      <ArticleContainer>
        <CandidateHeading>Candidate: {candidate}</CandidateHeading>
        <BoldText>
          Mechanism: <ItalicMechanism>{mechanism}</ItalicMechanism>
        </BoldText>
        {/* Phase & Sponsors section*/}
        <PhaseSponsorsContainer>
          <Text>
            <BoldText>Trial Phase:</BoldText> {trialPhase}
          </Text>
          <Text>
            <BoldText>Sponsors:</BoldText>{" "}
            {sponsors.map((sponsorName) => (
              <Text key={sponsorName}>{sponsorName}</Text>
            ))}
          </Text>
        </PhaseSponsorsContainer>
        {/* Institutions */}
        <BoldText>Institutions:</BoldText>
        {institutions.map((siteName) => (
          <Text key={siteName}>{he.decode(siteName)}</Text>
        ))}
        {/* Details */}
        <DetailsContainer>
          <BoldText>Details</BoldText>
          <Text numberOfLines={hideText ? 4 : undefined} ellipsizeMode="tail">
            {formatDetails(details)}
          </Text>
          {/* View More */}
          <Pressable onPress={viewMoreDetails} style={{ marginTop: "2%" }}>
            <ViewMoreButton>
              {hideText ? <Text>View More...</Text> : <Text>Hide...</Text>}
            </ViewMoreButton>
          </Pressable>
        </DetailsContainer>
      </ArticleContainer>
    </SafeAreaView>
  );
};

export default VaccineItem;
