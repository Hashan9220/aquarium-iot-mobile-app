import React from 'react';
import {StyleSheet} from 'react-native';

const darkMode = StyleSheet.create({
  cardSection: {
    height: 200,
    flex: 1,
    padding: 5,
  },
  leftCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '42%',
    height: '10%',
    marginLeft: '2%',
    marginRight: '45%',
    marginTop: '2%',
    borderRadius: 30,
    elevation: 10,
    shadowColor: 'black',
    backgroundColor: '#fff',
  },
  rightCard: {
    flex: 1,
    width: '40%',
    height: '10%',
    borderRadius: 30,
    marginLeft: '55%',
    marginTop: -185,
    elevation: 10,
    shadowColor: 'black',
    backgroundColor: '#fff',
  },
  subCard: {
    width: 70,
    height: 70,
    borderRadius: 20,
    marginLeft: 70,
    marginTop: -105,
    backgroundColor: '#fff',
    elevation: 20,
    shadowColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSubCard: {
    width: 70,
    height: 70,
    borderRadius: 20,
    marginLeft: 70,
    marginTop: -110,
    backgroundColor: '#fff',
    elevation: 20,
    shadowColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    marginTop: 45,
  },
  card_logo: {
    width: 50,
    height: 50,
    marginTop: -47,
  },
});
export default darkMode;
