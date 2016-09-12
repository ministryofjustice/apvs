package com.kainos.apvs.external.health;

import com.codahale.metrics.health.HealthCheck;

public class ApplicationHealthCheck extends HealthCheck {
    @Override
    protected Result check() throws Exception {
        return Result.healthy();
    }
}
