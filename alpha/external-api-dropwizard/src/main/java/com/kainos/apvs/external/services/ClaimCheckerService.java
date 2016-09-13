package com.kainos.apvs.external.services;

import com.kainos.apvs.external.api.Claim;
import com.kainos.apvs.external.api.ProcessingTypeResponse;
import com.kainos.apvs.external.enums.ClaimProcessingType;

import java.util.ArrayList;

public class ClaimCheckerService implements IClaimCheckerService {
    public ProcessingTypeResponse checkClaim(Claim claim) {
        if (claim.getAmount() < 100) {
            return new ProcessingTypeResponse(ClaimProcessingType.AUTOMATIC.toString(), null);
        } else {
            ArrayList<String> messages = new ArrayList<String>();
            messages.add("Exceeded automatic processing threshold");
            return new ProcessingTypeResponse(ClaimProcessingType.MANUAL.toString(), messages);
        }
    }
}
