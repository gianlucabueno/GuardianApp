import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native';

export const FieldContainer = styled.View`
  margin-bottom: 15px;
`;

export const InputWithIcon = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
  padding-horizontal: 10px;
`;

export const StyledTextInput = styled.TextInput`
  flex: 1;
  height: 40px;
  padding: 10px;
`;

export const StyledPicker = styled(Picker)`
  height: 50px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
`;

export const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
`;

export const StyledInput = styled(TextInput)`
height: 40px;
border-color: #000000;
border-width: 0;
padding-left: 10px;
border-radius: 5px;
margin-bottom: 10px;
border-bottom-width: 1px;
color: #000000;
font-weight: bold;
`;