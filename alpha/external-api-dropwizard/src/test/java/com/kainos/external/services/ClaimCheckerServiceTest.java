package com.kainos.external.services;

import com.kainos.apvs.external.api.Claim;
import com.kainos.apvs.external.api.ProcessingTypeResponse;
import com.kainos.apvs.external.services.ClaimCheckerService;
import com.kainos.apvs.external.services.IClaimCheckerService;
import com.kainos.apvs.external.enums.ClaimProcessingType;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class ClaimCheckerServiceTest {
    IClaimCheckerService claimChecker = new ClaimCheckerService();

    @Test
    public void checkClaim50ShouldReturnAutomaticTest() {
        Claim claim = new Claim(50);
        ProcessingTypeResponse processingTypeResponse = claimChecker.checkClaim(claim);

        assertEquals(ClaimProcessingType.AUTOMATIC.toString(), processingTypeResponse.getProcessingType());
    }

    @Test
    public void checkClaim100ShouldReturnManualTest() {
        Claim claim = new Claim(100);
        ProcessingTypeResponse processingTypeResponse = claimChecker.checkClaim(claim);

        assertEquals(ClaimProcessingType.MANUAL.toString(), processingTypeResponse.getProcessingType());
    }

    @Test
    public void checkClaimDecimalShouldReturnManualTest() {
        Claim claim = new Claim(100.5);
        ProcessingTypeResponse processingTypeResponse = claimChecker.checkClaim(claim);

        assertEquals(ClaimProcessingType.MANUAL.toString(), processingTypeResponse.getProcessingType());
    }
}
