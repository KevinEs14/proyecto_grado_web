/*
 NodeMCU Server - Conexión en modo Station con un punto de acceso (router) por Dani No www.esploradores.com
 Crea una conexión del NodeMCU en modo Station con un punto de acceso que permite 
 encender y apagar un LED conectado a la salida D3 (GPIO0) del módulo NodeMCU.
 Este código de ejemplo es de público dominio.
 */
#include <ESP8266WiFi.h>                     //Incluye la librería ESP8266WiFi
 
const char* ssid = "XXXXXXXXX";        //Indicamos el nombre de la red WiFi (SSID) a la que queremos conectarnos.
const char* password = "YYYYYYYYYY";    //Indicamos la contraseña de de red WiFi
WiFiServer server(80);                    //Definimos el puerto de comunicaciones
 
int PinLED = D3; // GPIO0                   //Definimos el pin de salida - GPIO0 / D3
int estado = LOW;                          //Definimos la variable que va a recoger el estado del LED
 
void setup() {
 
  Serial.begin(115200);
  Serial.println();
 
  pinMode(PinLED, OUTPUT);                 //Inicializamos el GPIO2 como salida
  digitalWrite(PinLED, LOW);               //Dejamos inicialmente el GPIO2 apagado
 
  WiFi.begin(ssid, password);              //Inicializamos  la conexión del chip ESP8266 con la red WiFi
  Serial.printf("Conectando a la red: %s\n", WiFi.SSID().c_str());
 
  while (WiFi.status() != WL_CONNECTED) {  // Verifica el estado de la conexión del NodeMCU cada 0,5s hasta que conecta 
    delay(500);
    Serial.print(".");                    
  }
  WiFi.setAutoReconnect(true);             // Realiza la reconexión a la red WiFi si se pierde la conexión
  Serial.println("");
  Serial.println("WiFi conectada");        // Indica que el NodeMCU conectado con la red WiFi 
 
  server.begin();                          // Inicia el NodeMCU en modo Station
  Serial.println("Servidor inicializado");
 
  Serial.printf("Utiliza esta URL para conectar: http://%s\n", WiFi.localIP().toString().c_str());
} 
 
void loop(){
 
  WiFiClient client = server.available();  // Comprueba si el cliente ha conectado
  if (!client) {
    return;
  }
 
  Serial.println("nuevo cliente");         // Espera hasta que el cliente envía alguna petición
  while(!client.available()){
    delay(1);
  }
 
  String peticion = client.readStringUntil('\r');  // Lee la petición
  Serial.println(peticion);
  client.flush();
 
  // Comprueba la petición
  if (peticion.indexOf('/LED=ON') != -1) {
    estado = HIGH;
  } 
  if (peticion.indexOf('/LED=OFF') != -1){
    estado = LOW;
  }
 
  digitalWrite(PinLED, estado);           //Enciende o apaga el LED en función de la petición
 
  client.println("HTTP/1.1 200 OK");      //Envía la página HTML de respuesta al cliente
  client.println("");                     //No olvidar esta línea de separación
 
  client.print("<h1 align=center>EL LED ESTA AHORA: ");
 
  if(estado == HIGH) {
    client.print("ENCENDIDO</h1>"); 
    client.print("<img src='http://esploradores.com/Practicas_html/LED_encendido.png' alt='Bombilla encendida' style='display:block; margin:auto' width='15%'>");
    client.print("<input type='image' src='http://esploradores.com/Practicas_html/apagar_300x88.png' style='display:block; margin:auto' width='25%' onClick=location.href='/LED=OFF'>"); 
  } 
  else {
    client.print("APAGADO</h1>");
    client.print("<img src='http://esploradores.com/Practicas_html/LED_apagado.png' alt='Bombilla apagada' style='display:block; margin:auto' width='15%'>");
    client.print("<input type='image' src='http://esploradores.com/Practicas_html/encender_300x88.png' style='display:block; margin:auto' width='25%' onClick=location.href='/LED=ON'>");
  }
 
  client.println("</html>");
  delay(1);
  Serial.println("Peticion finalizada");   // Se finaliza la petición al cliente. Se inicializa la espera de una nueva petición.
  Serial.println("");
 
}
