package com.kainos.external.resources;

import com.kainos.apvs.external.api.Claim;
import com.kainos.apvs.external.api.ProcessingTypeResponse;
import com.kainos.apvs.external.resources.ClaimCheckerResource;
import com.kainos.apvs.external.services.IClaimCheckerService;
import com.kainos.apvs.external.enums.ClaimProcessingType;
import io.dropwizard.testing.junit.ResourceTestRule;
import org.junit.ClassRule;
import org.junit.Test;

import static org.mockito.Matchers.*;
import static org.mockito.Mockito.mock;

import javax.ws.rs.client.Entity;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

public class ClaimCheckerResourceTest {
    static IClaimCheckerService claimCheckerService = mock(IClaimCheckerService.class);
    final String CHECK_FOR_AUTOMATIC_PROCESSING = "/check-for-automatic-processing";

    @ClassRule
    public static final ResourceTestRule resources = ResourceTestRule.builder()
            .addResource(new ClaimCheckerResource(claimCheckerService))
            .build();

    @Test
    public void postCheckForAutomaticProcessing50ShouldReturnAutomaticTest() throws Exception {
        Claim claim = new Claim(50);
        when(claimCheckerService.checkClaim(any(Claim.class)))
                .thenReturn(new ProcessingTypeResponse(ClaimProcessingType.AUTOMATIC.toString(), null));

        ProcessingTypeResponse processingTypeResponse = resources.client()
                .target(CHECK_FOR_AUTOMATIC_PROCESSING)
                .request()
                .post(Entity.json(claim), ProcessingTypeResponse.class);

        assertEquals(ClaimProcessingType.AUTOMATIC.toString(), processingTypeResponse.getProcessingType());
    }

    @Test
    public void postCheckForAutomaticProcessing100ShouldReturnManual() throws Exception {
        Claim claim = new Claim(100);
        when(claimCheckerService.checkClaim(any(Claim.class)))
                .thenReturn(new ProcessingTypeResponse(ClaimProcessingType.MANUAL.toString(), null));

        ProcessingTypeResponse processingTypeResponse = resources.client()
                .target(CHECK_FOR_AUTOMATIC_PROCESSING)
                .request()
                .post(Entity.json(claim), ProcessingTypeResponse.class);

        assertEquals(ClaimProcessingType.MANUAL.toString(), processingTypeResponse.getProcessingType());
    }

    @Test
    public void postCheckForAutomaticProcessingDecimalShouldReturnManual() throws Exception {
        Claim claim = new Claim(100.5);
        when(claimCheckerService.checkClaim(any(Claim.class)))
                .thenReturn(new ProcessingTypeResponse(ClaimProcessingType.MANUAL.toString(), null));

        ProcessingTypeResponse processingTypeResponse = resources.client()
                .target(CHECK_FOR_AUTOMATIC_PROCESSING)
                .request()
                .post(Entity.json(claim), ProcessingTypeResponse.class);

        assertEquals(ClaimProcessingType.MANUAL.toString(), processingTypeResponse.getProcessingType());
    }
}
