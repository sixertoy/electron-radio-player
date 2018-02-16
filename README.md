# Electron App Boilerplate

> OSX Only

## Install

```bash
git clone git@github.com:sixertoy/electron-radio-player.git
yarn install
(
  touch .toto
  echo "NODE_ENV=development" > .toto
  echo "ELECTRON_ENABLE_LOGGING=1" >> .toto
)
yarn run dev
```


## Tips

**Nom de l'application**
- setter: `package.json.{ productName }`
- getter: `electron.app.getName()`

**Version de l'application**
- setter: `package.json.{ version }`
- getter: `electron.app.getVersion()`

## Services

- [iTunes API](https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/)
- [Cuteradio API](http://marxoft.co.uk/doc/cuteradio-api/)
- [Dar.fm API](https://docs.google.com/document/d/12HNoXI-z40QLQiSi30g2qSWb8U9YbMd4u5_jrre-YTw/edit)

## Links

**Original Bootstrapper**
https://github.com/sixertoy/create-react-electron-app

**Electron Documentation**<br>
https://electronjs.org/docs/api

This project was bootstrapped with **Create React App**<br>
https://github.com/facebookincubator/create-react-app

**DevTools**<br>
https://github.com/chentsulin/electron-react-boilerplate#devtools

**Electron Awesome List**<br>
https://github.com/sindresorhus/awesome-electron#tools
