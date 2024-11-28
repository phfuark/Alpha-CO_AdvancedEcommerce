import http.server
import socketserver

# Configurações do servidor
PORT = 8080  # Porta em que o servidor vai rodar
DIRECTORY = "."


class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = 'index.html'  # Página padrão para servir
        return http.server.SimpleHTTPRequestHandler.do_GET(self)


# Inicia o servidor usando ThreadingTCPServer
with socketserver.ThreadingTCPServer(("", PORT), MyHttpRequestHandler) as httpd:
    print(f"Servidor iniciado na porta {PORT}. Acesse http://localhost:{PORT}")
    httpd.serve_forever()