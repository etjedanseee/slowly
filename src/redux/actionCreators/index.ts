import * as ThemeActionCreators from './theme'
import * as AuthActionCreators from './auth'
import * as DataActionCreators from './data'


export default {
  ...ThemeActionCreators,
  ...AuthActionCreators,
  ...DataActionCreators,
}