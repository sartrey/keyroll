import 'whatwg-fetch';
import { state } from '@noflux/react';

export function initState() {
  state.set({
    devices: [],
    volumns: [],
    records: [],
    current: {
      device: null,
      volumn: null,
    }
  });
}

export function fetchData(action, query, model) {
  const apiPath = `/__/data/${action}`;
  const payload = { query, model };
  return fetch(apiPath, {
    method: 'POST',
    body: JSON.stringify(payload),
    // headers: {}
  })
    .then(response => response.json())
    .then(json => {
      if (json.state) {
        return json.model;
      }
      console.error(`action [${action}]`, json.error);
      console.warn(json.stack);
      throw new Error('server error')
    });
}

export function scanDevices() {
  return fetchData('scanDevices')
    .then(result => {
      console.log('result', result);
      state.set('devices', result);
      state.set('current.device', 0);
    });
}

export function lockDevice(query) {
  return fetchData('lockDevice', query)
    .then(result => {
      const devices = state.get('devices');
      const index = devices.findIndex(e => e.name === result.name);
      state.cursor('devices').splice(index, 1, result);
      state.set('current.device', index);
    });
}

export function unlockDevice(query) {
  return fetchData('unlockDevice', query)
    .then(result => {
      const devices = state.get('devices');
      const index = devices.findIndex(e => e.name === result.name);
      state.cursor('devices').splice(index, 1, result);
      state.set('current.device', index);
    });
}

export function findVolumns(query) {
  return fetchData('findVolumns', query)
    .then(result => {
      state.set('volumns', result);
    });
}

export function editVolumn(query, model) {
  return fetchData('editVolumn', query, model)
    .then(result => {
      findVolumns(query);
      // this.findVolumn({ domain: currentVolumn.domain });
    });
}

export function editRecord(query, model) {
  return fetchData('editRecord', query, model);
}

export function findRecord(query) {
  return fetchData('findRecord', query);
}

export function findRecords(query) {
  return fetchData('findRecords', query);
}

export function killRecord(query, model) {
  return fetchData('killRecord', query, model)
    .then(result => {
      console.log('killRecord', result);
    });
}