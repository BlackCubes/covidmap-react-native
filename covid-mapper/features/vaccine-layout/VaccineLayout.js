import * as React from "react";
import { Text, SafeAreaView, FlatList, View } from "react-native";
import styled from "styled-components/native";
import VaccineItem from "./components/VaccineItem";
import { useGetAllAvailableVaccinesQuery } from "../../api/covidApi";

const Container = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.View`
  height: 10%;
  width: 100%;
  position: absolute;
  top: 0;
  background-color: #203f59;
  border-style: solid;
  border-bottom-width: 4px;
  border-bottom-color: #77c280;
  justify-content: center;
  align-items: center;
  z-index: -5;
`;

const LineSeparator = styled.View`
  height: 2px;
  background-color: #ccc;
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
`;

const ListContainer = styled.View`
  padding-top: 20%;
  margin-bottom: 2%;
`;

// FOR TESTING PURPOSES;
// const DUMMY_DATA = [
//     {
//       candidate: "BNT162",
//       mechanism: "mRNA-based vaccine",
//       sponsors: ["Pfizer, BioNTech"],
//       details:
//         "Background: Pfizer and BioNtech are&nbsp;collaborating&nbsp;to develop BNT162, a series of vaccine candidates for COVID-19. BNT162 was initially four candidates developed by BioNTech, two candidates consisting of nucleoside modified mRNA-based (modRNA), one of uridine containing mRNA-based (uRNA), and the fourth candidate of self-amplifying mRNA-based (saRNA). Pre-clinical results of the modRNA candidate BNT162b2&nbsp;posted&nbsp;to the pre-print server&nbsp;bioRxiv&nbsp;showed the vaccine had &quot;protective anti-viral effects in rhesus macaques, with concomitant high neutralizing antibody titers and a TH1-biased cellular response in rhesus macaques and mice.&quot; The companies have selected BNT162b2 to move forward in a Phase 2/3 trial.\n\nRegulatory Actions: BNT162b was&nbsp;authorized by the Medicines and Healthcare products Regulatory Agency (MHRA) for use in the UK&nbsp;on 2 December after a rolling review of vaccine data submitted by Pfizer and BioNTech.\n\nStudy Designs: The pivotal Phase 2/3 trial of about 32,000 healthy participants&nbsp;(NCT04368728) still is recruiting, as is a Phase 1/2 trial in the US and Germany of 200 healthy participants between aged 18-55 years (NCT04380701).&nbsp;Pfizer and BioNTech also are planning&nbsp;a combined Phase 1/2 trial of 160 participants between 20-85 years old (NCT04588480). In China, BioNTech and Shanghai Fosun Pharmaceutical are conducting a Phase 2 trial of BNT162b in 960 healthy participants at the Jiangsu Provincial Center for Disease Control and Prevention (NCT04649021).\n\nOutcomes: On 9 November, Pfizer and BioNTech&nbsp;announced&nbsp;interim results by press release of 94 Phase 3 trial participants, which showed BNT162b2 was more than 90% effective in protecting participants who had never been infected with SARS-CoV-2 at 7 days after the second dose. Those results are backed up by Phase 1&nbsp;data&nbsp;published in&nbsp;The New England Journal of Medicine&nbsp;showing similar immunogenicity between BNT162b1 and BNT162b2 but fewer adverse effects with BNT162b2. Another study of Phase 1/2 data for BNT162b1 was&nbsp;published&nbsp;in the journal&nbsp;Nature. Robust immunogenicity was seen after vaccination at all three doses (10 &mu;g, 30 &mu;g and 100 &mu;g). Adverse events were elevated at the highest dose; therefore, participants did not receive a second dose at that level. Participants in Phase 1/2 trials who received two doses between 1 and 50 &micro;g of BNT162b1 had &quot;robust RBD-specific antibody, T-cell and favourable cytokine responses,&quot; according to a paper&nbsp;published&nbsp;in&nbsp;Nature&nbsp;on 30 September.\n\nStatus: In the US,&nbsp;Pfizer and BioNTech have requested that the FDA issue an EUA for BNT162b2; an advisory committee meeting is scheduled for 10 December. BNT162b1 and BNT162b2 received&nbsp;FDA Fast Track designation for BNT162b1 and BNT162b2. The companies requested conditional marketing authority from EMA on 1 December; EMA&#39;s rolling&nbsp;review&nbsp;of BNT162b2 could accelerate that authorization.&nbsp;In Australia, BNT162b2 received&nbsp;provisional determination&nbsp;from Australia&rsquo;s Therapeutic Goods Administration (TGA), which is the first step on the road for approval for the vaccine in the country. BioNTech&#39;s partner in China, Shanghai Fosun Pharmaceutical Group,&nbsp;announced&nbsp;it is seeking approval for BNT162b2 in China but would no longer be pursuing clinical trials for BNT162b1.",
//       trialPhase: "Phase 3",
//       institutions: ["Multiple study sites in Europe, North America and China"],
//     },
//     {
//       candidate: "mRNA-1273",
//       mechanism: "mRNA-based vaccine",
//       sponsors: ["Moderna"],
//       details:
//         "Background: mRNA-1273 was developed by Moderna based on prior studies of related coronaviruses such as those that cause severe acute respiratory syndrome (SARS) and Middle East respiratory syndrome (MERS).\n\nStudy Design: A Phase 3 trial of 30,000 participants at high risk for SARS-CoV-2 infection is underway. Participants will receive a 100 &micro;g dose of mRNA-1273 or placebo and then be&nbsp;followed for up to 2 years (COVE trial;&nbsp;NCT04470427). Moderna&nbsp;posted&nbsp;the full trial protocol for COVE on 17 September. Previously, a Phase 1 trial (NCT04283461) of 105 healthy participants provided the basis for Moderna&rsquo;s investigational new drug application (IND), which was successfully reviewed by the FDA and set the stage for Phase 2 testing. A Phase 2 trial of 600 healthy participants evaluating 25 &micro;g, 100 &micro;g, and 250 &micro;g dose levels of the vaccine was completed.&nbsp;(NCT04405076).\n\nOutcomes:\nHuman studies - An&nbsp;interim analysis of 95 participants in the Phase 3 COVE trial was released by Moderna on 16 November. The non-peer-reviewed data indicate mRNA-1273 has an efficacy of 94.5%. There were no severe cases of COVID-19 in the vaccinated group compared with 11 cases in the placebo group. Overall, the company said the vaccine was tolerated well with no &ldquo;significant safety concerns.&rdquo; Additionally, Phase 1 data&nbsp;published&nbsp;in the&nbsp;New England Journal of Medicine&nbsp;showed mRNA-1273 successfully produced neutralizing antibody titers in 8 participants who received either 25 &micro;g or 100 &micro;g doses. The response was dose dependent in 45 participants across 25 &micro;g, 100 &micro;g, and 250 &micro;g dose levels. In participants with available antibody data, neutralizing antibody titers were on par with what has been seen in convalescent sera from people who have successfully fought off COVID-19. The vaccine also appears to be safe for older adults, with participants who received two 25 &mu;g or 100 &mu;g doses of the vaccine experiencing mild or moderate effects consisting of fatigue, chills, headache, myalgia, and injection site pain, according to data from the Phase 1 trial&nbsp;published&nbsp;in the&nbsp;New England Journal of Medicine.\n\nAnimal studies - Results from a challenge in a mouse model showed mRNA-1273 prevented viral replication in the lungs, and neutralizing titers in the mouse model were similar in participants receiving 25 &micro;g or 100 &micro;g doses of the vaccine. A&nbsp;study&nbsp;of nonhuman primates challenged with SARS-CoV-2 published in the&nbsp;New England Journal of Medicine&nbsp;had neutralizing activity, and limited inflammation and lung activity after being administered the vaccine. A paper&nbsp;published&nbsp;in&nbsp;Nature&nbsp;also showed mRNA-1273 induced neutralizing antibodies in mice.\n\nStatus: Moderna requested that the FDA issue an EUA for mRNA-1273 on 30 November; an advisory committee meeting is scheduled for 17 December. Moderna requested conditional marketing authorization from EMA for mRNA-1273 on 1 December. On 12 May, the&nbsp;FDA granted&nbsp;Fast Track designation to mRNA-1273. A Phase 3 trial of the vaccine is&nbsp;underway, which is being funded by Operation Warp Speed. The UK&rsquo;s Medicines and Healthcare products Regulatory Agency (MHRA) has&nbsp;begun&nbsp;a real-time review of mRNA-1273, which will allow a quicker approval process for the vaccine. A rolling review by regulator Swissmedic in Switzerland has also begun.",
//       trialPhase: "Phase 3",
//       institutions: ["Kaiser Permanente Washington Health Research Institute"],
//     },
//     {
//       candidate: "Ad5-nCoV",
//       mechanism: "Recombinant vaccine (adenovirus type 5 vector)",
//       sponsors: ["CanSino Biologics"],
//       details:
//         "Background: China&rsquo;s CanSino Biologics has developed a recombinant novel coronavirus vaccine that incorporates the adenovirus type 5 vector (Ad5) named Ad5-nCoV. Trials: Multiple trials are in various stages of recruitment and completion: - A Phase 1 clinical trial in China of 108 participants between 18 and 60 years old who will receive low, medium, and high doses of Ad5-nCoV is active, but not recruiting (NCT04313127). - A Phase 1 trial in China is evaluating intramuscular vaccination and mucosal vaccination of Ad5-nCoV across two doses (NCT04552366). - A Phase 1/2 trial of up to 696 participants in Canada (NCT04398147). - A Phase 2 double-blind, placebo-controlled trial of up to 508 participants in China (NCT04341389) is active, but not recruiting. - A Phase 2b trial in China evaluating safety and immunogenicity of Ad5-nCoV in participants 6 years and older (NCT04566770). - A Phase 3 trial in Russia of up to 500 participants across multiple study centers (NCT04540419). - A Phase 3 trial of up to 40,000 participants internationally, including Pakistan, Saudi Arabia and Mexico (NCT04526990). Outcomes: A single dose of Ad5-nCoV protected against upper respiratory infection of SARS-CoV-2 in ferrets, according to a paper published 14 August in Nature Communications. Results from a Phase 1 trial show a humoral and immunogenic response to the vaccine, according to a paper published in The Lancet. Adverse reactions such as pain (54%), fever (46%), fatigue (44%), headache (39%), and muscle pain (17%) occurred in 83% of patients in the low and medium dose groups and 75% of patients in the high dose group. In the Phase 2 trial, neutralizing antibodies and specific interferon γ enzyme-linked immunospot assay responses were observed at all dose levels for most participants. Status: On 25 June, China’s Central Military Commission announced the military had been approved to use Ad5-nCoV for a period of 1 year, according to reporting in Reuters.",
//       trialPhase: "Phase 3",
//       institutions: ["Tongji Hospital", "Wuhan, China"],
//     },
//     {
//       candidate: "AZD1222",
//       mechanism:
//         "Replication-deficient viral vector vaccine (adenovirus from chimpanzees)",
//       sponsors: [
//         "The University of Oxford",
//         "AstraZeneca",
//         "IQVIA",
//         "Serum Institute of India",
//       ],
//       details:
//         "Background: AstraZeneca and the Oxford Vaccine Group at the University of Oxford are developing AZD1222 (previously ChAdOx1), a chimpanzee adenovirus vaccine. The team has previously developed a MERS vaccine. In India, the candidate is being jointly developed by the Serum Institute of India and AstraZeneca, and goes by the name Covishield. Preclinical data on the pre-print server bioRxiv showed a significantly reduced viral load and &ldquo;humoral and cellular immune response.&rdquo; Another pre-print paper showed an immune response in mice and pigs.\n\nStudy Designs: A Phase 3 trial (NCT04516746), for which AstraZeneca released the clinical study protocol, is underway and has enrolled more than 40,000 participants. A Phase 2/3 trial (COV002) conducted by the University of Oxford of up to 12,390 participants, is active and currently recruiting (NCT04400838). A Phase 1/2 (NCT04324606) single-blinded, multi-center study (COV001) of 1,090 healthy adult volunteers aged 18-55 years with four treatment arms, is active but not recruiting.&nbsp;An inhaled version of the vaccine candidate is being tested in a small trial of 30 people.\n\nOutcomes: A report of Phase 2 data from the Phase 2/3 COV002 trial published in The Lancet showed the vaccine candidate has similar immunogenicity in patients of all ages but appears to be better tolerated in older adults. Preliminary results from the trial published in The Lancet showed the vaccine candidate had an &ldquo;acceptable safety profile&rdquo; with most patients demonstrating an antibody response after one dose and all patients showing a response after two doses. There has been one death in a Phase 3 trial in Brazil, which was confirmed by the Brazilian National Health Surveillance Agency (Anvisa).\n\nStatus: The AstraZeneca trials are funded in part by BARDA and Operation Warp Speed. IQVIA&nbsp;announced&nbsp;they are partnering with AstraZeneca to advance clinical trials for the vaccine. Phase 3 trials are being conducted in the&nbsp;United States&nbsp;and in&nbsp;study sites&nbsp;in India, but were put on hold following a serious adverse event. Trials have since resumed. EMA&rsquo;s human medicines committee (CHMP) has&nbsp;started&nbsp;a rolling review of AZD1222 to reduce the amount of time before a decision is made on safety and effectiveness, as has Health Canada. In Australia, the Australian Therapeutic Good Administration (TGA) granted AZD1222 provisional determination, the first step in the process for approval. The Medicines and Healthcare products Regulatory Agency (MHRA) has also begun an accelerated review of AZD1222 in Britain.",
//       trialPhase: "Phase 3",
//       institutions: ["The University of Oxford,&nbsp", "the Jenner Institute"],
//     },
//     {
//       candidate: "CoronaVac",
//       mechanism: "Inactivated vaccine (formalin with alum adjuvant)",
//       sponsors: ["Sinovac"],
//       details:
//         "Background: CoronaVac (formerly PiCoVacc) is a formalin-inactivated and alum-adjuvanted candidate vaccine. Results from animal studies showed &ldquo;partial or complete protection in macaques&rdquo; exposed to SARS-CoV-2, according to a&nbsp;paper&nbsp;published  in Science.  Study Design: A Phase 1/2 trial of 743 healthy volunteers (18-59 years old) who received two different dosages of the vaccine or placebo is active but not recruiting. A Phase 1 trial of 143 participants (NCT04352608) and a Phase 2 trial of 600 participants (NCT04383574) are both active but not recruiting. Sinovac said a Phase 3 trial in collaboration with Instituto Butantan in Brazil is underway (NCT04456595), and the company plans to enroll around 9,000 patients in the healthcare industry. Trials also are underway in Turkey (NCT04582344) and in Indonesia (NCT04508075).  Outcomes: Results from the Phase 1/2 trials published in The Lancet Infectious Diseases indicate the vaccine has good safety and immunogenicity, with seroconversion occurring in 92.4% of participants receiving the 3 μg dose on a 0-14 day schedule and 97.4% of individuals receiving the same dose on a 0-28 day schedule.  Status:  Representatives from Sinovac told Reuters that the vaccine appeared to be safe in older trial participants, and did not cause any severe side effects. Preliminary results from the Instituto Butantan trial announced by the company indicate CoronaVac is safe so far, with no serious adverse events reported. The trial in Brazil was briefly suspended due to a patient death, but the trial has since resumed.",
//       trialPhase: "Phase 3",
//       institutions: ["Sinovac Research and Development Co., Ltd."],
//     },
//     {
//       candidate: "Covaxin",
//       mechanism: "Inactivated vaccine",
//       sponsors: ["Bharat Biotech", "National Institute of Virology"],
//       details:
//         "Background: Bharat Biotech is partnering with India's National Institute of Virology to develop an inactivated vaccine candidate called Covaxin. In addition to Covaxin, Bharat Biotech is working on two other vaccine candidates: one with the University of Wisconsin–Madison and FluGen, and the other with Thomas Jefferson University. Trials: A Phase 1/2 trial of about 1,100 healthy participants is underway after approval by the Drug Controller General of India. The Indian Council of Medical Research (ICMR) has reported Covaxin has entered Phase 2 trials. The Director General of ICMR said a Phase 3 trial of 26,000 participants is underway. Outcomes: Results of a two-dose regimen given to rhesus macaques posted to the pre-print server Research Square showed an increase in SARS-CoV-2 specific IgG and neutralizing antibodies and reduced viral replication in the nasal cavity, the throat, and the lung. Early results in the first 50 people who received the vaccine candidate appear to be &ldquo;encouraging,&rdquo; according to the trial's principal investigator. The first two phases of the trial did not have any major adverse events, Bharat Biotech said in a statement. Status: The vaccine could begin distribution &ldquo;as early as February 2021,&rdquo; according to an ICMR scientist who spoke with Reuters. ",
//       trialPhase: "Phase 3",
//       institutions: [""],
//     },
//     {
//       candidate: "JNJ-78436735 (formerly Ad26.COV2.S)",
//       mechanism: "Non-replicating viral vector",
//       sponsors: ["Johnson & Johnson"],
//       details:
//         "Background: Janssen, a pharmaceutical company owned by Johnson &amp; Johnson, is developing JNJ-78436735 (formerly known as Ad26.COV2.S), using their AdVac and PER.C6 systems, which were also used to develop the company&#39;s Ebola vaccine. In partnership with BARDA, Janssen has committed to investing more than $1 billion in vaccine research and development. JNJ-78436735 is a part of Operation Warp Speed.\n\nStudy Design: The Phase 3 ENSEMBLE trial will enroll up to 60,000 participants in the United States and internationally (NCT04505722). On 23 September, Janssen released the study protocol for the ENSEMBLE trial. A Phase 3 two-dose test of JNJ-78436735, called ENSEMBLE 2, is being evaluated in up to 30,000 participants and will run alongside ENSEMBLE (NCT04614948). Additionally, a&nbsp;randomized, double-blind, placebo-controlled, Phase 1/2a study of JNJ-78436735 is ongoing in 1,045 healthy participants 18-55 years of age, and adults 65 years or older. Study sites are planned in the U.S. and Belgium (NCT04436276).\n\nOutcomes: Results from the Phase 1/2a study in humans posted to the pre-print server MedRxiv found a single dose of the vaccine showed immunogenicity and a good safety profile. In animal studies, researchers reported in a paper published in Nature that a single injection of JNJ-78436735 &quot;induced robust neutralizing antibody responses and provided complete or near-complete protection in bronchoalveolar lavage and nasal swabs following SARS-CoV-2 challenge,&quot; in rhesus macaques, while another paper published in Nature Medicine indicated the vaccine protected against severe disease when tested in hamsters.\n\nStatus: The ENSEMBLE trial was on hold pending a review of an adverse event a participant developed in one of the study arms, but Janssen has been cleared to resume the trial in the U.S. and Brazil after the Independent Data Safety and Monitoring Board recommended the trial resume recruitment. Janssen said it plans to begin testing its vaccine in adolescents &quot;as soon as possible.&quot; Australia&rsquo;s Therapeutic Goods Administration (TGA) has given JNJ-78436735 provisional determination, which is the first step towards approval in the country. Janssen&#39;s vaccine candidate has also started a rolling review with the European Medicines Agency (EMA).\n\nFunding: JNJ-78436735 is  funded by Janssen, BARDA, NIAID and Operation Warp Speed.",
//       trialPhase: "Phase 3",
//       institutions: ["Johnson & Johnson"],
//     },
//     {
//       candidate: "No name announced",
//       mechanism: "Inactivated vaccine",
//       sponsors: [
//         "Wuhan Institute of Biological Products",
//         "China National Pharmaceutical Group (Sinopharm)",
//       ],
//       details:
//         "Background: Researchers at Sinopharm and the Wuhan Institute of Virology under the Chinese Academy of Sciences are developing an inactivated COVID-19 vaccine candidate. They have initiated a randomized, double-blind, placebo parallel-controlled Phase 1/2 clinical trial (ChiCTR2000031809) of healthy individuals starting at 6 years old.\n\nOutcomes: The vaccine has shown a &quot;strong neutralizing antibody response&quot; in Phase 1/2 trials, according to a release from China National Biotec Group. Results from a Phase 1 and a Phase 2 trial published in JAMA show the vaccine candidate has demonstrated immunogenicity.\n\nStatus: A Phase 3 trial is underway in Peru, Morocco, and in the United Arab Emirates. Sinopharm has reportedly applied for authorization with Chinese regulators to bring this vaccine to market, according to reporting from Bloomberg. Sinopharm has said both its vaccines have been administered to up to 1 million people in China, but efforts to deliver the vaccines have so far been decentralized, according to reporting from Vox.\n\nFunding: This candidate is being supported by the Ministry of Science and Technology in China.",
//       trialPhase: "Phase 3",
//       institutions: [
//         "Henan Provincial Center for Disease Control and Prevention",
//       ],
//     },
//     {
//       candidate: "NVX-CoV2373",
//       mechanism: "Nanoparticle vaccine",
//       sponsors: ["Novavax"],
//       details:
//         "Background: Novavax announced in March that it has produced a stable, prefusion protein nanoparticle vaccine candidate for COVID-19. A Phase 1/2 trial evaluating NVX-CoV2373 began on 25 May.   Trials: A randomized, observer-blinded, placebo-controlled trial of 130 healthy participants 18 to 59 years of age is being conducted at two sites in Australia. Patients will receive a two-dose regimen of 5 μg or 25 μg of NVX-CoV2373 with or without Novavax's Matrix‑M adjuvant (NCT04368988). A Phase 2b trial is underway in South Africa, which includes two cohorts: a group of 2,665 healthy adults and a group of 240 adults who are HIV positive (NCT04533399). Outcomes: Phase 1 trial participants who received the vaccine developed an antibody response at multiple dose, according to data  published in the New England Journal of Medicine in the New England Journal of Medicine. NVX-CoV2373 also has a favorable safety profile, according to the company.  Status: Novavax has received Fast Track Designation from the FDA for NVX-CoV2373. On May 11, CEPI announced they had provided Novavax with an additional $384 million towards the development and manufacturing of NVX-CoV2373. Novavax plans to manufacture 1 billion doses of NVX-CoV2373 by 2021 as part of their recent acquision of Praha Vaccines. Novavax was awarded a $60 million US Department of Defense contract towards manufacturing NVX-CoV2373, according to a company press release, and another $1.6 billion from Operation Warp Speed if the candidate is effective in clinical trials. The candidate is officially begun a Phase 3 trial in the United Kingdom, which will evaluate the vaccine in up to 10,000 participants, the company said in a press release. Novavax provided an update on 27 October of its Phase 3 trial of NVX-CoV2373 in North America, saying the trial would begin at the end of November, approximately one month later than expected.",
//       trialPhase: "Phase 3",
//       institutions: ["Novavax"],
//     },
//   ];

const VaccineLayout = () => {
  const {
    data: trialData,
    isLoading,
    error,
  } = useGetAllAvailableVaccinesQuery();

  if (error) {
    console.log(error);
    return <Text>{error}</Text>;
  }

  if (isLoading || !trialData) return <Text>Loading...</Text>;

  return (
    <SafeAreaView>
      <Container>
        <Header>
          <Text style={{ color: "#F6F6F6", fontSize: 20 }}>
            Vaccine Candidates in Development
          </Text>
        </Header>
        {/* List starts here */}
        <ListContainer>
          <FlatList
            data={trialData["data"]} // Replace with API data later and remove DUMMY_DATA above
            ItemSeparatorComponent={() => <LineSeparator />}
            initialNumToRender={3}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <VaccineItem
                candidate={item.candidate}
                mechanism={item.mechanism}
                institutions={item.institutions}
                details={item.details}
                sponsors={item.sponsors}
                trialPhase={item.trialPhase}
              />
            )}
          />
        </ListContainer>
      </Container>
    </SafeAreaView>
  );
};

export default VaccineLayout;
