package com.kainos.apvs.external.services;

import com.kainos.apvs.external.api.Claim;
import com.kainos.apvs.external.api.ProcessingTypeResponse;

public interface IClaimCheckerService {
    ProcessingTypeResponse checkClaim(Claim claim);
}
