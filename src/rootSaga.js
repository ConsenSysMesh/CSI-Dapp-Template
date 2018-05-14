// RootSaga
/* The purpose of this file is to import Drizzle's sagas -
https://www.npmjs.com/package/redux-saga */

import { all, fork } from 'redux-saga/effects'
import { drizzleSagas } from 'drizzle'

export default function* root() {
  yield all(
    drizzleSagas.map(saga => fork(saga))
  )
}
