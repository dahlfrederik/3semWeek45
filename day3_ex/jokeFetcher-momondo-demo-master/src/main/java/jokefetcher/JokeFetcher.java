package jokefetcher;

import DTO.ChuckDTO;
import DTO.CombinedDTO;
import DTO.DadDTO;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import utils.HttpUtils;


public class JokeFetcher {
    public static void main(String[] args) throws IOException {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        
        String chuck = HttpUtils.fetchData("https://api.chucknorris.io/jokes/random");
        String dad = HttpUtils.fetchData("https://icanhazdadjoke.com");
        
        System.out.println("JSON fetched from chucknorris:");
        System.out.println(chuck);
        System.out.println("JSON fetched from dadjokes:");
        System.out.println(dad);
      
        ChuckDTO chuckDTO = gson.fromJson(chuck, ChuckDTO.class);
        System.out.println("Value: " + chuckDTO.getValue() + ", id: " + chuckDTO.getId());
        
        DadDTO dadDTO = gson.fromJson(dad, DadDTO.class); 
        System.out.println("Value: " + dadDTO.getValue() + ", id: " + dadDTO.getId());
        
         

    }
}
