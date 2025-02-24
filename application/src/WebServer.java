import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.BufferedInputStream;
import java.net.InetSocketAddress;

//RUN with terminal command: javac WebServer.java && java WebServer
//Then open browser and go to http://localhost:8080/

public class WebServer {
    public static void main(String[] args) throws IOException {
        int port = 8080;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        // Serve Home Page
        server.createContext("/", new FileHandler("application/src/index.html"));

        // Serve About Page
        server.createContext("/about", new FileHandler("application/src/about.html"));

        server.setExecutor(null);
        server.start();
        System.out.println("Web server started at port " + port);
    }

    static class FileHandler implements HttpHandler {
        private String filename;

        public FileHandler(String filename) {
            this.filename = filename;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            File file = new File(filename);
            if (!file.exists()) {
                String response = "404 Not Found";
                exchange.sendResponseHeaders(404, response.length());
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
                return;
            }

            byte[] fileBytes = new byte[(int) file.length()];
            try (BufferedInputStream bis = new BufferedInputStream(new FileInputStream(file))) {
                bis.read(fileBytes);
            }

            exchange.getResponseHeaders().set("Content-Type", "text/html");
            exchange.sendResponseHeaders(200, fileBytes.length);
            OutputStream os = exchange.getResponseBody();
            os.write(fileBytes);
            os.close();
        }
    }
}
