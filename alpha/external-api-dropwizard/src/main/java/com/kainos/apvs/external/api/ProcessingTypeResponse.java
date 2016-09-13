package com.kainos.apvs.external.api;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.kainos.apvs.external.enums.ClaimProcessingType;

import java.util.ArrayList;

public class ProcessingTypeResponse {
    private String processingType;
    private ArrayList<String> messages;

    public ProcessingTypeResponse() {

    }

    public ProcessingTypeResponse(String processingType, ArrayList<String> messages) {
        this.processingType = processingType;
        this.messages = messages;
    }

    @JsonProperty("processing-type")
    public String getProcessingType() { return processingType; }

    @JsonProperty
    public ArrayList<String> getMessages() { return messages; }
}
