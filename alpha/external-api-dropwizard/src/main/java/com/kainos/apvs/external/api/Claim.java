package com.kainos.apvs.external.api;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Claim {
    private double amount;

    public Claim() {

    }

    public Claim(double amount) {
        this.amount = amount;
    }

    @JsonProperty
    public double getAmount() { return amount; }
}
