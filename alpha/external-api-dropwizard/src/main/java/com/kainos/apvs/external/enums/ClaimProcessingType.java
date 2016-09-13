package com.kainos.apvs.external.enums;

public enum ClaimProcessingType {
    AUTOMATIC ("automatic"),
    MANUAL ("manual");

    private String processingType;

    private ClaimProcessingType(String processingType) {
        this.processingType = processingType;
    }

    @Override
    public String toString() {
        return processingType;
    }
}
