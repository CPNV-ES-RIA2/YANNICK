import {create} from "zustand";

export const useVisionStore = create((set) => ({
    results : [],
    setResults : (results) => set({results}),
    isLoading : false,
    setIsLoading : (isLoading) => set({isLoading}),
    error : null,
    setError : (error) => set({error}),
    maxLabel : 10,
    setMaxLabel : (maxLabel) => set({maxLabel}),
    minConfidence : 70,
    setMinConfidence : (minConfidence) => set({minConfidence}),
    dataSource : [],
    setDataSource : (dataSource) => set({dataSource}),
    returnData : null,
    setReturnData : (returnData) => set({returnData}),
}))