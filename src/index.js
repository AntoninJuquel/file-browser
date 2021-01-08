import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { setChonkyDefaults } from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';

const iconsMap = {
  "floppyDisk": '💾',
  "CANON_XF": '💾',
  "MEDIA_FILES" : '💾'
};

const CustomIcons = React.memo((props) => {
  const { isDir, type } = props.icon
  let iconString = ""

  if (typeof props.icon === "string")
    iconString = props.icon
  else if (type !== undefined && type !== "NONE" && type !== null)
    iconString = type
  else if (isDir)
    iconString = "folder"
  else
    iconString = "file"

  let newProps = { ...props, ...{ icon: iconString } }
  let icon = iconsMap[newProps.icon];
  if (icon) {
    return <span>{icon}</span>;
  }
  return <ChonkyIconFA {...newProps} />;
});

setChonkyDefaults({ iconComponent: CustomIcons });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
