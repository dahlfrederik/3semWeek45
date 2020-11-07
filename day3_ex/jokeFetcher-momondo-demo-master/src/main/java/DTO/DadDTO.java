/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package DTO;

/**
 * 
 * @author Frederik Dahl <cph-fd76@cphbusiness.dk>
 */
public class DadDTO {
    private String joke; 
    private String id; 

    public DadDTO(String joke, String id) {
        this.joke = joke;
        this.id = id;
    }

    public String getValue() {
        return joke;
    }

    public void setValue(String value) {
        this.joke = value;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
}
