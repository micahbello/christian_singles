export const RECEIVE_UI_WINDOW = "RECEIVE_UI_WINDOW";
// export const REMOVE_UI_WINDOW = "REMOVE_UI_WINDOW";



//action creator

export const receiveUiWindow = (componentName) => {
  return {
    type: RECEIVE_UI_WINDOW,
    currentWindow: componentName
  };
};

// export const removeUiWindow = () => {
//   return {
//     type: REMOVE_UI_WINDOW,
//     currentWindow: null
//   };
// };


export const updateUiWindow = (componentName) => {
  return dispatch(receiveUiWindow(componentName));
};
