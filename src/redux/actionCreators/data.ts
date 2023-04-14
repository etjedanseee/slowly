import { Dispatch } from 'redux';
import { DataAction, DataActionTypes } from '../../types/Data/dataReducer';
import supabase from '../../supabaseClient';

export const fetchInterests = () => {
  return async (dispatch: Dispatch<DataAction>) => {
    try {
      const { data, error } = await supabase.from('Interests').select('*')

      if (error) {
        console.log(error);
        throw new Error(error.message)
      }

      dispatch({
        type: DataActionTypes.SET_INTERESTS,
        payload: data?.map(d => d.interest) || []
      })

    } catch (e) {
      console.log('fetch Interests error', e)
    }
  }
}
