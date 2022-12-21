

## The project

The project was developed as a solution to detect motorvehicles accident and inform first reponders such as ambulance and police department.

The project consisted of

| Part | Description |
|:---|:---|
| A motorvehicle is embedded with a microcontroller and accelerometer  | To detect crash |
| A mobile phone | To send crash alert to server |
| A server | To listen for any incoming crash alert and inform first responders |
| A client UI | To display location of the crash |

## Working

1. The user installs a microcontroller on the motorvehicle
2. The user then connects the microcontroller to user's mobile phone by bluetooth
3. If the user encounters an accident, the microcontroller detects the impact through the accelerometer
4. The user is given a few seconds to respond if he/she doesn't require immediate medical attention
5. If the user fails to respond then
6. The microcontroller then sends a crash alert (via android device) along with the coordinates of the user to a server designated to listen for such alerts
7. The server sends the coordinates to a client UI
8. The client UI then displays the location of the crash on a map service

## Components and services used

| Component/service | Specification | Description |
|:---|:---:|:---|
| Microcontroller | Custom pcb similar to Arduino Nano | Embedded microcontroller on the helmet |
| Accelerometer | ADXL335 | To sense impact |
| Mobile phone | Android phone | To send crash alert over internet to the server |
| Server | Thinkspeak server | To receive crash alert and infrom first responders |
| Client UI | Electron | UI to display crash location |
| Map service | Google map | To plot the crash site |
