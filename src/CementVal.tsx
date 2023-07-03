import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const CementVal = () => {
  const [characteristicStrength, setCharacteristicStrength] = useState('');
  const [designStrength, setDesignStrength] = useState('');
  const [designLoad, setDesignLoad] = useState('');
  const [requiredStrength, setRequiredStrength] = useState('');
  const [requiredLoad, setRequiredLoad] = useState('');
  const [cementAmount, setCementAmount] = useState('');

  const calculateCementAmount = () => {
    const k1 = 0.4; // Materialberoende faktor
    const k2 = 0.85; // Partialfaktor för materialstyrka
    const k3 = 1.5; // Partialfaktor för last
    const k4 = 1.25; // Partialfaktor för dimensionerande last

    // Beräkna dimensionerande last och styrka
    const designLoadValue = parseFloat(designLoad);
    const designStrengthValue = parseFloat(designStrength);
    const characteristicStrengthValue = parseFloat(characteristicStrength);

    const requiredStrengthValue = designStrengthValue / (k2 * k3);
    const requiredLoadValue = designLoadValue * k4;

    setRequiredStrength(requiredStrengthValue.toFixed(2));
    setRequiredLoad(requiredLoadValue.toFixed(2));

    // Beräkna cementmängden
    const cementAmountValue = requiredLoadValue / (k1 * characteristicStrengthValue);
    setCementAmount(cementAmountValue.toFixed(2));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Ange värden enligt Eurokod:</Text>
      <TextInput
        placeholder="Karakteristisk styrka (MPa)"
        onChangeText={(text) => setCharacteristicStrength(text)}
        value={characteristicStrength}
        keyboardType="numeric"
        style={{ width: 200, marginTop: 10 }}
      />
      <TextInput
        placeholder="Dimensionerande styrka (MPa)"
        onChangeText={(text) => setDesignStrength(text)}
        value={designStrength}
        keyboardType="numeric"
        style={{ width: 200, marginTop: 10 }}
      />
      <TextInput
        placeholder="Dimensionerande last (kN)"
        onChangeText={(text) => setDesignLoad(text)}
        value={designLoad}
        keyboardType="numeric"
        style={{ width: 200, marginTop: 10 }}
      />
      <Button title="Beräkna cementmängd" onPress={calculateCementAmount} style={{ marginTop: 20 }} />
      <Text style={{ marginTop: 20 }}>
        Krav på styrka: {requiredStrength} MPa
      </Text>
      <Text style={{ marginTop: 10 }}>
        Krav på last: {requiredLoad} kN
      </Text>
      <Text style={{ marginTop: 10 }}>
        Mängd cement: {cementAmount} kg
      </Text>
    </View>
  );
};

export default CementVal;
