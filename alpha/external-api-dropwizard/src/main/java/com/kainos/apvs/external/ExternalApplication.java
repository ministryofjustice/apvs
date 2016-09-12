package com.kainos.apvs.external;

import com.kainos.apvs.external.health.ApplicationHealthCheck;
import com.kainos.apvs.external.resources.ClaimCheckerResource;
import com.kainos.apvs.external.services.ClaimCheckerService;
import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

public class ExternalApplication extends Application<ExternalConfiguration> {
    public static void main(String[] args) throws Exception {
        new ExternalApplication().run(args);
    }

    @Override
    public void initialize(Bootstrap<ExternalConfiguration> bootstrap) {
        // nothing to do yet
    }

    @Override
    public void run(ExternalConfiguration configuration,
                    Environment environment) {
        ClaimCheckerService claimChecker = new ClaimCheckerService();
        final ClaimCheckerResource claimCheckerResource = new ClaimCheckerResource(claimChecker);
        environment.jersey().register(claimCheckerResource);

        ApplicationHealthCheck applicationHealthCheck = new ApplicationHealthCheck();
        environment.healthChecks().register("alive", applicationHealthCheck);
    }
}
