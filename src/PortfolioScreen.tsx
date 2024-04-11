import React, {useState, useEffect} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import {calculateHoldingValues, calculatePortfolioSummary} from './holdings';
import {HoldingListItem, PortfolioSummary} from './components';
import {Holding, HoldingWithComputedValues} from './types';
import { fetchHoldingsData } from "./fetchHoldingsData";

const PortfolioScreen: React.FC = () => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [holdingData, setHoldingData] = useState<HoldingWithComputedValues[]>([]);
  const [portfolioSummary, setPortfolioSummary] = useState<any>({});

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (holdings.length > 0) {
      const computedHoldings = calculateHoldingValues(holdings);
      setHoldingData(computedHoldings);
      const summary = calculatePortfolioSummary(computedHoldings);
      setPortfolioSummary(summary);
    }
  }, [holdings]);

  const fetchData = async () => {
    try {
      const data = await fetchHoldingsData();
      setHoldings(data.userHolding);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        <FlatList
          data={holdingData}
          renderItem={({item}) => <HoldingListItem holding={item} />}
          keyExtractor={item => item.symbol.toString()}
        />
      )}
      <PortfolioSummary
        totalCurrentValue={portfolioSummary.totalCurrentValue}
        totalInvestmentValue={portfolioSummary.totalInvestmentValue}
        totalPNL={portfolioSummary.totalPNL}
        todayPNL={portfolioSummary.todayPNL}
      />
    </View>
  );
};

export default PortfolioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
