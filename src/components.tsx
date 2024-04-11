import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {HoldingWithComputedValues} from './types';

export const HoldingListItem: React.FC<{
  holding: HoldingWithComputedValues;
}> = ({holding}) => (
  <View style={styles.holdingListItemcontainer}>
    <View>
      <Text style={styles.symbolText}>{holding.symbol}</Text>
      <Text>{holding.quantity}</Text>
    </View>
    <View style={styles.ltpAndpnlContainer}>
      <Text style={styles.ltpText}>
        LTP: ₹ <Text style={styles.ltpValueText}>{holding.ltp}</Text>
      </Text>
      <Text>P/L: ₹ {holding.pnl}</Text>
    </View>
  </View>
);

const TextWithValueComponent: React.FC<{text: string; value: number}> = ({
  text,
  value,
}) => (
  <View style={styles.textsContainer}>
    <Text style={styles.boldText}>{text} </Text>
    <Text>{value}</Text>
  </View>
);
export const PortfolioSummary: React.FC<{
  totalCurrentValue: number;
  totalInvestmentValue: number;
  totalPNL: number;
  todayPNL: number;
}> = ({totalCurrentValue, totalInvestmentValue, totalPNL, todayPNL}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.summaryContainerView}>
      {!expanded && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <TextWithValueComponent text={'Profit & Loss:'} value={totalPNL} />
        </TouchableOpacity>
      )}
      {expanded && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <TextWithValueComponent
            text={'Current Value:'}
            value={totalCurrentValue}
          />
          <TextWithValueComponent
            text={'Total Investment:'}
            value={totalInvestmentValue}
          />
          <TextWithValueComponent
            text={`Today's Profit & Loss:`}
            value={todayPNL}
          />
          <TextWithValueComponent text={'Profit & Loss:'} value={totalPNL} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  holdingListItemcontainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  symbolText: {fontSize: 15, fontWeight: 'bold', marginBottom: 5},
  ltpText: {marginBottom: 5},
  ltpValueText: {fontWeight: 'bold', marginBottom: 5},
  ltpAndpnlContainer: {alignItems: 'flex-end'},
  summaryContainerView: {padding: 10},
  textsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  boldText: {fontWeight: 'bold'},
});
