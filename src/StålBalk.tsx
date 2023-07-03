import React, { useReducer } from 'react';
import { View, Text, Button, Picker } from 'react-native';

const STÅL_ELASTICITETSMODUL = 200000;

const initialBalkState = {
  material: 'stål',
  criticalStress: '',
};

const balkReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_MATERIAL':
      return {
        ...state,
        material: action.payload,
      };
    case 'SET_CRITICAL_STRESS':
      return {
        ...state,
        criticalStress: action.payload,
      };
    default:
      return state;
  }
};

const StålBalk = () => {
  const [state, dispatch] = useReducer(balkReducer, initialBalkState);

  const calculateBucklingStress = () => {
    const length = 10;
    const width = 2;
    const height = 5;
    const loads = 100;

    const modulus = STÅL_ELASTICITETSMODUL;

    const area = width * height;
    const momentOfInertia = (width * Math.pow(height, 3)) / 12;
    const stress = (loads * Math.pow(length, 2)) / (3.14 * 3.14 * modulus * area * momentOfInertia);

    dispatch({ type: 'SET_CRITICAL_STRESS', payload: stress.toFixed(2) });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Picker
        selectedValue={state.material}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue) => dispatch({ type: 'SET_MATERIAL', payload: itemValue })}>
        <Picker.Item label="Stål" value="stål" />
      </Picker>
      <Button title="Beräkna bråttgräns" onPress={calculateBucklingStress} />
      <Text style={{ marginTop: 20 }}>
        Bråttgränsen för balken är: {state.criticalStress}
      </Text>
    </View>
  );
};

export default StålBalk;
