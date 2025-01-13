import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  background-color: white;
  padding: 6% 7%;
  border-width: 1px;
  border-color: #eaeaea;
  border-radius: 20px;
`;

const ChallengeInfo = styled.View`
  flex-direction: row;
`;

const Info = styled.View``;

const InfoText = styled.Text`
  font-size: 14px;
  line-height: 22px;
  font-weight: 600;
  color: black;
`;

const BottomInfoText = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

const BottomText = styled.Text`
  font-size: 14px;
  line-height: 22px;
  font-weight: 600;
  color: black;
`;

const PointText = styled.Text`
  color: #ff5b35;
  font-size: 20px;
  font-weight: bold;
  line-height: 22px;
  margin-right: 5px;
`;

const InfoStandard = styled.View`
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto;
  margin-top: 2px;
`;

const Standard = styled.View`
  flex-direction: row;
  align-items: center;
  height: 16px;
`;

interface ColorProps {
  $color: string;
}

const ColorBox = styled.View<ColorProps>`
  width: 8px;
  height: 8px;
  border-radius: 100px;
  background-color: ${props => props.$color};
`;

const StandardText = styled.Text`
  margin-left: 5px;
  font-size: 10px;
  color: black;
`;

const ChallengeRecord = styled.View``;

export {
  Container,
  ChallengeInfo,
  Info,
  InfoText,
  BottomInfoText,
  BottomText,
  PointText,
  InfoStandard,
  Standard,
  ColorBox,
  StandardText,
  ChallengeRecord,
};
