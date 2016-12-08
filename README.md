# Turgle

To build and launch:
```
npm build
npm start
```

To generate installer for Raspberry PI (Raspbian)

```
npm run build
npm run deb
```

Notes to get it running on Raspberry PI

1) Create package with above command

2) Install on the PI
```
sudo dpkg -i turgle_0.2.0_armhf.deb
```
3) The game requires [gpio-admin](https://github.com/quick2wire/quick2wire-gpio-admin)

   Note:
   *Tested on Linux raspberrypi 4.4.34-v7+, I hit this [bug](https://github.com/raspberrypi/linux/issues/791). 
   This [patch](https://github.com/quick2wire/quick2wire-gpio-admin/pull/7) did the trick.*

4) and pi-gpio
```
npm install -g pi-gpio
```
