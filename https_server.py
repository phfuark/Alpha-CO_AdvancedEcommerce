import http.server
import ssl
# Definir o endereço e a porta do servidor
server_address = ('localhost', 8080)
# Criar um servidor HTTP simples
httpd = http.server.HTTPServer(server_address, http.server.SimpleHTTPRequestHandler)
# Configurar o servidor para usar HTTPS com os certificados gerados
httpd.socket = ssl.wrap_socket(httpd.socket, 
 keyfile="server.key", 
 certfile="server.crt", 
 server_side=True)
print("Servidor HTTPS rodando em https://localhost:8080")
httpd.serve_forever()