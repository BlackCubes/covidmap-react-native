import React, { useState } from "react";
import { Text, Pressable, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import he from "he";
import uuid from 'react-native-uuid';
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
  padding-top: 4px;
`;

const Subheading = styled.Text`
  text-decoration: underline;
  font-weight: 500;
`;

const PhaseSponsorsContainer = styled.View`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const DetailsContainer = styled.View`
  display: flex;
  flex-direction: column;
  padding-top: 8px;
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

  const subheadingReplacer = (match) => "\n" + match + "\n";

  const formatString = (unformattedDetailsString) => {
    // remove HTML entities
    const decodedString = he.decode(unformattedDetailsString); // STRING WITHOUT HTML ENTITIES

    const subheadingPattern =
      /Background:|Trials:|Regulatory Actions:|Study Design[s]*:|Outcomes:|Status:|Funding:/g;

    const subheadingsFormatted = decodedString.replace(
      subheadingPattern,
      subheadingReplacer
    );
    const splitByNewLines = subheadingsFormatted.split("\n");

    // loop over array, check if arr element matches subheadingPattern
    return splitByNewLines.map((detailString) => {
      if (detailString === "") return <Text key={uuid.v4()}>{"\n"}</Text>;
      else if (subheadingPattern.test(detailString)) {
        return <Subheading key={uuid.v4()}>{"\n" + detailString + "\n"}</Subheading>;
      } else return <Text key={uuid.v4()}>{detailString}</Text>;
    });
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
              <Text key={uuid.v4()}>{sponsorName}</Text>
            ))}
          </Text>
        </PhaseSponsorsContainer>
        {/* Institutions */}
        <BoldText>Institutions:</BoldText>
        {institutions.map((siteName) => (
          <Text key={uuid.v4()}>{he.decode(siteName)}</Text>
        ))}
        {/* Details */}
        <DetailsContainer>
          <BoldText>Details</BoldText>
          <Text numberOfLines={hideText ? 4 : undefined} ellipsizeMode="tail">
            {formatString(details)}
          </Text>
          {/* View More */}
          <Pressable onPress={viewMoreDetails} style={{ marginTop: "2%" }}>
            <ViewMoreButton>
              {hideText ? <Text>View More...</Text> : <Text>Hide Details</Text>}
            </ViewMoreButton>
          </Pressable>
        </DetailsContainer>
      </ArticleContainer>
    </SafeAreaView>
  );
};

export default VaccineItem;
