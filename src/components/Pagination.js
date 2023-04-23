import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import PaginationDot from 'react-native-animated-pagination-dot';
import { usePeopleContext } from '../providers/PeopleProvider';

export const Pagination = ({
  color,
  sizeRatio = 1.0,
  maxPage = 10,
  inactiveColor,
}) => {
  const [page, setPage] = useState(0);
  const { data, setApiUrl, apiUrl, setIsLoading } = usePeopleContext();

  const onPressPrev = () => {
    if (page) {
      setIsLoading(true);
    }
    setPage(page === 0 ? page : page - 1);
    setApiUrl(data?.previous !== null ? data?.previous : apiUrl);
  };

  const onPressNext = () => {
    if (page !== maxPage - 1) {
      setIsLoading(true);
    }
    setPage(page === maxPage - 1 ? page : page + 1);
    setApiUrl(data?.next !== null ? data?.next : apiUrl);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapperPage}>
        <View style={styles.page}>
          <Text style={styles.pageText}>page</Text>
          <Text style={styles.pageTextCount}>
            {page + 1} / {maxPage}
          </Text>
        </View>
      </View>

      <View style={styles.wrapperButton}>
        <Button title="Prev" onPress={onPressPrev} />

        <PaginationDot
          activeDotColor={color}
          curPage={page}
          inactiveDotColor={inactiveColor ?? undefined}
          maxPage={maxPage}
          sizeRatio={sizeRatio}
        />

        <Button title="Next" onPress={onPressNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 12 },
  wrapperPage: { flexDirection: 'row' },
  page: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  pageText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    marginRight: 12,
  },
  pageTextCount: { fontSize: 16, fontWeight: '600', color: 'grey' },
  wrapperButton: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
