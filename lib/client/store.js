import 'whatwg-fetch';
import { state } from '@noflux/react';

function raiseQuery(action, payload) {
  console.warn(`action [${action}] <=`, payload)
  const apiPath = `/__/data/${action}`;
  return fetch(apiPath, {
    method: 'POST',
    body: JSON.stringify(payload),
    // headers: {}
  })
    .then(response => response.json())
    .then(json => {
      if (json.state === 0) {
        console.warn(`action [${action}] =>`, json.model);
        return json.model;
      }
      console.error(`action [${action}] =>`, json.error);
      console.warn(json.stack);
      throw new Error('server error');
    });
}

function initialize() {
  state.set({
    devices: [],
    volumns: [],
    records: [],
  });
}

const stateActions = {
  scanDevices: async (model) => {
    const devices = model;
    if (devices.length > 0) {
      const device = devices[0];
      device.selected = true;
      await actionHandler.findVolumns({
        device: { name: device.name }
      });
    }
    state.set('devices', devices);
  },

  lockDevice: (model) => {
    const device = model;
    const devices = state.get('devices')
      .map(e => e.name === device.name ? device : e);
    state.set('devices', devices);
  },

  unlockDevice: (model) => {
    const device = model;
    const devices = state.get('devices')
      .map(e => e.name === device.name ? device : e);
    state.set('devices', devices);
  },
  
  findVolumns: (model) => {
    const volumns = model;
    state.set('volumns', volumns);
  },

  findRecords: (model) => {
    const records = model;
    state.set('records', records);
  },

  killRecord: (model) => {
  }
};

const actionHandler = new Proxy({}, {
  get: (o, prop) => {
    // todo - use o to do sth magic
    return async (payload) => {
      const model = await raiseQuery(prop, payload);
      const stateAction = stateActions[prop];
      if (stateAction) {
        await stateAction(model);
      }
      return model;
    }
  }
});

const store = {
  initialize,
  raiseQuery,
  action: actionHandler,
};

export {
  initialize,
  raiseQuery,
  actionHandler as action,
  store as default,
};

// export function findRecord(query) {
//   return fetchData('findRecord', query);
// }

// export function findRecords(query) {
//   return fetchData('findRecords', query);
// }

// export function killRecord(query, model) {
//   return fetchData('killRecord', query, model)
//     .then(result => {
//       console.log('killRecord', result);
//     });
// }