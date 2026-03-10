# Solar & Power Monitor (Mobile App)

☀️ A **React Native (Expo)** mobile app to monitor your home **solar production and power consumption** in real time.

This app is part of a larger system consisting of:

1. **OpenDTU** – provides solar inverter data
2. **Shelly 3EM** – measures grid power usage
3. **Python Local Server** – collects device data
4. **Next.js Server** – stores the data and provides APIs + sockets
5. **Mobile App (this project)** – displays the data on your phone

The app connects to the server to receive **live updates and historical energy data**.

---

## ✨ Features

- Real-time house power usage
- Live solar production
- Interactive charts for usage and generation
- Historical solar and power data
- Live updates via WebSockets

---

## 📷 Screenshots

<div>
<img height="500" src="Images/Image01.png" alt="Home screen"/>
<img height="500" src="Images/Image02.png" alt="Live solar Data"/>
<img height="500" src="Images/Image03.png" alt="History Table"/>
<img height="500" src="Images/Image04.png" alt="Live power usage"/>
<img height="500" src="Images/Image05.png" alt="History charts"/>
</div>

---

## ⚙️ Configuration

Set the address of your **Next.js server** inside the app configuration:
https://your-domain.com or a local ip address

The server handles:

- storing historical data
- serving API endpoints
- broadcasting live updates via sockets

---

## 🚀 Development

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

Run the app using Expo Go, an Android emulator, or the iOS simulator.
