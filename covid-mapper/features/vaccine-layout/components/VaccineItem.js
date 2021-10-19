import React, {useState} from "react";
import { Text, Pressable, SafeAreaView } from "react-native";
import styled from "styled-components/native";

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
`;

const ItalicMechanism = styled.Text`
  font-style: italic;
`;

const BoldText = styled.Text`
  font-weight: 600;
`;

const PhaseSponsorsContainer = styled.View`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const DetailsContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

const ViewMoreButton = styled.Text`
    color: #77C280;
    padding: 4px;
    border-radius: 6px;
    border: 1px solid #77C2B0;
    width: 30%;
    margin: 0 auto;
    text-align:  center;
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
    const [hideText, setHideText]=useState(true);
    const viewMoreDetails =()=> setHideText(!hideText);
  return (
   <SafeAreaView>
        <ArticleContainer>
      <CandidateHeading>Candidate: {candidate}</CandidateHeading>
      <BoldText>
        Mechanism: <ItalicMechanism>{mechanism}</ItalicMechanism>
      </BoldText>
    {/* Phase & Sponsors section*/}
        <PhaseSponsorsContainer>
            <Text><BoldText>Trial Phase:</BoldText> {trialPhase}</Text>
            <Text><BoldText>Sponsors:</BoldText> {sponsors.map(sponsorName=><Text key={sponsorName}>{sponsorName}</Text>)}</Text>
        </PhaseSponsorsContainer>
        {/* Institutions */}
        <BoldText>Institutions: {institutions.map((siteName)=><Text key={siteName}>{siteName}</Text>)}</BoldText>
        {/* Details */}
        <DetailsContainer>
            <Text numberOfLines={hideText? 4: undefined} ellipsizeMode='tail'>{details}</Text>
            {/* View More */}
            <Pressable onPress={viewMoreDetails} style={{ marginTop: '2%',}}>
                <ViewMoreButton>
                    <Text>View More...</Text>
                </ViewMoreButton>
            </Pressable>
        </DetailsContainer>
    </ArticleContainer>
   </SafeAreaView>
  );
};

export default VaccineItem;
