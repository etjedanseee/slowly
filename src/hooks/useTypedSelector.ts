import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../redux/reducers/rootReducer";


export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector