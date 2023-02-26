import React, {useEffect, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import styles from './styles';

export default function History() {
  const historyData = {
    tableHead: ['Date', 'Température', 'Humidité', 'Luminosité'],
    tableData: [
      ['13-02-2023', '24', '65', '2217'],
      ['13-02-2023', '23.5', '55', '2014'],
      ['13-02-2023', '23.5', '60', '1811'],
      ['13-02-2023', '23', '62', '1608'],
      ['13-02-2023', '23', '65', '1405'],
      ['13-02-2023', '24', '68', '1202'],
      ['12-02-2023', '25', '70', '999'],
      ['12-02-2023', '23.5', '75', '796'],
      ['12-02-2023', '21', '80', '4000'],
      ['11-02-2023', '19.5', '81', '3900'],
    ],
  };

  return (
    <View style={styles.container}>
      <Table
        borderStyle={{
          borderWidth: 2,
          borderColor: '#4b5b4b71',
        }}>
        <Row
          data={historyData.tableHead}
          style={styles.head}
          textStyle={styles.title}
        />
        <Rows
          data={historyData.tableData}
          style={styles.row}
          textStyle={styles.text}
        />
      </Table>
    </View>
  );
}
