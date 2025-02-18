import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.io.OutputStream;


public class WebServer {
    public static void main(String[] args) throws IOException {
        int port = 8080;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        //url path and its handler
        server.createContext("/", new HttpHandler() {
            @Override
            public void handle(HttpExchange exchange) throws IOException {
                String response = "Hello team 2 for CSC 648 project!";
                exchange.sendResponseHeaders(200, response.length());

                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }
        });

        //starts server
        server.setExecutor(null);
        server.start();

        System.out.println("Web server started at port " + port);
    }
}